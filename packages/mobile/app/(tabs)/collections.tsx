import React, { useState } from "react";
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

const categories = [
  "All", "Tech", "Business", "Learning",
  "Lifestyle", "Finance", "Work", "Private", "Fun", "Inspiration",
];

function GridCard({ item, cardWidth, onPress }: any) {
  const IconComp = iconMap[item.icon] || Code;
  return (
    <Pressable
      style={[styles.gridCard, { backgroundColor: item.bgColor, width: cardWidth }]}
      onPress={() => onPress(item.id)}
      android_ripple={{ color: "rgba(255,255,255,0.05)" }}
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
  );
}

function ListCard({ item, onPress }: any) {
  const IconComp = iconMap[item.icon] || Code;
  return (
    <Pressable
      style={[styles.listCard, { backgroundColor: item.bgColor }]}
      onPress={() => onPress(item.id)}
      android_ripple={{ color: "rgba(255,255,255,0.05)" }}
    >
      <View style={[styles.listIconWrapper, { borderColor: item.accentColor + "40" }]}>
        <IconComp size={22} color={item.accentColor} weight="duotone" />
      </View>
      <View style={styles.listCardBody}>
        <View style={styles.listCardTitleRow}>
          <Text style={[styles.listCardName, { color: item.accentColor }]} numberOfLines={1}>
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
  );
}

export default function CollectionsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGrid, setIsGrid] = useState(true);

  // 2-column grid: full width minus padding (20 each side) minus gap (10) divided by 2
  const PADDING = 20;
  const GAP = 10;
  const cardWidth = (width - PADDING * 2 - GAP) / 2;

  const filtered = activeCategory === "All"
    ? collections
    : collections.filter((c) => c.category === activeCategory);

  const goToCollection = (id: string) => router.push(`/collection/${id}`);

  // Pair items for grid rows
  const rows: typeof collections[] = [];
  for (let i = 0; i < filtered.length; i += 2) {
    rows.push(filtered.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.glow} />
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>AI ARCHIVE</Text>
          <Text style={styles.screenTitle}>Collections</Text>
          <Text style={styles.screenSubtitle}>Your camera roll, rebuilt as knowledge</Text>
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

      {/* Category Filter */}
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

      <View style={styles.divider} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: PADDING, paddingBottom: 32 }}
      >
        {isGrid ? (
          // Explicit row-by-row rendering to avoid flex stretch issues
          rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              {row.map((item) => (
                <GridCard
                  key={item.id}
                  item={item}
                  cardWidth={cardWidth}
                  onPress={goToCollection}
                />
              ))}
              {/* Spacer if odd last row */}
              {row.length === 1 && <View style={{ width: cardWidth }} />}
            </View>
          ))
        ) : (
          filtered.map((item) => (
            <ListCard key={item.id} item={item} onPress={goToCollection} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070806",
  },
  glow: {
    position: "absolute",
    top: -90,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(200,255,46,0.07)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  kicker: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.lime,
    letterSpacing: 1.8,
    marginBottom: 3,
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#F8F1E7",
  },
  screenSubtitle: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  toggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(245,240,232,0.06)",
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(245,240,232,0.045)",
  },
  chipActive: {
    borderColor: COLORS.lime + "55",
    backgroundColor: "rgba(200,255,46,0.10)",
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
    backgroundColor: "rgba(245,240,232,0.07)",
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  gridRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  gridCard: {
    borderWidth: 1,
    borderColor: "rgba(245,240,232,0.11)",
    borderRadius: 12,
    padding: 14,
    minHeight: 152,
    overflow: "hidden",
  },
  gridCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  gridIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  gridCardName: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 3,
    lineHeight: 19,
  },
  gridCardCount: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginBottom: 8,
    fontWeight: "800",
  },
  gridCardInsight: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    gap: 12,
    marginBottom: 10,
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
    flex: 1,
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
