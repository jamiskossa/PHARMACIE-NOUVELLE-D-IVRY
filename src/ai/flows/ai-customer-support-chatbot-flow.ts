'use server';
/**
 * @fileOverview A Genkit flow for an AI customer support chatbot for "Pharmacie Nouvelle d'Ivry".
 * This flow handles customer queries, provides information, product recommendations, and identifies when a query requires human pharmacist intervention.
 *
 * - aiCustomerSupportChatbot - A function that handles customer queries and provides responses.
 * - AiCustomerSupportChatbotInput - The input type for the aiCustomerSupportChatbot function.
 * - AiCustomerSupportChatbotOutput - The return type for the aiCustomerSupportChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCustomerSupportChatbotInputSchema = z.object({
  customerQuery: z.string().describe('The customer\'s question or message.'),
});
export type AiCustomerSupportChatbotInput = z.infer<typeof AiCustomerSupportChatbotInputSchema>;

const AiCustomerSupportChatbotOutputSchema = z.object({
  responseText: z.string().describe('The AI chatbot\'s response to the customer query.'),
  productRecommendations: z.array(z.string()).optional().describe('A list of specific product names recommended by the chatbot, if any. Only include product names if they are relevant and generally safe based on the query.'),
  escalateToPharmacist: z.boolean().describe('True if the query requires escalation to a human pharmacist for medical advice, complex health issues, or questions that the AI cannot handle safely or accurately. This should be true for any query that could be interpreted as asking for medical diagnosis, treatment, or specific drug interactions.'),
});
export type AiCustomerSupportChatbotOutput = z.infer<typeof AiCustomerSupportChatbotOutputSchema>;

export async function aiCustomerSupportChatbot(input: AiCustomerSupportChatbotInput): Promise<AiCustomerSupportChatbotOutput> {
  return aiCustomerSupportChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerSupportChatbotPrompt',
  input: {schema: AiCustomerSupportChatbotInputSchema},
  output: {schema: AiCustomerSupportChatbotOutputSchema},
  prompt: `You are an AI customer support chatbot for "Pharmacie Nouvelle d'Ivry".
Your primary goal is to provide instant, helpful, and accurate answers to customer questions about products, services, store hours, shipping, and general pharmacy information.
You can also suggest relevant product recommendations based on the customer's query when appropriate.

IMPORTANT GUIDELINES:
1.  **Safety First**: You are an AI and **cannot provide medical advice, diagnoses, or treatment recommendations**. You must never replace a human pharmacist for regulated medical judgment.
2.  **Escalation**: If a customer's query involves personal medical conditions, symptoms, drug interactions, requires professional medical judgment, or is outside your scope as an AI, you MUST set the 'escalateToPharmacist' output field to 'true'.
3.  **Tone**: Always maintain a friendly, reassuring, professional, and helpful tone.
4.  **Product Recommendations**: If recommending products, only suggest specific product names if you are confident they are relevant and generally safe (e.g., "For dry skin, you might consider moisturizing creams like Product X or Product Y."). Otherwise, offer general advice (e.g., "We have a range of moisturizing creams suitable for dry skin.").
5.  **Information Source**: Base your answers on general knowledge about pharmacy operations and products, but avoid making claims that require specific, real-time inventory checks or detailed medical expertise.

Customer Query: {{{customerQuery}}}`
});

const aiCustomerSupportChatbotFlow = ai.defineFlow(
  {
    name: 'aiCustomerSupportChatbotFlow',
    inputSchema: AiCustomerSupportChatbotInputSchema,
    outputSchema: AiCustomerSupportChatbotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
