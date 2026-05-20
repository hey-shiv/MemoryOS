import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Bell, Gear, Sparkle } from "phosphor-react-native";
import { COLORS, collections, forgottenGems, mockMemories } from "../../lib/mockData";
import {
  Badge,
  CollectionIcon,
  IconButton,
  ImagePlaceholder,
  ScreenHeader,
  SearchField,
  SurfaceCard,
  categoryAccent,
  getCategoryIcon,
  sharedStyles,
} from "../../lib/ui";

function CollectionCard({ collection }: { collection: (typeof collections)[0] }) {
  const router = useRouter();
  const sample = mockMemories.filter((item) => item.collectionIds.includes(collection.id)).slice(0, 3);

  return (
    <SurfaceCard style={styles.collectionCard} onPress={() => router.push(`/collection/${collection.id}`)}>
      <View style={styles.collectionTop}>
        <CollectionIcon collection={collection} />
        <Badge variant="neutral">{collection.count} items</Badge>
      </View>
      <Text style={styles.collectionName}>{collection.name}</Text>
      <Text style={styles.collectionInsight}>{collection.insight}</Text>
      <View style={styles.tinyThumbRow}>
        {sample.map((item) => {
          const Icon = getCategoryIcon(item.icon);
          return (
            <View key={item.id} style={[styles.tinyThumb, { backgroundColor: item.bgColor, borderColor: item.accentColor + "44" }]}>
              <Icon size={12} color={item.accentColor} weight="bold" />
            </View>
          );
        })}
      </View>
    </SurfaceCard>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const recent = mockMemories.slice(0, 5);
  const gem = forgottenGems[0];
  const GemIcon = getCategoryIcon(gem.icon);

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
        <ScreenHeader
          title="MemoryOS"
          subtitle="Good morning, Arjun"
          right={
            <>
              <IconButton icon={Bell} />
              <IconButton icon={Gear} onPress={() => router.push("/(tabs)/settings")} />
            </>
          }
        />

        <SurfaceCard accent={COLORS.cyan} style={styles.insightCard} onPress={() => router.push("/(tabs)/gems")}>
          <View style={styles.insightLabelRow}>
            <Sparkle size={16} color={COLORS.cyan} weight="fill" />
            <Text style={styles.insightLabel}>Memory Insight</Text>
          </View>
          <Text style={styles.insightTitle}>You saved 14 startup ideas this week</Text>
          <Text style={styles.insightCopy}>3 look promising. Tap to review before they disappear again.</Text>
          <Text style={styles.reviewLink}>{"Review ->"}</Text>
        </SurfaceCard>

        <Pressable style={styles.searchWrap} onPress={() => router.push("/(tabs)/search")}>
          <SearchField placeholder="Search your visual memory..." />
        </Pressable>

        <View style={sharedStyles.sectionRow}>
          <Text style={sharedStyles.sectionLabel}>Smart Collections</Text>
          <Pressable onPress={() => router.push("/(tabs)/collections")}>
            <Text style={sharedStyles.seeAll}>{"See all ->"}</Text>
          </Pressable>
        </View>

        <View style={styles.collectionsGrid}>
          {collections.slice(0, 10).map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </View>

        <View style={sharedStyles.sectionRow}>
          <Text style={sharedStyles.sectionLabel}>Recent Imports</Text>
          <Text style={sharedStyles.seeAll}>5 fresh</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
          {recent.map((item) => (
            <Pressable key={item.id} style={styles.recentCard} onPress={() => router.push(`/memory/${item.id}`)}>
              <ImagePlaceholder item={item} small />
            </Pressable>
          ))}
        </ScrollView>

        <SurfaceCard accent={COLORS.amber} style={styles.gemCard} onPress={() => router.push("/(tabs)/gems")}>
          <Badge variant="amber">Forgotten Gem</Badge>
          <View style={styles.gemContent}>
            <View style={[styles.gemIcon, { backgroundColor: gem.bgColor, borderColor: gem.accentColor + "55" }]}>
              <GemIcon size={24} color={categoryAccent(gem.primaryCategory)} weight="duotone" />
            </View>
            <View style={styles.gemTextWrap}>
              <Text style={styles.gemTitle}>You saved this startup idea 92 days ago.</Text>
              <Text style={styles.gemCopy} numberOfLines={2}>{gem.gemInsight}</Text>
              <Text style={styles.gemLink}>{"Resurface ->"}</Text>
            </View>
          </View>
        </SurfaceCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  insightCard: {
    marginTop: 2,
  },
  insightLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  insightLabel: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  insightTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  insightCopy: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  reviewLink: {
    color: COLORS.cyan,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 14,
  },
  searchWrap: {
    marginTop: 16,
  },
  collectionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  collectionCard: {
    width: "48%",
    minHeight: 166,
    padding: 14,
  },
  collectionTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  collectionName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 12,
  },
  collectionInsight: {
    color: COLORS.textTertiary,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  tinyThumbRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
  },
  tinyThumb: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  recentRow: {
    gap: 10,
    paddingRight: 18,
  },
  recentCard: {
    width: 84,
  },
  gemCard: {
    marginTop: 24,
    marginBottom: 8,
  },
  gemContent: {
    flexDirection: "row",
    gap: 14,
    marginTop: 14,
  },
  gemIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gemTextWrap: {
    flex: 1,
  },
  gemTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },
  gemCopy: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  gemLink: {
    color: COLORS.amber,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 10,
  },
});
