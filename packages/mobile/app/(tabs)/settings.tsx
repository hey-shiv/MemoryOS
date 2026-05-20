import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Check, Sparkle } from "phosphor-react-native";
import { COLORS } from "../../lib/mockData";
import { Badge, ScreenHeader, SurfaceCard, getCategoryIcon, sharedStyles } from "../../lib/ui";

function ToggleRow({
  title,
  subtitle,
  value,
  onValueChange,
  locked,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange?: (value: boolean) => void;
  locked?: boolean;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleText}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleSubtitle}>{subtitle}</Text>
      </View>
      {locked ? (
        <View style={styles.lockedCheck}><Check size={16} color={COLORS.textDark} weight="bold" /></View>
      ) : (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: COLORS.active, true: COLORS.cyanDim }}
          thumbColor={value ? COLORS.cyan : COLORS.textTertiary}
        />
      )}
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [localFirst, setLocalFirst] = useState(true);
  const [cloud, setCloud] = useState(false);
  const [sensitive, setSensitive] = useState(true);
  const roadmap = [
    { icon: "Brain", text: "On-device Gemma model" },
    { icon: "Camera", text: "Gallery auto-monitoring" },
    { icon: "MapPin", text: "Face and place clustering" },
    { icon: "FileText", text: "Export to Notion and Obsidian" },
    { icon: "Sparkle", text: "Weekly memory digest" },
  ];

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
        <ScreenHeader title="Settings" subtitle="Privacy-first by design" back={() => router.back()} />

        <SurfaceCard style={styles.privacyCard}>
          <Text style={styles.cardTitle}>Privacy First</Text>
          <Text style={styles.cardSubtitle}>Your memory stays yours.</Text>
          <View style={styles.toggleList}>
            <ToggleRow title="Local-first analysis" subtitle="Analysis runs on your device" value={localFirst} onValueChange={setLocalFirst} />
            <ToggleRow title="Cloud AI (optional)" subtitle="Faster analysis via API" value={cloud} onValueChange={setCloud} />
            <ToggleRow title="Sensitive image detection" subtitle="Automatically flags private info" value={sensitive} onValueChange={setSensitive} />
            <ToggleRow title="No physical photo movement" subtitle="Smart folders are virtual only" value locked />
          </View>
        </SurfaceCard>

        <SurfaceCard accent={COLORS.amber} style={styles.roadmapCard}>
          <Badge variant="amber">Coming Soon</Badge>
          <View style={styles.roadmapList}>
            {roadmap.map((item) => {
              const Icon = getCategoryIcon(item.icon);
              return (
                <View key={item.text} style={styles.roadmapRow}>
                  <View style={styles.roadmapIcon}>
                    <Icon size={18} color={COLORS.amber} weight="duotone" />
                  </View>
                  <Text style={styles.roadmapText}>{item.text}</Text>
                </View>
              );
            })}
          </View>
        </SurfaceCard>

        <View style={styles.footerMark}>
          <Sparkle size={16} color={COLORS.cyan} weight="fill" />
          <Text style={styles.footerText}>MemoryOS protects screenshots without moving the original files.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  privacyCard: {
    marginBottom: 14,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontSize: 19,
    fontWeight: "800",
  },
  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },
  toggleList: {
    marginTop: 16,
    gap: 10,
  },
  toggleRow: {
    minHeight: 68,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceAlt,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  toggleText: {
    flex: 1,
  },
  toggleTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "800",
  },
  toggleSubtitle: {
    color: COLORS.textTertiary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  lockedCheck: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },
  roadmapCard: {
    marginTop: 4,
  },
  roadmapList: {
    marginTop: 16,
    gap: 12,
  },
  roadmapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  roadmapIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.amberDim,
    borderWidth: 1,
    borderColor: "rgba(255,184,48,0.24)",
  },
  roadmapText: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  footerMark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
    paddingHorizontal: 4,
  },
  footerText: {
    flex: 1,
    color: COLORS.textTertiary,
    fontSize: 12,
    lineHeight: 17,
  },
});
