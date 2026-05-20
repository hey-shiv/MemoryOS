import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Check, Question, Rocket } from "phosphor-react-native";
import { COLORS, mockMemories } from "../../lib/mockData";
import {
  Badge,
  ConfidenceBar,
  GhostButton,
  IconButton,
  ImagePlaceholder,
  PrimaryButton,
  ScreenHeader,
  SurfaceCard,
  sharedStyles,
} from "../../lib/ui";

const steps = [
  "OCR Extraction",
  "Visual Understanding",
  "Category Detection",
  "Semantic Indexing",
  "Smart Folder Creation",
];

export default function ImportScreen() {
  const router = useRouter();
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");
  const [processed, setProcessed] = useState(0);
  const demoItems = useMemo(() => mockMemories.slice(0, 24), []);

  useEffect(() => {
    if (scanState !== "scanning") return;
    const timer = setInterval(() => {
      setProcessed((current) => {
        if (current >= demoItems.length) {
          clearInterval(timer);
          setTimeout(() => setScanState("done"), 250);
          return current;
        }
        return current + 1;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [demoItems.length, scanState]);

  const startScan = () => {
    setProcessed(0);
    setScanState("scanning");
  };

  const progress = processed / demoItems.length;
  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
        <ScreenHeader
          title="Import"
          subtitle={scanState === "idle" ? "Drop screenshots here. MemoryOS will understand them." : "Private analysis in progress."}
          right={<IconButton icon={Question} />}
        />

        {scanState === "idle" ? (
          <>
            <View style={styles.importZone}>
              <View style={styles.uploadIcon}>
                <Rocket size={36} color={COLORS.textTertiary} weight="duotone" />
              </View>
              <Text style={styles.zoneTitle}>Drop screenshots here</Text>
              <Text style={styles.zoneCopy}>or load the built-in demo set for the judge video</Text>
              <View style={styles.zoneButtons}>
                <GhostButton style={styles.zoneButton}>Choose Files</GhostButton>
                <PrimaryButton style={styles.zoneButton} onPress={startScan}>Load Demo</PrimaryButton>
              </View>
            </View>

            <SurfaceCard accent={COLORS.amber} style={styles.demoBanner}>
              <Badge variant="amber">Demo Mode Active</Badge>
              <Text style={styles.demoText}>24 sample memories are ready: code, food, quotes, receipts, travel, and sensitive screenshots.</Text>
            </SurfaceCard>

            <View style={sharedStyles.sectionRow}>
              <Text style={sharedStyles.sectionLabel}>Sample Memories</Text>
              <Text style={sharedStyles.seeAll}>24 loaded</Text>
            </View>
            <View style={styles.sampleGrid}>
              {demoItems.slice(0, 12).map((item) => (
                <View key={item.id} style={styles.sampleCell}>
                  <ImagePlaceholder item={item} small />
                </View>
              ))}
            </View>

            <PrimaryButton style={styles.scanButton} onPress={startScan}>{"Scan Memory ->"}</PrimaryButton>
          </>
        ) : null}

        {scanState === "scanning" ? (
          <>
            <SurfaceCard accent={COLORS.cyan}>
              <Text style={styles.panelTitle}>Analyzing your memories...</Text>
              <View style={styles.stepsList}>
                {steps.map((step, index) => {
                  const complete = index < activeStep || processed === demoItems.length;
                  const active = index === activeStep && !complete;
                  return (
                    <View key={step} style={styles.stepRow}>
                      <View style={[styles.stepMark, complete ? styles.stepComplete : active ? styles.stepActive : null]}>
                        {complete ? <Check size={12} color={COLORS.textDark} weight="bold" /> : null}
                      </View>
                      <View style={styles.stepTextWrap}>
                        <Text style={[styles.stepText, active ? styles.stepTextActive : null]}>{step}{active ? "..." : ""}</Text>
                        <ConfidenceBar value={complete ? 1 : active ? progress * steps.length - activeStep : 0} width={210} />
                      </View>
                    </View>
                  );
                })}
              </View>
            </SurfaceCard>

            <View style={sharedStyles.sectionRow}>
              <Text style={sharedStyles.sectionLabel}>Live Scan</Text>
              <Text style={sharedStyles.seeAll}>{processed}/24</Text>
            </View>
            <View style={styles.sampleGrid}>
              {demoItems.map((item, index) => {
                const done = index < processed;
                const scanning = index === processed;
                return (
                  <View key={item.id} style={styles.scanCell}>
                    <ImagePlaceholder item={item} small scanning={scanning} />
                    {done ? (
                      <View style={styles.scanResult}>
                        <Badge variant={item.isSensitive ? "red" : item.primaryCategory === "food" || item.primaryCategory === "fitness" ? "green" : item.primaryCategory === "startup" || item.primaryCategory === "quotes" ? "amber" : "cyan"}>
                          {item.category}
                        </Badge>
                        <View style={styles.confidenceRow}>
                          <ConfidenceBar value={item.confidence} width={52} />
                          <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}%</Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </>
        ) : null}

        {scanState === "done" ? (
          <>
            <SurfaceCard accent={COLORS.cyan} style={styles.resultCard}>
              <Text style={styles.resultTitle}>24 memories organized</Text>
              <Text style={styles.resultCopy}>12 screenshots understood | 3 startup ideas | 2 receipts | 2 sensitive items protected</Text>
              <View style={styles.resultStats}>
                <View style={styles.resultStat}><Text style={styles.resultNumber}>24</Text><Text style={styles.resultLabel}>indexed</Text></View>
                <View style={styles.resultStat}><Text style={[styles.resultNumber, { color: COLORS.amber }]}>12</Text><Text style={styles.resultLabel}>gems</Text></View>
                <View style={styles.resultStat}><Text style={[styles.resultNumber, { color: COLORS.red }]}>2</Text><Text style={styles.resultLabel}>private</Text></View>
              </View>
              <PrimaryButton onPress={() => router.push("/(tabs)/collections")}>{"View Collections ->"}</PrimaryButton>
            </SurfaceCard>

            <View style={sharedStyles.sectionRow}>
              <Text style={sharedStyles.sectionLabel}>Organized Results</Text>
              <Text style={sharedStyles.seeAll}>Complete</Text>
            </View>
            <View style={styles.sampleGrid}>
              {demoItems.slice(0, 12).map((item) => (
                <View key={item.id} style={styles.sampleCell}>
                  <ImagePlaceholder item={item} small />
                </View>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  importZone: {
    minHeight: 218,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.borderStrong,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  zoneTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: "800",
  },
  zoneCopy: {
    color: COLORS.textTertiary,
    fontSize: 13,
    textAlign: "center",
    marginTop: 7,
  },
  zoneButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  zoneButton: {
    flex: 1,
  },
  demoBanner: {
    marginTop: 16,
  },
  demoText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
  sampleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sampleCell: {
    width: "31.8%",
  },
  scanCell: {
    width: "31.8%",
    marginBottom: 10,
  },
  scanButton: {
    marginTop: 20,
  },
  panelTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 16,
  },
  stepsList: {
    gap: 13,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stepMark: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  stepActive: {
    borderColor: COLORS.cyan,
    backgroundColor: COLORS.cyanDim,
  },
  stepComplete: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.green,
  },
  stepTextWrap: {
    flex: 1,
    gap: 7,
  },
  stepText: {
    color: COLORS.textTertiary,
    fontSize: 13,
    fontWeight: "700",
  },
  stepTextActive: {
    color: COLORS.textPrimary,
  },
  scanResult: {
    marginTop: 6,
    gap: 5,
  },
  confidenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  confidenceText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "800",
  },
  resultCard: {
    marginTop: 4,
    backgroundColor: COLORS.cyanDim,
    borderColor: "rgba(0,212,255,0.30)",
  },
  resultTitle: {
    color: COLORS.cyan,
    fontSize: 22,
    fontWeight: "900",
  },
  resultCopy: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  resultStats: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 18,
  },
  resultStat: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resultNumber: {
    color: COLORS.cyan,
    fontSize: 24,
    fontWeight: "900",
  },
  resultLabel: {
    color: COLORS.textTertiary,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
});
