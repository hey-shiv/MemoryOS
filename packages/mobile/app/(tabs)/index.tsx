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
  MagnifyingGlass,
  Brain,
  ArrowRight,
  Sparkle,
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

function MemoryCard({ item, onPress }: any) {
  const IconComp = iconMap[item.icon] || Code;
  return (
    <Pressable
      style={[styles.memoryCard, { backgroundColor: item.bgColor }]}
      onPress={() => onPress(item.id)}
      android_ripple={{ color: "rgba(255,255,255,0.05)" }}
    >
      <View style={styles.memoryCardHeader}>
        <View style={[styles.categoryChip, { borderColor: item.accentColor + "40" }]}>
          <IconComp size={10} color={item.accentColor} weight="bold" />
          <Text style={[styles.categoryChipText, { color: item.accentColor }]}>
            {item.category.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.memoryCardDate}>{item.dateAdded}</Text>
      </View>
      <Text style={[styles.memoryCardTitle, { color: item.textColor }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.memoryCardSummary} numberOfLines={2}>
        {item.summary}
      </Text>
      <View style={styles.memoryCardFooter}>
        <View style={styles.tagRow}>
          {item.tags.slice(0, 2).map((tag: string) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.confidenceBadge, { borderColor: item.accentColor + "50" }]}>
          <Text style={[styles.confidenceText, { color: item.accentColor }]}>
            {item.confidence}%
          </Text>
        </View>
      </View>
      {item.isSensitive && (
        <View style={styles.sensitiveWarning}>
          <ShieldWarning size={10} color={COLORS.red} weight="fill" />
          <Text style={styles.sensitiveText}>SENSITIVE</Text>
        </View>
      )}
    </Pressable>
  );
}

function CollectionMiniCard({ item, onPress }: any) {
  const IconComp = iconMap[item.icon] || Code;
  return (
    <Pressable
      style={[styles.collectionMini, { backgroundColor: item.bgColor }]}
      onPress={() => onPress(item.id)}
    >
      <View style={[styles.collectionMiniIcon, { borderColor: item.accentColor + "40" }]}>
        <IconComp size={18} color={item.accentColor} weight="duotone" />
      </View>
      <Text style={[styles.collectionMiniName, { color: item.accentColor }]}>
        {item.name}
      </Text>
      <Text style={styles.collectionMiniCount}>{item.count} items</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [scanActive, setScanActive] = useState(false);

  const handleScan = () => {
    setScanActive(true);
    setTimeout(() => setScanActive(false), 2000);
  };

  const recentMemories = mockMemories.slice(0, 6);
  const topCollections = collections.slice(0, 8);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>MemoryOS</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Private visual memory</Text>
            </View>
          </View>
          <Pressable style={styles.headerIconBtn}>
            <Brain size={22} color={COLORS.lime} weight="duotone" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <Pressable
          style={styles.searchBar}
          onPress={() => router.push("/(tabs)/search")}
        >
          <MagnifyingGlass size={16} color={COLORS.textTertiary} />
          <Text style={styles.searchPlaceholder}>Search your visual memory…</Text>
        </Pressable>

        {/* Main Insight Card */}
        <View style={styles.insightCard}>
          <View style={styles.insightCardTop}>
            <View style={styles.insightBadge}>
              <Sparkle size={11} color={COLORS.lime} weight="fill" />
              <Text style={styles.insightBadgeText}>THIS WEEK</Text>
            </View>
            <Text style={styles.insightWeekCount}>14 ideas found</Text>
          </View>
          <Text style={styles.insightHeadline}>
            You saved 14 startup ideas this week
          </Text>
          <Text style={styles.insightSubtext}>
            3 were hidden inside screenshots you forgot.
          </Text>
          <View style={styles.insightDivider} />
          <Pressable
            style={[styles.scanBtn, scanActive && styles.scanBtnActive]}
            onPress={handleScan}
          >
            {scanActive ? (
              <Text style={styles.scanBtnText}>Scanning memory…</Text>
            ) : (
              <>
                <Brain size={15} color="#0A0A09" weight="bold" />
                <Text style={styles.scanBtnText}>Scan Memory</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Recent Imports */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT IMPORTS</Text>
          <Pressable style={styles.seeAllBtn} onPress={() => router.push("/(tabs)/collections")}>
            <Text style={styles.seeAllText}>See all</Text>
            <ArrowRight size={12} color={COLORS.lime} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {recentMemories.map((item) => (
            <MemoryCard
              key={item.id}
              item={item}
              onPress={(id: string) => router.push(`/memory/${id}`)}
            />
          ))}
        </ScrollView>

        {/* Smart Collections */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SMART COLLECTIONS</Text>
          <Pressable style={styles.seeAllBtn} onPress={() => router.push("/(tabs)/collections")}>
            <Text style={styles.seeAllText}>See all</Text>
            <ArrowRight size={12} color={COLORS.lime} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {topCollections.map((item) => (
            <CollectionMiniCard
              key={item.id}
              item={item}
              onPress={(id: string) => router.push(`/collection/${id}`)}
            />
          ))}
        </ScrollView>

        {/* Forgotten Gems */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FORGOTTEN GEMS</Text>
          <View style={styles.gemBadge}>
            <Text style={styles.gemBadgeText}>12 resurfaced</Text>
          </View>
        </View>
        <View style={styles.forgottenCard}>
          <View style={styles.forgottenRow}>
            <Sparkle size={14} color={COLORS.amber} weight="fill" />
            <Text style={styles.forgottenText}>
              You saved a B2B data marketplace idea 3 months ago.
            </Text>
          </View>
          <View style={[styles.forgottenRow, { marginTop: 10 }]}>
            <Sparkle size={14} color={COLORS.cyan} weight="fill" />
            <Text style={styles.forgottenText}>
              A Feynman quote on learning you starred but never revisited.
            </Text>
          </View>
          <View style={[styles.forgottenRow, { marginTop: 10 }]}>
            <Sparkle size={14} color={COLORS.lime} weight="fill" />
            <Text style={styles.forgottenText}>
              Tonkotsu ramen recipe saved 5 weeks ago. You haven't cooked it yet.
            </Text>
          </View>
          <Pressable style={styles.exploreBtn} onPress={() => router.push("/(tabs)/insights")}>
            <Text style={styles.exploreBtnText}>Explore Forgotten Gems</Text>
            <ArrowRight size={13} color={COLORS.amber} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  appName: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 3,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.lime,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    letterSpacing: 0.3,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
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
    paddingVertical: 12,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: COLORS.textTertiary,
  },
  insightCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 18,
  },
  insightCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  insightBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(200, 241, 53, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.2)",
  },
  insightBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.lime,
    letterSpacing: 1,
  },
  insightWeekCount: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  insightHeadline: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
    lineHeight: 26,
    marginBottom: 6,
  },
  insightSubtext: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  insightDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  scanBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.lime,
    borderRadius: 8,
    paddingVertical: 12,
  },
  scanBtnActive: {
    backgroundColor: COLORS.amber,
  },
  scanBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0A0A09",
    letterSpacing: 0.3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 12,
    color: COLORS.lime,
    fontWeight: "600",
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  memoryCard: {
    width: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  memoryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  categoryChipText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  memoryCardDate: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },
  memoryCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
    letterSpacing: -0.2,
  },
  memoryCardSummary: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
    marginBottom: 10,
  },
  memoryCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagRow: {
    flexDirection: "row",
    gap: 4,
  },
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
  confidenceBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: "700",
  },
  sensitiveWarning: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    backgroundColor: "rgba(232, 93, 74, 0.12)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  sensitiveText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.red,
    letterSpacing: 0.8,
  },
  collectionMini: {
    width: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },
  collectionMiniIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  collectionMiniName: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  collectionMiniCount: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },
  forgottenCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
  },
  forgottenRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  forgottenText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.amber + "40",
    borderRadius: 8,
    paddingVertical: 10,
  },
  exploreBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.amber,
  },
  gemBadge: {
    backgroundColor: "rgba(245, 166, 35, 0.12)",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(245, 166, 35, 0.25)",
  },
  gemBadgeText: {
    fontSize: 10,
    color: COLORS.amber,
    fontWeight: "600",
  },
});
