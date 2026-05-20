import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" backgroundColor="#0A0A09" />
        <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="memory/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
          <Stack.Screen name="collection/[id]" options={{ headerShown: false, animation: "slide_from_right" }} />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
