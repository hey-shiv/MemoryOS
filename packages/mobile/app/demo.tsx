import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  X,
  Sparkle,
  Brain,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Code,
  Rocket,
  BookOpen,
  Quotes,
  ForkKnife,
  Receipt,
  Student,
  Barbell,
  MapPin,
  Smiley,
  FileText,
  ShieldWarning,
  MagnifyingGlass,
} from "phosphor-react-native";
import { COLORS } from "../lib/mockData";

// ── Types ───────────────────────────────────────────────────────────────────

type DemoStep = "gallery" | "scanning" | "results" | "search" | "gem";

// ── Mock gallery tiles ───────────────────────────────────────────────────────

const GALLERY_TILES = [
  { id: "g1",  emoji: "💻", label: "React error",      color: COLORS.cyan,    bg: "#0D1A1F" },
  { id: "g2",  emoji: "🚀", label: "Startup tweet",    color: COLORS.lime,    bg: "#141A0A" },
  { id: "g3",  emoji: "📖", label: "Book highlight",   color: "#9B8EFF",      bg: "#120F1F" },
  { id: "g4",  emoji: "💬", label: "Naval quote",      color: COLORS.amber,   bg: "#1A1408" },
  { id: "g5",  emoji: "🍜", label: "Ramen recipe",     color: "#FF8C5A",      bg: "#1A0F0A" },
  { id: "g6",  emoji: "🧾", label: "AWS receipt",      color: "#6BD4A0",      bg: "#0A1A12" },
  { id: "g7",  emoji: "📝", label: "NDA template",     color: "#D4C4A0",      bg: "#1A1810" },
  { id: "g8",  emoji: "🔒", label: "API key???",       color: COLORS.red,     bg: "#1A0A0A" },
  { id: "g9",  emoji: "💻", label: "TS utility type",  color: COLORS.cyan,    bg: "#0D1A1F" },
  { id: "g10", emoji: "🏋️", label: "Workout plan",    color: "#F0E040",      bg: "#1A1A08" },
  { id: "g11", emoji: "✈️", label: "Manali trip",     color: "#5AC8E8",      bg: "#0A1520" },
  { id: "g12", emoji: "😂", label: "Dev meme",         color: "#E87DE8",      bg: "#1A0A1A" },
  { id: "g13", emoji: "💡", label: "B2B data idea",    color: COLORS.lime,    bg: "#141A0A" },
  { id: "g14", emoji: "📚", label: "Zero to One",      color: "#9B8EFF",      bg: "#120F1F" },
  { id: "g15", emoji: "🍔", label: "Burger spot",      color: "#FF8C5A",      bg: "#1A0F0A" },
  { id: "g16", emoji: "💬", label: "Feynman quote",    color: COLORS.amber,   bg: "#1A1408" },
  { id: "g17", emoji: "🖥️", label: "CSS grid",        color: COLORS.cyan,    bg: "#0D1A1F" },
  { id: "g18", emoji: "📱", label: "Sleep app idea",   color: COLORS.lime,    bg: "#141A0A" },
  { id: "g19", emoji: "🧾", label: "Figma receipt",    color: "#6BD4A0",      bg: "#0A1A12" },
  { id: "g20", emoji: "📖", label: "Atomic Habits",    color: "#9B8EFF",      bg: "#120F1F" },
  { id: "g21", emoji: "🗺️", label: "Goa plans",       color: "#5AC8E8",      bg: "#0A1520" },
  { id: "g22", emoji: "😂", label: "Ship it meme",     color: "#E87DE8",      bg: "#1A0A1A" },
  { id: "g23", emoji: "⚡", label: "AI workflow idea", color: COLORS.lime,    bg: "#141A0A" },
  { id: "g24", emoji: "🔑", label: "Private creds",    color: COLORS.red,     bg: "#1A0A0A" },
];

// ── Scan steps ───────────────────────────────────────────────────────────────

const SCAN_STEPS = [
  "Reading screenshots…",
  "Extracting OCR text…",
  "Detecting categories…",
  "Creating semantic index…",
  "Building smart collections…",
  "Protecting sensitive items…",
];

const SCAN_COUNTERS = [
  { label: "Memories scanned",   final: 24, color: COLORS.textPrimary },
  { label: "Screenshots understood", final: 12, color: COLORS.cyan },
  { label: "Startup ideas found",    final: 3,  color: COLORS.lime },
  { label: "Receipts detected",      final: 2,  color: "#6BD4A0" },
  { label: "Sensitive items protected", final: 1, color: COLORS.red },
];

// ── Grouped results ──────────────────────────────────────────────────────────

const RESULT_GROUPS = [
  { name: "Startup Ideas", icon: "Rocket",      count: 3,  color: COLORS.lime,   bg: "#141A0A" },
  { name: "Coding",        icon: "Code",        count: 4,  color: COLORS.cyan,   bg: "#0D1A1F" },
  { name: "Quotes",        icon: "Quotes",      count: 3,  color: COLORS.amber,  bg: "#1A1408" },
  { name: "Food",          icon: "ForkKnife",   count: 2,  color: "#FF8C5A",     bg: "#1A0F0A" },
  { name: "Receipts",      icon: "Receipt",     count: 2,  color: "#6BD4A0",     bg: "#0A1A12" },
  { name: "Books",         icon: "BookOpen",    count: 3,  color: "#9B8EFF",     bg: "#120F1F" },
  { name: "Travel",        icon: "MapPin",      count: 2,  color: "#5AC8E8",     bg: "#0A1520" },
  { name: "Sensitive",     icon: "ShieldWarning", count: 1, color: COLORS.red,  bg: "#1A0A0A" },
];

// ── Search results ───────────────────────────────────────────────────────────

const SEARCH_RESULTS = [
  {
    id: "s1",
    title: "AI SaaS Idea",
    category: "STARTUP",
    confidence: 88,
    summary: "AI-powered workflow builder for ops teams. No code. Auto-detects bottlenecks.",
    ocr: "Idea: AI workflow builder for ops teams. No-code. Recurring revenue.",
    tags: ["AI", "SaaS", "Founder"],
    matchReason: "AI + startup + SaaS",
    color: COLORS.lime,
    bg: "#141A0A",
  },
  {
    id: "s2",
    title: "B2B Data Marketplace",
    category: "STARTUP",
    confidence: 85,
    summary: "Marketplace for verified business datasets. Privacy-first, API-first.",
    ocr: "Verified data marketplace. Companies sell anonymized datasets to researchers.",
    tags: ["B2B", "Data", "Marketplace"],
    matchReason: "B2B + data + marketplace",
    color: COLORS.lime,
    bg: "#141A0A",
  },
  {
    id: "s3",
    title: "Sleep Tech App Concept",
    category: "STARTUP",
    confidence: 82,
    summary: "Mobile app using mic to detect sleep stages and optimize wake time.",
    ocr: "Sleep stage detection via mic. Smart alarm. $9.99/mo. Market: 40M insomniacs.",
    tags: ["Health", "Mobile", "Sleep"],
    matchReason: "health tech + app + startup",
    color: COLORS.lime,
    bg: "#141A0A",
  },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  Code, Rocket, BookOpen, Quotes, ForkKnife, Receipt,
  Student, Barbell, MapPin, Smiley, FileText, ShieldWarning,
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function DemoScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [step, setStep] = useState<DemoStep>("gallery");
  const [scanStepIdx, setScanStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counters, setCounters] = useState(SCAN_COUNTERS.map(() => 0));
  const scanRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tile width: 3 columns with gaps
  const TILE = (width - 40 - 16) / 3; // 20px side pad each, 8px gap x2

  useEffect(() => {
    return () => { if (scanRef.current) clearInterval(scanRef.current); };
  }, []);

  const startScan = () => {
    setStep("scanning");
    setScanStepIdx(0);
    setProgress(0);
    setCounters(SCAN_COUNTERS.map(() => 0));

    let tick = 0;
    const TOTAL_TICKS = 60; // ~3 seconds at 50ms each
    scanRef.current = setInterval(() => {
      tick++;
      const pct = Math.min((tick / TOTAL_TICKS) * 100, 100);
      setProgress(pct);
      setScanStepIdx(Math.min(Math.floor((tick / TOTAL_TICKS) * SCAN_STEPS.length), SCAN_STEPS.length - 1));
      setCounters(SCAN_COUNTERS.map((c) =>
        Math.min(Math.round((tick / TOTAL_TICKS) * c.final), c.final)
      ));
      if (tick >= TOTAL_TICKS) {
        clearInterval(scanRef.current!);
        setProgress(100);
        setTimeout(() => setStep("results"), 400);
      }
    }, 50);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.demoBadge}>
          <Sparkle size={11} color={COLORS.lime} weight="fill" />
          <Text style={styles.demoBadgeText}>DEMO MODE</Text>
        </View>
        <Pressable style={styles.closeBtn} onPress={() => router.back()}>
          <X size={18} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* ── STEP 1: Gallery ─────────────────────────────────────── */}
        {step === "gallery" && (
          <View style={styles.section}>
            <Text style={styles.stepLabel}>STEP 1 OF 5</Text>
            <Text style={styles.stepTitle}>Messy Camera Roll</Text>
            <Text style={styles.stepSubtitle}>
              24 random screenshots. Impossible to find anything. Sound familiar?
            </Text>

            {/* Chaotic grid */}
            <View style={styles.galleryGrid}>
              {GALLERY_TILES.map((tile) => (
                <View
                  key={tile.id}
                  style={[styles.galTile, { width: TILE, height: TILE + 8, backgroundColor: tile.bg, borderColor: tile.color + "30" }]}
                >
                  <Text style={styles.galEmoji}>{tile.emoji}</Text>
                  <Text style={[styles.galLabel, { color: tile.color }]} numberOfLines={2}>
                    {tile.label}
                  </Text>
                </View>
              ))}
            </View>

            <Pressable style={styles.primaryBtn} onPress={startScan}>
              <Brain size={16} color="#000" weight="bold" />
              <Text style={styles.primaryBtnText}>Scan Memory with AI</Text>
            </Pressable>
          </View>
        )}

        {/* ── STEP 2: Scanning ────────────────────────────────────── */}
        {step === "scanning" && (
          <View style={styles.section}>
            <Text style={styles.stepLabel}>STEP 2 OF 5</Text>
            <Text style={styles.stepTitle}>AI Scanning…</Text>

            {/* Big brain icon */}
            <View style={styles.scanBrainWrap}>
              <Brain size={56} color={COLORS.cyan} weight="duotone" />
            </View>

            {/* Current step */}
            <Text style={styles.scanCurrentStep}>
              {SCAN_STEPS[scanStepIdx]}
            </Text>

            {/* Progress bar */}
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressPct}>{Math.round(progress)}%</Text>

            {/* Live counters */}
            <View style={styles.counterGrid}>
              {SCAN_COUNTERS.map((c, i) => (
                <View key={c.label} style={styles.counterRow}>
                  <View style={[styles.counterDot, { backgroundColor: c.color }]} />
                  <Text style={styles.counterLabel}>{c.label}</Text>
                  <Text style={[styles.counterVal, { color: c.color }]}>{counters[i]}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── STEP 3: Results ─────────────────────────────────────── */}
        {step === "results" && (
          <View style={styles.section}>
            <Text style={styles.stepLabel}>STEP 3 OF 5</Text>
            <Text style={styles.stepTitle}>24 Memories Organized</Text>

            {/* Summary cards */}
            <View style={styles.summaryGrid}>
              {[
                { val: "24", label: "Memories organized",      color: COLORS.textPrimary },
                { val: "3",  label: "Startup ideas found",     color: COLORS.lime },
                { val: "2",  label: "Receipts detected",       color: "#6BD4A0" },
                { val: "1",  label: "Sensitive item protected", color: COLORS.red },
                { val: "12", label: "Screenshots searchable",  color: COLORS.cyan },
              ].map((s) => (
                <View key={s.label} style={styles.summaryCard}>
                  <CheckCircle size={14} color={s.color} weight="fill" />
                  <Text style={[styles.summaryVal, { color: s.color }]}>{s.val}</Text>
                  <Text style={styles.summaryLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Grouped collections */}
            <Text style={styles.subHeading}>SMART COLLECTIONS CREATED</Text>
            <View style={styles.groupGrid}>
              {RESULT_GROUPS.map((g) => {
                const IconComp = iconMap[g.icon] || Code;
                return (
                  <View key={g.name} style={[styles.groupCard, { backgroundColor: g.bg, borderColor: g.color + "35" }]}>
                    <IconComp size={18} color={g.color} weight="duotone" />
                    <Text style={[styles.groupName, { color: g.color }]} numberOfLines={1}>{g.name}</Text>
                    <Text style={styles.groupCount}>{g.count}</Text>
                  </View>
                );
              })}
            </View>

            <Pressable style={styles.primaryBtn} onPress={() => setStep("search")}>
              <MagnifyingGlass size={16} color="#000" weight="bold" />
              <Text style={styles.primaryBtnText}>Search: "AI startup ideas"</Text>
            </Pressable>
          </View>
        )}

        {/* ── STEP 4: Search ──────────────────────────────────────── */}
        {step === "search" && (
          <View style={styles.section}>
            <Text style={styles.stepLabel}>STEP 4 OF 5</Text>
            <Text style={styles.stepTitle}>Natural Language Search</Text>

            {/* Fake search bar */}
            <View style={styles.searchBar}>
              <MagnifyingGlass size={15} color={COLORS.lime} />
              <Text style={styles.searchQuery}>show all AI startup ideas</Text>
            </View>

            <View style={styles.resultsMeta}>
              <Text style={styles.resultsMetaText}>3 memories matched</Text>
              <View style={styles.aiLabel}>
                <Sparkle size={10} color={COLORS.lime} weight="fill" />
                <Text style={styles.aiLabelText}>Semantic search</Text>
              </View>
            </View>

            {SEARCH_RESULTS.map((r) => (
              <View key={r.id} style={[styles.searchCard, { backgroundColor: r.bg }]}>
                <View style={styles.searchCardTop}>
                  <View style={[styles.catChip, { borderColor: r.color + "40" }]}>
                    <Text style={[styles.catChipText, { color: r.color }]}>{r.category}</Text>
                  </View>
                  <View style={[styles.confChip, { borderColor: r.color + "40" }]}>
                    <Text style={[styles.confChipText, { color: r.color }]}>{r.confidence}%</Text>
                  </View>
                </View>
                <Text style={[styles.searchCardTitle, { color: r.color }]}>{r.title}</Text>
                <Text style={styles.searchCardSummary}>{r.summary}</Text>
                <View style={styles.ocrBox}>
                  <Text style={styles.ocrLabel}>OCR</Text>
                  <Text style={styles.ocrText} numberOfLines={2}>{r.ocr}</Text>
                </View>
                <View style={styles.tagRow}>
                  {r.tags.map((t) => (
                    <View key={t} style={styles.tag}>
                      <Text style={styles.tagText}>{t}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.matchReason}>
                  <Sparkle size={10} color={COLORS.lime} /> Matched: {r.matchReason}
                </Text>
              </View>
            ))}

            <Pressable style={styles.primaryBtn} onPress={() => setStep("gem")}>
              <Sparkle size={16} color="#000" weight="fill" />
              <Text style={styles.primaryBtnText}>Discover a Forgotten Gem</Text>
            </Pressable>
          </View>
        )}

        {/* ── STEP 5: Gem ─────────────────────────────────────────── */}
        {step === "gem" && (
          <View style={styles.section}>
            <Text style={styles.stepLabel}>STEP 5 OF 5</Text>

            {/* Gem card */}
            <View style={styles.gemCard}>
              <View style={styles.gemCardTop}>
                <View style={styles.gemBadge}>
                  <Sparkle size={12} color={COLORS.amber} weight="fill" />
                  <Text style={styles.gemBadgeText}>FORGOTTEN GEM</Text>
                </View>
                <Text style={styles.gemDaysAgo}>92 days ago</Text>
              </View>
              <Text style={styles.gemTitle}>B2B Data Marketplace</Text>
              <Text style={styles.gemBody}>
                You saved this idea 92 days ago. Verified data marketplace — companies sell anonymized datasets to researchers. You never came back to it.
              </Text>
              <View style={styles.gemDivider} />
              <View style={styles.gemMeta}>
                <View style={[styles.tag, { borderColor: COLORS.lime + "40" }]}>
                  <Text style={[styles.tagText, { color: COLORS.lime }]}>B2B</Text>
                </View>
                <View style={[styles.tag, { borderColor: COLORS.lime + "40" }]}>
                  <Text style={[styles.tagText, { color: COLORS.lime }]}>Data</Text>
                </View>
                <View style={[styles.tag, { borderColor: COLORS.lime + "40" }]}>
                  <Text style={[styles.tagText, { color: COLORS.lime }]}>Marketplace</Text>
                </View>
              </View>
            </View>

            {/* Tagline */}
            <View style={styles.taglineCard}>
              <Brain size={32} color={COLORS.lime} weight="duotone" />
              <Text style={styles.taglineText}>
                Your gallery is not storage anymore.{"\n"}
                <Text style={styles.taglineAccent}>It is a second brain.</Text>
              </Text>
            </View>

            {/* CTA buttons */}
            <Pressable
              style={styles.primaryBtn}
              onPress={() => router.push("/(tabs)")}
            >
              <Text style={styles.primaryBtnText}>Open MemoryOS →</Text>
            </Pressable>
            <Pressable
              style={styles.ghostBtn}
              onPress={() => {
                setStep("gallery");
                setProgress(0);
                setCounters(SCAN_COUNTERS.map(() => 0));
              }}
            >
              <Text style={styles.ghostBtnText}>Replay Demo</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Step dots */}
      <View style={styles.stepDots}>
        {(["gallery", "scanning", "results", "search", "gem"] as DemoStep[]).map((s) => (
          <View
            key={s}
            style={[styles.dot, step === s && styles.dotActive]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  demoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(200, 241, 53, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.25)",
  },
  demoBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.lime,
    letterSpacing: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 2,
    marginBottom: 6,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },

  // Gallery
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  galTile: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  galEmoji: {
    fontSize: 22,
  },
  galLabel: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 12,
  },

  // Scanning
  scanBrainWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginBottom: 16,
  },
  scanCurrentStep: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.cyan,
    textAlign: "center",
    marginBottom: 16,
    minHeight: 22,
  },
  progressTrack: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: COLORS.cyan,
    borderRadius: 3,
  },
  progressPct: {
    fontSize: 13,
    color: COLORS.textTertiary,
    textAlign: "right",
    marginBottom: 24,
  },
  counterGrid: {
    gap: 10,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
  },
  counterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  counterLabel: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  counterVal: {
    fontSize: 18,
    fontWeight: "800",
    minWidth: 28,
    textAlign: "right",
  },

  // Results
  summaryGrid: {
    gap: 8,
    marginBottom: 24,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
  },
  summaryVal: {
    fontSize: 18,
    fontWeight: "800",
    minWidth: 28,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  subHeading: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  groupGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  groupCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    gap: 4,
    minWidth: 76,
  },
  groupName: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  groupCount: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },

  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.lime + "50",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchQuery: {
    fontSize: 14,
    color: COLORS.lime,
    fontWeight: "600",
  },
  resultsMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultsMetaText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    fontWeight: "600",
  },
  aiLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(200, 241, 53, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.2)",
  },
  aiLabelText: {
    fontSize: 10,
    color: COLORS.lime,
    fontWeight: "600",
  },
  searchCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    gap: 8,
  },
  searchCardTop: {
    flexDirection: "row",
    gap: 6,
  },
  catChip: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  catChipText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  confChip: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  confChipText: {
    fontSize: 9,
    fontWeight: "700",
  },
  searchCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  searchCardSummary: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  ocrBox: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 6,
    padding: 8,
    gap: 4,
  },
  ocrLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1,
  },
  ocrText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: "monospace",
    lineHeight: 15,
  },
  tagRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  matchReason: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },

  // Gem
  gemCard: {
    backgroundColor: "rgba(245, 166, 35, 0.06)",
    borderWidth: 1,
    borderColor: COLORS.amber + "40",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  gemCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  gemBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(245, 166, 35, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.amber + "30",
  },
  gemBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.amber,
    letterSpacing: 1,
  },
  gemDaysAgo: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  gemTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.amber,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  gemBody: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  gemDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  gemMeta: {
    flexDirection: "row",
    gap: 6,
  },
  taglineCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.lime + "30",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  taglineText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 26,
  },
  taglineAccent: {
    color: COLORS.lime,
    fontWeight: "800",
  },

  // Buttons
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.lime,
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 10,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
  ghostBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 10,
  },
  ghostBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },

  // Step dots
  stepDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.lime,
    width: 18,
  },
});
