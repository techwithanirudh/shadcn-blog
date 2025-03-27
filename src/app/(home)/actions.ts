"use server"; 

import { actionClient, ActionError } from "@/lib/safe-action";
import { NewsletterSchema } from "@/lib/validators";

export const subscribeUser = actionClient
    .schema(NewsletterSchema)
    .action(async ({ parsedInput: { email } }) => {
        if (email === "hello@techwithanirudh.com") {
            console.log(email)
            return {
                success: "Successfully logged in",
            };
        }

        throw new ActionError("Failed to log in");
    });

    