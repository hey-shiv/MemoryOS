import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Gear } from "phosphor-react-native";
import { COLORS, collections } from "../../lib/mockData";
import { Badge, CollectionIcon, IconButton, ScreenHeader, SurfaceCard, sharedStyles } from "../../lib/ui";

const filters = ["All", "Recent", "Sensitive"] as const;

export default function CollectionsScreen() {
  const router = useRouter();
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = active === "Sensitive" ? collections.filter((item) => item.id === "col_sensitive") : collections;

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
        <ScreenHeader title="Collections" subtitle="12 smart collections" right={<IconButton icon={Gear} />} />

        <View style={styles.segmented}>
          {filters.map((filter) => (
            <Pressable
              key={filter}
              style={[styles.segment, active === filter ? styles.segmentActive : null]}
              onPress={() => setActive(filter)}
            >
              <Text style={[styles.segmentText, active === filter ? styles.segmentTextActive : null]}>{filter}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.list}>
          {visible.map((collection) => (
            <SurfaceCard
              key={collection.id}
              style={styles.collectionRow}
              onPress={() => router.push(`/collection/${collection.id}`)}
            >
              <View style={[styles.colorDot, { backgroundColor: collection.accentColor }]} />
              <CollectionIcon collection={collection} />
              <View style={styles.collectionText}>
                <Text style={styles.collectionName}>{collection.name}</Text>
                <Text style={styles.collectionInsight}>{collection.description}</Text>
              </View>
              <Badge variant={collection.id === "col_sensitive" ? "red" : "neutral"}>{collection.count}</Badge>
              <Text style={styles.chevron}>›</Text>
            </SurfaceCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  segment: {
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: COLORS.cyanDim,
    borderColor: "rgba(0,212,255,0.30)",
  },
  segmentText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "800",
  },
  segmentTextActive: {
    color: COLORS.cyan,
  },
  list: {
    gap: 10,
  },
  collectionRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 99,
  },
  collectionText: {
    flex: 1,
  },
  collectionName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  collectionInsight: {
    color: COLORS.textTertiary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  chevron: {
    color: COLORS.textTertiary,
    fontSize: 26,
    lineHeight: 26,
  },
});
