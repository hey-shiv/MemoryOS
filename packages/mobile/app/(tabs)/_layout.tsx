import React from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { ChartBar, House, MagnifyingGlass, Plus, Sparkle } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../lib/mockData";

type TabIconProps = {
  focused: boolean;
  icon: React.ReactNode;
  label: string;
  amber?: boolean;
};

function TabIcon({ focused, icon, label, amber }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      {icon}
      {focused ? <View style={[styles.activeDot, amber ? styles.activeDotAmber : null]} /> : null}
      {focused ? <Text style={[styles.tabLabel, amber ? styles.tabLabelAmber : null]}>{label}</Text> : null}
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 7,
          backgroundColor: "rgba(10,10,11,0.90)",
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowRadius: 22,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Home"
              icon={<House size={22} color={focused ? COLORS.cyan : COLORS.textDisabled} weight={focused ? "fill" : "regular"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="import"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Import"
              icon={<Plus size={23} color={focused ? COLORS.cyan : COLORS.textDisabled} weight={focused ? "bold" : "regular"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Search"
              icon={<MagnifyingGlass size={22} color={focused ? COLORS.cyan : COLORS.textDisabled} weight={focused ? "bold" : "regular"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Insights"
              icon={<ChartBar size={22} color={focused ? COLORS.cyan : COLORS.textDisabled} weight={focused ? "fill" : "regular"} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gems"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Gems"
              amber
              icon={<Sparkle size={22} color={focused ? COLORS.amber : COLORS.textDisabled} weight={focused ? "fill" : "regular"} />}
            />
          ),
        }}
      />
      <Tabs.Screen name="collections" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    minWidth: 54,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  activeDot: {
    width: 3,
    height: 3,
    borderRadius: 99,
    backgroundColor: COLORS.cyan,
  },
  activeDotAmber: {
    backgroundColor: COLORS.amber,
  },
  tabLabel: {
    color: COLORS.cyan,
    fontSize: 10,
    fontWeight: "800",
  },
  tabLabelAmber: {
    color: COLORS.amber,
  },
});
