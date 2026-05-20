import React from "react";
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
  Sparkle,
  ShieldCheck,
  Brain,
  TrendUp,
  Image,
  Lightning,
  ArrowRight,
  Star,
} from "phosphor-react-native";
import { COLORS, weeklyStats } from "../../lib/mockData";

function StatCard({ value, label, accent, icon: Icon, index }: any) {
  return (
    <View style={styles.statCardWrapper}>
      <View style={[styles.statCard, { borderColor: accent + "30" }]}>
        <View style={[styles.statIconWrap, { backgroundColor: accent + "12" }]}>
          <Icon size={16} color={accent} weight="duotone" />
        </View>
        <Text style={[styles.statValue, { color: accent }]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
}

function InsightCard({ icon: Icon, color, title, subtitle, index }: any) {
  return (
    <View>
      <View style={[styles.insightCard, { backgroundColor: color + "10", borderColor: color + "25" }]}>
        <Icon size={18} color={color} weight="duotone" />
        <View style={{ flex: 1 }}>
          <Text style={styles.insightCardTitle}>{title}</Text>
          {subtitle && <Text style={styles.insightCardSubtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
}

export default function InsightsScreen() {
  const router = useRouter();

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
            <Text style={styles.screenTitle}>Insights</Text>
            <Text style={styles.screenSubtitle}>Your memory this week</Text>
          </View>
          <View style={styles.weekBadge}>
            <Sparkle size={12} color={COLORS.lime} weight="fill" />
            <Text style={styles.weekBadgeText}>WEEK 20</Text>
          </View>
        </View>

        {/* Big stat */}
        <View>
          <View style={styles.bigStatCard}>
            <View style={styles.bigStatLeft}>
              <Text style={styles.bigStatNumber}>{weeklyStats.totalIndexed}</Text>
              <Text style={styles.bigStatLabel}>images indexed</Text>
            </View>
            <View style={styles.bigStatDivider} />
            <View style={styles.bigStatRight}>
              <View style={styles.bigStatRow}>
                <View style={styles.bigStatDot} />
                <Text style={styles.bigStatRowText}>{weeklyStats.screenshotsPercent}% screenshots</Text>
              </View>
              <View style={styles.bigStatRow}>
                <View style={[styles.bigStatDot, { backgroundColor: COLORS.amber }]} />
                <Text style={styles.bigStatRowText}>{100 - weeklyStats.screenshotsPercent}% photos</Text>
              </View>
              <View style={[styles.progressBar]}>
                <View style={[styles.progressFill, { width: `${weeklyStats.screenshotsPercent}%` }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Stat grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>THIS WEEK'S BREAKDOWN</Text>
        </View>

        <View style={styles.statGrid}>
          <StatCard value={weeklyStats.startupIdeas} label="Startup ideas" accent={COLORS.lime} icon={Lightning} index={0} />
          <StatCard value={weeklyStats.receiptsDetected} label="Receipts found" accent={COLORS.cyan} icon={Image} index={1} />
          <StatCard value={weeklyStats.sensitiveProtected} label="Protected" accent={COLORS.red} icon={ShieldCheck} index={2} />
          <StatCard value={weeklyStats.forgottenResurfaced} label="Resurfaced" accent={COLORS.amber} icon={Sparkle} index={3} />
        </View>

        {/* Topic trends */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TOPIC TRENDS</Text>
        </View>

        <View style={styles.trendCard}>
          {[
            { label: "Coding", percent: 78, color: COLORS.cyan },
            { label: "Startup Ideas", percent: 65, color: COLORS.lime },
            { label: "Books & Learning", percent: 52, color: "#9B8EFF" },
            { label: "Food", percent: 44, color: "#FF8C5A" },
            { label: "Quotes", percent: 38, color: COLORS.amber },
          ].map((topic, i) => (
            <View key={topic.label}>
              <View style={styles.trendRow}>
                <Text style={styles.trendLabel}>{topic.label}</Text>
                <View style={styles.trendBarContainer}>
                  <View style={[styles.trendBar, { width: `${topic.percent}%`, backgroundColor: topic.color }]} />
                </View>
                <Text style={[styles.trendPercent, { color: topic.color }]}>{topic.percent}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Key Insights */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>KEY INSIGHTS</Text>
        </View>

        <View style={styles.insightsList}>
          <InsightCard
            icon={Code}
            color={COLORS.cyan}
            title={`Your most saved topic is ${weeklyStats.topCategory}`}
            subtitle="8 coding screenshots this week alone"
            index={0}
          />
          <InsightCard
            icon={Brain}
            color={COLORS.lime}
            title={`${weeklyStats.learningScreenshots} learning screenshots this month`}
            subtitle="You're in a learning streak"
            index={1}
          />
          <InsightCard
            icon={Sparkle}
            color={COLORS.amber}
            title={`${weeklyStats.forgottenResurfaced} forgotten ideas resurfaced`}
            subtitle="Review them before they fade again"
            index={2}
          />
          <InsightCard
            icon={ShieldCheck}
            color={COLORS.red}
            title={`${weeklyStats.sensitiveProtected} sensitive screenshots need review`}
            subtitle="API keys and private info detected"
            index={3}
          />
        </View>

        {/* Forgotten Gems */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FORGOTTEN GEMS</Text>
        </View>

        <View>
          <View style={styles.forgottenSection}>
            {[
              { text: "B2B data marketplace idea — 3 months ago", color: COLORS.lime },
              { text: "Feynman quote on learning — starred, never revisited", color: COLORS.amber },
              { text: "Tonkotsu ramen recipe — 5 weeks, still not cooked", color: "#FF8C5A" },
              { text: "CSS grid layout pattern — saved, never used", color: COLORS.cyan },
            ].map((gem, i) => (
              <View key={i} style={styles.gemRow}>
                <Star size={13} color={gem.color} weight="fill" />
                <Text style={styles.gemText}>{gem.text}</Text>
              </View>
            ))}
            <Pressable style={styles.reviewBtn}>
              <Text style={styles.reviewBtnText}>Review All Gems</Text>
              <ArrowRight size={14} color={COLORS.amber} />
            </Pressable>
          </View>
        </View>

        {/* Privacy Health */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PRIVACY HEALTH</Text>
        </View>

        <View>
          <View style={styles.privacyCard}>
            <View style={styles.privacyHeader}>
              <ShieldCheck size={22} color={COLORS.lime} weight="duotone" />
              <View>
                <Text style={styles.privacyTitle}>Memory is secure</Text>
                <Text style={styles.privacySubtitle}>All analysis runs locally</Text>
              </View>
              <View style={styles.privacyScore}>
                <Text style={[styles.privacyScoreText, { color: COLORS.lime }]}>A+</Text>
              </View>
            </View>
            <View style={styles.privacyDivider} />
            <View style={styles.privacyStats}>
              <View style={styles.privacyStat}>
                <Text style={[styles.privacyStatVal, { color: COLORS.lime }]}>100%</Text>
                <Text style={styles.privacyStatLabel}>Local processing</Text>
              </View>
              <View style={styles.privacyStat}>
                <Text style={[styles.privacyStatVal, { color: COLORS.red }]}>3</Text>
                <Text style={styles.privacyStatLabel}>Sensitive items</Text>
              </View>
              <View style={styles.privacyStat}>
                <Text style={[styles.privacyStatVal, { color: COLORS.cyan }]}>0</Text>
                <Text style={styles.privacyStatLabel}>Cloud uploads</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
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
  weekBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(200, 241, 53, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.2)",
  },
  weekBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.lime,
    letterSpacing: 1,
  },
  bigStatCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  bigStatLeft: { alignItems: "center" },
  bigStatNumber: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -2,
  },
  bigStatLabel: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  bigStatDivider: {
    width: 1,
    height: 60,
    backgroundColor: COLORS.border,
  },
  bigStatRight: { flex: 1, gap: 8 },
  bigStatRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  bigStatDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.lime },
  bigStatRowText: { fontSize: 13, color: COLORS.textSecondary },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: 4,
  },
  progressFill: {
    height: 4,
    backgroundColor: COLORS.lime,
    borderRadius: 2,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  statCardWrapper: {
    width: "47%",
  },
  statCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 6,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    fontWeight: "500",
  },
  trendCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    gap: 14,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  trendLabel: {
    width: 110,
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  trendBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  trendBar: {
    height: 4,
    borderRadius: 2,
  },
  trendPercent: {
    width: 34,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "700",
  },
  insightsList: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  insightCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  insightCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  insightCardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  forgottenSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  gemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  gemText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  reviewBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 6,
    borderWidth: 1,
    borderColor: COLORS.amber + "40",
    borderRadius: 8,
    paddingVertical: 10,
  },
  reviewBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.amber,
  },
  privacyCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: COLORS.surfaceGreen,
    borderWidth: 1,
    borderColor: COLORS.lime + "25",
    borderRadius: 8,
    padding: 16,
  },
  privacyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  privacySubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  privacyScore: {
    marginLeft: "auto",
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.lime + "15",
    borderWidth: 1,
    borderColor: COLORS.lime + "30",
    alignItems: "center",
    justifyContent: "center",
  },
  privacyScoreText: {
    fontSize: 14,
    fontWeight: "800",
  },
  privacyDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  privacyStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  privacyStat: {
    alignItems: "center",
    gap: 4,
  },
  privacyStatVal: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  privacyStatLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textAlign: "center",
  },
});
