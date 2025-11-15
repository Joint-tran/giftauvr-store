"use server";

import { connectToDatabase } from "@/database/mongoose";
import { ObjectId } from "mongodb";

// Debug: Get user by ID
export async function getUserById(userId: string) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");
    const user = await usersCollection.findOne({ id: userId });

    if (user) {
      return {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          fullName: user.fullName,
          accountType: user.accountType,
          approvalStatus: user.approvalStatus,
          balance: user.balance,
          exists: true,
        },
      };
    }

    return { success: false, error: "User not found", data: { exists: false } };
  } catch (error) {
    console.error("Failed to get user", error);
    return { success: false, error: "Error fetching user" };
  }
}

// Debug: Check egift seller info
export async function checkEgiftSeller(egiftId: string) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const egiftsCollection = db.collection("egifts");
    const usersCollection = db.collection("user");

    const egift = await egiftsCollection.findOne({
      _id: new ObjectId(egiftId),
    });

    if (!egift) {
      return { success: false, error: "Egift not found" };
    }

    const seller = await usersCollection.findOne({ id: egift.sellerId });

    return {
      success: true,
      data: {
        egiftId: egiftId,
        sellerId: egift.sellerId,
        sellerEmail: egift.sellerEmail,
        sellerName: egift.sellerName,
        sellerExists: !!seller,
        sellerData: seller
          ? {
              id: seller.id,
              email: seller.email,
              accountType: seller.accountType,
              balance: seller.balance,
            }
          : null,
      },
    };
  } catch (error) {
    console.error("Failed to check egift seller", error);
    return { success: false, error: "Error checking seller" };
  }
}
