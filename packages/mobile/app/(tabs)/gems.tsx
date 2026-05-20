import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { COLORS, forgottenGems, MemoryItem } from "../../lib/mockData";
import { Badge, GhostButton, ImagePlaceholder, ScreenHeader, SurfaceCard, sharedStyles } from "../../lib/ui";

function daysAgo(dateStr: string): string {
  const days = Math.round((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function GemCard({ item }: { item: MemoryItem }) {
  const router = useRouter();
  const variant = item.primaryCategory === "coding" ? "cyan" : item.primaryCategory === "food" || item.primaryCategory === "fitness" ? "green" : "amber";

  return (
    <SurfaceCard accent={COLORS.amber} style={styles.gemCard}>
      <View style={styles.gemTop}>
        <Badge variant="amber">{daysAgo(item.importedAt)}</Badge>
        <Badge variant={variant}>{item.category}</Badge>
      </View>
      <Pressable onPress={() => router.push(`/memory/${item.id}`)}>
        <ImagePlaceholder item={item} wide style={styles.gemImage} />
      </Pressable>
      <Text style={styles.gemInsight}>{item.gemInsight}</Text>
      <View style={styles.tagRow}>
        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="neutral" style={styles.tinyBadge}>{tag}</Badge>
        ))}
      </View>
      <View style={styles.actions}>
        <GhostButton style={styles.actionButton} onPress={() => router.push(`/memory/${item.id}`)}>Open</GhostButton>
        <GhostButton style={styles.actionButton}>Add to Collection</GhostButton>
      </View>
      <Text style={styles.savedContext}>{item.savedContext}</Text>
    </SurfaceCard>
  );
}

export default function GemsScreen() {
  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
        <ScreenHeader title="Forgotten Gems" subtitle="Memories you saved but never revisited" />
        <View style={styles.list}>
          {forgottenGems.map((item) => (
            <GemCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  gemCard: {
    padding: 14,
  },
  gemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  gemImage: {
    marginBottom: 12,
  },
  gemInsight: {
    color: COLORS.textPrimary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },
  tinyBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
  },
  savedContext: {
    color: COLORS.textTertiary,
    fontSize: 12,
    lineHeight: 17,
    fontStyle: "italic",
    marginTop: 12,
  },
});
