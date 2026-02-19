'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating AI-powered stock reorder suggestions.
 *
 * - aiStockReorderSuggestions - A function that triggers the AI to suggest optimal reorder quantities.
 * - AiStockReorderSuggestionsInput - The input type for the aiStockReorderSuggestions function.
 * - AiStockReorderSuggestionsOutput - The return type for the aiStockReorderSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AiStockReorderSuggestionsInputSchema = z.object({
  productId: z.string().describe('The unique identifier of the product.'),
  productName: z.string().describe('The name of the product.'),
  currentStock: z.number().int().min(0).describe('The current stock level of the product.'),
  reorderThreshold: z.number().int().min(0).describe('The stock level at which a reorder should be triggered.'),
  salesHistory: z.array(
    z.object({
      date: z.string().describe('The date of the sale in YYYY-MM-DD format.'),
      quantitySold: z.number().int().min(1).describe('The quantity of the product sold on that date.').optional(),
    })
  ).describe('A list of historical sales data for the product.'),
  category: z.string().optional().describe('The category of the product, e.g., "Parapharmacie", "Compléments".'),
});
export type AiStockReorderSuggestionsInput = z.infer<typeof AiStockReorderSuggestionsInputSchema>;

// Output Schema
const AiStockReorderSuggestionsOutputSchema = z.object({
  isLowStock: z.boolean().describe('True if the current stock is below the reorder threshold, otherwise false.'),
  reorderQuantity: z.number().int().min(0).describe('The suggested quantity to reorder for the product.'),
  reasoning: z.string().describe('A detailed explanation for the suggested reorder quantity, considering sales history and stock levels.'),
  isBestSeller: z.boolean().describe('True if this product shows high sales volume or consistent demand based on its sales history, indicating it is a best-selling product.'),
  averageDailySalesLast30Days: z.number().optional().describe('The calculated average daily sales for this product over the last 30 days, if sales history for that period is available. If not, return null.'),
});
export type AiStockReorderSuggestionsOutput = z.infer<typeof AiStockReorderSuggestionsOutputSchema>;

export async function aiStockReorderSuggestions(
  input: AiStockReorderSuggestionsInput
): Promise<AiStockReorderSuggestionsOutput> {
  return aiStockReorderSuggestionsFlow(input);
}

const aiStockReorderSuggestionsPrompt = ai.definePrompt({
  name: 'aiStockReorderSuggestionsPrompt',
  input: { schema: AiStockReorderSuggestionsInputSchema },
  output: { schema: AiStockReorderSuggestionsOutputSchema },
  prompt: `You are an expert inventory manager for a pharmacy. Your task is to analyze product stock and sales data to recommend an optimal reorder quantity, provide a clear reasoning, and identify if the product is a best-seller based on its sales history.

Product Name: {{{productName}}}
Current Stock: {{{currentStock}}}
Reorder Threshold: {{{reorderThreshold}}}
{{#if category}}
Category: {{{category}}}
{{/if}}

Sales History (Date, Quantity Sold):
{{#each salesHistory}}
- {{{this.date}}}: {{{this.quantitySold}}} units
{{/each}}

Based on the provided information, perform the following:
1.  Determine if the product is in low stock (current stock < reorder threshold).
2.  If in low stock, suggest an optimal reorder quantity, considering the sales history to avoid stockouts while minimizing overstocking. If not in low stock, suggest a reorder quantity of 0.
3.  Calculate the average daily sales for this product over the last 30 days based on the provided sales history. If less than 30 days of sales history is provided, calculate the average over the available days. If no sales history is provided or is insufficient, return null for averageDailySalesLast30Days.
4.  Determine if the product is a 'best-seller'. A best-seller is a product that consistently shows high sales volume or significant demand compared to typical product movement in a pharmacy setting. Use the provided sales history to make this determination.
5.  Provide a detailed reasoning for your reorder suggestion, your determination of low stock, and your best-seller assessment.

Your response MUST be a JSON object conforming to the following structure:
{{jsonSchema OutputSchema}}`,
});

const aiStockReorderSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiStockReorderSuggestionsFlow',
    inputSchema: AiStockReorderSuggestionsInputSchema,
    outputSchema: AiStockReorderSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await aiStockReorderSuggestionsPrompt(input);
    return output!;
  }
);
