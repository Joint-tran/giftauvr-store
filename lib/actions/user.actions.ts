"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { connectToDatabase } from "@/database/mongoose";

export async function updateProfile(data: {
  fullName: string;
  country: string;
  network?: string;
  usdtWallet?: string;
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

    // Get current user data
    const currentUser = await usersCollection.findOne({ id: session.user.id });

    if (!currentUser) {
      return { success: false, error: "User not found" };
    }

    // Prevent changing wallet address or network if already set
    if (
      currentUser.usdtWallet &&
      data.usdtWallet &&
      currentUser.usdtWallet !== data.usdtWallet
    ) {
      return {
        success: false,
        error: "Wallet address cannot be changed once set for security reasons",
      };
    }

    if (
      currentUser.network &&
      data.network &&
      currentUser.network !== data.network
    ) {
      return {
        success: false,
        error: "Network cannot be changed once set for security reasons",
      };
    }

    // Build update object - only allow setting wallet/network if not already set
    const updateData: any = {
      fullName: data.fullName,
      country: data.country,
      updatedAt: new Date(),
    };

    // Only update network if not already set
    if (!currentUser.network && data.network) {
      updateData.network = data.network;
    }

    // Only update wallet if not already set
    if (!currentUser.usdtWallet && data.usdtWallet) {
      updateData.usdtWallet = data.usdtWallet;
    }

    const result = await usersCollection.updateOne(
      { id: session.user.id },
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      return { success: true, message: "Profile updated successfully" };
    }

    return { success: false, error: "No changes made" };
  } catch (error) {
    console.error("Failed to update profile", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    // TODO: Implement password change logic with better-auth
    // This would require better-auth's password change API

    return { success: false, error: "Not implemented yet" };
  } catch (error) {
    console.error("Failed to change password", error);
    return { success: false, error: "Failed to change password" };
  }
}
