import {
  sendWelcomeEmail,
  sendApprovalEmail,
  sendRejectionEmail,
} from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignUpEmail = inngest.createFunction(
  {
    id: "sign-up-email",
  },
  {
    event: "app/user.created",
  },
  async ({ event, step }) => {
    const userProfile = `
    - Country: ${event.data.country}
    - Account Type: ${event.data.accountType}
    - Network: ${event.data.network}
    `;
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });
    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining Giftauvr! You now have the marketplace at your fingertips.";
      const {
        data: { email, name },
      } = event;

      return await sendWelcomeEmail({
        email,
        name,
        intro: introText,
      });
    });

    return {
      success: true,
      message: "Welcome email sent successfully",
    };
  }
);

export const sendUserApprovalEmail = inngest.createFunction(
  {
    id: "user-approval-email",
  },
  {
    event: "app/user.approved",
  },
  async ({ event, step }) => {
    await step.run("send-approval-email", async () => {
      const { email, name, accountType } = event.data;

      return await sendApprovalEmail({
        email,
        name,
        accountType,
      });
    });

    return {
      success: true,
      message: "Approval email sent successfully",
    };
  }
);

export const sendUserRejectionEmail = inngest.createFunction(
  {
    id: "user-rejection-email",
  },
  {
    event: "app/user.rejected",
  },
  async ({ event, step }) => {
    await step.run("send-rejection-email", async () => {
      const { email, name, rejectionReason } = event.data;

      return await sendRejectionEmail({
        email,
        name,
        rejectionReason,
      });
    });

    return {
      success: true,
      message: "Rejection email sent successfully",
    };
  }
);
