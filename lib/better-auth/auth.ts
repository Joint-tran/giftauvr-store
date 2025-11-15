import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) throw new Error("MongoDB connection not found");

  authInstance = betterAuth({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    database: mongodbAdapter(db as any),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    user: {
      additionalFields: {
        fullName: {
          type: "string",
          required: true,
        },
        country: {
          type: "string",
          required: false,
          defaultValue: "US",
        },
        accountType: {
          type: "string",
          required: true,
        },
        network: {
          type: "string",
          required: false,
        },
        usdtWallet: {
          type: "string",
          required: false,
        },
        approvalStatus: {
          type: "string",
          required: false,
          defaultValue: "pending",
        },
        balance: {
          type: "number",
          required: false,
          defaultValue: 0,
        },
        depositAmount: {
          type: "number",
          required: false,
          defaultValue: 0,
        },
        depositTransactionHash: {
          type: "string",
          required: false,
        },
      },
    },
    plugins: [nextCookies()],
  });

  return authInstance;
};

export const auth = await getAuth();
export type Session = typeof auth.$Infer.Session;
