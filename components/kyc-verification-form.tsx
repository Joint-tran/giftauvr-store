"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Camera,
  CreditCard,
  FileCheck,
  CheckCircle2,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";

type DocumentType = "passport" | "national_id" | "drivers_license";

interface KycFormData {
  documentType: DocumentType | "";
  documentFront: string;
  documentBack: string;
  selfie: string;
}

interface KycVerificationFormProps {
  onSubmit: (data: KycFormData) => Promise<void>;
  existingData?: Partial<KycFormData>;
}

const translations = {
  en: {
    title: "Identity Verification",
    subtitle: "Complete the steps below to verify your identity",
    step1Title: "Select Document Type",
    step1Desc: "Choose a valid government-issued ID",
    step2Title: "Upload Document Photos",
    step2Desc: "Take clear photos of your document",
    step3Title: "Take a Selfie",
    step3Desc: "Take a photo holding your ID next to your face",
    documentType: "Document Type",
    passport: "Passport",
    nationalId: "National ID Card",
    driversLicense: "Driver's License",
    frontSide: "Front Side",
    backSide: "Back Side",
    selfieTitle: "Selfie with Document",
    selfieDesc: "Hold your ID next to your face and take a clear photo",
    uploadHint: "Click to upload or drag and drop",
    uploadFormats: "PNG, JPG up to 5MB",
    next: "Next",
    back: "Back",
    submit: "Submit for Review",
    submitting: "Submitting...",
    tips: "Tips for a successful verification:",
    tip1: "Ensure all text on your document is clearly visible",
    tip2: "Take photos in good lighting",
    tip3: "Make sure your face and the document are both visible in the selfie",
    tip4: "Do not edit or alter the photos",
    requiresBack: "This document type requires both front and back photos",
    passportNote: "Passport only requires the photo page",
  },
  ru: {
    title: "Верификация личности",
    subtitle: "Выполните шаги ниже для подтверждения личности",
    step1Title: "Выберите тип документа",
    step1Desc: "Выберите действительный документ, удостоверяющий личность",
    step2Title: "Загрузите фото документа",
    step2Desc: "Сделайте чёткие фото вашего документа",
    step3Title: "Сделайте селфи",
    step3Desc: "Сфотографируйтесь с документом рядом с лицом",
    documentType: "Тип документа",
    passport: "Паспорт",
    nationalId: "Национальное удостоверение личности",
    driversLicense: "Водительское удостоверение",
    frontSide: "Лицевая сторона",
    backSide: "Обратная сторона",
    selfieTitle: "Селфи с документом",
    selfieDesc: "Держите документ рядом с лицом и сделайте чёткое фото",
    uploadHint: "Нажмите для загрузки или перетащите файл",
    uploadFormats: "PNG, JPG до 5МБ",
    next: "Далее",
    back: "Назад",
    submit: "Отправить на проверку",
    submitting: "Отправка...",
    tips: "Советы для успешной верификации:",
    tip1: "Убедитесь, что весь текст на документе чётко виден",
    tip2: "Делайте фото при хорошем освещении",
    tip3: "Убедитесь, что ваше лицо и документ видны на селфи",
    tip4: "Не редактируйте и не изменяйте фотографии",
    requiresBack: "Этот тип документа требует фото обеих сторон",
    passportNote: "Для паспорта требуется только страница с фото",
  },
};

export function KycVerificationForm({ onSubmit, existingData }: KycVerificationFormProps) {
  const { locale } = useLocale();
  const t = translations[locale] || translations.en;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [formData, setFormData] = useState<KycFormData>({
    documentType: existingData?.documentType || "",
    documentFront: existingData?.documentFront || "",
    documentBack: existingData?.documentBack || "",
    selfie: existingData?.selfie || "",
  });

  const requiresBack = formData.documentType === "national_id" || formData.documentType === "drivers_license";

  const uploadToBunny = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "kyc");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Upload failed:", result.error);
      throw new Error(result.error || "Upload failed");
    }

    return result.url;
  };

  const handleFileUpload = async (
    fieldName: "documentFront" | "documentBack" | "selfie",
    file: File
  ) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG and PNG images are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File must be less than 5MB");
      return;
    }

    setUploadingField(fieldName);
    try {
      const url = await uploadToBunny(file);
      setFormData((prev) => ({ ...prev, [fieldName]: url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.documentType || !formData.documentFront || !formData.selfie) {
      alert("Please complete all required fields");
      return;
    }
    if (requiresBack && !formData.documentBack) {
      alert("Please upload the back of your document");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = !!formData.documentType;
  const canProceedStep2 = !!formData.documentFront && (!requiresBack || !!formData.documentBack);
  const canProceedStep3 = !!formData.selfie;

  const steps = [
    { title: t.step1Title, desc: t.step1Desc, icon: CreditCard },
    { title: t.step2Title, desc: t.step2Desc, icon: FileCheck },
    { title: t.step3Title, desc: t.step3Desc, icon: Camera },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;
          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                    isActive && "border-primary bg-primary text-primary-foreground",
                    isCompleted && "border-green-500 bg-green-500 text-white",
                    !isActive && !isCompleted && "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <StepIcon className="h-6 w-6" />
                  )}
                </div>
                <span className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isActive && "text-primary",
                  isCompleted && "text-green-500",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-4",
                  isCompleted ? "bg-green-500" : "bg-muted-foreground/30"
                )} />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Document Type */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.step1Title}</CardTitle>
              <CardDescription>{t.step1Desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.documentType}</Label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value: DocumentType) =>
                    setFormData((prev) => ({ ...prev, documentType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.documentType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">{t.passport}</SelectItem>
                    <SelectItem value="national_id">{t.nationalId}</SelectItem>
                    <SelectItem value="drivers_license">{t.driversLicense}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.documentType && (
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <p className="text-sm text-muted-foreground">
                    {formData.documentType === "passport" ? t.passportNote : t.requiresBack}
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedStep1}
                >
                  {t.next}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Document Photos */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.step2Title}</CardTitle>
              <CardDescription>{t.step2Desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Front Side */}
              <div className="space-y-2">
                <Label>{t.frontSide}</Label>
                <ImageUploadBox
                  value={formData.documentFront}
                  onChange={(file) => handleFileUpload("documentFront", file)}
                  onRemove={() => setFormData((prev) => ({ ...prev, documentFront: "" }))}
                  isUploading={uploadingField === "documentFront"}
                  hint={t.uploadHint}
                  formats={t.uploadFormats}
                />
              </div>

              {/* Back Side (if required) */}
              {requiresBack && (
                <div className="space-y-2">
                  <Label>{t.backSide}</Label>
                  <ImageUploadBox
                    value={formData.documentBack}
                    onChange={(file) => handleFileUpload("documentBack", file)}
                    onRemove={() => setFormData((prev) => ({ ...prev, documentBack: "" }))}
                    isUploading={uploadingField === "documentBack"}
                    hint={t.uploadHint}
                    formats={t.uploadFormats}
                  />
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {t.back}
                </Button>
                <Button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedStep2}
                >
                  {t.next}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Selfie */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.selfieTitle}</CardTitle>
              <CardDescription>{t.selfieDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUploadBox
                value={formData.selfie}
                onChange={(file) => handleFileUpload("selfie", file)}
                onRemove={() => setFormData((prev) => ({ ...prev, selfie: "" }))}
                isUploading={uploadingField === "selfie"}
                hint={t.uploadHint}
                formats={t.uploadFormats}
                icon={<User className="h-10 w-10 text-muted-foreground" />}
                cameraOnly={true}
              />

              {/* Tips */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-blue-600 dark:text-blue-400 mb-2">{t.tips}</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• {t.tip1}</li>
                      <li>• {t.tip2}</li>
                      <li>• {t.tip3}</li>
                      <li>• {t.tip4}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {t.back}
                </Button>
                <Button
                  type="submit"
                  disabled={!canProceedStep3 || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      {t.submit}
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}

// Image Upload Box Component
interface ImageUploadBoxProps {
  value: string;
  onChange: (file: File) => void;
  onRemove: () => void;
  isUploading: boolean;
  hint: string;
  formats: string;
  icon?: React.ReactNode;
  cameraOnly?: boolean;
}

function ImageUploadBox({
  value,
  onChange,
  onRemove,
  isUploading,
  hint,
  formats,
  icon,
  cameraOnly = false,
}: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (cameraOnly) return; // Block drag-drop for camera-only mode
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onChange(file);
  };

  if (value) {
    return (
      <div className="relative group">
        <div className="aspect-video rounded-lg overflow-hidden bg-muted border-2 border-muted">
          <img
            src={value}
            alt="Uploaded document"
            className="w-full h-full object-contain"
          />
        </div>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        isUploading && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => !isUploading && inputRef.current?.click()}
      onDrop={(e) => { e.preventDefault(); if (!cameraOnly) handleDrop(e); }}
      onDragOver={(e) => { e.preventDefault(); if (!cameraOnly) setIsDragOver(true); }}
      onDragLeave={(e) => { e.preventDefault(); if (!cameraOnly) setIsDragOver(false); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        capture={cameraOnly ? "user" : undefined}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
        disabled={isUploading}
      />
      {isUploading ? (
        <Loader2 className="h-10 w-10 mx-auto mb-4 animate-spin text-primary" />
      ) : (
        icon || <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
      )}
      <p className="text-sm font-medium mb-1">{hint}</p>
      <p className="text-xs text-muted-foreground">{formats}</p>
    </div>
  );
}
