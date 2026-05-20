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
  Sparkle,
  ShieldCheck,
  Brain,
  Lightning,
  ArrowRight,
  Star,
  Code,
  TrendUp,
} from "phosphor-react-native";
import { COLORS, weeklyStats } from "../../lib/mockData";

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  accent,
  icon: Icon,
}: {
  value: string | number;
  label: string;
  accent: string;
  icon: React.ComponentType<any>;
}) {
  return (
    <View style={[styles.statCard, { borderColor: accent + "30" }]}>
      <View style={[styles.statIconWrap, { backgroundColor: accent + "14" }]}>
        <Icon size={16} color={accent} weight="duotone" />
      </View>
      <Text style={[styles.statValue, { color: accent }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Insight Row ──────────────────────────────────────────────────────────────
function InsightRow({
  icon: Icon,
  color,
  title,
  subtitle,
}: {
  icon: React.ComponentType<any>;
  color: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={[styles.insightRow, { borderColor: color + "20" }]}>
      <View style={[styles.insightRowIcon, { backgroundColor: color + "14" }]}>
        <Icon size={16} color={color} weight="duotone" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.insightRowTitle}>{title}</Text>
        {subtitle && <Text style={styles.insightRowSub}>{subtitle}</Text>}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function InsightsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Header ────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>Insights</Text>
            <Text style={styles.screenSubtitle}>Your memory analytics</Text>
          </View>
          <View style={styles.weekBadge}>
            <Sparkle size={12} color={COLORS.lime} weight="fill" />
            <Text style={styles.weekBadgeText}>WEEK 20</Text>
          </View>
        </View>

        {/* ── Big Stat Hero ────────────────────────────────────────────── */}
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
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${weeklyStats.screenshotsPercent}%` }]} />
            </View>
          </View>
        </View>

        {/* ── Stat Grid ────────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>THIS WEEK'S BREAKDOWN</Text>
        </View>

        <View style={styles.statGrid}>
          <StatCard value={weeklyStats.startupIdeas}        label="Startup ideas"  accent={COLORS.lime}  icon={Lightning} />
          <StatCard value={weeklyStats.receiptsDetected}    label="Receipts found" accent={COLORS.cyan}  icon={TrendUp} />
          <StatCard value={weeklyStats.sensitiveProtected}  label="Protected"      accent={COLORS.red}   icon={ShieldCheck} />
          <StatCard value={weeklyStats.forgottenResurfaced} label="Resurfaced"     accent={COLORS.amber} icon={Sparkle} />
        </View>

        {/* ── Topic Trends ─────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TOPIC TRENDS</Text>
        </View>

        <View style={styles.trendCard}>
          {[
            { label: "Coding",          percent: 78, color: COLORS.cyan },
            { label: "Startup Ideas",   percent: 65, color: COLORS.lime },
            { label: "Books & Learning",percent: 52, color: "#9B8EFF" },
            { label: "Food",            percent: 44, color: "#FF8C5A" },
            { label: "Quotes",          percent: 38, color: COLORS.amber },
          ].map((topic) => (
            <View key={topic.label} style={styles.trendRow}>
              <Text style={styles.trendLabel}>{topic.label}</Text>
              <View style={styles.trendBarContainer}>
                <View
                  style={[
                    styles.trendBar,
                    { width: `${topic.percent}%`, backgroundColor: topic.color },
                  ]}
                />
              </View>
              <Text style={[styles.trendPercent, { color: topic.color }]}>{topic.percent}%</Text>
            </View>
          ))}
        </View>

        {/* ── Key Insights ─────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>KEY INSIGHTS</Text>
        </View>

        <View style={styles.insightsList}>
          <InsightRow
            icon={Code}
            color={COLORS.cyan}
            title={`Your top topic is ${weeklyStats.topCategory}`}
            subtitle="8 coding screenshots this week alone"
          />
          <InsightRow
            icon={Brain}
            color={COLORS.lime}
            title={`${weeklyStats.learningScreenshots} learning screenshots this month`}
            subtitle="You're in a learning streak"
          />
          <InsightRow
            icon={Sparkle}
            color={COLORS.amber}
            title={`${weeklyStats.forgottenResurfaced} forgotten ideas resurfaced`}
            subtitle="Review them before they fade again"
          />
          <InsightRow
            icon={ShieldCheck}
            color={COLORS.red}
            title={`${weeklyStats.sensitiveProtected} sensitive screenshots detected`}
            subtitle="API keys and private info flagged"
          />
        </View>

        {/* ── Forgotten Gems ───────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FORGOTTEN GEMS</Text>
        </View>

        <View style={styles.forgottenSection}>
          <View style={styles.forgottenTopBar} />
          {[
            { text: "B2B data marketplace — 3 months ago",          color: COLORS.lime  },
            { text: "Feynman quote on learning — never revisited",  color: COLORS.amber },
            { text: "Tonkotsu ramen recipe — 5 weeks, still uncooked", color: "#FF8C5A" },
            { text: "CSS grid layout — saved, never used",          color: COLORS.cyan  },
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

        {/* ── Privacy Health ───────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PRIVACY HEALTH</Text>
        </View>

        <View style={styles.privacyCard}>
          <View style={styles.privacyTopRow}>
            <View style={[styles.privacyIconWrap]}>
              <ShieldCheck size={22} color={COLORS.lime} weight="duotone" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.privacyTitle}>Memory is secure</Text>
              <Text style={styles.privacySubtitle}>All analysis runs locally</Text>
            </View>
            <View style={styles.privacyScore}>
              <Text style={[styles.privacyScoreText]}>A+</Text>
            </View>
          </View>
          <View style={styles.privacyDivider} />
          <View style={styles.privacyStats}>
            <View style={styles.privacyStat}>
              <Text style={[styles.privacyStatVal, { color: COLORS.lime }]}>100%</Text>
              <Text style={styles.privacyStatLabel}>Local</Text>
            </View>
            <View style={styles.privacyStat}>
              <Text style={[styles.privacyStatVal, { color: COLORS.red }]}>3</Text>
              <Text style={styles.privacyStatLabel}>Sensitive</Text>
            </View>
            <View style={styles.privacyStat}>
              <Text style={[styles.privacyStatVal, { color: COLORS.cyan }]}>0</Text>
              <Text style={styles.privacyStatLabel}>Cloud uploads</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 30,
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

  // Big stat
  bigStatCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  bigStatLeft: { alignItems: "center", minWidth: 80 },
  bigStatNumber: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -2,
  },
  bigStatLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  bigStatDivider: {
    width: 1,
    height: 60,
    backgroundColor: COLORS.border,
  },
  bigStatRight: { flex: 1, gap: 8 },
  bigStatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bigStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.lime,
  },
  bigStatRowText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
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

  // Section
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },

  // Stat grid
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    gap: 6,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 15,
  },

  // Trends
  trendCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 16,
    gap: 14,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  trendLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: 100,
  },
  trendBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
  },
  trendBar: {
    height: 6,
    borderRadius: 3,
  },
  trendPercent: {
    fontSize: 11,
    fontWeight: "700",
    width: 34,
    textAlign: "right",
  },

  // Insight rows
  insightsList: {
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 10,
  },
  insightRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  insightRowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  insightRowTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  insightRowSub: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },

  // Forgotten gems
  forgottenSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.15)",
    borderRadius: 10,
    padding: 16,
    gap: 12,
    overflow: "hidden",
  },
  forgottenTopBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.amber,
    opacity: 0.5,
  },
  gemRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
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
    borderWidth: 1,
    borderColor: COLORS.amber + "40",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 4,
  },
  reviewBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.amber,
  },

  // Privacy
  privacyCard: {
    marginHorizontal: 20,
    marginBottom: 4,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(200,241,53,0.15)",
    borderRadius: 10,
    padding: 16,
  },
  privacyTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  privacyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(200,241,53,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  privacySubtitle: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  privacyScore: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(200,241,53,0.12)",
    borderWidth: 1,
    borderColor: "rgba(200,241,53,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  privacyScoreText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.lime,
  },
  privacyDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 14,
  },
  privacyStats: {
    flexDirection: "row",
  },
  privacyStat: {
    flex: 1,
    alignItems: "center",
  },
  privacyStatVal: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  privacyStatLabel: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: 2,
    textAlign: "center",
  },
});
