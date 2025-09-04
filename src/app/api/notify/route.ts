import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { message, timestamp } = await request.json();

    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `${timestamp}:  **${message}** `,
        }),
    });

    return NextResponse.json({ ok: true });
}
