import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, collections, mockMemories } from "../../lib/mockData";
import {
  Badge,
  CollectionIcon,
  ConfidenceBar,
  ImagePlaceholder,
  ScreenHeader,
  SearchField,
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

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const collection = collections.find((entry) => entry.id === id) ?? collections[0];
  const items = mockMemories.filter((item) => item.collectionIds.includes(collection.id));

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScreenHeader
        title={collection.name}
        subtitle={`${items.length} memories`}
        back={() => router.back()}
        right={<CollectionIcon collection={collection} />}
        edgePadding
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
        <SurfaceCard accent={collection.accentColor} style={styles.insightCard}>
          <Text style={[styles.insightTitle, { color: collection.accentColor }]}>{collection.insight}</Text>
          <Text style={styles.insightCopy}>{collection.description}</Text>
        </SurfaceCard>

        <View style={styles.searchWrap}>
          <SearchField placeholder={`Search in ${collection.name}...`} />
        </View>

        <View style={sharedStyles.sectionRow}>
          <Text style={sharedStyles.sectionLabel}>All Memories</Text>
          <Badge variant="neutral">{items.length} indexed</Badge>
        </View>

        <View style={styles.grid}>
          {items.map((item) => (
            <Pressable key={item.id} style={styles.gridItem} onPress={() => router.push(`/memory/${item.id}`)}>
              <ImagePlaceholder item={item} />
              <View style={styles.cardMeta}>
                <Badge variant={variantFor(item.primaryCategory, item.isSensitive)} style={styles.tinyBadge}>
                  {item.category}
                </Badge>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.confidenceRow}>
                  <ConfidenceBar value={item.confidence} width={74} />
                  <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}%</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  insightCard: {
    marginTop: -2,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  insightCopy: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  searchWrap: {
    marginTop: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  gridItem: {
    width: "48%",
  },
  cardMeta: {
    gap: 7,
    marginTop: 8,
  },
  tinyBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  itemTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
  },
  confidenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  confidenceText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: "800",
  },
});
