"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { connectToDatabase } from "@/database/mongoose";
import { revalidatePath } from "next/cache";

const PREMIUM_DEPOSIT_REQUIRED = 15000; // $15,000 required

// Admin action to upgrade user to premium
export async function upgradeUserToPremium(userEmail: string) {
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

    // Update user to premium account type
    const result = await usersCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          accountType: "premium",
          premiumDepositRequired: PREMIUM_DEPOSIT_REQUIRED,
          premiumDepositAmount: 0,
          premiumWalletAddress: "", // Admin will set this later
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount > 0) {
      revalidatePath("/admin");
      return { success: true, message: "User upgraded to premium" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to upgrade user to premium", error);
    return { success: false, error: "Failed to upgrade user to premium" };
  }
}

// Admin action to set premium wallet address for a user
export async function setPremiumWalletAddress(data: {
  userEmail: string;
  walletAddress: string;
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

    const result = await usersCollection.updateOne(
      { email: data.userEmail },
      {
        $set: {
          premiumWalletAddress: data.walletAddress,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount > 0) {
      revalidatePath("/admin");
      return { success: true, message: "Premium wallet address updated" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to set premium wallet address", error);
    return { success: false, error: "Failed to set premium wallet address" };
  }
}

// Admin action to update premium deposit amount
export async function updatePremiumDeposit(data: {
  userEmail: string;
  amount: number;
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

    // Get current user to check premium status
    const user = await usersCollection.findOne({ email: data.userEmail });
    if (!user || user.accountType !== "premium") {
      return { success: false, error: "User is not a premium account" };
    }

    const newAmount = data.amount;
    const depositRequired = user.premiumDepositRequired || PREMIUM_DEPOSIT_REQUIRED;

    const updateData: Record<string, unknown> = {
      premiumDepositAmount: newAmount,
      updatedAt: new Date(),
    };

    // If deposit is complete, activate premium
    if (newAmount >= depositRequired) {
      updateData.premiumActivatedAt = new Date();
    }

    const result = await usersCollection.updateOne(
      { email: data.userEmail },
      { $set: updateData }
    );

    if (result.matchedCount > 0) {
      revalidatePath("/admin");
      return { 
        success: true, 
        message: newAmount >= depositRequired 
          ? "Premium account activated!" 
          : "Premium deposit updated" 
      };
    }

    return { success: false, error: "Failed to update deposit" };
  } catch (error) {
    console.error("Failed to update premium deposit", error);
    return { success: false, error: "Failed to update premium deposit" };
  }
}

// Admin action to downgrade premium user back to regular
export async function downgradeFromPremium(userEmail: string) {
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
          accountType: "buyer",
          updatedAt: new Date(),
        },
        $unset: {
          premiumDepositRequired: "",
          premiumDepositAmount: "",
          premiumWalletAddress: "",
          premiumActivatedAt: "",
        },
      }
    );

    if (result.matchedCount > 0) {
      revalidatePath("/admin");
      return { success: true, message: "User downgraded from premium" };
    }

    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Failed to downgrade user from premium", error);
    return { success: false, error: "Failed to downgrade user" };
  }
}
