import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import {
  ArrowLeft,
  Barbell,
  Bell,
  BookOpen,
  Brain,
  Camera,
  ChartBar,
  Check,
  Code,
  FileText,
  ForkKnife,
  Gear,
  House,
  LockKey,
  MapPin,
  MagnifyingGlass,
  Plus,
  Question,
  Quotes,
  Receipt,
  Rocket,
  ShieldWarning,
  Smiley,
  Sparkle,
  SquaresFour,
  Student,
  Warning,
} from "phosphor-react-native";
import { COLORS, Collection, MemoryItem } from "./mockData";

export const ICONS: Record<string, React.ComponentType<any>> = {
  ArrowLeft,
  Barbell,
  Bell,
  BookOpen,
  Brain,
  Camera,
  ChartBar,
  Check,
  Code,
  FileText,
  ForkKnife,
  Gear,
  House,
  LockKey,
  MapPin,
  MagnifyingGlass,
  Plus,
  Question,
  Quotes,
  Receipt,
  Rocket,
  ShieldWarning,
  Smiley,
  Sparkle,
  SquaresFour,
  Student,
  Warning,
};

export function getCategoryIcon(name?: string) {
  return ICONS[name ?? "Brain"] ?? Brain;
}

export function categoryAccent(category?: string) {
  switch (category) {
    case "coding":
    case "travel":
    case "whiteboard":
      return COLORS.cyan;
    case "startup":
    case "quotes":
      return COLORS.amber;
    case "food":
    case "fitness":
      return COLORS.green;
    case "sensitive":
      return COLORS.red;
    default:
      return COLORS.textSecondary;
  }
}

export function ScreenHeader({
  title,
  subtitle,
  right,
  back,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  back?: () => void;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTitleWrap}>
        <View style={styles.headerTitleRow}>
          {back ? (
            <Pressable style={styles.backButton} onPress={back}>
              <ArrowLeft size={19} color={COLORS.textPrimary} weight="bold" />
            </Pressable>
          ) : null}
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.headerRight}>{right}</View> : null}
    </View>
  );
}

export function IconButton({
  icon,
  onPress,
  accent,
}: {
  icon: React.ComponentType<any>;
  onPress?: () => void;
  accent?: string;
}) {
  const Icon = icon;
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Icon size={19} color={accent ?? COLORS.textSecondary} weight="bold" />
    </Pressable>
  );
}

export function SurfaceCard({
  children,
  style,
  onPress,
  accent,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accent?: string;
}) {
  const body = (
    <View style={[styles.surfaceCard, accent ? { borderLeftWidth: 3, borderLeftColor: accent } : null, style]}>
      {children}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
      {body}
    </Pressable>
  );
}

export function Badge({
  children,
  variant = "neutral",
  style,
}: {
  children: React.ReactNode;
  variant?: "cyan" | "amber" | "green" | "red" | "neutral";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.badge, styles[`badge_${variant}`], style]}>
      <Text style={[styles.badgeText, styles[`badgeText_${variant}`]]}>{children}</Text>
    </View>
  );
}

export function PrimaryButton({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed, style]} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{children}</Text>
    </Pressable>
  );
}

export function GhostButton({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.ghostButton, pressed && styles.buttonPressed, style]} onPress={onPress}>
      <Text style={styles.ghostButtonText}>{children}</Text>
    </Pressable>
  );
}

export function SearchField({
  value,
  placeholder,
  onChangeText,
  focused = false,
}: {
  value?: string;
  placeholder: string;
  onChangeText?: (value: string) => void;
  focused?: boolean;
}) {
  return (
    <View style={[styles.searchField, focused && styles.searchFieldFocused]}>
      <MagnifyingGlass size={18} color={focused ? COLORS.cyan : COLORS.textTertiary} />
      <Text style={[styles.searchPlaceholder, value ? styles.searchValue : null]} numberOfLines={1}>
        {value || placeholder}
      </Text>
    </View>
  );
}

export function ConfidenceBar({ value, width = 86 }: { value: number; width?: number }) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: Math.max(0, Math.min(value, 1)),
      duration: 800,
      delay: 180,
      useNativeDriver: false,
    }).start();
  }, [progress, value]);

  return (
    <View style={[styles.confidenceTrack, { width }]}>
      <Animated.View
        style={[
          styles.confidenceFill,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      />
    </View>
  );
}

export function ScannerBeam() {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [y]);

  return (
    <Animated.View
      style={[
        styles.scannerBeam,
        {
          transform: [
            {
              translateY: y.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 128],
              }),
            },
          ],
        },
      ]}
    />
  );
}

function placeholderLines(item: MemoryItem) {
  if (item.primaryCategory === "coding") {
    return ["const memory = scan()", "items.map(tag => tag)", "return <Collection />", "score > 0.92"];
  }
  if (item.primaryCategory === "receipts") {
    return ["ORDER TOTAL", "Item      Rs 612", "Tax        Rs 34", "Paid      UPI"];
  }
  if (item.primaryCategory === "fitness") {
    return ["Bench 4x6", "Rows 4x8", "Squat 5x5", "Protein 150g"];
  }
  if (item.primaryCategory === "quotes") {
    return ["\"Discipline", "outlasts", "motivation.\""];
  }
  if (item.primaryCategory === "food") {
    return ["Tonkotsu broth", "black garlic oil", "ajitama", "weekend recipe"];
  }
  if (item.primaryCategory === "travel") {
    return ["Shibuya", "Ginza", "Akihabara", "transfer route"];
  }
  if (item.primaryCategory === "sensitive") {
    return ["REDACTED", "XXXX XXXX 4821", "sk-proj-XXXX", "private data"];
  }
  return item.summary.split(" ").slice(0, 12);
}

export function ImagePlaceholder({
  item,
  small = false,
  wide = false,
  scanning = false,
  style,
}: {
  item: MemoryItem;
  small?: boolean;
  wide?: boolean;
  scanning?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const Icon = getCategoryIcon(item.icon);
  const accent = item.accentColor;
  const lines = placeholderLines(item);

  return (
    <View
      style={[
        styles.imageCard,
        wide ? styles.imageCardWide : null,
        small ? styles.imageCardSmall : null,
        scanning ? { borderColor: COLORS.cyan } : null,
        style,
      ]}
    >
      <View style={styles.windowHeader}>
        <View style={[styles.windowDot, { backgroundColor: "#FF5F57" }]} />
        <View style={[styles.windowDot, { backgroundColor: "#FFBD2E" }]} />
        <View style={[styles.windowDot, { backgroundColor: "#28CA41" }]} />
      </View>
      <View style={styles.placeholderBody}>
        <View style={[styles.placeholderIcon, { backgroundColor: item.bgColor, borderColor: accent + "50" }]}>
          <Icon size={small ? 14 : 22} color={accent} weight="duotone" />
        </View>
        {item.primaryCategory === "food" ? <View style={styles.foodSwatch} /> : null}
        {lines.slice(0, small ? 3 : 5).map((line, index) => (
          <Text
            key={`${item.id}-${index}`}
            style={[
              styles.placeholderText,
              item.primaryCategory === "coding" ? styles.placeholderCode : null,
              item.primaryCategory === "sensitive" ? styles.redactedText : null,
              { color: index === 0 ? accent : COLORS.textSecondary },
            ]}
            numberOfLines={1}
          >
            {line}
          </Text>
        ))}
      </View>
      <View style={styles.categoryFade} />
      <Text style={[styles.placeholderCategory, { color: accent }]} numberOfLines={1}>
        {item.category}
      </Text>
      {scanning ? (
        <View style={styles.scanOverlay}>
          <ScannerBeam />
        </View>
      ) : null}
    </View>
  );
}

export function CollectionIcon({ collection }: { collection: Collection }) {
  const Icon = getCategoryIcon(collection.icon);
  return (
    <View
      style={[
        styles.collectionIcon,
        { backgroundColor: collection.bgColor, borderColor: collection.accentColor + "55" },
      ]}
    >
      <Icon size={22} color={collection.accentColor} weight="duotone" />
    </View>
  );
}

export const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 96,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },
  sectionLabel: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  seeAll: {
    color: COLORS.cyan,
    fontSize: 12,
    fontWeight: "800",
  },
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 18,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 3,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  surfaceCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  badge_cyan: { backgroundColor: COLORS.cyanDim, borderColor: "rgba(0,212,255,0.25)" },
  badge_amber: { backgroundColor: COLORS.amberDim, borderColor: "rgba(255,184,48,0.25)" },
  badge_green: { backgroundColor: COLORS.greenDim, borderColor: "rgba(0,229,160,0.25)" },
  badge_red: { backgroundColor: COLORS.redDim, borderColor: "rgba(255,77,106,0.25)" },
  badge_neutral: { backgroundColor: "rgba(255,255,255,0.06)", borderColor: COLORS.border },
  badgeText_cyan: { color: COLORS.cyan },
  badgeText_amber: { color: COLORS.amber },
  badgeText_green: { color: COLORS.green },
  badgeText_red: { color: COLORS.red },
  badgeText_neutral: { color: COLORS.textSecondary },
  primaryButton: {
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: COLORS.cyan,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: "900",
  },
  ghostButton: {
    minHeight: 44,
    borderRadius: 999,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  ghostButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  searchField: {
    height: 48,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchFieldFocused: {
    borderColor: COLORS.cyan,
    shadowColor: COLORS.cyan,
    shadowOpacity: 0.22,
    shadowRadius: 10,
  },
  searchPlaceholder: {
    flex: 1,
    color: COLORS.textTertiary,
    fontSize: 15,
  },
  searchValue: {
    color: COLORS.textPrimary,
  },
  confidenceTrack: {
    height: 4,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  confidenceFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.cyan,
  },
  imageCard: {
    aspectRatio: 0.75,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  imageCardSmall: {
    borderRadius: 10,
  },
  imageCardWide: {
    aspectRatio: 16 / 9,
  },
  windowHeader: {
    height: 30,
    backgroundColor: "rgba(255,255,255,0.04)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 6,
  },
  windowDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  placeholderBody: {
    padding: 12,
    gap: 8,
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  placeholderText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
  },
  placeholderCode: {
    fontFamily: "Courier",
    fontWeight: "500",
  },
  redactedText: {
    backgroundColor: "rgba(255,77,106,0.14)",
    borderRadius: 5,
    overflow: "hidden",
  },
  foodSwatch: {
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.amberDim,
    borderWidth: 1,
    borderColor: "rgba(255,184,48,0.20)",
  },
  categoryFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 44,
    backgroundColor: "rgba(17,17,19,0.88)",
  },
  placeholderCategory: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 8,
    fontSize: 11,
    fontWeight: "900",
  },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,10,11,0.55)",
    overflow: "hidden",
  },
  scannerBeam: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 2,
    backgroundColor: COLORS.cyan,
    shadowColor: COLORS.cyan,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  collectionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
