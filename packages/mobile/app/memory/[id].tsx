import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, mockMemories } from "../../lib/mockData";
import {
  Badge,
  ConfidenceBar,
  GhostButton,
  ImagePlaceholder,
  PrimaryButton,
  ScreenHeader,
  SurfaceCard,
  sharedStyles,
} from "../../lib/ui";

function variantFor(category: string, sensitive: boolean): "cyan" | "amber" | "green" | "red" | "neutral" {
  if (sensitive) return "red";
  if (category === "startup" || category === "quotes") return "amber";
  if (category === "food" || category === "fitness") return "green";
  if (category === "coding" || category === "travel" || category === "whiteboard") return "cyan";
  return "neutral";
}

export default function MemoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = mockMemories.find((memory) => memory.id === id) ?? mockMemories[0];
  const similar = mockMemories
    .filter((memory) => memory.id !== item.id && memory.primaryCategory === item.primaryCategory)
    .slice(0, 4);
  const variant = variantFor(item.primaryCategory, item.isSensitive);

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScreenHeader title="Memory" subtitle={item.dateAdded} back={() => router.back()} edgePadding />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ImagePlaceholder item={item} style={styles.heroImage} />

        <SurfaceCard style={styles.sheet}>
          <Badge variant={variant}>{item.category}</Badge>
          <Text style={styles.secondary}>{item.secondaryCategory}</Text>
          <Text style={styles.summary}>{item.summary}</Text>

          <Text style={styles.sectionLabel}>OCR Text</Text>
          <View style={styles.ocrBox}>
            <Text style={[styles.ocrText, item.primaryCategory === "coding" ? styles.ocrCode : null]}>
              {item.isSensitive ? item.ocrText.replace(/[A-Za-z0-9]/g, "█") : item.ocrText}
            </Text>
          </View>

          <View style={styles.tagRow}>
            {item.tags.map((tag) => (
              <Badge key={tag} variant="neutral" style={styles.tinyBadge}>{tag}</Badge>
            ))}
          </View>

          <View style={styles.confidenceRow}>
            <ConfidenceBar value={item.confidence} width={170} />
            <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}% confident</Text>
          </View>

          {item.isSensitive ? (
            <View style={styles.warningCard}>
              <Text style={styles.warningTitle}>Sensitive info detected</Text>
              <Text style={styles.warningCopy}>{item.sensitiveReason}</Text>
            </View>
          ) : null}

          <View style={styles.actions}>
            <GhostButton style={styles.action}>Convert to Note</GhostButton>
            <PrimaryButton style={styles.action}>Add to Collection</PrimaryButton>
          </View>
        </SurfaceCard>

        <View style={sharedStyles.sectionRow}>
          <Text style={sharedStyles.sectionLabel}>Similar Memories</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarRow}>
          {similar.map((memory) => (
            <Pressable key={memory.id} style={styles.similarCard} onPress={() => router.push(`/memory/${memory.id}`)}>
              <ImagePlaceholder item={memory} small />
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingBottom: 100,
  },
  heroImage: {
    width: "100%",
    maxHeight: 430,
  },
  sheet: {
    marginTop: -18,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: COLORS.surfaceAlt,
  },
  secondary: {
    color: COLORS.textTertiary,
    fontSize: 12,
    marginTop: 10,
  },
  summary: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  sectionLabel: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.3,
    textTransform: "uppercase",
    marginTop: 18,
    marginBottom: 8,
  },
  ocrBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 12,
    maxHeight: 150,
  },
  ocrText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    lineHeight: 18,
  },
  ocrCode: {
    fontFamily: "Courier",
    color: COLORS.cyan,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 13,
  },
  tinyBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  confidenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },
  confidenceText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "800",
  },
  warningCard: {
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,77,106,0.25)",
    backgroundColor: COLORS.redDim,
    padding: 13,
  },
  warningTitle: {
    color: COLORS.red,
    fontSize: 14,
    fontWeight: "900",
  },
  warningCopy: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  action: {
    flex: 1,
  },
  similarRow: {
    gap: 10,
    paddingRight: 18,
  },
  similarCard: {
    width: 86,
  },
});
