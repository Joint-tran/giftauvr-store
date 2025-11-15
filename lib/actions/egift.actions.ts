"use server";

import { connectToDatabase } from "@/database/mongoose";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export interface EgiftSubmission {
  sellerId: string;
  sellerEmail: string;
  sellerName: string;
  categoryId: string; // Encoded category ID
  categoryName: string;
  brand: string;
  cardCode: string;
  pin?: string;
  value: number; // Face value in USD
  sellingPrice: number; // Price seller wants
  expiryDate?: Date;
  status: "pending" | "rejected" | "sold";
  images?: string[]; // URLs to card images
  notes?: string;
  soldAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export async function submitEgift(data: {
  categoryId: string;
  cardCode: string;
  pin?: string;
  value: number;
  sellingPrice: number;
  expiryDate?: string;
  notes?: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Check if user is a seller
    if (session.user.accountType?.toLowerCase() !== "seller") {
      return {
        success: false,
        error: "Only sellers can submit gift cards",
      };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const egiftsCollection = db.collection("egifts");

    // Validate selling price
    if (data.sellingPrice <= 0 || data.sellingPrice > data.value) {
      return {
        success: false,
        error: "Invalid selling price",
      };
    }

    // Import categories to get category details
    const { getCategoryById } = await import("@/lib/categories");
    const category = getCategoryById(data.categoryId);

    if (!category) {
      return { success: false, error: "Invalid category" };
    }

    const egift: Omit<EgiftSubmission, "_id"> = {
      sellerId: session.user.id,
      sellerEmail: session.user.email,
      sellerName: session.user.fullName || session.user.name,
      categoryId: data.categoryId,
      categoryName: category.name,
      brand: category.brand,
      cardCode: data.cardCode,
      pin: data.pin,
      value: data.value,
      sellingPrice: data.sellingPrice,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      status: "pending",
      notes: data.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await egiftsCollection.insertOne(egift);

    return {
      success: true,
      message: "Gift card submitted successfully and awaiting approval",
    };
  } catch (error) {
    console.error("Failed to submit egift", error);
    return { success: false, error: "Error submitting gift card" };
  }
}

export async function getMyEgifts() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const egiftsCollection = db.collection("egifts");

    const egifts = await egiftsCollection
      .find({ sellerId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(egifts)),
    };
  } catch (error) {
    console.error("Failed to fetch egifts", error);
    return { success: false, error: "Error fetching gift cards" };
  }
}

// Admin: Get all pending egifts
export async function getAllPendingEgifts() {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const egiftsCollection = db.collection("egifts");

    const egifts = await egiftsCollection
      .find({ status: "pending" })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(egifts)),
    };
  } catch (error) {
    console.error("Failed to fetch pending egifts", error);
    return { success: false, error: "Error fetching pending gift cards" };
  }
}

// Admin: Approve egift (Admin buys the card and pays seller)
export async function approveEgift(egiftId: string) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const egiftsCollection = db.collection("egifts");
    const usersCollection = db.collection("user");

    // Get egift details
    const egift = await egiftsCollection.findOne({
      _id: new ObjectId(egiftId),
    });

    if (!egift) {
      return { success: false, error: "Gift card not found" };
    }

    if (egift.status !== "pending") {
      return { success: false, error: "Gift card already processed" };
    }

    // Update egift status to sold
    const egiftResult = await egiftsCollection.updateOne(
      { _id: new ObjectId(egiftId) },
      {
        $set: {
          status: "sold",
          soldAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (egiftResult.modifiedCount === 0) {
      return { success: false, error: "Cannot update gift card" };
    }

    // Check if user exists
    console.log("Looking for seller with ID:", egift.sellerId);
    const seller = await usersCollection.findOne({ id: egift.sellerId });
    console.log("Seller found:", seller ? "Yes" : "No");

    if (!seller) {
      // Rollback egift status if user not found
      await egiftsCollection.updateOne(
        { _id: new ObjectId(egiftId) },
        {
          $set: {
            status: "pending",
            updatedAt: new Date(),
          },
          $unset: { soldAt: "" },
        }
      );
      return {
        success: false,
        error: `Seller not found with ID: ${egift.sellerId}. Please check if the seller account still exists.`,
      };
    }

    // Add selling price to seller's balance
    // Use $inc to increment, it will initialize to 0 if field doesn't exist
    const userResult = await usersCollection.updateOne(
      { id: egift.sellerId },
      {
        $inc: {
          balance: egift.sellingPrice,
        },
        $set: {
          updatedAt: new Date(),
        },
      }
    );

    // Check matchedCount instead of modifiedCount for $inc operations
    if (userResult.matchedCount === 0) {
      // Rollback egift status if user update fails
      await egiftsCollection.updateOne(
        { _id: new ObjectId(egiftId) },
        {
          $set: {
            status: "pending",
            updatedAt: new Date(),
          },
          $unset: { soldAt: "" },
        }
      );
      console.error("Failed to update balance for user:", egift.sellerId);
      return { success: false, error: "Cannot update seller balance" };
    }

    return {
      success: true,
      message: `Gift card purchased! $${egift.sellingPrice.toFixed(
        2
      )} added to seller's balance`,
    };
  } catch (error) {
    console.error("Failed to approve egift", error);
    return { success: false, error: "Error approving gift card" };
  }
}

// Admin: Reject egift
export async function rejectEgift(egiftId: string, reason?: string) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const egiftsCollection = db.collection("egifts");

    const result = await egiftsCollection.updateOne(
      { _id: new ObjectId(egiftId) },
      {
        $set: {
          status: "rejected",
          rejectionReason: reason,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return { success: true, message: "Gift card rejected" };
    }

    return { success: false, error: "Cannot update" };
  } catch (error) {
    console.error("Failed to reject egift", error);
    return { success: false, error: "Error rejecting gift card" };
  }
}

// Admin: Get all sold egifts
export async function getAllSoldEgifts() {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const egiftsCollection = db.collection("egifts");

    const egifts = await egiftsCollection
      .find({ status: "sold" })
      .sort({ soldAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(egifts)),
    };
  } catch (error) {
    console.error("Failed to fetch sold egifts", error);
    return { success: false, error: "Error fetching sold gift cards" };
  }
}
