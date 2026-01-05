type Card = {
  name: string;
  light: string;
  shadow: string;
  guidance: string;
};

export const TAROT: Card[] = [
  {
    name: "The Fool",
    light: "A fresh threshold. A brave beginning.",
    shadow: "Escaping consequences by calling it freedom.",
    guidance: "Leap, but bring your awareness with you."
  },
  {
    name: "The High Priestess",
    light: "Your inner knowing is quiet but precise.",
    shadow: "Withholding yourself to avoid being seen.",
    guidance: "Listen before you speak."
  },
  {
    name: "Death",
    light: "Release creates power.",
    shadow: "Clinging to what has already ended.",
    guidance: "Name what is complete."
  }
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
  three_card_classic: ["Past", "Present", "Outcome"]
};

export function draw(seed: string, spread: Spread) {
  const labels = LABELS[spread];
  const s = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);

  return labels.map((label, i) => {
    const card = TAROT[(s + i * 7) % TAROT.length];
    return {
      label,
      name: card.name,
      guidance: card.guidance
    };
  });
}
