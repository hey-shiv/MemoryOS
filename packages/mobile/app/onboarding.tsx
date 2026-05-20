import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { COLORS } from "../lib/mockData";
import { Badge, GhostButton, PrimaryButton } from "../lib/ui";

const steps = [
  {
    badge: "The Problem",
    title: "Your gallery is full of forgotten ideas.",
    body: "Thousands of screenshots. Zero organization. Everything lost in the scroll.",
  },
  {
    badge: "The AI",
    title: "MemoryOS understands your screenshots.",
    body: "Code, quotes, receipts, ideas, food: every screenshot gets read, understood, and sorted.",
  },
  {
    badge: "The Recall",
    title: "Search your visual memory.",
    body: "Find anything you ever saved. Just describe it.",
  },
];

function DriftDots() {
  const dots = useMemo(
    () =>
      Array.from({ length: 84 }, (_, index) => ({
        id: index,
        left: Math.random() * 340,
        top: Math.random() * 180,
        size: 4 + Math.random() * 4,
        color: [COLORS.cyan, COLORS.amber, COLORS.green, COLORS.red, COLORS.textTertiary][index % 5],
      })),
    []
  );
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: 4200, useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: 4200, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [drift]);

  return (
    <View style={styles.illustration}>
      {dots.map((dot) => (
        <Animated.View
          key={dot.id}
          style={[
            styles.dot,
            {
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              opacity: 0.35 + (dot.id % 4) * 0.12,
              transform: [
                {
                  translateY: drift.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, dot.id % 2 === 0 ? 12 : -12],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

function UnderstandingIllustration() {
  return (
    <View style={styles.illustration}>
      <View style={styles.mockScreenshot}>
        <View style={styles.windowBar} />
        <View style={[styles.mockLine, { width: "78%" }]} />
        <View style={[styles.mockLine, { width: "58%", backgroundColor: COLORS.cyanDim }]} />
        <View style={[styles.mockLine, { width: "86%" }]} />
      </View>
      <Badge variant="cyan" style={[styles.floatTag, { left: 36, top: 34 }]}>coding</Badge>
      <Badge variant="green" style={[styles.floatTag, { right: 34, top: 78 }]}>food</Badge>
      <Badge variant="amber" style={[styles.floatTag, { left: 92, bottom: 28 }]}>startup</Badge>
    </View>
  );
}

function SearchIllustration() {
  return (
    <View style={styles.illustration}>
      <View style={styles.queryBar}>
        <Text style={styles.queryText}>AI startup ideas I saved</Text>
      </View>
      {[0, 1, 2].map((index) => (
        <View key={index} style={[styles.appearingCard, { top: 78 + index * 42, opacity: 1 - index * 0.2 }]} />
      ))}
    </View>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const current = steps[index];

  const goNext = () => {
    if (index === steps.length - 1) {
      router.replace("/(tabs)");
      return;
    }
    setIndex((value) => value + 1);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {index === 0 ? <DriftDots /> : index === 1 ? <UnderstandingIllustration /> : <SearchIllustration />}

        <View style={styles.copyPanel}>
          <Badge variant="neutral">{current.badge}</Badge>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.body}>{current.body}</Text>
          <View style={styles.dotsRow}>
            {steps.map((step, stepIndex) => (
              <View key={step.title} style={[styles.progressDot, stepIndex === index ? styles.progressDotActive : null]} />
            ))}
          </View>
          {index === steps.length - 1 ? (
            <>
              <PrimaryButton onPress={goNext}>{"Organize My Memory ->"}</PrimaryButton>
              <Text style={styles.privacy}>Your data stays private. Analysis runs on your device.</Text>
            </>
          ) : (
            <GhostButton onPress={goNext}>Continue</GhostButton>
          )}
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
  scrollContent: {
    paddingBottom: 28,
  },
  illustration: {
    height: 186,
    marginHorizontal: 18,
    marginTop: 12,
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  dot: {
    position: "absolute",
    borderRadius: 2,
  },
  copyPanel: {
    paddingHorizontal: 28,
    paddingTop: 18,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.9,
    marginTop: 14,
  },
  body: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 18,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.textDisabled,
  },
  progressDotActive: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.cyan,
  },
  privacy: {
    color: COLORS.textTertiary,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 17,
    marginTop: 14,
  },
  mockScreenshot: {
    position: "absolute",
    left: 82,
    top: 22,
    width: 176,
    height: 162,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    padding: 16,
    gap: 12,
  },
  windowBar: {
    height: 28,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  mockLine: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  floatTag: {
    position: "absolute",
  },
  queryBar: {
    position: "absolute",
    left: 24,
    right: 24,
    top: 34,
    height: 50,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.cyan,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  queryText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  appearingCard: {
    position: "absolute",
    left: 46,
    right: 46,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
  },
});
