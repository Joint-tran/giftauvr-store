"use server";

import { connectToDatabase } from "@/database/mongoose";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export async function createWithdrawal(amount: number) {
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

    const usersCollection = db.collection("user");
    const withdrawalsCollection = db.collection("withdrawals");

    // Get user's current balance
    const user = await usersCollection.findOne({
      _id: new ObjectId(session.user.id),
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (user.balance < amount) {
      return { success: false, error: "Insufficient balance" };
    }

    // Minimum withdrawal amount
    if (amount < 10) {
      return { success: false, error: "Minimum withdrawal amount is $10 USDT" };
    }

    // Create withdrawal request (wallet info hidden for security)
    const withdrawal = {
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.fullName || session.user.name,
      amount,
      status: "pending", // pending, approved, rejected, completed
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await withdrawalsCollection.insertOne(withdrawal);

    // Deduct from user balance
    await usersCollection.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $inc: { balance: -amount },
        $set: { updatedAt: new Date() },
      }
    );

    return {
      success: true,
      message: "Withdrawal request submitted successfully",
    };
  } catch (error) {
    console.error("Failed to create withdrawal", error);
    return { success: false, error: "Error creating withdrawal request" };
  }
}

export async function getUserWithdrawals() {
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

    const withdrawalsCollection = db.collection("withdrawals");

    const withdrawals = await withdrawalsCollection
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(withdrawals)),
    };
  } catch (error) {
    console.error("Failed to fetch withdrawals", error);
    return { success: false, error: "Error fetching withdrawals" };
  }
}

// Admin actions
export async function getAllWithdrawals() {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const withdrawalsCollection = db.collection("withdrawals");

    const withdrawals = await withdrawalsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(withdrawals)),
    };
  } catch (error) {
    console.error("Failed to fetch all withdrawals", error);
    return { success: false, error: "Error fetching withdrawals" };
  }
}

export async function updateWithdrawalStatus(
  withdrawalId: string,
  status: "approved" | "rejected" | "completed"
) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const withdrawalsCollection = db.collection("withdrawals");

    const updateData = {
      status,
      updatedAt: new Date(),
    };

    if (status === "rejected") {
      // Refund to user balance if rejected
      const withdrawal = await withdrawalsCollection.findOne({
        _id: new ObjectId(withdrawalId),
      });

      if (withdrawal) {
        const usersCollection = db.collection("user");
        await usersCollection.updateOne(
          { _id: new ObjectId(withdrawal.userId) },
          {
            $inc: { balance: withdrawal.amount },
            $set: { updatedAt: new Date() },
          }
        );
      }
    }

    const result = await withdrawalsCollection.updateOne(
      { _id: new ObjectId(withdrawalId) },
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: `Withdrawal ${status} successfully`,
      };
    }

    return { success: false, error: "Cannot update withdrawal" };
  } catch (error) {
    console.error("Failed to update withdrawal status", error);
    return { success: false, error: "Error updating withdrawal status" };
  }
}
