import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const astroKey = process.env.ASTRO_API_KEY;
  const hdKey = process.env.HUMAN_DESIGN_API_KEY;

  // Mode A: demo fallback if keys are not present
  if (!astroKey || !hdKey) {
    return NextResponse.json({
      mode: "demo",
      astrology: {
        sun: body?.sun || "Unknown",
        moon: body?.moon || "Unknown",
        rising: body?.rising || "Unknown",
        note:
          "Connect ASTRO_API_KEY to calculate a true birth chart. Demo mode is active.",
      },
      humanDesign: {
        type: "Projector (demo)",
        authority: "Self-Projected (demo)",
        profile: "4/1 (demo)",
        note:
          "Connect HUMAN_DESIGN_API_KEY to calculate your Human Design chart. Demo mode is active.",
      },
    });
  }

  // Real mode placeholder (for future provider integration)
  return NextResponse.json({
    mode: "real",
    message:
      "Calculation keys detected. Hook your astrology and Human Design providers here.",
  });
}
