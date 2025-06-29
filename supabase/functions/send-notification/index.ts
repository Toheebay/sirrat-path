
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "receipt" | "ticket";
  userEmail: string;
  userName: string;
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, userEmail, userName, data }: NotificationRequest = await req.json();

    let subject = "";
    let htmlContent = "";

    if (type === "receipt") {
      subject = `New Payment Receipt Uploaded - ${userName}`;
      htmlContent = `
        <h2>New Payment Receipt Uploaded</h2>
        <p><strong>User:</strong> ${userName} (${userEmail})</p>
        <p><strong>Amount:</strong> ₦${data.amount}</p>
        <p><strong>Payment Date:</strong> ${data.paymentDate}</p>
        <p><strong>Reference Number:</strong> ${data.referenceNumber || 'N/A'}</p>
        <p><strong>Notes:</strong> ${data.notes || 'None'}</p>
        ${data.receiptUrl ? `<p><strong>Receipt:</strong> <a href="${data.receiptUrl}">View Receipt</a></p>` : ''}
        <p><em>Please review and verify this payment in your admin dashboard.</em></p>
      `;
    } else if (type === "ticket") {
      subject = `New Support Ticket - ${data.subject}`;
      htmlContent = `
        <h2>New Support Ticket Submitted</h2>
        <p><strong>User:</strong> ${userName} (${userEmail})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Priority:</strong> ${data.priority}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${data.message}
        </div>
        <p><em>Please respond to this ticket in your admin dashboard.</em></p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Hajj Platform <noreply@resend.dev>",
      to: ["adebayoajani23@toheebay.online"],
      subject: subject,
      html: htmlContent,
    });

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
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
