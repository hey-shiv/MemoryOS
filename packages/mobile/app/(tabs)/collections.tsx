import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
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
  SquaresFour,
  List,
  ArrowRight,
  ShieldCheck,
} from "phosphor-react-native";
import { COLORS, collections } from "../../lib/mockData";

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

const categories = ["All", "Tech", "Business", "Learning", "Lifestyle", "Finance", "Work", "Private", "Fun", "Inspiration"];

function CollectionCard({ item, isGrid, index, onPress }: any) {
  const IconComp = iconMap[item.icon] || Code;

  if (isGrid) {
    return (
      <View style={{ flex: 1 }}>
        <Pressable
          style={[styles.gridCard, { backgroundColor: item.bgColor }]}
          onPress={() => onPress(item.id)}
        >
          <View style={styles.gridCardHeader}>
            <View style={[styles.gridIconWrapper, { borderColor: item.accentColor + "40" }]}>
              <IconComp size={20} color={item.accentColor} weight="duotone" />
            </View>
            {item.id === "sensitive" && (
              <ShieldCheck size={14} color={COLORS.red} weight="fill" />
            )}
          </View>
          <Text style={[styles.gridCardName, { color: item.accentColor }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.gridCardCount}>{item.count} items</Text>
          <Text style={styles.gridCardInsight} numberOfLines={2}>
            {item.insight}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <Pressable
        style={[styles.listCard, { backgroundColor: item.bgColor }]}
        onPress={() => onPress(item.id)}
      >
        <View style={[styles.listIconWrapper, { borderColor: item.accentColor + "40" }]}>
          <IconComp size={22} color={item.accentColor} weight="duotone" />
        </View>
        <View style={styles.listCardBody}>
          <View style={styles.listCardTitleRow}>
            <Text style={[styles.listCardName, { color: item.accentColor }]}>
              {item.name}
            </Text>
            <View style={[styles.countBadge, { borderColor: item.accentColor + "30" }]}>
              <Text style={[styles.countBadgeText, { color: item.accentColor }]}>
                {item.count}
              </Text>
            </View>
          </View>
          <Text style={styles.listCardInsight} numberOfLines={1}>
            {item.insight}
          </Text>
          <Text style={styles.listCardCategory}>{item.category}</Text>
        </View>
        <ArrowRight size={16} color={COLORS.textTertiary} />
      </Pressable>
    </View>
  );
}

export default function CollectionsScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGrid, setIsGrid] = useState(true);

  const filtered = activeCategory === "All"
    ? collections
    : collections.filter((c) => c.category === activeCategory);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.screenTitle}>Collections</Text>
          <Text style={styles.screenSubtitle}>{collections.length} smart collections</Text>
        </View>
        <Pressable
          style={styles.toggleBtn}
          onPress={() => setIsGrid(!isGrid)}
        >
          {isGrid ? (
            <List size={18} color={COLORS.textSecondary} />
          ) : (
            <SquaresFour size={18} color={COLORS.textSecondary} />
          )}
        </Pressable>
      </View>

      {/* Category Filter Chips */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat}
              style={[styles.chip, activeCategory === cat && styles.chipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.divider} />

      {/* Collections Grid/List */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          isGrid ? styles.gridContainer : styles.listContainer,
          { paddingBottom: 24 },
        ]}
      >
        {isGrid ? (
          <View style={styles.grid}>
            {filtered.map((item, i) => (
              <CollectionCard
                key={item.id}
                item={item}
                isGrid={true}
                index={i}
                onPress={(id: string) => router.push(`/collection/${id}`)}
              />
            ))}
          </View>
        ) : (
          filtered.map((item, i) => (
            <CollectionCard
              key={item.id}
              item={item}
              isGrid={false}
              index={i}
              onPress={(id: string) => router.push(`/collection/${id}`)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
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
  toggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  chipsScroll: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    borderColor: COLORS.lime + "50",
    backgroundColor: "rgba(200, 241, 53, 0.08)",
  },
  chipText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    fontWeight: "600",
  },
  chipTextActive: {
    color: COLORS.lime,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  gridContainer: {
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    minWidth: "47%",
    maxWidth: "48%",
    marginBottom: 0,
  },
  gridCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  gridIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  gridCardName: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  gridCardCount: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginBottom: 6,
  },
  gridCardInsight: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 15,
  },
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    gap: 12,
  },
  listIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  listCardBody: {
    flex: 1,
    gap: 3,
  },
  listCardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listCardName: {
    fontSize: 15,
    fontWeight: "700",
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
  listCardInsight: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  listCardCategory: {
    fontSize: 10,
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
