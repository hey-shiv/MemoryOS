import React, { useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { COLORS, MemoryItem, searchMemories, searchSuggestions } from "../../lib/mockData";
import {
  Badge,
  ConfidenceBar,
  ImagePlaceholder,
  ScreenHeader,
  SurfaceCard,
  getCategoryIcon,
  sharedStyles,
} from "../../lib/ui";

function badgeVariant(item: MemoryItem): "cyan" | "amber" | "green" | "red" | "neutral" {
  if (item.isSensitive) return "red";
  if (item.primaryCategory === "startup" || item.primaryCategory === "quotes") return "amber";
  if (item.primaryCategory === "food" || item.primaryCategory === "fitness") return "green";
  if (item.primaryCategory === "coding" || item.primaryCategory === "travel" || item.primaryCategory === "whiteboard") return "cyan";
  return "neutral";
}

function HighlightText({ text, query, style }: { text: string; query: string; style?: any }) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return <Text style={style}>{text}</Text>;
  const pattern = new RegExp(`(${tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  const parts = text.split(pattern);
  return (
    <Text style={style}>
      {parts.map((part, index) => (
        <Text key={`${part}-${index}`} style={tokens.includes(part.toLowerCase()) ? styles.highlight : null}>
          {part}
        </Text>
      ))}
    </Text>
  );
}

function ResultCard({ item, query }: { item: MemoryItem; query: string }) {
  const router = useRouter();

  return (
    <SurfaceCard style={styles.resultCard} onPress={() => router.push(`/memory/${item.id}`)}>
      <ImagePlaceholder item={item} small style={styles.resultImage} />
      <View style={styles.resultBody}>
        <Badge variant={badgeVariant(item)}>{item.category}</Badge>
        <HighlightText text={item.title} query={query} style={styles.resultTitle} />
        <HighlightText text={item.summary} query={query} style={styles.resultSummary} />
        <Text style={item.primaryCategory === "coding" ? styles.ocrCode : styles.ocrPreview} numberOfLines={1}>
          {item.ocrText}
        </Text>
        <View style={styles.tagRow}>
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="neutral" style={styles.tinyBadge}>{tag}</Badge>
          ))}
        </View>
        <View style={styles.resultBottom}>
          <ConfidenceBar value={item.confidence} />
          <Text style={styles.scoreText}>{Math.round(item.confidence * 100)}%</Text>
        </View>
      </View>
    </SurfaceCard>
  );
}

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(params.q ?? "");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (params.q) setQuery(params.q);
  }, [params.q]);

  const results = useMemo(() => searchMemories(query), [query]);

  return (
    <SafeAreaView style={sharedStyles.screen} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={sharedStyles.scrollContent}>
          <ScreenHeader title="Search" subtitle="Natural language memory recall" />

          <View style={[styles.searchBar, focused ? styles.searchBarFocused : null]}>
            <MagnifyingGlass size={18} color={focused ? COLORS.cyan : COLORS.textTertiary} />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Try: show all AI startup ideas"
              placeholderTextColor={COLORS.textTertiary}
              value={query}
              onChangeText={setQuery}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              selectionColor={COLORS.cyan}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {query.length > 0 ? (
              <Pressable onPress={() => setQuery("")}>
                <X size={17} color={COLORS.textSecondary} />
              </Pressable>
            ) : null}
          </View>

          {query.length === 0 ? (
            <>
              <Text style={styles.askLabel}>Try asking...</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                {searchSuggestions.slice(0, 5).map((suggestion) => {
                  const Icon = getCategoryIcon(suggestion.icon);
                  return (
                    <Pressable key={suggestion.id} style={styles.suggestionChip} onPress={() => setQuery(suggestion.text)}>
                      <Icon size={14} color={COLORS.textSecondary} weight="bold" />
                      <Text style={styles.suggestionText}>{suggestion.text}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View style={styles.emptyState}>
                <MagnifyingGlass size={64} color={COLORS.textDisabled} />
                <Text style={styles.emptyTitle}>Search your visual memory</Text>
                <Text style={styles.emptyCopy}>Describe what you are looking for in plain English.</Text>
              </View>
            </>
          ) : (
            <View style={styles.resultsWrap}>
              <Text style={sharedStyles.sectionLabel}>{results.length} results</Text>
              {results.length === 0 ? (
                <SurfaceCard style={styles.noResults}>
                  <Text style={styles.emptyTitle}>No memories matched</Text>
                  <Text style={styles.emptyCopy}>Try a category, object, app name, or phrase from the screenshot.</Text>
                </SurfaceCard>
              ) : (
                results.map((item) => <ResultCard key={item.id} item={item} query={query} />)
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  searchBar: {
    height: 52,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchBarFocused: {
    borderColor: COLORS.cyan,
    shadowColor: COLORS.cyan,
    shadowOpacity: 0.22,
    shadowRadius: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    padding: 0,
  },
  askLabel: {
    color: COLORS.textTertiary,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginTop: 22,
  },
  chipRow: {
    gap: 8,
    paddingTop: 12,
    paddingRight: 18,
  },
  suggestionChip: {
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  suggestionText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 330,
    paddingHorizontal: 28,
  },
  emptyTitle: {
    color: COLORS.textSecondary,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 16,
    textAlign: "center",
  },
  emptyCopy: {
    color: COLORS.textTertiary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    textAlign: "center",
  },
  resultsWrap: {
    gap: 10,
    marginTop: 22,
  },
  resultCard: {
    flexDirection: "row",
    gap: 13,
    padding: 12,
  },
  resultImage: {
    width: 58,
    height: 78,
    aspectRatio: undefined,
  },
  resultBody: {
    flex: 1,
  },
  resultTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 8,
  },
  resultSummary: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  ocrPreview: {
    color: COLORS.textTertiary,
    fontSize: 11,
    marginTop: 7,
  },
  ocrCode: {
    color: COLORS.cyan,
    fontSize: 11,
    marginTop: 7,
    fontFamily: "Courier",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 9,
  },
  tinyBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  resultBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  scoreText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "800",
  },
  highlight: {
    color: COLORS.cyan,
  },
  noResults: {
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
