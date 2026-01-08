export type Card = {
  name: string;
  labels: {
    light: string[];
    shadow: string[];
  };
  guidance: string;
};

export const TAROT: Card[] = [
  {
    name: "The Fool",
    labels: {
      light: ["beginning", "faith", "freedom"],
      shadow: ["recklessness", "avoidance", "naivety"],
    },
    guidance: "Step forward—just keep one hand on your awareness.",
  },
  {
    name: "The Magician",
    labels: {
      light: ["manifestation", "skill", "focus"],
      shadow: ["manipulation", "scattered energy", "ego"],
    },
    guidance: "Use what you have. Choose one channel and commit.",
  },
  {
    name: "The High Priestess",
    labels: {
      light: ["intuition", "inner knowing", "mystery"],
      shadow: ["secrecy", "disconnection", "self-doubt"],
    },
    guidance: "Listen first. Your quiet yes is still a yes.",
  },
  {
    name: "The Empress",
    labels: {
      light: ["nurture", "abundance", "creation"],
      shadow: ["overgiving", "smothering", "comfort-traps"],
    },
    guidance: "Feed what feeds you back. Let it be reciprocal.",
  },
  {
    name: "The Emperor",
    labels: {
      light: ["structure", "boundaries", "stability"],
      shadow: ["control", "rigidity", "fear of chaos"],
    },
    guidance: "Build the container—then soften inside it.",
  },
  {
    name: "The Hierophant",
    labels: {
      light: ["tradition", "learning", "initiation"],
      shadow: ["dogma", "obedience", "shame"],
    },
    guidance: "Take what’s true. Release what keeps you small.",
  },
  {
    name: "The Lovers",
    labels: {
      light: ["alignment", "choice", "union"],
      shadow: ["indecision", "people-pleasing", "split desire"],
    },
    guidance: "Choose from your values, not your fear of loss.",
  },
  {
    name: "The Chariot",
    labels: {
      light: ["momentum", "willpower", "victory"],
      shadow: ["force", "burnout", "proving"],
    },
    guidance: "Win without wounding yourself. Drive with devotion.",
  },
  {
    name: "Strength",
    labels: {
      light: ["courage", "gentle power", "heart"],
      shadow: ["suppression", "rage", "self-betrayal"],
    },
    guidance: "Tame nothing. Befriend it. Lead with tenderness.",
  },
  {
    name: "The Hermit",
    labels: {
      light: ["reflection", "wisdom", "solitude"],
      shadow: ["isolation", "avoidance", "shutting down"],
    },
    guidance: "Step back to hear yourself clearly—then return.",
  },
  {
    name: "Wheel of Fortune",
    labels: {
      light: ["cycles", "change", "timing"],
      shadow: ["resistance", "victim story", "gambling"],
    },
    guidance: "What’s turning is not punishing you. It’s moving you.",
  },
  {
    name: "Justice",
    labels: {
      light: ["truth", "balance", "accountability"],
      shadow: ["harshness", "self-judgment", "avoidance of consequence"],
    },
    guidance: "Be honest—then be fair. Especially with yourself.",
  },
  {
    name: "The Hanged Man",
    labels: {
      light: ["surrender", "new perspective", "pause"],
      shadow: ["stagnation", "martyrdom", "waiting"],
    },
    guidance: "Stop forcing answers. Let the view change you.",
  },
  {
    name: "Death",
    labels: {
      light: ["release", "rebirth", "completion"],
      shadow: ["clinging", "fear of change", "grief avoidance"],
    },
    guidance: "Name what’s over. The truth will free your hands.",
  },
  {
    name: "Temperance",
    labels: {
      light: ["alchemy", "moderation", "integration"],
      shadow: ["extremes", "impatience", "imbalance"],
    },
    guidance: "Small adjustments become sacred transformation.",
  },
  {
    name: "The Devil",
    labels: {
      light: ["desire", "shadow truth", "power"],
      shadow: ["attachment", "compulsion", "shame"],
    },
    guidance: "Ask: what am I getting from this—and what does it cost?",
  },
  {
    name: "The Tower",
    labels: {
      light: ["revelation", "liberation", "truth"],
      shadow: ["collapse fear", "resistance", "denial"],
    },
    guidance: "If it falls, it was never safe. Let truth rebuild you.",
  },
  {
    name: "The Star",
    labels: {
      light: ["hope", "healing", "guidance"],
      shadow: ["discouragement", "numbness", "lost faith"],
    },
    guidance: "Keep the thread. Even faint light is still light.",
  },
  {
    name: "The Moon",
    labels: {
      light: ["dreams", "intuition", "depth"],
      shadow: ["illusion", "anxiety", "projection"],
    },
    guidance: "Not everything you feel is a prophecy. Breathe and verify.",
  },
  {
    name: "The Sun",
    labels: {
      light: ["joy", "clarity", "vitality"],
      shadow: ["ego glare", "avoidance of nuance", "performing happiness"],
    },
    guidance: "Let yourself be seen without turning it into a show.",
  },
  {
    name: "Judgement",
    labels: {
      light: ["awakening", "calling", "reckoning"],
      shadow: ["fear of change", "self-condemnation", "stuck identity"],
    },
    guidance: "Answer the call. You don’t have to be who you were.",
  },
  {
    name: "The World",
    labels: {
      light: ["completion", "wholeness", "arrival"],
      shadow: ["unfinished loops", "fear of ending", "restlessness"],
    },
    guidance: "Close the circle. Celebrate, then begin again wiser.",
  },
];

export type Spread =
  | "daily"
  | "one_card"
  | "three_card"
  | "three_card_classic";

const LABELS: Record<Spread, string[]> = {
  daily: ["Today"],
  one_card: ["Your Message"],
  three_card: ["Mind", "Body", "Spirit"],
  three_card_classic: ["Past", "Present", "Outcome"],
};

function hashSeed(seed: string) {
  return Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
}

// deterministic-ish draw without repeats within a spread
export function draw(seed: string, spread: Spread) {
  const labels = LABELS[spread];
  const base = hashSeed(seed);
  const used = new Set<number>();

  return labels.map((label, i) => {
    let idx = (base + i * 7 + i * i * 3) % TAROT.length;
    while (used.has(idx)) idx = (idx + 1) % TAROT.length;
    used.add(idx);

    const card = TAROT[idx];
    return {
      label,
      name: card.name,
      meaningLabels: card.labels,
      guidance: card.guidance,
    };
  });
}
