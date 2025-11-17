"use server";

import { cookies } from "next/headers";
import { connectToDatabase } from "@/database/mongoose";
import { ObjectId } from "mongodb";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123456";
const ADMIN_COOKIE_NAME = "admin_authenticated";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function verifyAdminPassword(password: string) {
  try {
    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
      });
      return { success: true };
    }
    return { success: false, error: "Mật khẩu không chính xác" };
  } catch (error) {
    console.error("Admin verification failed", error);
    return { success: false, error: "Đã xảy ra lỗi" };
  }
}

export async function checkAdminAuth() {
  try {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get(ADMIN_COOKIE_NAME);
    return adminAuth?.value === "true";
  } catch (error) {
    console.error("Admin auth check failed", error);
    return false;
  }
}

export async function adminSignOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return { success: true };
  } catch (error) {
    console.error("Admin signout failed", error);
    return { success: false, error: "Đã xảy ra lỗi" };
  }
}

// Get all pending users
export async function getPendingUsers() {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");
    const pendingUsers = await usersCollection
      .find({ approvalStatus: "pending" })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(pendingUsers)),
    };
  } catch (error) {
    console.error("Failed to fetch pending users", error);
    return { success: false, error: "Không thể tải danh sách user" };
  }
}

// Approve user
export async function approveUser(userId: string) {
  try {
    const mongoose = await connectToDatabase();

    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          approvalStatus: "approved",
          updatedAt: new Date(),
        },
        $inc: {
          balance: 300,
        },
      }
    );

    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: "Đã phê duyệt user và cộng 300 USDT vào balance",
      };
    }

    return { success: false, error: "Không thể cập nhật" };
  } catch (error) {
    console.error("Failed to approve user", error);
    return { success: false, error: "Đã xảy ra lỗi khi phê duyệt" };
  }
}

// Reject user
export async function rejectUser(userId: string, reason?: string) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { id: userId },
      {
        $set: {
          approvalStatus: "rejected",
          rejectionReason: reason || "Không đạt yêu cầu",
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      // TODO: Send rejection email
      return { success: true, message: "Đã từ chối user" };
    }

    return { success: false, error: "Không thể cập nhật" };
  } catch (error) {
    console.error("Failed to reject user", error);
    return { success: false, error: "Đã xảy ra lỗi khi từ chối" };
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");
    const users = await usersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)),
    };
  } catch (error) {
    console.error("Failed to fetch users", error);
    return { success: false, error: "Không thể tải danh sách user" };
  }
}

// Update user wallet info
export async function updateUserWallet(
  userId: string,
  depositAmount: number,
  depositTransactionHash: string
) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          depositAmount,
          depositTransactionHash,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: "Đã cập nhật thông tin nạp tiền thành công",
      };
    }

    return { success: false, error: "Không thể cập nhật" };
  } catch (error) {
    console.error("Failed to update user wallet", error);
    return { success: false, error: "Đã xảy ra lỗi khi cập nhật" };
  }
}

// Ban user
export async function banUser(
  userId: string,
  banReason: string,
  banContactEmail?: string
) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          isBanned: true,
          banReason: banReason || "Terms of service violation",
          banContactEmail: banContactEmail || "support@giftauvr.com",
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: "User account banned successfully",
      };
    }

    return { success: false, error: "Unable to update" };
  } catch (error) {
    console.error("Failed to ban user", error);
    return {
      success: false,
      error: "An error occurred while banning the account",
    };
  }
}

// Unban user
export async function unbanUser(userId: string) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const usersCollection = db.collection("user");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          isBanned: false,
          updatedAt: new Date(),
        },
        $unset: {
          banReason: "",
        },
      }
    );

    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: "User account unbanned successfully",
      };
    }

    return { success: false, error: "Unable to update" };
  } catch (error) {
    console.error("Failed to unban user", error);
    return {
      success: false,
      error: "An error occurred while unbanning the account",
    };
  }
}
