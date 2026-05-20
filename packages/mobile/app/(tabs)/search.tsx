import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  MagnifyingGlass,
  X,
  Code,
  Rocket,
  ForkKnife,
  Receipt,
  Quotes,
  Phone,
  MapPin,
  ShieldWarning,
  ArrowRight,
  Sparkle,
  Brain,
} from "phosphor-react-native";
import { COLORS, mockMemories, searchSuggestions } from "../../lib/mockData";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code, Rocket, ForkKnife, Receipt, Quotes, Phone, MapPin, ShieldWarning,
};

// ─── Result Card ──────────────────────────────────────────────────────────────
function SearchResultCard({ item }: { item: (typeof mockMemories)[0] }) {
  const router = useRouter();
  const IconComp = iconMap[item.icon] || Code;
  return (
    <Pressable
      style={[styles.resultCard, { backgroundColor: item.bgColor }]}
      onPress={() => router.push(`/memory/${item.id}`)}
      android_ripple={{ color: "rgba(255,255,255,0.04)" }}
    >
      <View style={[styles.resultThumb, { borderColor: item.accentColor + "30" }]}>
        <IconComp size={22} color={item.accentColor} weight="duotone" />
        {item.isSensitive && (
          <View style={styles.sensitiveOverlay}>
            <ShieldWarning size={12} color={COLORS.red} weight="fill" />
          </View>
        )}
      </View>

      <View style={styles.resultBody}>
        <View style={styles.resultBadgeRow}>
          <View style={[styles.catBadge, { borderColor: item.accentColor + "40" }]}>
            <Text style={[styles.catBadgeText, { color: item.accentColor }]}>
              {item.category.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.confBadge, { borderColor: item.accentColor + "40" }]}>
            <Sparkle size={9} color={item.accentColor} weight="fill" />
            <Text style={[styles.confBadgeText, { color: item.accentColor }]}>
              {item.confidence}%
            </Text>
          </View>
        </View>
        <Text style={[styles.resultTitle, { color: item.textColor }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.resultSummary} numberOfLines={2}>
          {item.summary}
        </Text>
        <View style={styles.resultTagRow}>
          {item.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.matchReason}>
          ↳ Matched: {item.tags[0]}{item.tags[1] ? ` · ${item.tags[1]}` : ""}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(params.q ?? "");
  const [results, setResults] = useState<typeof mockMemories>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Run search on mount if query param passed
  useEffect(() => {
    if (params.q) {
      runSearch(params.q);
    }
  }, []);

  const runSearch = (text: string) => {
    if (text.length > 1) {
      setSearching(true);
      setTimeout(() => {
        const filtered = mockMemories.filter(
          (m) =>
            m.title.toLowerCase().includes(text.toLowerCase()) ||
            m.category.toLowerCase().includes(text.toLowerCase()) ||
            m.tags.some((t) => t.toLowerCase().includes(text.toLowerCase())) ||
            m.summary.toLowerCase().includes(text.toLowerCase())
        );
        setResults(filtered.length > 0 ? filtered : mockMemories.slice(0, 6));
        setSearching(false);
      }, 380);
    } else {
      setResults([]);
      setSearching(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    runSearch(text);
  };

  const handleSuggestion = (text: string) => {
    setQuery(text);
    runSearch(text);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* ── Header ────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Search</Text>
          <Text style={styles.screenSubtitle}>Natural language memory recall</Text>
        </View>

        {/* ── Search Input ─────────────────────────────────────────────── */}
        <View style={styles.searchRow}>
          <View style={[styles.searchBar, query.length > 0 && styles.searchBarActive]}>
            <Brain
              size={16}
              color={query.length > 0 ? COLORS.lime : COLORS.textTertiary}
              weight={query.length > 0 ? "duotone" : "regular"}
            />
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Try: show all AI startup ideas"
              placeholderTextColor={COLORS.textTertiary}
              value={query}
              onChangeText={handleSearch}
              selectionColor={COLORS.lime}
              returnKeyType="search"
              autoCorrect={false}
            />
            {query.length > 0 && (
              <Pressable onPress={clearSearch} hitSlop={8}>
                <X size={16} color={COLORS.textTertiary} />
              </Pressable>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* Searching indicator */}
          {searching && (
            <View style={styles.searchingRow}>
              <Sparkle size={13} color={COLORS.lime} weight="fill" />
              <Text style={styles.searchingText}>Scanning visual memory…</Text>
            </View>
          )}

          {/* Suggestions (empty state) */}
          {query.length === 0 && !searching && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>SUGGESTED SEARCHES</Text>
              </View>
              {searchSuggestions.map((s) => {
                const IconComp = iconMap[s.icon] || Code;
                return (
                  <Pressable
                    key={s.id}
                    style={styles.suggestionRow}
                    onPress={() => handleSuggestion(s.text)}
                    android_ripple={{ color: "rgba(255,255,255,0.04)" }}
                  >
                    <View style={styles.suggestionIcon}>
                      <IconComp size={16} color={COLORS.textSecondary} />
                    </View>
                    <Text style={styles.suggestionText}>{s.text}</Text>
                    <ArrowRight size={14} color={COLORS.textTertiary} />
                  </Pressable>
                );
              })}

              <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                <Text style={styles.sectionTitle}>RECENT MEMORIES</Text>
              </View>
              {mockMemories.slice(0, 3).map((item) => (
                <SearchResultCard key={item.id} item={item} />
              ))}
            </>
          )}

          {/* Results */}
          {results.length > 0 && !searching && (
            <>
              <View style={styles.resultsMeta}>
                <Text style={styles.resultsMetaText}>
                  {results.length} memories matched
                </Text>
                <View style={styles.semanticPill}>
                  <Brain size={10} color={COLORS.lime} weight="fill" />
                  <Text style={styles.semanticPillText}>Semantic search</Text>
                </View>
              </View>
              {results.map((item) => (
                <SearchResultCard key={item.id} item={item} />
              ))}
            </>
          )}

          {/* Empty */}
          {query.length > 1 && results.length === 0 && !searching && (
            <View style={styles.emptyState}>
              <MagnifyingGlass size={32} color={COLORS.textTertiary} />
              <Text style={styles.emptyTitle}>No memories found</Text>
              <Text style={styles.emptySubtext}>
                Try a different query or scan new images
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
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

  searchRow: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  searchBarActive: {
    borderColor: "rgba(200,241,53,0.3)",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },

  // Searching
  searchingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchingText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },

  // Section
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },

  // Suggestions
  suggestionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  suggestionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  // Results
  resultsMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  resultsMetaText: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  semanticPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(200,241,53,0.1)",
    borderWidth: 1,
    borderColor: "rgba(200,241,53,0.25)",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  semanticPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.lime,
    letterSpacing: 0.3,
  },

  // Result card
  resultCard: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
  },
  resultThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  sensitiveOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  resultBody: { flex: 1, gap: 5 },
  resultBadgeRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  catBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  catBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  confBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  confBadgeText: {
    fontSize: 9,
    fontWeight: "700",
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  resultSummary: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  resultTagRow: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: { fontSize: 10, color: COLORS.textSecondary },
  matchReason: {
    fontSize: 11,
    color: COLORS.textTertiary,
    fontStyle: "italic",
  },

  // Empty
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 10,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 13,
    color: COLORS.textTertiary,
    textAlign: "center",
    lineHeight: 18,
  },
});
