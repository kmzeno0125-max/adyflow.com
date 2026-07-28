const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/p9HVIy80i8mv3sNYEsxL/webhook-trigger/4d4e9001-a35d-46be-a094-918b123147dd";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, phone, company_type, message } = await req.json();

    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        company_type: company_type ?? "",
        message: message ?? "",
        source: "adyflow.hu kapcsolatfelvételi űrlap",
        submitted_at: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      const text = await webhookResponse.text();
      return new Response(
        JSON.stringify({ error: `Webhook responded with ${webhookResponse.status}`, detail: text }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
