import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
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
  Brain,
  TextAa,
  Hash,
  ArrowsHorizontal,
  EyeSlash,
  Plus,
  Note,
  Sparkle,
  Warning,
} from "phosphor-react-native";
import { COLORS, mockMemories } from "../../lib/mockData";

const iconMap: Record<string, React.ComponentType<any>> = {
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
};

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"summary" | "ocr" | "similar">("summary");

  const item = mockMemories.find((m) => m.id === id) ?? mockMemories[0];
  const similar = mockMemories.filter((m) => m.id !== item.id && m.category === item.category).slice(0, 3);
  const IconComp = iconMap[item.icon] || Code;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={COLORS.textPrimary} />
        </Pressable>
        <View style={[styles.headerCatBadge, { borderColor: item.accentColor + "40" }]}>
          <IconComp size={12} color={item.accentColor} weight="bold" />
          <Text style={[styles.headerCatText, { color: item.accentColor }]}>
            {item.category.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.headerDate}>{item.dateAdded}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Image preview card */}
        <View>
          <View style={[styles.previewCard, { backgroundColor: item.bgColor }]}>
            {item.isSensitive && (
              <View style={styles.sensitiveOverlay}>
                <ShieldWarning size={28} color={COLORS.red} weight="fill" />
                <Text style={styles.sensitiveOverlayText}>Sensitive Content</Text>
                <Text style={styles.sensitiveOverlaySubtext}>Tap to reveal (not available in demo)</Text>
              </View>
            )}
            <View style={styles.previewInner}>
              <IconComp size={48} color={item.accentColor} weight="duotone" />
              {item.ocrText && !item.isSensitive && (
                <Text style={[styles.ocrPreviewText, { color: item.textColor + "80" }]} numberOfLines={3}>
                  {item.ocrText}
                </Text>
              )}
            </View>

            {/* Confidence badge */}
            <View style={[styles.confBadge, { borderColor: item.accentColor + "50" }]}>
              <Sparkle size={10} color={item.accentColor} weight="fill" />
              <Text style={[styles.confBadgeText, { color: item.accentColor }]}>
                {item.confidence}% confidence
              </Text>
            </View>
          </View>
        </View>

        {/* Title + tags */}
        <View style={styles.titleSection}>
          <Text style={styles.memTitle}>{item.title}</Text>
          <View style={styles.tagRow}>
            {item.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Hash size={10} color={COLORS.textTertiary} />
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sensitive warning */}
        {item.isSensitive && (
          <View>
            <View style={styles.sensitiveWarningCard}>
              <Warning size={16} color={COLORS.red} weight="fill" />
              <View style={{ flex: 1 }}>
                <Text style={styles.sensitiveWarnTitle}>Sensitive info detected</Text>
                <Text style={styles.sensitiveWarnDesc}>
                  This screenshot may contain API keys or private credentials. Review carefully.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View>
          <View style={styles.tabRow}>
            {(["summary", "ocr", "similar"] as const).map((tab) => (
              <Pressable
                key={tab}
                style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab)}
              >
                {tab === "summary" && <Brain size={13} color={activeTab === tab ? COLORS.lime : COLORS.textTertiary} />}
                {tab === "ocr" && <TextAa size={13} color={activeTab === tab ? COLORS.lime : COLORS.textTertiary} />}
                {tab === "similar" && <ArrowsHorizontal size={13} color={activeTab === tab ? COLORS.lime : COLORS.textTertiary} />}
                <Text style={[styles.tabBtnText, activeTab === tab && styles.tabBtnTextActive]}>
                  {tab === "summary" ? "AI Summary" : tab === "ocr" ? "OCR Text" : "Similar"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Tab content */}
        {activeTab === "summary" && (
          <View style={styles.tabContent}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Brain size={14} color={COLORS.lime} weight="duotone" />
                <Text style={styles.summaryHeaderText}>AI ANALYSIS</Text>
              </View>
              <Text style={styles.summaryBody}>{item.summary}</Text>
            </View>

            <View style={styles.metaCard}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Category</Text>
                <View style={[styles.metaChip, { borderColor: item.accentColor + "40" }]}>
                  <Text style={[styles.metaChipText, { color: item.accentColor }]}>{item.category}</Text>
                </View>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Confidence</Text>
                <Text style={styles.metaValue}>{item.confidence}%</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Added</Text>
                <Text style={styles.metaValue}>{item.dateAdded}</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Privacy</Text>
                <View style={[styles.metaChip, { borderColor: (item.isSensitive ? COLORS.red : COLORS.lime) + "40" }]}>
                  <Text style={[styles.metaChipText, { color: item.isSensitive ? COLORS.red : COLORS.lime }]}>
                    {item.isSensitive ? "Sensitive" : "Safe"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === "ocr" && (
          <View style={styles.tabContent}>
            <View style={styles.ocrCard}>
              <View style={styles.ocrHeader}>
                <TextAa size={14} color={COLORS.cyan} weight="duotone" />
                <Text style={styles.ocrHeaderText}>EXTRACTED TEXT</Text>
              </View>
              {item.ocrText ? (
                <Text style={[styles.ocrBody, item.isSensitive && styles.ocrBodyBlurred]}>
                  {item.isSensitive ? "████████ ████ ██████ [REDACTED]" : item.ocrText}
                </Text>
              ) : (
                <Text style={styles.ocrEmpty}>No text detected in this image.</Text>
              )}
            </View>
          </View>
        )}

        {activeTab === "similar" && (
          <View style={styles.tabContent}>
            {similar.length > 0 ? (
              similar.map((sim, i) => {
                const SimilarIcon = iconMap[sim.icon] || Code;
                return (
                  <View key={sim.id}>
                    <Pressable
                      style={[styles.similarCard, { backgroundColor: sim.bgColor }]}
                      onPress={() => router.push(`/memory/${sim.id}`)}
                    >
                      <View style={[styles.similarThumb, { borderColor: sim.accentColor + "30" }]}>
                        <SimilarIcon size={18} color={sim.accentColor} weight="duotone" />
                      </View>
                      <View style={styles.similarBody}>
                        <Text style={[styles.similarTitle, { color: sim.textColor }]} numberOfLines={1}>{sim.title}</Text>
                        <Text style={styles.similarSummary} numberOfLines={1}>{sim.summary}</Text>
                      </View>
                    </Pressable>
                  </View>
                );
              })
            ) : (
              <Text style={styles.noSimilar}>No similar memories found.</Text>
            )}
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsBar}>
        <Pressable style={styles.actionBtn}>
          <Note size={16} color={COLORS.textPrimary} weight="duotone" />
          <Text style={styles.actionBtnText}>Convert to Note</Text>
        </Pressable>
        <Pressable style={styles.actionBtnAccent}>
          <Plus size={16} color="#0A0A09" weight="bold" />
          <Text style={styles.actionBtnAccentText}>Add to Collection</Text>
        </Pressable>
        <Pressable style={styles.actionBtnSmall}>
          <EyeSlash size={16} color={COLORS.textTertiary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCatBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  headerCatText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  headerDate: {
    marginLeft: "auto",
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  scroll: { flex: 1 },
  previewCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  sensitiveOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,8,8,0.85)",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    zIndex: 2,
  },
  sensitiveOverlayText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.red,
  },
  sensitiveOverlaySubtext: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  previewInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 20,
  },
  ocrPreviewText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "monospace",
    lineHeight: 18,
  },
  confBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(10,10,9,0.8)",
  },
  confBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 14,
    gap: 8,
  },
  memTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  tagRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  sensitiveWarningCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "rgba(232, 93, 74, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(232, 93, 74, 0.25)",
    borderRadius: 8,
    padding: 12,
  },
  sensitiveWarnTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.red,
  },
  sensitiveWarnDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 4,
    gap: 2,
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 8,
    borderRadius: 6,
  },
  tabBtnActive: {
    backgroundColor: "rgba(200, 241, 53, 0.1)",
    borderWidth: 1,
    borderColor: COLORS.lime + "30",
  },
  tabBtnText: {
    fontSize: 11,
    color: COLORS.textTertiary,
    fontWeight: "600",
  },
  tabBtnTextActive: {
    color: COLORS.lime,
  },
  tabContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  summaryHeaderText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.lime,
    letterSpacing: 1.2,
  },
  summaryBody: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  metaCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  metaLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  metaValue: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  metaChip: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  metaChipText: {
    fontSize: 11,
    fontWeight: "700",
  },
  metaDivider: {
    height: 1,
    backgroundColor: COLORS.borderMuted,
    marginLeft: 14,
  },
  ocrCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
  },
  ocrHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  ocrHeaderText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.cyan,
    letterSpacing: 1.2,
  },
  ocrBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 22,
    fontFamily: "monospace",
  },
  ocrBodyBlurred: {
    color: COLORS.red + "80",
  },
  ocrEmpty: {
    fontSize: 13,
    color: COLORS.textTertiary,
    fontStyle: "italic",
  },
  similarCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  similarThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  similarBody: { flex: 1 },
  similarTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  similarSummary: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  noSimilar: {
    fontSize: 13,
    color: COLORS.textTertiary,
    textAlign: "center",
    paddingVertical: 24,
  },
  actionsBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 12,
  },
  actionBtnText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  actionBtnAccent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.lime,
    borderRadius: 8,
    paddingVertical: 12,
  },
  actionBtnAccentText: {
    fontSize: 13,
    color: "#0A0A09",
    fontWeight: "700",
  },
  actionBtnSmall: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
});
