import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  Images,
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
  ScanSmiley,
} from "phosphor-react-native";
import { COLORS, mockMemories } from "../../lib/mockData";

const recentScans = mockMemories.slice(0, 6);

const iconMap: Record<string, React.ComponentType<any>> = {
  Code, Rocket, BookOpen, Quotes, ForkKnife, Receipt, ShieldWarning,
};

type ScanStatus = "idle" | "scanning" | "done";

export default function ImportScreen() {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [scanned, setScanned] = useState(0);

  const handleScan = () => {
    setScanStatus("scanning");
    setScanned(0);
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 4) + 1;
      setScanned(Math.min(count, 14));
      if (count >= 14) {
        clearInterval(interval);
        setScanStatus("done");
      }
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>Import & Scan</Text>
            <Text style={styles.screenSubtitle}>Add memories from your camera roll</Text>
          </View>
        </View>

        {/* Scan card */}
        <View style={styles.scanCard}>
          <View style={styles.scanCardInner}>
            <View style={styles.scanIconRing}>
              {scanStatus === "done" ? (
                <CheckCircle size={40} color={COLORS.lime} weight="fill" />
              ) : (
                <ScanSmiley
                  size={40}
                  color={scanStatus === "scanning" ? COLORS.cyan : COLORS.textSecondary}
                  weight="duotone"
                />
              )}
            </View>

            {scanStatus === "idle" && (
              <>
                <Text style={styles.scanTitle}>Ready to scan</Text>
                <Text style={styles.scanSubtitle}>
                  MemoryOS will analyze your screenshots and photos using on-device AI
                </Text>
              </>
            )}
            {scanStatus === "scanning" && (
              <>
                <Text style={[styles.scanTitle, { color: COLORS.cyan }]}>
                  Scanning… {scanned} / 14
                </Text>
                <Text style={styles.scanSubtitle}>
                  Extracting text, detecting categories, building memory graph
                </Text>
                <View style={styles.progressTrack}>
                  <View
                    style={[styles.progressFill, { width: `${(scanned / 14) * 100}%` }]}
                  />
                </View>
              </>
            )}
            {scanStatus === "done" && (
              <>
                <Text style={[styles.scanTitle, { color: COLORS.lime }]}>
                  14 memories indexed
                </Text>
                <Text style={styles.scanSubtitle}>
                  All done! Your new memories are now searchable.
                </Text>
              </>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <Pressable
              style={[styles.btn, styles.btnPrimary]}
              onPress={handleScan}
            >
              <Camera size={16} color="#000" weight="bold" />
              <Text style={styles.btnPrimaryText}>
                {scanStatus === "scanning" ? "Scanning…" : "Scan Now"}
              </Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.btnSecondary]}>
              <Images size={16} color={COLORS.textSecondary} />
              <Text style={styles.btnSecondaryText}>Choose Photos</Text>
            </Pressable>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: "Total indexed", value: "247", color: COLORS.lime },
            { label: "This week", value: "14", color: COLORS.cyan },
            { label: "AI accuracy", value: "94%", color: COLORS.amber },
          ].map((s) => (
            <View key={s.label} style={styles.statBox}>
              <Text style={[styles.statBoxValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statBoxLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* AI Features */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>WHAT AI DETECTS</Text>
        </View>
        <View style={styles.featureGrid}>
          {[
            { icon: "📝", label: "OCR Text", desc: "Extracts all text from screenshots" },
            { icon: "🏷️", label: "Auto-tag", desc: "Smart category classification" },
            { icon: "🔒", label: "Sensitive", desc: "Flags API keys & private info" },
            { icon: "💡", label: "Ideas", desc: "Detects startup & creative ideas" },
          ].map((f) => (
            <View key={f.label} style={styles.featureCard}>
              <Text style={styles.featureEmoji}>{f.icon}</Text>
              <Text style={styles.featureLabel}>{f.label}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        {/* Recent scans */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENTLY SCANNED</Text>
        </View>
        {recentScans.map((item) => {
          const IconComp = iconMap[item.icon] || Code;
          return (
            <View key={item.id} style={[styles.recentRow, { backgroundColor: item.bgColor }]}>
              <View style={[styles.recentIcon, { borderColor: item.accentColor + "40" }]}>
                <IconComp size={18} color={item.accentColor} weight="duotone" />
              </View>
              <View style={styles.recentBody}>
                <Text style={[styles.recentTitle, { color: item.textColor }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.recentMeta}>
                  {item.category} · {item.dateAdded}
                </Text>
              </View>
              <View style={[styles.confChip, { borderColor: item.accentColor + "40" }]}>
                <Sparkle size={9} color={item.accentColor} weight="fill" />
                <Text style={[styles.confText, { color: item.accentColor }]}>
                  {item.confidence}%
                </Text>
              </View>
            </View>
          );
        })}

        {/* Privacy note */}
        <View style={styles.privacyNote}>
          <Text style={styles.privacyNoteText}>
            🔒 All analysis runs on-device. Nothing is sent to the cloud.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  scanCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  scanCardInner: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 10,
  },
  scanIconRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  scanSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: 6,
  },
  progressFill: {
    height: 4,
    backgroundColor: COLORS.cyan,
    borderRadius: 2,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnPrimary: {
    backgroundColor: COLORS.lime,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  btnSecondary: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statBoxValue: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  statBoxLabel: {
    fontSize: 10,
    color: COLORS.textTertiary,
    textAlign: "center",
    fontWeight: "500",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  featureCard: {
    width: "47%",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    gap: 4,
  },
  featureEmoji: { fontSize: 20 },
  featureLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  featureDesc: {
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 15,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    gap: 12,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  recentBody: { flex: 1 },
  recentTitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  recentMeta: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  confChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  confText: {
    fontSize: 10,
    fontWeight: "700",
  },
  privacyNote: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "rgba(200, 241, 53, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.15)",
    borderRadius: 8,
    padding: 14,
  },
  privacyNoteText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
