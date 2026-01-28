import { NextRequest, NextResponse } from "next/server";

const BUNNY_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_BUNNY_BASE_URL || "https://storage.bunnycdn.com",
  storageZoneName: process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE || "",
  accessKey: process.env.BUNNY_ACCESS_KEY || process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY || "",
  cdnUrl: process.env.NEXT_PUBLIC_BUNNY_CDN_URL || "",
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "uploads";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Only JPEG and PNG images are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File must be less than 5MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${extension}`;

    // Upload to Bunny CDN
    const uploadUrl = `${BUNNY_CONFIG.baseUrl}/${BUNNY_CONFIG.storageZoneName}/${fileName}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_CONFIG.accessKey,
        "Content-Type": "application/octet-stream",
      },
      body: buffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Bunny upload failed:", response.status, errorText);
      return NextResponse.json(
        { success: false, error: `Upload failed: ${response.status}` },
        { status: 500 }
      );
    }

    const cdnUrl = `${BUNNY_CONFIG.cdnUrl}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: cdnUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
