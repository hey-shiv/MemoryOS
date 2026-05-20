export const COLORS = {
  bg: "#0A0A0B",
  surface: "#111113",
  surfaceAlt: "#18181C",
  hover: "#1E1E24",
  active: "#252530",
  border: "rgba(255,255,255,0.06)",
  borderDefault: "rgba(255,255,255,0.10)",
  borderStrong: "rgba(255,255,255,0.18)",
  textPrimary: "#F2F2F3",
  textSecondary: "#8A8A96",
  textTertiary: "#52525E",
  textDisabled: "#3A3A46",
  textDark: "#050506",
  cyan: "#00D4FF",
  cyanDim: "rgba(0,212,255,0.12)",
  cyanGlow: "rgba(0,212,255,0.20)",
  amber: "#FFB830",
  amberDim: "rgba(255,184,48,0.12)",
  green: "#00E5A0",
  greenDim: "rgba(0,229,160,0.12)",
  red: "#FF4D6A",
  redDim: "rgba(255,77,106,0.12)",
  // Legacy aliases used by older routes.
  lime: "#00D4FF",
  ivory: "#F2F2F3",
  borderMuted: "rgba(255,255,255,0.06)",
};

export type MemoryItem = {
  id: string;
  type: "screenshot" | "photo" | "document";
  primaryCategory: string;
  secondaryCategory: string;
  title: string;
  summary: string;
  ocrText: string;
  tags: string[];
  confidence: number;
  isSensitive: boolean;
  sensitiveReason: string | null;
  importedAt: string;
  collectionIds: string[];
  forgotten?: boolean;
  gemInsight?: string;
  savedContext?: string;
  // Compatibility fields for existing detail/demo routes.
  category: string;
  categoryColor: string;
  dateAdded: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  icon: string;
};

export type Collection = {
  id: string;
  name: string;
  icon: string;
  count: number;
  insight: string;
  accentColor: string;
  bgColor: string;
  category: string;
  description: string;
};

const categoryMeta: Record<string, { name: string; accent: string; bg: string; icon: string }> = {
  coding: { name: "Coding", accent: COLORS.cyan, bg: "rgba(0,212,255,0.10)", icon: "Code" },
  startup: { name: "Startup Ideas", accent: COLORS.amber, bg: "rgba(255,184,48,0.10)", icon: "Rocket" },
  quotes: { name: "Quotes", accent: COLORS.amber, bg: "rgba(255,184,48,0.10)", icon: "Quotes" },
  books: { name: "Books", accent: COLORS.textSecondary, bg: "rgba(255,255,255,0.06)", icon: "BookOpen" },
  food: { name: "Food", accent: COLORS.green, bg: "rgba(0,229,160,0.10)", icon: "ForkKnife" },
  receipts: { name: "Receipts", accent: COLORS.textSecondary, bg: "rgba(255,255,255,0.06)", icon: "Receipt" },
  fitness: { name: "Fitness", accent: COLORS.green, bg: "rgba(0,229,160,0.10)", icon: "Barbell" },
  travel: { name: "Travel", accent: COLORS.cyan, bg: "rgba(0,212,255,0.10)", icon: "MapPin" },
  memes: { name: "Memes", accent: COLORS.textSecondary, bg: "rgba(255,255,255,0.06)", icon: "Smiley" },
  documents: { name: "Documents", accent: COLORS.textSecondary, bg: "rgba(255,255,255,0.06)", icon: "FileText" },
  whiteboard: { name: "Whiteboard", accent: COLORS.cyan, bg: "rgba(0,212,255,0.10)", icon: "Student" },
  sensitive: { name: "Sensitive", accent: COLORS.red, bg: "rgba(255,77,106,0.10)", icon: "ShieldWarning" },
};

function item(
  input: Omit<MemoryItem, "category" | "categoryColor" | "dateAdded" | "bgColor" | "textColor" | "accentColor" | "icon">
): MemoryItem {
  const meta = categoryMeta[input.primaryCategory] ?? categoryMeta.documents;
  return {
    ...input,
    category: meta.name,
    categoryColor: meta.accent,
    dateAdded: relativeDate(input.importedAt),
    bgColor: meta.bg,
    textColor: meta.accent,
    accentColor: meta.accent,
    icon: meta.icon,
  };
}

function relativeDate(iso: string) {
  const date = new Date(iso);
  const diff = Math.max(1, Math.round((Date.now() - date.getTime()) / 86_400_000));
  if (diff <= 1) return "today";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 35) return `${Math.round(diff / 7)} weeks ago`;
  return `${Math.round(diff / 30)} months ago`;
}

export const mockMemories: MemoryItem[] = [
  item({
    id: "img_001",
    type: "screenshot",
    primaryCategory: "coding",
    secondaryCategory: "React / Hooks",
    title: "React useDebounce hook",
    summary: "Custom useDebounce hook implementation in React TypeScript.",
    ocrText: "const useDebounce = <T>(value: T, delay: number): T => { const [debouncedValue, setDebouncedValue] = useState<T>(value); useEffect(() => { const timer = setTimeout(...) }, [value, delay]); return debouncedValue; }",
    tags: ["react", "typescript", "hooks", "debounce", "performance"],
    confidence: 0.97,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-20T14:23:00Z",
    collectionIds: ["col_coding"],
    forgotten: true,
    gemInsight: "You saved this React hook snippet but never used it in a project.",
    savedContext: "Saved during frontend debugging",
  }),
  item({
    id: "img_002",
    type: "screenshot",
    primaryCategory: "coding",
    secondaryCategory: "Python / Data",
    title: "Pandas cleanup script",
    summary: "Python snippet for cleaning messy CSV columns and missing values.",
    ocrText: "df.columns = df.columns.str.lower().str.strip(); df = df.dropna(subset=['email']); df['created_at'] = pd.to_datetime(df['created_at'])",
    tags: ["python", "pandas", "csv", "data-cleaning"],
    confidence: 0.94,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-19T09:18:00Z",
    collectionIds: ["col_coding"],
  }),
  item({
    id: "img_003",
    type: "screenshot",
    primaryCategory: "coding",
    secondaryCategory: "SQL / Analytics",
    title: "Retention SQL query",
    summary: "Cohort retention query grouped by signup week and activity week.",
    ocrText: "SELECT signup_week, activity_week, COUNT(DISTINCT user_id) FROM cohorts GROUP BY 1,2 ORDER BY 1,2;",
    tags: ["sql", "retention", "analytics", "cohorts"],
    confidence: 0.93,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-18T08:40:00Z",
    collectionIds: ["col_coding"],
  }),
  item({
    id: "img_004",
    type: "screenshot",
    primaryCategory: "startup",
    secondaryCategory: "Tweet Idea",
    title: "AI workflow builder",
    summary: "Tweet-sized startup idea for AI workflow automation for non-technical founders.",
    ocrText: "Idea: AI workflow builder for ops teams. No code. Auto-detect bottlenecks. Sell to 10-person startups first.",
    tags: ["ai", "saas", "workflow", "founder"],
    confidence: 0.91,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-02-18T19:10:00Z",
    collectionIds: ["col_startup"],
    forgotten: true,
    gemInsight: "You saved this startup idea 92 days ago and never opened it again.",
    savedContext: "Saved after a late-night product brainstorm",
  }),
  item({
    id: "img_005",
    type: "screenshot",
    primaryCategory: "startup",
    secondaryCategory: "Pitch Deck",
    title: "B2B data marketplace",
    summary: "Pitch deck slide about verified datasets with API-first distribution.",
    ocrText: "Verified business datasets. Privacy-first. API access. Revenue: per-seat + usage. Beachhead: researchers and fintech ops.",
    tags: ["b2b", "marketplace", "data", "api"],
    confidence: 0.88,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-03-01T21:00:00Z",
    collectionIds: ["col_startup"],
    forgotten: true,
    gemInsight: "This concept has a clearer buyer than most notes you saved.",
    savedContext: "Saved from a pitch deck screenshot",
  }),
  item({
    id: "img_006",
    type: "screenshot",
    primaryCategory: "startup",
    secondaryCategory: "Market Size",
    title: "Sleep tech market note",
    summary: "Market size note for a smart sleep-stage alarm app.",
    ocrText: "Market: 40M insomniacs. Smart alarm with mic-based sleep stage detection. $9.99/mo. Differentiator: no wearable.",
    tags: ["health", "sleep", "mobile", "market-size"],
    confidence: 0.86,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-04-02T22:12:00Z",
    collectionIds: ["col_startup"],
  }),
  item({
    id: "img_007",
    type: "screenshot",
    primaryCategory: "quotes",
    secondaryCategory: "Discipline",
    title: "Discipline quote",
    summary: "Short quote about discipline outlasting motivation.",
    ocrText: "Discipline is choosing what you want most over what you want now.",
    tags: ["discipline", "motivation", "focus"],
    confidence: 0.98,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-10T13:05:00Z",
    collectionIds: ["col_quotes"],
    forgotten: true,
    gemInsight: "You saved this before exams and never revisited it.",
    savedContext: "Saved during exam week",
  }),
  item({
    id: "img_008",
    type: "screenshot",
    primaryCategory: "quotes",
    secondaryCategory: "Consistency",
    title: "Consistency reminder",
    summary: "Quote screenshot about repeating boring actions until they compound.",
    ocrText: "Consistency is what transforms average into excellence.",
    tags: ["consistency", "habits", "growth"],
    confidence: 0.96,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-08T10:21:00Z",
    collectionIds: ["col_quotes"],
  }),
  item({
    id: "img_009",
    type: "screenshot",
    primaryCategory: "quotes",
    secondaryCategory: "Stoic",
    title: "Stoic control quote",
    summary: "Stoic quote about focusing only on controllable actions.",
    ocrText: "You have power over your mind, not outside events. Realize this, and you will find strength.",
    tags: ["stoic", "control", "mindset"],
    confidence: 0.97,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-07T12:00:00Z",
    collectionIds: ["col_quotes"],
  }),
  item({
    id: "img_010",
    type: "screenshot",
    primaryCategory: "books",
    secondaryCategory: "Atomic Habits",
    title: "Atomic Habits page",
    summary: "Highlighted page about identity-based habits and small votes.",
    ocrText: "Every action you take is a vote for the type of person you wish to become.",
    tags: ["atomic-habits", "habits", "identity"],
    confidence: 0.95,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-04T15:44:00Z",
    collectionIds: ["col_books"],
  }),
  item({
    id: "img_011",
    type: "screenshot",
    primaryCategory: "books",
    secondaryCategory: "Zero to One",
    title: "Zero to One highlight",
    summary: "Highlighted page about monopolies, competition, and strategy.",
    ocrText: "Competition is for losers. If you want to create and capture lasting value, build a monopoly.",
    tags: ["zero-to-one", "startups", "strategy"],
    confidence: 0.94,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-03T16:18:00Z",
    collectionIds: ["col_books"],
  }),
  item({
    id: "img_012",
    type: "photo",
    primaryCategory: "food",
    secondaryCategory: "Ramen",
    title: "Tonkotsu ramen",
    summary: "Saved ramen photo with notes for broth and toppings.",
    ocrText: "Tonkotsu base: pork bones, tare, ajitama, scallions, black garlic oil.",
    tags: ["ramen", "food", "recipe"],
    confidence: 0.89,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-04-24T20:12:00Z",
    collectionIds: ["col_food"],
    forgotten: true,
    gemInsight: "You saved this ramen recipe 5 weeks ago and still haven't cooked it.",
    savedContext: "Saved from a weekend food plan",
  }),
  item({
    id: "img_013",
    type: "photo",
    primaryCategory: "food",
    secondaryCategory: "Burger",
    title: "Bandra burger spot",
    summary: "Photo of a smash burger restaurant saved for dinner plans.",
    ocrText: "Try this weekend: double smash burger, spicy fries, Bandra.",
    tags: ["burger", "restaurant", "dinner"],
    confidence: 0.9,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-04-22T20:12:00Z",
    collectionIds: ["col_food"],
  }),
  item({
    id: "img_014",
    type: "screenshot",
    primaryCategory: "receipts",
    secondaryCategory: "Swiggy Receipt",
    title: "Swiggy dinner receipt",
    summary: "Food delivery receipt with order total and restaurant details.",
    ocrText: "Swiggy order total ₹612. Paneer bowl, fries, delivery fee ₹34.",
    tags: ["swiggy", "receipt", "food", "expense"],
    confidence: 0.96,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-14T21:50:00Z",
    collectionIds: ["col_receipts"],
  }),
  item({
    id: "img_015",
    type: "screenshot",
    primaryCategory: "receipts",
    secondaryCategory: "Amazon Order",
    title: "Amazon order receipt",
    summary: "Amazon receipt for keyboard accessories and USB-C cable.",
    ocrText: "Amazon order #408-128. Total ₹1,899. Keyboard wrist rest, USB-C cable.",
    tags: ["amazon", "receipt", "shopping"],
    confidence: 0.95,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-05-12T18:20:00Z",
    collectionIds: ["col_receipts"],
  }),
  item({
    id: "img_016",
    type: "screenshot",
    primaryCategory: "fitness",
    secondaryCategory: "PPL Routine",
    title: "Push pull legs routine",
    summary: "Workout screenshot listing push/pull/legs split with sets and reps.",
    ocrText: "Push: bench 4x6, OHP 3x8, dips 3xAMRAP. Pull: rows 4x8, pullups 4xAMRAP. Legs: squats 5x5.",
    tags: ["ppl", "fitness", "workout"],
    confidence: 0.92,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-04-17T06:12:00Z",
    collectionIds: ["col_fitness"],
    forgotten: true,
    gemInsight: "You saved this routine but never added it to your weekly plan.",
    savedContext: "Saved after watching a fitness video",
  }),
  item({
    id: "img_017",
    type: "screenshot",
    primaryCategory: "fitness",
    secondaryCategory: "Macro Tracker",
    title: "Macro tracker",
    summary: "Nutrition target screenshot with protein, carbs, and calories.",
    ocrText: "Daily target: 2200 kcal, 150g protein, 240g carbs, 65g fat.",
    tags: ["nutrition", "macros", "protein"],
    confidence: 0.9,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-04-15T08:00:00Z",
    collectionIds: ["col_fitness"],
  }),
  item({
    id: "img_018",
    type: "screenshot",
    primaryCategory: "travel",
    secondaryCategory: "Bali Itinerary",
    title: "Bali itinerary",
    summary: "Four-day Bali itinerary with cafes, beaches, and temples.",
    ocrText: "Day 1: Canggu. Day 2: Ubud. Day 3: Uluwatu. Day 4: Nusa Penida.",
    tags: ["bali", "travel", "itinerary"],
    confidence: 0.91,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-04-08T13:14:00Z",
    collectionIds: ["col_travel"],
  }),
  item({
    id: "img_019",
    type: "screenshot",
    primaryCategory: "travel",
    secondaryCategory: "Tokyo Metro",
    title: "Tokyo metro map",
    summary: "Map screenshot showing Shibuya, Ginza, and Akihabara route options.",
    ocrText: "Tokyo Metro: Shibuya → Ginza → Akihabara. Transfer at Omotesando.",
    tags: ["tokyo", "metro", "map"],
    confidence: 0.89,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-04-06T11:09:00Z",
    collectionIds: ["col_travel"],
  }),
  item({
    id: "img_020",
    type: "screenshot",
    primaryCategory: "memes",
    secondaryCategory: "Programmer Meme",
    title: "Works on my machine",
    summary: "Programmer meme about shipping the machine to production.",
    ocrText: "It works on my machine. Then ship your machine.",
    tags: ["meme", "programming", "humor"],
    confidence: 0.84,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-03-28T23:40:00Z",
    collectionIds: ["col_memes"],
  }),
  item({
    id: "img_021",
    type: "screenshot",
    primaryCategory: "memes",
    secondaryCategory: "Hustle Meme",
    title: "Hustle meme",
    summary: "Creator meme about building at 2 AM with too much caffeine.",
    ocrText: "Me at 2 AM: this tiny feature will only take 5 minutes.",
    tags: ["meme", "hustle", "creator"],
    confidence: 0.82,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-03-22T02:20:00Z",
    collectionIds: ["col_memes"],
  }),
  item({
    id: "img_022",
    type: "document",
    primaryCategory: "sensitive",
    secondaryCategory: "Identity Document",
    title: "Aadhaar-like document",
    summary: "Identity document screenshot containing personal data.",
    ocrText: "Name: REDACTED. DOB: REDACTED. Address: REDACTED. Aadhaar-like ID: XXXX XXXX 4821.",
    tags: ["identity", "document", "private"],
    confidence: 0.99,
    isSensitive: true,
    sensitiveReason: "Identity document with private personal information",
    importedAt: "2026-03-12T10:10:00Z",
    collectionIds: ["col_sensitive"],
  }),
  item({
    id: "img_023",
    type: "screenshot",
    primaryCategory: "whiteboard",
    secondaryCategory: "Business Model Canvas",
    title: "Startup canvas",
    summary: "Whiteboard photo of customer segments, channels, and revenue model.",
    ocrText: "Customers: students, founders. Channels: Twitter, college groups. Revenue: freemium, pro export.",
    tags: ["whiteboard", "business-model", "startup"],
    confidence: 0.87,
    isSensitive: false,
    sensitiveReason: null,
    importedAt: "2026-03-02T17:30:00Z",
    collectionIds: ["col_whiteboard"],
  }),
  item({
    id: "img_024",
    type: "screenshot",
    primaryCategory: "sensitive",
    secondaryCategory: "API Key",
    title: "API key screenshot",
    summary: "Screenshot appears to contain API credentials and access tokens.",
    ocrText: "OPENAI_API_KEY=sk-proj-████████████ REDACTED DATABASE_URL=postgres://...",
    tags: ["api-key", "secret", "security"],
    confidence: 0.99,
    isSensitive: true,
    sensitiveReason: "API key and database URL detected",
    importedAt: "2026-02-20T16:00:00Z",
    collectionIds: ["col_sensitive"],
  }),
];

export const collections: Collection[] = [
  { id: "col_startup", name: "Startup Ideas", icon: "Rocket", count: 12, insight: "12 saved concepts", accentColor: COLORS.amber, bgColor: COLORS.amberDim, category: "Business", description: "Tweets, pitch notes, markets." },
  { id: "col_coding", name: "Coding", icon: "Code", count: 8, insight: "8 snippets found", accentColor: COLORS.cyan, bgColor: COLORS.cyanDim, category: "Tech", description: "React, Python, SQL snippets." },
  { id: "col_books", name: "Books", icon: "BookOpen", count: 5, insight: "5 highlights saved", accentColor: COLORS.textSecondary, bgColor: "rgba(255,255,255,0.06)", category: "Learning", description: "Book pages and highlights." },
  { id: "col_quotes", name: "Quotes", icon: "Quotes", count: 17, insight: "17 screenshots", accentColor: COLORS.amber, bgColor: COLORS.amberDim, category: "Inspiration", description: "Discipline, focus, stoic ideas." },
  { id: "col_food", name: "Food", icon: "ForkKnife", count: 21, insight: "21 meals saved", accentColor: COLORS.green, bgColor: COLORS.greenDim, category: "Lifestyle", description: "Recipes and restaurants." },
  { id: "col_receipts", name: "Receipts", icon: "Receipt", count: 5, insight: "5 purchases", accentColor: COLORS.textSecondary, bgColor: "rgba(255,255,255,0.06)", category: "Finance", description: "Orders, invoices, expenses." },
  { id: "col_fitness", name: "Fitness", icon: "Barbell", count: 6, insight: "6 routines", accentColor: COLORS.green, bgColor: COLORS.greenDim, category: "Lifestyle", description: "Workouts and macros." },
  { id: "col_travel", name: "Travel", icon: "MapPin", count: 4, insight: "4 places", accentColor: COLORS.cyan, bgColor: COLORS.cyanDim, category: "Lifestyle", description: "Itineraries and maps." },
  { id: "col_memes", name: "Memes", icon: "Smiley", count: 11, insight: "11 found", accentColor: COLORS.textSecondary, bgColor: "rgba(255,255,255,0.06)", category: "Fun", description: "Jokes worth finding again." },
  { id: "col_sensitive", name: "Sensitive", icon: "ShieldWarning", count: 3, insight: "3 to review", accentColor: COLORS.red, bgColor: COLORS.redDim, category: "Private", description: "Secrets, IDs, private data." },
];

export const searchSuggestions = [
  { id: "1", text: "AI startup ideas", icon: "Rocket" },
  { id: "2", text: "React code", icon: "Code" },
  { id: "3", text: "food photos", icon: "ForkKnife" },
  { id: "4", text: "receipts", icon: "Receipt" },
  { id: "5", text: "quotes about discipline", icon: "Quotes" },
  { id: "6", text: "screenshots with phone numbers", icon: "Phone" },
];

export const forgottenGems = mockMemories.filter((item) => item.forgotten).slice(0, 5);

export const weeklyStats = {
  totalIndexed: 128,
  screenshotsPercent: 42,
  startupIdeas: 12,
  receiptsDetected: 5,
  sensitiveProtected: 3,
  forgottenResurfaced: 12,
  learningScreenshots: 34,
  topCategory: "Coding",
};

export function searchMemories(query: string) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  return mockMemories
    .map((memory) => {
      let score = 0;
      const category = `${memory.primaryCategory} ${memory.secondaryCategory}`.toLowerCase();
      const tags = memory.tags.join(" ").toLowerCase();
      const summary = memory.summary.toLowerCase();
      const ocr = memory.ocrText.toLowerCase();

      for (const token of tokens) {
        if (category.includes(token)) score += 1.0;
        if (tags.includes(token)) score += 0.8;
        if (summary.includes(token)) score += 0.6;
        if (ocr.includes(token)) score += 0.4;
      }
      return { memory, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.memory);
}
