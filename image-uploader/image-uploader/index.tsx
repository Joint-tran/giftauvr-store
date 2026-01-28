"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BUNNY_CONFIG } from "../config";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  onImageRemoved?: (url: string) => void;
  maxFiles?: number;
  existingImages?: string[];
  className?: string;
  uploadPath?: string;
}

interface UploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

export function ImageUpload({
  onImageUploaded,
  onImageRemoved,
  maxFiles = 5,
  existingImages = [],
  className,
  uploadPath = "products",
}: ImageUploadProps) {
  // Component state
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [internalExistingImages, setInternalExistingImages] = useState<string[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update internal state when existingImages prop changes
  useEffect(() => {
    setInternalExistingImages(existingImages);
  }, [existingImages]);

  const generateFileName = (file: File): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop();
    return `${uploadPath}/${timestamp}-${randomString}.${extension}`;
  };

  const uploadToBunny = async (
    file: File,
    fileName: string
  ): Promise<string> => {
    const uploadUrl = `${BUNNY_CONFIG.baseUrl}/${BUNNY_CONFIG.storageZoneName}/${fileName}`;

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: BUNNY_CONFIG.accessKey,
        "Content-Type": "application/octet-stream",
        accept: "application/json",
      },
      body: file,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    // Return the correct CDN URL
    const url = `${BUNNY_CONFIG.cdnUrl}/${fileName}`;
    return url;
  };

  const handleFileUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    const totalImagesCount =
      internalExistingImages.length +
      uploads.filter((u) => u.status === "success").length;

    if (totalImagesCount + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Validate file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = fileArray.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      alert("Only JPEG, PNG, and WebP images are allowed");
      return;
    }

    // Validate file sizes (max 5MB per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = fileArray.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      alert("Each image must be less than 5MB");
      return;
    }

    // Initialize upload progress
    const newUploads: UploadProgress[] = fileArray.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setUploads((prev) => [...prev, ...newUploads]);

    // Upload files
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const fileName = generateFileName(file);

      try {
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setUploads((prev) =>
            prev.map((upload) =>
              upload.file === file && upload.progress < 90
                ? { ...upload, progress: upload.progress + 10 }
                : upload
            )
          );
        }, 200);

        const url = await uploadToBunny(file, fileName);

        clearInterval(progressInterval);

        setUploads((prev) =>
          prev.map((upload) =>
            upload.file === file
              ? { ...upload, progress: 100, status: "success", url }
              : upload
          )
        );

        // Check if this URL already exists in our internal tracking of existingImages before notifying parent
        if (!internalExistingImages.includes(url)) {
          onImageUploaded(url);
        }
      } catch (error) {
        setUploads((prev) =>
          prev.map((upload) =>
            upload.file === file
              ? {
                  ...upload,
                  progress: 0,
                  status: "error",
                  error: error instanceof Error ? error.message : String(error),
                }
              : upload
          )
        );
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeUpload = (upload: UploadProgress) => {
    // Remove from local state
    setUploads((prev) => prev.filter((u) => u !== upload));
    
    // Notify parent component
    if (upload.url && onImageRemoved) {
      onImageRemoved(upload.url);
    }
  };

  const removeExistingImage = (url: string) => {
    // Update internal state immediately to avoid waiting for props to update
    setInternalExistingImages(prev => prev.filter(img => img !== url));
    
    // Notify parent component
    if (onImageRemoved) {
      onImageRemoved(url);
    }
  };

  // Calculate total images (successful uploads + existing images)
  const successfulUploads = uploads.filter(
    (u) => u.status === "success"
  ).length;
  const totalImages = internalExistingImages.length + successfulUploads;

  // Collection of all successfully uploaded image URLs
  const successfulUploadUrls = uploads
    .filter((u) => u.status === "success" && u.url)
    .map((u) => u.url as string);

  // Combine existing images and successful uploads, ensuring no duplicates
  const allImages = [...new Set([...internalExistingImages, ...successfulUploadUrls])];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          totalImages >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => totalImages < maxFiles && fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium mb-2">
            {totalImages >= maxFiles
              ? `Maximum ${maxFiles} images reached`
              : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, WebP up to 5MB each
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {totalImages}/{maxFiles} images
          </p>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        disabled={totalImages >= maxFiles}
      />

      {/* All Images Grid - Both existing and uploaded images */}
      {allImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allImages.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg?height=200&width=200";
                  }}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  // Check if it's an existing image or a new upload
                  if (internalExistingImages.includes(url)) {
                    removeExistingImage(url);
                  } else {
                    const uploadItem = uploads.find((u) => u.url === url);
                    if (uploadItem) {
                      removeUpload(uploadItem);
                    }
                  }
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Progress - Only for in-progress or error uploads */}
      {uploads.filter((u) => u.status !== "success").length > 0 && (
        <div className="space-y-3">
          {uploads.map((upload, index) => {
            // Only show uploads that are in progress or had an error
            if (upload.status === "success") return null;

            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <div className="flex-shrink-0">
                  {upload.status === "uploading" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {upload.status === "error" && (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {upload.file.name}
                  </p>
                  {upload.status === "uploading" && (
                    <Progress value={upload.progress} className="mt-1" />
                  )}
                  {upload.status === "error" && (
                    <p className="text-xs text-red-600 mt-1">{upload.error}</p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-8 w-8"
                  onClick={() => removeUpload(upload)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
