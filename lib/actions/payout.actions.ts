"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { connectToDatabase } from "@/database/mongoose";
import { ObjectId } from "mongodb";

export async function submitPayoutRequest(data: {
  amount: number;
  notes?: string;
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
    const payoutsCollection = db.collection("payouts");

    // Get user info
    const user = await usersCollection.findOne({ id: session.user.id });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check balance
    if (!user.balance || user.balance < data.amount) {
      return { success: false, error: "Insufficient balance" };
    }

    // Check wallet info
    if (!user.usdtWallet || !user.network) {
      return {
        success: false,
        error: "Please set your wallet address and network in your profile",
      };
    }

    // Deduct balance
    const balanceResult = await usersCollection.updateOne(
      { id: session.user.id },
      {
        $inc: { balance: -data.amount },
        $set: { updatedAt: new Date() },
      }
    );

    if (balanceResult.modifiedCount === 0) {
      return { success: false, error: "Failed to update balance" };
    }

    // Create payout request
    const payout = {
      userId: session.user.id,
      userEmail: session.user.email,
      userName: user.fullName || session.user.name || session.user.email,
      amount: data.amount,
      walletAddress: user.usdtWallet,
      network: user.network,
      status: "pending",
      notes: data.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await payoutsCollection.insertOne(payout);

    return {
      success: true,
      message: "Payout request submitted successfully",
    };
  } catch (error) {
    console.error("Failed to submit payout request", error);
    return { success: false, error: "Failed to submit payout request" };
  }
}

export async function getMyPayoutRequests() {
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

    const payoutsCollection = db.collection("payouts");

    const payouts = await payoutsCollection
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(payouts)),
    };
  } catch (error) {
    console.error("Failed to fetch payout requests", error);
    return { success: false, error: "Failed to fetch payout requests" };
  }
}

// Admin: Get all pending payout requests
export async function getAllPendingPayouts() {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const payoutsCollection = db.collection("payouts");

    const payouts = await payoutsCollection
      .find({ status: "pending" })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(payouts)),
    };
  } catch (error) {
    console.error("Failed to fetch pending payouts", error);
    return { success: false, error: "Failed to fetch pending payouts" };
  }
}

// Admin: Complete payout
export async function completePayout(
  payoutId: string,
  transactionHash: string
) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const payoutsCollection = db.collection("payouts");

    const result = await payoutsCollection.updateOne(
      { _id: new ObjectId(payoutId), status: "pending" },
      {
        $set: {
          status: "completed",
          transactionHash,
          completedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: "Payout completed successfully",
      };
    }

    return { success: false, error: "Cannot update payout" };
  } catch (error) {
    console.error("Failed to complete payout", error);
    return { success: false, error: "Failed to complete payout" };
  }
}

// Admin: Reject payout
export async function rejectPayout(payoutId: string, reason?: string) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const payoutsCollection = db.collection("payouts");
    const usersCollection = db.collection("user");

    // Get payout details
    const payout = await payoutsCollection.findOne({
      _id: new ObjectId(payoutId),
    });

    if (!payout) {
      return { success: false, error: "Payout not found" };
    }

    if (payout.status !== "pending") {
      return { success: false, error: "Payout already processed" };
    }

    // Refund balance
    await usersCollection.updateOne(
      { id: payout.userId },
      {
        $inc: { balance: payout.amount },
        $set: { updatedAt: new Date() },
      }
    );

    // Update payout status
    const result = await payoutsCollection.updateOne(
      { _id: new ObjectId(payoutId) },
      {
        $set: {
          status: "rejected",
          rejectionReason: reason || "Request rejected by admin",
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: "Payout rejected and balance refunded",
      };
    }

    return { success: false, error: "Cannot update payout" };
  } catch (error) {
    console.error("Failed to reject payout", error);
    return { success: false, error: "Failed to reject payout" };
  }
}
