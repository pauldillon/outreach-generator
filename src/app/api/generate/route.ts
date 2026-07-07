import { NextResponse } from "next/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "anthropic/claude-sonnet-4";

type GenerateRequest = {
  prospect_name?: string;
  company?: string;
  role?: string;
  offer?: string;
  pain_point?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing OPENROUTER_API_KEY." },
      { status: 500 }
    );
  }

  let body: GenerateRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const prospect_name = body.prospect_name?.trim();
  const company = body.company?.trim();
  const role = body.role?.trim();
  const offer = body.offer?.trim();
  const pain_point = body.pain_point?.trim();

  if (!prospect_name || !company || !role || !offer || !pain_point) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const systemPrompt =
    "You are an expert B2B copywriter. Always respond with valid JSON only, no markdown.";

  const userPrompt = `Write two pieces of outreach copy for the following context:

Prospect: ${prospect_name} -- ${role} at ${company}
What we offer: ${offer}
Their likely pain point: ${pain_point}

Output:
1. A cold email with a subject line. Keep it under 150 words. Conversational, not salesy. End with one clear CTA.
2. A LinkedIn connection message. Under 300 characters. Warm, human, specific.

Format your response as JSON:
{
  "email_subject": "",
  "email_body": "",
  "linkedin_message": ""
}`;

  let openRouterResponse: Response;
  try {
    openRouterResponse = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the AI service. Please try again." },
      { status: 502 }
    );
  }

  if (!openRouterResponse.ok) {
    const detail = await openRouterResponse.text().catch(() => "");
    console.error("OpenRouter error:", openRouterResponse.status, detail);
    return NextResponse.json(
      { error: "The AI service returned an error. Please try again." },
      { status: 502 }
    );
  }

  const completion = await openRouterResponse.json().catch(() => null);
  const content: string | undefined =
    completion?.choices?.[0]?.message?.content;

  if (!content) {
    return NextResponse.json(
      { error: "The AI returned an empty response. Please try again." },
      { status: 500 }
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    console.error("Failed to parse AI content as JSON:", content);
    return NextResponse.json(
      { error: "The AI response was not valid JSON. Please regenerate." },
      { status: 500 }
    );
  }

  const result = parsed as {
    email_subject?: string;
    email_body?: string;
    linkedin_message?: string;
  };

  if (
    !result.email_subject ||
    !result.email_body ||
    !result.linkedin_message
  ) {
    return NextResponse.json(
      { error: "The AI response was missing expected fields. Please regenerate." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    email_subject: result.email_subject,
    email_body: result.email_body,
    linkedin_message: result.linkedin_message,
  });
}
