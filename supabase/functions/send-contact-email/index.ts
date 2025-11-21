import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Simple spam detection
function detectSpam(data: ContactEmailRequest): boolean {
  const { name, email, message } = data;
  
  // Check for suspicious patterns
  const spamPatterns = [
    /viagra|cialis|casino|lottery|winner/i,
    /click here|free money|act now/i,
    /http[s]?:\/\//g, // Multiple URLs in message
  ];
  
  // Check message for spam patterns
  for (const pattern of spamPatterns) {
    if (pattern.test(message) || pattern.test(name)) {
      return true;
    }
  }
  
  // Check for excessive URLs (more than 2)
  const urlCount = (message.match(/http[s]?:\/\//g) || []).length;
  if (urlCount > 2) {
    return true;
  }
  
  // Check for very short messages (likely spam)
  if (message.trim().length < 5) {
    return true;
  }
  
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ContactEmailRequest = await req.json();
    const { name, email, company, message } = requestData;

    console.log("Received contact form submission from:", email);

    // Spam detection
    if (detectSpam(requestData)) {
      console.log("Spam detected from:", email);
      return new Response(
        JSON.stringify({ error: "Spam detected" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Send email using Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Moodfotografie <business@moodfotografie.de>',
        to: 'business@moodfotografie.de',
        subject: `Neue Anfrage von ${name}${company ? ` (${company})` : ''}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          ${company ? `<p><strong>Firma:</strong> ${company}</p>` : ''}
          <p><strong>Nachricht:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
