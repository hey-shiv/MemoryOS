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
  MagnifyingGlass,
  SortDescending,
} from "phosphor-react-native";
import { COLORS, mockMemories, collections } from "../../lib/mockData";

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

const categoryToMemoryCategory: Record<string, string> = {
  coding: "Coding",
  startup: "Startup Ideas",
  books: "Books",
  quotes: "Quotes",
  food: "Food",
  receipts: "Receipts",
  study: "Books",
  fitness: "Fitness",
  travel: "Travel",
  memes: "Memes",
  documents: "Documents",
  sensitive: "Sensitive",
};

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const collection = collections.find((c) => c.id === id) ?? collections[0];
  const memCategory = categoryToMemoryCategory[id] ?? collection.name;
  const items = mockMemories.filter((m) => m.category === memCategory || m.id <= "6");
  const CollectionIcon = iconMap[collection.icon] || Code;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={COLORS.textPrimary} />
        </Pressable>
        <View style={[styles.collectionIconWrap, { borderColor: collection.accentColor + "40", backgroundColor: collection.bgColor }]}>
          <CollectionIcon size={18} color={collection.accentColor} weight="duotone" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.headerTitle, { color: collection.accentColor }]}>
            {collection.name}
          </Text>
          <Text style={styles.headerCount}>{collection.count} items</Text>
        </View>
        <Pressable style={styles.headerActionBtn}>
          <SortDescending size={18} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      {/* Insight bar */}
      <View>
        <View style={[styles.insightBar, { backgroundColor: collection.bgColor, borderColor: collection.accentColor + "25" }]}>
          <Text style={[styles.insightBarText, { color: collection.accentColor }]}>
            {collection.insight}
          </Text>
        </View>
      </View>

      {/* Search */}
      <View>
        <View style={styles.searchBar}>
          <MagnifyingGlass size={14} color={COLORS.textTertiary} />
          <Text style={styles.searchPlaceholder}>Search in {collection.name}…</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Section label */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ALL MEMORIES</Text>
          <View style={[styles.countBadge, { borderColor: collection.accentColor + "40" }]}>
            <Text style={[styles.countBadgeText, { color: collection.accentColor }]}>
              {items.length}
            </Text>
          </View>
        </View>

        <View style={styles.itemsList}>
          {items.map((item, i) => {
            const ItemIcon = iconMap[item.icon] || Code;
            return (
              <View key={item.id}>
                <Pressable
                  style={[styles.itemCard, { backgroundColor: item.bgColor }]}
                  onPress={() => router.push(`/memory/${item.id}`)}
                >
                  <View style={[styles.itemThumb, { borderColor: item.accentColor + "30" }]}>
                    <ItemIcon size={20} color={item.accentColor} weight="duotone" />
                    {item.isSensitive && (
                      <View style={styles.sensitivePin}>
                        <ShieldWarning size={10} color={COLORS.red} weight="fill" />
                      </View>
                    )}
                  </View>
                  <View style={styles.itemBody}>
                    <Text style={[styles.itemTitle, { color: item.textColor }]} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.itemSummary} numberOfLines={2}>
                      {item.summary}
                    </Text>
                    <View style={styles.itemFooter}>
                      <View style={styles.tagRow}>
                        {item.tags.slice(0, 2).map((tag) => (
                          <View key={tag} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                      <Text style={styles.itemDate}>{item.dateAdded}</Text>
                    </View>
                  </View>
                  <View style={[styles.confPill, { borderColor: item.accentColor + "40" }]}>
                    <Text style={[styles.confPillText, { color: item.accentColor }]}>
                      {item.confidence}%
                    </Text>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
  collectionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: { flex: 1 },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headerCount: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  headerActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  insightBar: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  insightBarText: {
    fontSize: 13,
    fontWeight: "500",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchPlaceholder: {
    fontSize: 13,
    color: COLORS.textTertiary,
  },
  scroll: { flex: 1 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },
  countBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  itemsList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    position: "relative",
  },
  sensitivePin: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.bg,
    borderRadius: 6,
    padding: 2,
  },
  itemBody: { flex: 1, gap: 4 },
  itemTitle: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  itemSummary: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  tagRow: { flexDirection: "row", gap: 4 },
  tag: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  itemDate: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },
  confPill: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  confPillText: {
    fontSize: 10,
    fontWeight: "700",
  },
});
