import type { Get, UniversalHandler } from "@universal-middleware/core";

interface WebhookResponse {
  message: string;
  event?: string;
}

export const webhookHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    // In a real implementation, you would process the webhook payload here
    // For this example, we'll just simulate a successful webhook processing
    
    const webhookPayload = await request.json();
    
    // Simulating webhook processing
    const event = webhookPayload.event || 'unknown';

    return new Response(JSON.stringify({ 
      message: "Webhook processed successfully",
      event 
    }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };