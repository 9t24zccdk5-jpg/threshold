export const SHADOW_PROMPTS = [
  { id: "b1", level: "beginner", text: "Where are you saying yes when your body is whispering no?" },
  { id: "b2", level: "beginner", text: "What feeling are you avoiding by staying busy?" },
  { id: "b3", level: "beginner", text: "What do you need to hear today that you keep waiting for someone else to say?" },

  { id: "i1", level: "intermediate", text: "Name a trigger. What old vow does it touch?" },
  { id: "i2", level: "intermediate", text: "Where do you confuse control with safety?" },
  { id: "i3", level: "intermediate", text: "What identity are you protecting by staying stuck?" },

  { id: "a1", level: "advanced", text: "What part of you feels exiled—and what would it require to return?" },
  { id: "a2", level: "advanced", text: "Where do you outsource your authority, then punish yourself for it?" },
  { id: "a3", level: "advanced", text: "What desire have you moralized against so you don’t have to risk wanting it?" }
] as const;

export function promptForDate(
  dateISO: string,
  level: "beginner" | "intermediate" | "advanced"
) {
  const list = SHADOW_PROMPTS.filter(p => p.level === level);
  const seed = Array.from(dateISO).reduce((a, c) => a + c.charCodeAt(0), 0);
  return list[seed % list.length];
}
