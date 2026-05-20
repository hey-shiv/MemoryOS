import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  Sparkle,
  CheckCircle,
  Code,
  Rocket,
  BookOpen,
  Quotes,
  ForkKnife,
  Receipt,
  ShieldWarning,
  ArrowRight,
  Brain,
  ScanSmiley,
  MagnifyingGlass,
} from "phosphor-react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../lib/mockData";

// ─── Types ────────────────────────────────────────────────────────────────────
type ScanState = "idle" | "scanning" | "done";

// ─── Constants ────────────────────────────────────────────────────────────────
const GALLERY_TILES = [
  { id: "g1",  emoji: "💻", label: "React error",       color: COLORS.cyan,  bg: "#0D1A1F" },
  { id: "g2",  emoji: "🚀", label: "Startup tweet",     color: COLORS.lime,  bg: "#141A0A" },
  { id: "g3",  emoji: "📖", label: "Book highlight",    color: "#9B8EFF",    bg: "#120F1F" },
  { id: "g4",  emoji: "💬", label: "Naval quote",       color: COLORS.amber, bg: "#1A1408" },
  { id: "g5",  emoji: "🍜", label: "Ramen recipe",      color: "#FF8C5A",    bg: "#1A0F0A" },
  { id: "g6",  emoji: "🧾", label: "AWS receipt",       color: "#6BD4A0",    bg: "#0A1A12" },
  { id: "g7",  emoji: "📝", label: "NDA template",      color: "#D4C4A0",    bg: "#1A1810" },
  { id: "g8",  emoji: "🔒", label: "API key???",        color: COLORS.red,   bg: "#1A0A0A" },
  { id: "g9",  emoji: "💻", label: "TS utility type",   color: COLORS.cyan,  bg: "#0D1A1F" },
  { id: "g10", emoji: "🏋️", label: "Workout plan",     color: "#F0E040",    bg: "#1A1A08" },
  { id: "g11", emoji: "✈️", label: "Manali trip",      color: "#5AC8E8",    bg: "#0A1520" },
  { id: "g12", emoji: "😂", label: "Dev meme",          color: "#E87DE8",    bg: "#1A0A1A" },
  { id: "g13", emoji: "💡", label: "B2B data idea",     color: COLORS.lime,  bg: "#141A0A" },
  { id: "g14", emoji: "📚", label: "Zero to One",       color: "#9B8EFF",    bg: "#120F1F" },
  { id: "g15", emoji: "🍔", label: "Burger spot",       color: "#FF8C5A",    bg: "#1A0F0A" },
  { id: "g16", emoji: "💬", label: "Feynman quote",     color: COLORS.amber, bg: "#1A1408" },
  { id: "g17", emoji: "🖥️", label: "CSS grid",         color: COLORS.cyan,  bg: "#0D1A1F" },
  { id: "g18", emoji: "📱", label: "Sleep app idea",    color: COLORS.lime,  bg: "#141A0A" },
  { id: "g19", emoji: "🧾", label: "Figma receipt",     color: "#6BD4A0",    bg: "#0A1A12" },
  { id: "g20", emoji: "📖", label: "Atomic Habits",     color: "#9B8EFF",    bg: "#120F1F" },
  { id: "g21", emoji: "🗺️", label: "Goa plans",        color: "#5AC8E8",    bg: "#0A1520" },
  { id: "g22", emoji: "😂", label: "Ship it meme",      color: "#E87DE8",    bg: "#1A0A1A" },
  { id: "g23", emoji: "⚡", label: "AI workflow idea",  color: COLORS.lime,  bg: "#141A0A" },
  { id: "g24", emoji: "🔑", label: "Private creds",     color: COLORS.red,   bg: "#1A0A0A" },
];

const SCAN_STEPS = [
  "Reading screenshots…",
  "Extracting OCR text…",
  "Detecting categories…",
  "Creating semantic index…",
  "Building smart collections…",
  "Protecting sensitive items…",
];

const SCAN_COUNTERS = [
  { label: "Memories scanned",        final: 24, color: COLORS.textPrimary },
  { label: "Screenshots understood",  final: 12, color: COLORS.cyan },
  { label: "Startup ideas found",     final: 3,  color: COLORS.lime },
  { label: "Receipts detected",       final: 2,  color: "#6BD4A0" },
  { label: "Sensitive items protected", final: 1, color: COLORS.red },
];

const RESULT_GROUPS = [
  { name: "Startup Ideas", icon: Code,         count: 3, color: COLORS.lime,  bg: "#141A0A" },
  { name: "Coding",        icon: Code,         count: 4, color: COLORS.cyan,  bg: "#0D1A1F" },
  { name: "Quotes",        icon: Quotes,       count: 3, color: COLORS.amber, bg: "#1A1408" },
  { name: "Food",          icon: ForkKnife,    count: 2, color: "#FF8C5A",    bg: "#1A0F0A" },
  { name: "Receipts",      icon: Receipt,      count: 2, color: "#6BD4A0",    bg: "#0A1A12" },
  { name: "Books",         icon: BookOpen,     count: 3, color: "#9B8EFF",    bg: "#120F1F" },
  { name: "Sensitive",     icon: ShieldWarning, count: 1, color: COLORS.red,  bg: "#1A0A0A" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ImportScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counters, setCounters] = useState(SCAN_COUNTERS.map(() => 0));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tile size: 4 columns
  const TILE = Math.floor((width - 40 - 9) / 4); // 20px side pad, 3 gaps of 3px

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleScan = () => {
    setScanState("scanning");
    setStepIdx(0);
    setProgress(0);
    setCounters(SCAN_COUNTERS.map(() => 0));
    let tick = 0;
    const TOTAL = 80;
    intervalRef.current = setInterval(() => {
      tick++;
      const pct = Math.min((tick / TOTAL) * 100, 100);
      setProgress(pct);
      setStepIdx(Math.min(Math.floor((tick / TOTAL) * SCAN_STEPS.length), SCAN_STEPS.length - 1));
      setCounters(SCAN_COUNTERS.map((c) => Math.min(Math.round((tick / TOTAL) * c.final), c.final)));
      if (tick >= TOTAL) {
        clearInterval(intervalRef.current!);
        setProgress(100);
        setTimeout(() => setScanState("done"), 300);
      }
    }, 50);
  };

  const handleReset = () => {
    setScanState("idle");
    setProgress(0);
    setCounters(SCAN_COUNTERS.map(() => 0));
  };

  // ─── IDLE: Messy Camera Roll ─────────────────────────────────────────────
  if (scanState === "idle") {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Scan Memory</Text>
            <Text style={styles.screenSubtitle}>Your screenshots finally make sense.</Text>
          </View>

          {/* Messy camera roll label */}
          <View style={styles.galleryHeader}>
            <View style={styles.sectionLabelRow}>
              <Text style={styles.sectionLabel}>CAMERA ROLL</Text>
              <View style={styles.messyBadge}>
                <Text style={styles.messyBadgeText}>UNSORTED</Text>
              </View>
            </View>
            <Text style={styles.gallerySubtext}>24 screenshots and photos waiting to be understood</Text>
          </View>

          {/* Gallery grid */}
          <View style={styles.galleryGrid}>
            {GALLERY_TILES.map((tile) => (
              <View
                key={tile.id}
                style={[styles.galleryTile, { width: TILE, height: TILE, backgroundColor: tile.bg }]}
              >
                <Text style={styles.galleryEmoji}>{tile.emoji}</Text>
                <Text style={[styles.galleryLabel, { color: tile.color }]} numberOfLines={1}>
                  {tile.label}
                </Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTagline}>
              Search what you saved, not where you saved it.
            </Text>
            <Pressable style={styles.scanBtn} onPress={handleScan}>
              <Brain size={18} color="#0A0A09" weight="bold" />
              <Text style={styles.scanBtnText}>Scan Memory</Text>
            </Pressable>
            <Text style={styles.ctaPrivacy}>
              🔒  All analysis runs on-device. Nothing leaves your phone.
            </Text>
          </View>

          {/* What AI detects */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>WHAT AI DETECTS</Text>
          </View>
          <View style={styles.featureGrid}>
            {[
              { emoji: "📝", label: "OCR Text",     desc: "Reads all text from screenshots" },
              { emoji: "🏷️", label: "Auto-tag",    desc: "Smart category classification" },
              { emoji: "🔒", label: "Sensitive",    desc: "Flags API keys & private info" },
              { emoji: "💡", label: "Ideas",        desc: "Detects startup & creative ideas" },
            ].map((f) => (
              <View key={f.label} style={styles.featureCard}>
                <Text style={styles.featureEmoji}>{f.emoji}</Text>
                <Text style={styles.featureLabel}>{f.label}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── SCANNING ───────────────────────────────────────────────────────────────
  if (scanState === "scanning") {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.scanScreen}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Scanning…</Text>
            <Text style={styles.screenSubtitle}>Private AI for your visual life.</Text>
          </View>

          {/* Scan orb */}
          <View style={styles.scanOrbWrapper}>
            <View style={styles.scanOrbOuter}>
              <View style={styles.scanOrbInner}>
                <Brain size={40} color={COLORS.lime} weight="duotone" />
              </View>
            </View>
            <Text style={styles.scanStepText}>{SCAN_STEPS[stepIdx]}</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressPct}>{Math.round(progress)}%</Text>
          </View>

          {/* Live counters */}
          <View style={styles.countersCard}>
            {SCAN_COUNTERS.map((c, i) => (
              <View key={c.label} style={styles.counterRow}>
                <Text style={styles.counterLabel}>{c.label}</Text>
                <Text style={[styles.counterValue, { color: c.color }]}>
                  {counters[i]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ─── DONE ────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Done</Text>
          <Text style={styles.screenSubtitle}>Your gallery is not storage anymore. It is a second brain.</Text>
        </View>

        {/* Result hero */}
        <View style={styles.resultHero}>
          <CheckCircle size={36} color={COLORS.lime} weight="fill" />
          <Text style={styles.resultHeroTitle}>24 memories organized</Text>
          <Text style={styles.resultHeroSub}>Your gallery is now searchable.</Text>

          {/* Stat row */}
          <View style={styles.resultStats}>
            {[
              { val: "24", label: "Indexed", color: COLORS.lime },
              { val: "12", label: "Understood", color: COLORS.cyan },
              { val: "3",  label: "Ideas",  color: COLORS.amber },
              { val: "1",  label: "Protected", color: COLORS.red },
            ].map((s) => (
              <View key={s.label} style={styles.resultStat}>
                <Text style={[styles.resultStatVal, { color: s.color }]}>{s.val}</Text>
                <Text style={styles.resultStatLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Smart collections generated */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>SMART COLLECTIONS CREATED</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.collectionsScroll}
        >
          {RESULT_GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <View key={g.name} style={[styles.resultGroupCard, { backgroundColor: g.bg, borderColor: g.color + "30" }]}>
                <Icon size={20} color={g.color} weight="duotone" />
                <Text style={[styles.resultGroupName, { color: g.color }]}>{g.name}</Text>
                <Text style={styles.resultGroupCount}>{g.count} items</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Primary CTA */}
        <Pressable
          style={styles.searchCtaBtn}
          onPress={() => router.push("/(tabs)/search")}
        >
          <MagnifyingGlass size={16} color="#0A0A09" weight="bold" />
          <Text style={styles.searchCtaBtnText}>Search AI startup ideas</Text>
          <ArrowRight size={14} color="#0A0A09" />
        </Pressable>

        {/* Secondary actions */}
        <View style={styles.secondaryActions}>
          <Pressable style={styles.secondaryBtn} onPress={handleReset}>
            <Camera size={15} color={COLORS.textSecondary} />
            <Text style={styles.secondaryBtnText}>Scan Again</Text>
          </Pressable>
          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push("/(tabs)/collections")}
          >
            <Sparkle size={15} color={COLORS.textSecondary} />
            <Text style={styles.secondaryBtnText}>View Collections</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
  scanScreen: { flex: 1, paddingBottom: 40 },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 3,
    lineHeight: 18,
  },

  // Gallery
  galleryHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },
  messyBadge: {
    backgroundColor: "rgba(232, 93, 74, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(232, 93, 74, 0.3)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  messyBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.red,
    letterSpacing: 0.8,
  },
  gallerySubtext: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 3,
    marginBottom: 24,
  },
  galleryTile: {
    borderRadius: 6,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  galleryEmoji: {
    fontSize: 18,
    marginBottom: 2,
  },
  galleryLabel: {
    fontSize: 8,
    fontWeight: "600",
    textAlign: "center",
  },

  // CTA section
  ctaSection: {
    marginHorizontal: 20,
    marginBottom: 28,
    alignItems: "center",
  },
  ctaTagline: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 18,
  },
  scanBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS.lime,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "100%",
    shadowColor: COLORS.lime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 12,
  },
  scanBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0A0A09",
    letterSpacing: 0.2,
  },
  ctaPrivacy: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textAlign: "center",
  },

  // What AI detects
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  featureCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
  },
  featureEmoji: { fontSize: 20, marginBottom: 6 },
  featureLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  featureDesc: {
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 15,
  },

  // Scanning screen
  scanOrbWrapper: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  scanOrbOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(200, 241, 53, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  scanOrbInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(200, 241, 53, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanStepText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    fontWeight: "500",
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: COLORS.lime,
    borderRadius: 2,
  },
  progressPct: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.lime,
    width: 36,
    textAlign: "right",
  },
  countersCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 16,
    gap: 14,
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  counterValue: {
    fontSize: 15,
    fontWeight: "700",
  },

  // Result screen
  resultHero: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.2)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  resultHeroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginTop: 10,
    letterSpacing: -0.3,
  },
  resultHeroSub: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 4,
    marginBottom: 16,
  },
  resultStats: {
    flexDirection: "row",
    gap: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
  },
  resultStat: {
    flex: 1,
    alignItems: "center",
  },
  resultStatVal: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  resultStatLabel: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: 2,
  },

  // Collections scroll
  collectionsScroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  resultGroupCard: {
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 6,
  },
  resultGroupName: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  resultGroupCount: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },

  // Search CTA
  searchCtaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.lime,
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: COLORS.lime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  searchCtaBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0A0A09",
  },

  // Secondary
  secondaryActions: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
});
