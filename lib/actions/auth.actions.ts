"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";

export const signUpWithEmail = async ({
  email,
  password,
  accountType,
  fullName,
  country,
  network,
  usdtWallet,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
        country,
        fullName,
        accountType,
        network,
        usdtWallet,
        approvalStatus: "pending",
        balance: 0,
      } as any,
    });

    return { success: true, data: response };
  } catch (error) {
    console.log("Sign up failed", error);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({ body: { email, password } });

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign in failed", e);
    return { success: false, error: "Sign in failed" };
  }
};
export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};
