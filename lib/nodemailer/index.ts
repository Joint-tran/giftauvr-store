import nodemailer from "nodemailer";
import {
  WELCOME_EMAIL_TEMPLATE,
  APPROVAL_EMAIL_TEMPLATE,
  REJECTION_EMAIL_TEMPLATE,
} from "./templates";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});
export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro
  );

  const mailOptions = {
    from: `"Giftauvr" <giftauvr@gmail.com>`,
    to: email,
    subject: `Welcome to Giftauvr - your gift card marketplace is ready!`,
    text: "Thanks for joining Giftauvr",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendApprovalEmail = async ({
  email,
  name,
  accountType,
}: {
  email: string;
  name: string;
  accountType: string;
}) => {
  const htmlTemplate = APPROVAL_EMAIL_TEMPLATE.replace("{{name}}", name)
    .replace("{{accountType}}", accountType)
    .replace(/{{accountType}}/g, accountType);

  const mailOptions = {
    from: `"Giftauvr" <giftauvr@gmail.com>`,
    to: email,
    subject: `🎉 Your Giftauvr Account is Approved!`,
    text: `Your ${accountType} account has been approved.`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendRejectionEmail = async ({
  email,
  name,
  rejectionReason,
}: {
  email: string;
  name: string;
  rejectionReason?: string;
}) => {
  const htmlTemplate = REJECTION_EMAIL_TEMPLATE.replace(
    "{{name}}",
    name
  ).replace(
    "{{rejectionReason}}",
    rejectionReason || "No specific reason provided"
  );

  const mailOptions = {
    from: `"Giftauvr" <giftauvr@gmail.com>`,
    to: email,
    subject: `Account Application Update - Giftauvr`,
    text: `Your account application has been reviewed.`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
