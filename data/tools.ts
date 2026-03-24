export type ToolItem = {
  slug: string;
  name: string;
  nameZh?: string;
  status: "public" | "private" | "beta";
  summary: string;
  summaryZh?: string;
  usage: string;
  usageZh?: string;
  stack: string[];
  link?: string;
};

export const tools: ToolItem[] = [
  {
    slug: "prompt-polisher",
    name: "Prompt Polisher",
    nameZh: "\u63d0\u793a\u8bcd\u4f18\u5316\u5668",
    status: "public",
    summary: "Cleans rough prompts into structured, reusable prompt templates.",
    summaryZh: "\u628a\u7c97\u7cd9\u63d0\u793a\u8bcd\u6574\u7406\u6210\u7ed3\u6784\u5316\u3001\u53ef\u590d\u7528\u7684\u6a21\u677f\u3002",
    usage:
      "Paste your raw prompt, choose tone + output format, then copy polished prompt in one click.",
    usageZh: "\u7c98\u8d34\u539f\u59cb\u63d0\u793a\u8bcd\uff0c\u9009\u62e9\u8bed\u6c14\u548c\u8f93\u51fa\u683c\u5f0f\uff0c\u7136\u540e\u4e00\u952e\u590d\u5236\u4f18\u5316\u7ed3\u679c\u3002",
    stack: ["Next.js", "TypeScript", "Tailwind", "OpenAI API"],
    link: "#",
  },
  {
    slug: "weekly-focus-board",
    name: "Weekly Focus Board",
    nameZh: "\u6bcf\u5468\u4e13\u6ce8\u770b\u677f",
    status: "beta",
    summary: "Turns scattered tasks into a weekly board with realistic load planning.",
    summaryZh: "\u628a\u5206\u6563\u4efb\u52a1\u6574\u7406\u6210\u53ef\u6267\u884c\u7684\u6bcf\u5468\u770b\u677f\uff0c\u5e76\u6309\u5b9e\u9645\u8d1f\u8f7d\u89c4\u5212\u3002",
    usage:
      "Import your task list, set available hours, and auto-generate a manageable weekly plan.",
    usageZh: "\u5bfc\u5165\u4efb\u52a1\u6e05\u5355\uff0c\u8bbe\u7f6e\u53ef\u7528\u65f6\u957f\uff0c\u81ea\u52a8\u751f\u6210\u53ef\u843d\u5730\u7684\u5468\u8ba1\u5212\u3002",
    stack: ["React", "Supabase", "PostgreSQL"],
    link: "#",
  },
  {
    slug: "reading-highlight-sync",
    name: "Reading Highlight Sync",
    nameZh: "\u9605\u8bfb\u9ad8\u4eae\u540c\u6b65",
    status: "private",
    summary: "Syncs highlights from long-form reading into searchable notes.",
    summaryZh: "\u628a\u957f\u6587\u9605\u8bfb\u4e2d\u7684\u9ad8\u4eae\u540c\u6b65\u6210\u53ef\u68c0\u7d22\u7b14\u8bb0\u3002",
    usage:
      "Connect your source app, sync highlights, and tag snippets for future writing.",
    usageZh: "\u8fde\u63a5\u6765\u6e90\u5e94\u7528\uff0c\u540c\u6b65\u9ad8\u4eae\uff0c\u5e76\u7ed9\u7247\u6bb5\u6253\u6807\u7b7e\u7528\u4e8e\u540e\u7eed\u5199\u4f5c\u3002",
    stack: ["Node.js", "Notion API", "Cron"],
  },
];
