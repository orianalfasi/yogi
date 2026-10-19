type CorePose = {
  id: "mountain" | "warrior-ii" | "tree";
  name: string;
};

type BonusPose = {
  id: "chair";
  name: string;
  bonus: true;
};

export type PoseMeta = CorePose | BonusPose;

export const poses = [
  { id: "mountain", name: "Mountain" },
  { id: "warrior-ii", name: "Warrior II" },
  { id: "tree", name: "Tree" },
  { id: "chair", name: "Chair", bonus: true },
] as const satisfies readonly PoseMeta[];

export const sequence = ["mountain", "warrior-ii", "tree"] as const;

type PoseId = (typeof poses)[number]["id"];

type Flow = {
  name: string;
  description: string;
  poses: readonly PoseId[];
};

export const flows: readonly Flow[] = [
  {
    name: "Steady",
    description: "A calm standing flow.",
    poses: sequence,
  },
  {
    name: "Morning Glow",
    description: "Wake up your body with gentle movement.",
    poses: [],
  },
  {
    name: "Slow & Soft",
    description: "Slow down, stretch, and release tension.",
    poses: [],
  },
  {
    name: "Find Your Balance",
    description: "Build stability, focus, and confidence.",
    poses: [],
  },
  {
    name: "Evening Reset",
    description: "Unwind and relax at the end of your day.",
    poses: [],
  },
];
