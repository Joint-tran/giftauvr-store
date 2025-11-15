"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ACCOUNT_TYPE, CRYPTO_NETWORKS } from "@/lib/constants";
import { signUpWithEmail } from "@/lib/actions/auth.actions";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      accountType: "seller",
      usdtWallet: "",
      network: "",
    },
    mode: "onBlur",
  });

  // Watch account type to conditionally show seller fields
  const accountType = watch("accountType");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUpWithEmail(data);
      if (result.success) router.push("/");
    } catch (e) {
      console.error(e);
      toast.error("Sign up failed", {
        description:
          e instanceof Error ? e.message : "Failed to create an account.",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />

        <InputField
          name="email"
          label="Email"
          placeholder="contact@jsmastery.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email name is required",
            pattern: /^\w+@\w+\.\w+$/,
            message: "Email address is required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <div className="space-y-2">
          <SelectField
            name="accountType"
            label="Account Type"
            placeholder="Select account type"
            options={ACCOUNT_TYPE.filter((type) => type.value !== "buyer")}
            control={control}
            error={errors.accountType}
            required
          />
          <p className="text-xs text-muted-foreground">
            Note: Buyer accounts are currently disabled. Only seller accounts
            can be created.
          </p>
        </div>

        {/* Conditional fields for Seller account */}
        {accountType === "seller" && (
          <>
            <InputField
              name="usdtWallet"
              label="USDT Wallet Address"
              placeholder="Enter your USDT wallet address"
              register={register}
              error={errors.usdtWallet}
              validation={{
                required: "USDT wallet address is required for sellers",
                minLength: {
                  value: 26,
                  message: "Wallet address must be at least 26 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Invalid wallet address format",
                },
              }}
            />

            <SelectField
              name="network"
              label="Network"
              placeholder="Select blockchain network"
              options={CRYPTO_NETWORKS}
              control={control}
              error={errors.network}
              required
            />

            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm">
              <p className="font-semibold text-red-500 mb-2">
                🔒 Important Security Notice
              </p>
              <p className="text-muted-foreground">
                <strong className="text-red-400">
                  Your wallet address and network cannot be changed once set.
                </strong>{" "}
                Please double-check before submitting.
              </p>
            </div>

            <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm">
              <p className="font-semibold text-yellow-500 mb-2">
                ⚠️ Deposit Required
              </p>
              <p className="text-muted-foreground">
                Sellers must deposit{" "}
                <span className="font-bold text-white">$300 USDT</span> to
                activate their account. After registration, admin will review
                and approve your account.
              </p>
              <p className="text-muted-foreground mt-2 text-xs">
                Note: You will receive instructions for the deposit after your
                initial registration is reviewed.
              </p>
            </div>
          </>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Create"}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
};
export default SignUp;
