import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, weeklyStats } from "../../lib/mockData";
import { Badge, ScreenHeader, SurfaceCard, sharedStyles } from "../../lib/ui";

const ranges = ["7 days", "30 days", "All time"] as const;
const metrics = [
  { label: "Coding", value: 8, color: COLORS.cyan },
  { label: "Startup", value: 12, color: COLORS.amber },
  { label: "Food", value: 21, color: COLORS.green },
  { label: "Quotes", value: 17, color: COLORS.amber },
];
const bars = [
  { label: "Food", value: 21, color: COLORS.green },
  { label: "Quotes", value: 17, color: COLORS.amber },
  { label: "Startup Ideas", value: 12, color: COLORS.amber },
  { label: "Coding", value: 8, color: COLORS.cyan },
  { label: "Receipts", value: 5, color: COLORS.textSecondary },
];

export default function InsightsScreen() {
  const [range, setRange] = useState<(typeof ranges)[number]>("30 days");
  const max = Math.max(...bars.map((bar) => bar.value));

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
        <ScreenHeader title="Insights" subtitle="Patterns from your visual memory" />

        <View style={styles.rangeRow}>
          {ranges.map((item) => (
            <Pressable key={item} style={[styles.rangePill, range === item ? styles.rangePillActive : null]} onPress={() => setRange(item)}>
              <Text style={[styles.rangeText, range === item ? styles.rangeTextActive : null]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <SurfaceCard accent={COLORS.amber} style={styles.heroStat}>
          <Badge variant="amber">{range}</Badge>
          <Text style={styles.bigNumber}>34</Text>
          <Text style={styles.heroLabel}>memories analyzed this month</Text>
          <Text style={styles.trend}>up 12 more than last month</Text>
        </SurfaceCard>

        <View style={styles.metricGrid}>
          {metrics.map((metric) => (
            <SurfaceCard key={metric.label} style={styles.metricCard}>
              <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </SurfaceCard>
          ))}
        </View>

        <View style={sharedStyles.sectionRow}>
          <Text style={sharedStyles.sectionLabel}>This Month</Text>
          <Text style={sharedStyles.seeAll}>Indexed {weeklyStats.totalIndexed}</Text>
        </View>

        <SurfaceCard style={styles.chartCard}>
          {bars.map((bar) => (
            <View key={bar.label} style={styles.barRow}>
              <Text style={styles.barLabel}>{bar.label}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${(bar.value / max) * 90}%`, backgroundColor: bar.color }]} />
              </View>
              <Text style={styles.barValue}>{bar.value}</Text>
            </View>
          ))}
        </SurfaceCard>

        <View style={styles.insightList}>
          <SurfaceCard accent={COLORS.cyan}><Text style={styles.insightText}>Your most saved topic is Coding.</Text></SurfaceCard>
          <SurfaceCard accent={COLORS.amber}><Text style={styles.insightText}>12 forgotten ideas resurfaced this week.</Text></SurfaceCard>
          <SurfaceCard accent={COLORS.red}><Text style={styles.insightText}>3 sensitive screenshots need review.</Text></SurfaceCard>
          <SurfaceCard accent={COLORS.green}><Text style={styles.insightText}>42% of your gallery is screenshots.</Text></SurfaceCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rangeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  rangePill: {
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  rangePillActive: {
    backgroundColor: COLORS.amberDim,
    borderColor: "rgba(255,184,48,0.30)",
  },
  rangeText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "800",
  },
  rangeTextActive: {
    color: COLORS.amber,
  },
  heroStat: {
    marginBottom: 12,
  },
  bigNumber: {
    color: COLORS.textPrimary,
    fontSize: 56,
    lineHeight: 60,
    fontWeight: "900",
    letterSpacing: -1.4,
    marginTop: 14,
  },
  heroLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 3,
  },
  trend: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 12,
  },
  metricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  metricCard: {
    width: "48.5%",
  },
  metricValue: {
    fontSize: 34,
    fontWeight: "900",
  },
  metricLabel: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },
  chartCard: {
    gap: 15,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barLabel: {
    width: 86,
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "700",
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
  },
  barValue: {
    width: 24,
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "right",
  },
  insightList: {
    gap: 10,
    marginTop: 18,
  },
  insightText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
  },
});
