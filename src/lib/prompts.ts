export type PracticeLevel = "beginner" | "intermediate" | "advanced";
export type Interest =
  | "shadow"
  | "tarot"
  | "rituals"
  | "astrology"
  | "human_design"
  | "protection";

type Prompt = {
  id: string;
  level: PracticeLevel;
  tags: Interest[]; // used to tailor by interests
  text: string;
};

export const SHADOW_PROMPTS: Prompt[] = [
  // BEGINNER (gentle, warm, grounding)
  { id: "b01", level: "beginner", tags: ["shadow"], text: "Where are you saying yes while your body is whispering no?" },
  { id: "b02", level: "beginner", tags: ["shadow"], text: "What feeling have you been avoiding by staying busy?" },
  { id: "b03", level: "beginner", tags: ["shadow"], text: "What do you need to hear today that you keep waiting for someone else to say?" },
  { id: "b04", level: "beginner", tags: ["shadow"], text: "What is one boundary you could set that would immediately bring relief?" },
  { id: "b05", level: "beginner", tags: ["shadow"], text: "What part of you is craving rest—but doesn’t feel allowed to?" },
  { id: "b06", level: "beginner", tags: ["shadow"], text: "Where do you shrink to keep the peace?" },
  { id: "b07", level: "beginner", tags: ["shadow"], text: "What’s the smallest truth you can admit right now?" },
  { id: "b08", level: "beginner", tags: ["shadow"], text: "What are you afraid would happen if you asked for what you want?" },
  { id: "b09", level: "beginner", tags: ["shadow"], text: "Name a trigger from today. What did it protect you from feeling?" },
  { id: "b10", level: "beginner", tags: ["shadow"], text: "Where do you confuse being needed with being loved?" },

  // INTERMEDIATE (pattern recognition, vows, inner parts)
  { id: "i01", level: "intermediate", tags: ["shadow"], text: "Name a trigger. What old vow does it touch?" },
  { id: "i02", level: "intermediate", tags: ["shadow"], text: "Where do you confuse control with safety?" },
  { id: "i03", level: "intermediate", tags: ["shadow"], text: "What identity are you protecting by staying stuck?" },
  { id: "i04", level: "intermediate", tags: ["shadow"], text: "What story do you tell that keeps you from grieving what you lost?" },
  { id: "i05", level: "intermediate", tags: ["shadow"], text: "Where do you perform strength so you don’t have to ask for help?" },
  { id: "i06", level: "intermediate", tags: ["shadow"], text: "What do you judge in others that you secretly fear in yourself?" },
  { id: "i07", level: "intermediate", tags: ["shadow"], text: "What do you gain by staying in the pattern you say you want to leave?" },
  { id: "i08", level: "intermediate", tags: ["shadow"], text: "Where are you loyal to a version of you that no longer exists?" },
  { id: "i09", level: "intermediate", tags: ["shadow"], text: "What part of you shows up when you feel ignored? What does it want?" },
  { id: "i10", level: "intermediate", tags: ["shadow"], text: "If your anger could speak without punishment, what would it say?" },

  // ADVANCED (deep shadow, power, intimacy with truth)
  { id: "a01", level: "advanced", tags: ["shadow"], text: "What part of you feels exiled—and what would it require to return?" },
  { id: "a02", level: "advanced", tags: ["shadow"], text: "Where do you outsource your authority, then punish yourself for it?" },
  { id: "a03", level: "advanced", tags: ["shadow"], text: "What desire have you moralized against so you don’t have to risk wanting it?" },
  { id: "a04", level: "advanced", tags: ["shadow"], text: "What role do you play to avoid being fully known? What would happen if you stopped?" },
  { id: "a05", level: "advanced", tags: ["shadow"], text: "Where does your self-image require you to stay unhealed?" },
  { id: "a06", level: "advanced", tags: ["shadow"], text: "What is the most honest sentence you could write about your fear?" },
  { id: "a07", level: "advanced", tags: ["shadow"], text: "Where do you use spirituality to bypass grief, rage, or need?" },
  { id: "a08", level: "advanced", tags: ["shadow"], text: "What are you still trying to earn that you should have been given freely?" },
  { id: "a09", level: "advanced", tags: ["shadow"], text: "What intimacy are you avoiding by staying “fine”?" },
  { id: "a10", level: "advanced", tags: ["shadow"], text: "If you stopped performing “good,” what truth would finally surface?" },

  // Cross-tagged prompts (so interests matter)
  { id: "t01", level: "beginner", tags: ["tarot", "shadow"], text: "If a card could name your current lesson, what would it be—and why does that word sting?" },
  { id: "t02", level: "intermediate", tags: ["tarot", "shadow"], text: "What archetype do you avoid embodying because it would change how people treat you?" },
  { id: "r01", level: "beginner", tags: ["rituals", "protection", "shadow"], text: "What energy are you trying to protect yourself from—and what boundary would do it better?" },
  { id: "r02", level: "intermediate", tags: ["rituals", "shadow"], text: "What ritual do you repeat that is really a way of bargaining with fear?" },
  { id: "a11", level: "advanced", tags: ["astrology", "shadow"], text: "Where are your instincts (Moon) and your image (Rising) in conflict—and what truth does your Sun demand?" },
  { id: "h01", level: "intermediate", tags: ["human_design", "shadow"], text: "Where are you acting from the mind instead of your authority? What does it cost you?" },
];

function hashSeed(seed: string) {
  return Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
}

/**
 * Picks a daily prompt based on date + level, and biases toward user interests when provided.
 */
export function promptForDate(
  dateISO: string,
  level: PracticeLevel,
  interests: Interest[] = ["shadow"]
) {
  const pool = SHADOW_PROMPTS.filter((p) => p.level === level);

  const interestPool = pool.filter((p) => p.tags.some((t) => interests.includes(t)));
  const useInterestPool = interestPool.length >= 5;

  const list = useInterestPool ? interestPool : pool;

  const seed = hashSeed(dateISO + ":" + level + ":" + interests.join(","));
  return list[seed % list.length];
}
