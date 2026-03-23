export type ToolItem = {
  slug: string;
  name: string;
  status: "public" | "private" | "beta";
  summary: string;
  usage: string;
  stack: string[];
  link?: string;
};

export const tools: ToolItem[] = [
  {
    slug: "prompt-polisher",
    name: "Prompt Polisher",
    status: "public",
    summary: "Cleans rough prompts into structured, reusable prompt templates.",
    usage:
      "Paste your raw prompt, choose tone + output format, then copy polished prompt in one click.",
    stack: ["Next.js", "TypeScript", "Tailwind", "OpenAI API"],
    link: "#",
  },
  {
    slug: "weekly-focus-board",
    name: "Weekly Focus Board",
    status: "beta",
    summary: "Turns scattered tasks into a weekly board with realistic load planning.",
    usage:
      "Import your task list, set available hours, and auto-generate a manageable weekly plan.",
    stack: ["React", "Supabase", "PostgreSQL"],
    link: "#",
  },
  {
    slug: "reading-highlight-sync",
    name: "Reading Highlight Sync",
    status: "private",
    summary: "Syncs highlights from long-form reading into searchable notes.",
    usage:
      "Connect your source app, sync highlights, and tag snippets for future writing.",
    stack: ["Node.js", "Notion API", "Cron"],
  },
];