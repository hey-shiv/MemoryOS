import React, { useState, useRef } from "react";
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
import { useRouter } from "expo-router";
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
} from "phosphor-react-native";
import { COLORS, mockMemories, searchSuggestions } from "../../lib/mockData";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Rocket,
  ForkKnife,
  Receipt,
  Quotes,
  Phone,
  MapPin,
  ShieldWarning,
};

function SearchResultCard({ item, index }: any) {
  const router = useRouter();
  const IconComp = iconMap[item.icon] || Code;

  return (
    <View>
      <Pressable
        style={[styles.resultCard, { backgroundColor: item.bgColor }]}
        onPress={() => router.push(`/memory/${item.id}`)}
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
          <View style={styles.resultTitleRow}>
            <View style={[styles.catBadge, { borderColor: item.accentColor + "40" }]}>
              <Text style={[styles.catBadgeText, { color: item.accentColor }]}>
                {item.category.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.confBadge, { borderColor: item.accentColor + "40" }]}>
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
            {item.tags.map((tag: string) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.matchReason}>
            <Sparkle size={10} color={COLORS.lime} /> Matched: {item.tags[0]} and {item.tags[1] ?? "context"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof mockMemories>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleSearch = (text: string) => {
    setQuery(text);
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
        setResults(filtered.length > 0 ? filtered : mockMemories.slice(0, 5));
        setSearching(false);
      }, 400);
    } else {
      setResults([]);
      setSearching(false);
    }
  };

  const handleSuggestion = (text: string) => {
    setQuery(text);
    handleSearch(text);
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Search</Text>
          <Text style={styles.screenSubtitle}>Natural language memory recall</Text>
        </View>

        {/* Search input */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <MagnifyingGlass size={16} color={query ? COLORS.lime : COLORS.textTertiary} />
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
              <Pressable onPress={clearSearch}>
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
          {/* Searching state */}
          {searching && (
            <View style={styles.searchingRow}>
              <Sparkle size={14} color={COLORS.lime} weight="fill" />
              <Text style={styles.searchingText}>Scanning visual memory…</Text>
            </View>
          )}

          {/* Suggestions (when no query) */}
          {query.length === 0 && !searching && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>SUGGESTED SEARCHES</Text>
              </View>
              {searchSuggestions.map((s, i) => {
                const IconComp = iconMap[s.icon] || Code;
                return (
                  <View key={s.id}>
                    <Pressable
                      style={styles.suggestionRow}
                      onPress={() => handleSuggestion(s.text)}
                    >
                      <View style={styles.suggestionIcon}>
                        <IconComp size={16} color={COLORS.textSecondary} />
                      </View>
                      <Text style={styles.suggestionText}>{s.text}</Text>
                      <ArrowRight size={14} color={COLORS.textTertiary} />
                    </Pressable>
                  </View>
                );
              })}

              {/* Recent */}
              <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                <Text style={styles.sectionTitle}>RECENT MEMORIES</Text>
              </View>
              {mockMemories.slice(0, 3).map((item, i) => (
                <SearchResultCard key={item.id} item={item} index={i} />
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
                <View style={styles.aiLabel}>
                  <Sparkle size={10} color={COLORS.lime} weight="fill" />
                  <Text style={styles.aiLabelText}>Semantic search</Text>
                </View>
              </View>
              {results.map((item, i) => (
                <SearchResultCard key={item.id} item={item} index={i} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
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
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },
  scroll: {
    flex: 1,
  },
  searchingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchingText: {
    fontSize: 13,
    color: COLORS.lime,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },
  suggestionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderMuted,
    gap: 12,
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
  resultsMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  resultsMetaText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    fontWeight: "600",
  },
  aiLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(200, 241, 53, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.2)",
  },
  aiLabelText: {
    fontSize: 10,
    color: COLORS.lime,
    fontWeight: "600",
  },
  resultCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    gap: 12,
  },
  resultThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    position: "relative",
  },
  sensitiveOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: COLORS.bg,
    borderRadius: 8,
    padding: 2,
  },
  resultBody: {
    flex: 1,
    gap: 4,
  },
  resultTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
    lineHeight: 16,
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
  tagText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  matchReason: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    fontSize: 13,
    color: COLORS.textTertiary,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
