import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRight,
  Brain,
  Code,
  ForkKnife,
  MagnifyingGlass,
  Phone,
  Quotes,
  Receipt,
  Rocket,
  ShieldWarning,
  X,
} from "phosphor-react-native";
import { COLORS, mockMemories, searchSuggestions } from "../../lib/mockData";

const SERIF = "Georgia";
const BLACK = "#050503";
const CREAM = "#E8E4D6";
const INK = "#181811";
const HAIR = "rgba(24,24,17,0.12)";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Rocket,
  ForkKnife,
  Receipt,
  Quotes,
  Phone,
  ShieldWarning,
};

function Geometry() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {[0, 1, 2, 3].map((i) => <View key={i} style={[styles.vLine, { left: `${16 + i * 24}%` }]} />)}
      <View style={styles.bigCircle} />
      <View style={styles.diagonal} />
    </View>
  );
}

function ResultCard({ item }: { item: (typeof mockMemories)[0] }) {
  const router = useRouter();
  const Icon = iconMap[item.icon] || Brain;
  return (
    <Pressable style={styles.resultCard} onPress={() => router.push(`/memory/${item.id}`)}>
      <View style={[styles.resultArtifact, { backgroundColor: item.bgColor }]}>
        <Icon size={22} color={item.accentColor} weight="duotone" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.resultTop}>
          <Text style={styles.resultRoman}>I</Text>
          <Text style={styles.resultCategory}>{item.category}</Text>
          <Text style={styles.resultConfidence}>{item.confidence}%</Text>
        </View>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultSummary} numberOfLines={2}>{item.summary}</Text>
      </View>
    </Pressable>
  );
}

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(params.q ?? "");
  const [results, setResults] = useState<typeof mockMemories>([]);
  const inputRef = useRef<TextInput>(null);

  const runSearch = (text: string) => {
    if (text.length <= 1) {
      setResults([]);
      return;
    }
    const q = text.toLowerCase();
    const filtered = mockMemories.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        m.summary.toLowerCase().includes(q) ||
        m.ocrText?.toLowerCase().includes(q)
    );
    setResults(filtered.length > 0 ? filtered : mockMemories.slice(3, 8));
  };

  useEffect(() => {
    if (params.q) runSearch(params.q);
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    runSearch(text);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Geometry />
            <Text style={styles.edition}>The{"\n"}Recall{"\n"}Edition</Text>
            <Text style={styles.giant}>Search</Text>
            <Text style={styles.serifLine}>Ask for what you saved, not where you saved it.</Text>
          </View>

          <View style={styles.searchBoard}>
            <View style={styles.searchBar}>
              <MagnifyingGlass size={16} color={INK} />
              <TextInput
                ref={inputRef}
                style={styles.searchInput}
                placeholder="show all AI startup ideas"
                placeholderTextColor="rgba(24,24,17,0.42)"
                value={query}
                onChangeText={handleSearch}
                selectionColor={INK}
                autoCorrect={false}
              />
              {query.length > 0 && (
                <Pressable onPress={() => handleSearch("")}>
                  <X size={16} color={INK} />
                </Pressable>
              )}
            </View>

            {query.length === 0 ? (
              <View style={styles.suggestions}>
                {searchSuggestions.slice(0, 6).map((suggestion, i) => {
                  const Icon = iconMap[suggestion.icon] || Brain;
                  return (
                    <Pressable key={suggestion.id} style={styles.suggestionRow} onPress={() => handleSearch(suggestion.text)}>
                      <Text style={styles.suggestionRoman}>{["I", "II", "III", "IV", "V", "VI"][i]}</Text>
                      <Icon size={16} color={INK} />
                      <Text style={styles.suggestionText}>{suggestion.text}</Text>
                      <ArrowRight size={13} color={INK} />
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <View style={styles.results}>
                <Text style={styles.resultsLabel}>{results.length} memories matched</Text>
                {results.map((item) => <ResultCard key={item.id} item={item} />)}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CREAM },
  content: { paddingBottom: 88 },
  hero: {
    backgroundColor: CREAM,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  edition: { color: INK, fontSize: 18, lineHeight: 17, fontWeight: "900" },
  giant: { color: INK, fontSize: 72, lineHeight: 76, fontWeight: "900", marginTop: 24, letterSpacing: -4 },
  serifLine: { color: INK, fontFamily: SERIF, fontSize: 26, lineHeight: 29, marginTop: 8, maxWidth: 330 },
  searchBoard: {
    backgroundColor: BLACK,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: CREAM,
    borderWidth: 1,
    borderColor: CREAM,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  searchInput: { flex: 1, padding: 0, color: INK, fontSize: 15, fontWeight: "700" },
  suggestions: { marginTop: 20, borderTopWidth: 1, borderTopColor: "rgba(232,228,214,0.18)" },
  suggestionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232,228,214,0.16)",
    paddingVertical: 15,
  },
  suggestionRoman: { width: 24, color: CREAM, fontFamily: SERIF, opacity: 0.6 },
  suggestionText: { flex: 1, color: CREAM, fontSize: 15, fontWeight: "800" },
  results: { marginTop: 18 },
  resultsLabel: { color: CREAM, fontSize: 12, fontWeight: "900", letterSpacing: 1.4, marginBottom: 12, textTransform: "uppercase" },
  resultCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(232,228,214,0.06)",
    borderWidth: 1,
    borderColor: "rgba(232,228,214,0.18)",
    padding: 12,
    marginBottom: 10,
  },
  resultArtifact: { width: 54, height: 68, alignItems: "center", justifyContent: "center", transform: [{ rotate: "-3deg" }] },
  resultTop: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 5 },
  resultRoman: { color: CREAM, opacity: 0.55, fontFamily: SERIF },
  resultCategory: { color: CREAM, fontSize: 10, fontWeight: "900", textTransform: "uppercase", flex: 1 },
  resultConfidence: { color: COLORS.lime, fontSize: 11, fontWeight: "900" },
  resultTitle: { color: CREAM, fontSize: 17, fontWeight: "900" },
  resultSummary: { color: "rgba(232,228,214,0.68)", fontSize: 12, lineHeight: 16, marginTop: 4 },
  vLine: { position: "absolute", top: 0, bottom: 0, width: 1, backgroundColor: HAIR },
  bigCircle: { position: "absolute", width: 430, height: 430, borderRadius: 215, borderWidth: 1, borderColor: HAIR, top: 6, left: -32 },
  diagonal: { position: "absolute", width: 520, height: 1, backgroundColor: HAIR, top: 210, left: -60, transform: [{ rotate: "-28deg" }] },
});
