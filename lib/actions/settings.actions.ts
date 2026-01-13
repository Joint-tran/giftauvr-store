"use server";

import { connectToDatabase } from "@/database/mongoose";

const SETTINGS_COLLECTION = "site_settings";
const KYC_NOTICE_KEY = "kyc_notice_visible";

export async function getKycNoticeVisibility(): Promise<boolean> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const settingsCollection = db.collection(SETTINGS_COLLECTION);
    const setting = await settingsCollection.findOne({ key: KYC_NOTICE_KEY });

    // Default to true if setting doesn't exist
    return setting?.value ?? true;
  } catch (error) {
    console.error("Failed to fetch KYC notice visibility", error);
    return true; // Default to visible on error
  }
}

export async function setKycNoticeVisibility(visible: boolean) {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    const settingsCollection = db.collection(SETTINGS_COLLECTION);

    await settingsCollection.updateOne(
      { key: KYC_NOTICE_KEY },
      {
        $set: {
          key: KYC_NOTICE_KEY,
          value: visible,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return { success: true, message: visible ? "Đã hiện thông báo KYC" : "Đã ẩn thông báo KYC" };
  } catch (error) {
    console.error("Failed to update KYC notice visibility", error);
    return { success: false, error: "Đã xảy ra lỗi khi cập nhật" };
  }
}
