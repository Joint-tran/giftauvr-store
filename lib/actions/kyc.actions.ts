"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { connectToDatabase } from "@/database/mongoose";
import { revalidatePath } from "next/cache";

export async function submitKycVerification(data: {
  userId: string;
  documentType: string;
  documentFront: string;
  documentBack: string;
  selfie: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    // Verify the user is submitting their own KYC
    if (session.user.id !== data.userId) {
      return { success: false, error: "Unauthorized" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    // Update KYC status using email (most reliable identifier)
    const result = await usersCollection.updateOne(
      { email: session.user.email },
      {
        $set: {
          kycStatus: "submitted",
          kycDocumentType: data.documentType,
          kycDocumentFront: data.documentFront,
          kycDocumentBack: data.documentBack || null,
          kycSelfie: data.selfie,
          kycSubmittedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount > 0) {
      revalidatePath("/kyc-verification");
      revalidatePath("/");
      return { success: true, message: "KYC submitted successfully" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to submit KYC", error);
    return { success: false, error: "Failed to submit KYC" };
  }
}

// Admin action to require KYC for a user
export async function requireKycForUser(data: {
  userEmail: string;
  reason: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    // Update user to require KYC using email
    const result = await usersCollection.updateOne(
      { email: data.userEmail },
      {
        $set: {
          kycRequired: true,
          kycStatus: "pending",
          kycReason: data.reason,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount > 0) {
      return { success: true, message: "KYC requirement set for user" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to require KYC for user", error);
    return { success: false, error: "Failed to require KYC for user" };
  }
}

// Admin action to approve KYC
export async function approveKyc(userEmail: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          kycStatus: "approved",
          kycReviewedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount > 0) {
      return { success: true, message: "KYC approved" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to approve KYC", error);
    return { success: false, error: "Failed to approve KYC" };
  }
}

// Admin action to reject KYC
export async function rejectKyc(data: { userEmail: string; reason: string }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { email: data.userEmail },
      {
        $set: {
          kycStatus: "rejected",
          kycReason: data.reason,
          kycReviewedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount > 0) {
      return { success: true, message: "KYC rejected" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to reject KYC", error);
    return { success: false, error: "Failed to reject KYC" };
  }
}

// Admin action to remove KYC requirement
export async function removeKycRequirement(userEmail: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          kycRequired: false,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount > 0) {
      return { success: true, message: "KYC requirement removed" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to remove KYC requirement", error);
    return { success: false, error: "Failed to remove KYC requirement" };
  }
}
