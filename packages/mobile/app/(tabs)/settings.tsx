import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Lock,
  Brain,
  SquaresFour,
  Flask,
  Export,
  CaretRight,
  ShieldCheck,
  Cloud,
  ShieldWarning,
  Sparkle,
  ScanSmiley,
  Trash,
  Info,
  Code,
} from "phosphor-react-native";
import { COLORS } from "../../lib/mockData";

type SettingToggleProps = {
  label: string;
  description: string;
  value: boolean;
  onToggle: () => void;
  icon: React.ComponentType<any>;
  accentColor?: string;
};

function SettingToggle({ label, description, value, onToggle, icon: Icon, accentColor = COLORS.textSecondary }: SettingToggleProps) {
  return (
    <View style={styles.settingRow}>
      <View style={[styles.settingIcon, { backgroundColor: accentColor + "12" }]}>
        <Icon size={16} color={accentColor} weight="duotone" />
      </View>
      <View style={styles.settingBody}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.border, true: COLORS.lime + "60" }}
        thumbColor={value ? COLORS.lime : COLORS.textTertiary}
        ios_backgroundColor={COLORS.border}
      />
    </View>
  );
}

function SettingAction({ label, description, icon: Icon, accentColor = COLORS.textSecondary, danger = false, onPress }: any) {
  return (
    <Pressable style={styles.settingRow} onPress={onPress}>
      <View style={[styles.settingIcon, { backgroundColor: (danger ? COLORS.red : accentColor) + "12" }]}>
        <Icon size={16} color={danger ? COLORS.red : accentColor} weight="duotone" />
      </View>
      <View style={styles.settingBody}>
        <Text style={[styles.settingLabel, danger && { color: COLORS.red }]}>{label}</Text>
        <Text style={styles.settingDesc}>{description}</Text>
      </View>
      <CaretRight size={14} color={COLORS.textTertiary} />
    </Pressable>
  );
}

type SectionProps = {
  title: string;
  icon: React.ComponentType<any>;
  accentColor: string;
  children: React.ReactNode;
  index: number;
};

function Section({ title, icon: Icon, accentColor, children, index }: SectionProps) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Icon size={13} color={accentColor} weight="bold" />
        <Text style={[styles.sectionTitle, { color: accentColor }]}>{title}</Text>
      </View>
      <View style={styles.sectionCard}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const [localAnalysis, setLocalAnalysis] = useState(true);
  const [cloudAI, setCloudAI] = useState(false);
  const [sensitiveDetect, setSensitiveDetect] = useState(true);
  const [autoCollections, setAutoCollections] = useState(true);
  const [scanImported, setScanImported] = useState(true);
  const [demoMode, setDemoMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.screenTitle}>Settings</Text>
          <Text style={styles.screenSubtitle}>Customize your memory</Text>
        </View>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>v1.0.0</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Profile card */}
        <View>
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Brain size={24} color={COLORS.lime} weight="duotone" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Your Memory Brain</Text>
              <Text style={styles.profileMeta}>128 items · Demo mode · Local-first</Text>
            </View>
            <View style={styles.statusDotGreen} />
          </View>
        </View>

        {/* Privacy */}
        <Section title="PRIVACY" icon={Lock} accentColor={COLORS.lime} index={1}>
          <SettingToggle
            label="Local-first analysis"
            description="All AI runs on your device. Nothing leaves."
            value={localAnalysis}
            onToggle={() => setLocalAnalysis(!localAnalysis)}
            icon={ShieldCheck}
            accentColor={COLORS.lime}
          />
          <View style={styles.rowDivider} />
          <SettingToggle
            label="Sensitive image detection"
            description="Detect API keys, passwords, and private info"
            value={sensitiveDetect}
            onToggle={() => setSensitiveDetect(!sensitiveDetect)}
            icon={ShieldWarning}
            accentColor={COLORS.red}
          />
          <View style={styles.rowDivider} />
          <SettingToggle
            label="Cloud AI (optional)"
            description="Use OpenAI for better results. Opt-in only."
            value={cloudAI}
            onToggle={() => setCloudAI(!cloudAI)}
            icon={Cloud}
            accentColor={COLORS.cyan}
          />
        </Section>

        {/* AI Analysis */}
        <Section title="AI ANALYSIS" icon={Brain} accentColor={COLORS.cyan} index={2}>
          <SettingToggle
            label="Auto-create smart collections"
            description="AI groups similar memories automatically"
            value={autoCollections}
            onToggle={() => setAutoCollections(!autoCollections)}
            icon={Sparkle}
            accentColor={COLORS.amber}
          />
          <View style={styles.rowDivider} />
          <SettingToggle
            label="Scan only imported images"
            description="Analyze images after you import them"
            value={scanImported}
            onToggle={() => setScanImported(!scanImported)}
            icon={ScanSmiley}
            accentColor={COLORS.textSecondary}
          />
          <View style={styles.rowDivider} />
          <SettingAction
            label="Re-analyze all memories"
            description="Re-run AI on your entire memory library"
            icon={Brain}
            accentColor={COLORS.cyan}
          />
        </Section>

        {/* Collections */}
        <Section title="COLLECTIONS" icon={SquaresFour} accentColor={COLORS.amber} index={3}>
          <SettingAction
            label="Manage collections"
            description="Rename, merge, or delete collections"
            icon={SquaresFour}
            accentColor={COLORS.amber}
          />
          <View style={styles.rowDivider} />
          <SettingAction
            label="Export all collections"
            description="Export to Notion, Obsidian, or JSON"
            icon={Export}
            accentColor={COLORS.amber}
          />
        </Section>

        {/* Demo Mode */}
        <Section title="DEMO MODE" icon={Flask} accentColor="#9B8EFF" index={4}>
          <SettingToggle
            label="Demo mode"
            description="Use sample mock data for testing"
            value={demoMode}
            onToggle={() => setDemoMode(!demoMode)}
            icon={Flask}
            accentColor="#9B8EFF"
          />
          <View style={styles.rowDivider} />
          <SettingToggle
            label="Usage notifications"
            description="Get weekly memory digests"
            value={notifications}
            onToggle={() => setNotifications(!notifications)}
            icon={Info}
            accentColor={COLORS.textSecondary}
          />
        </Section>

        {/* Export */}
        <Section title="EXPORT & DATA" icon={Export} accentColor={COLORS.textSecondary} index={5}>
          <SettingAction
            label="Export memory index"
            description="Save all memories as JSON or CSV"
            icon={Export}
            accentColor={COLORS.textSecondary}
          />
          <View style={styles.rowDivider} />
          <SettingAction
            label="Clear local memory index"
            description="Remove all analyzed data from device"
            icon={Trash}
            danger
          />
        </Section>

        {/* About */}
        <View>
          <View style={styles.aboutCard}>
            <View style={styles.aboutRow}>
              <Code size={12} color={COLORS.textTertiary} />
              <Text style={styles.aboutText}>MemoryOS v1.0 · Built with Runable</Text>
            </View>
            <Text style={styles.aboutTagline}>
              "Your gallery is not storage anymore. It is a second brain."
            </Text>
          </View>
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
  versionBadge: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  versionText: {
    fontSize: 11,
    color: COLORS.textTertiary,
    fontWeight: "600",
  },
  scroll: { flex: 1 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.lime + "25",
    borderRadius: 8,
    padding: 16,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "rgba(200, 241, 53, 0.1)",
    borderWidth: 1,
    borderColor: COLORS.lime + "30",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  profileMeta: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  statusDotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.lime,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  settingBody: { flex: 1 },
  settingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  settingDesc: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
    lineHeight: 15,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.borderMuted,
    marginLeft: 60,
  },
  aboutCard: {
    marginHorizontal: 20,
    marginTop: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    gap: 8,
    alignItems: "center",
  },
  aboutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  aboutText: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  aboutTagline: {
    fontSize: 12,
    color: COLORS.textTertiary,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 18,
  },
});
