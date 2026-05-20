import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import {
  House,
  SquaresFour,
  MagnifyingGlass,
  ChartBar,
  Gear,
} from "phosphor-react-native";
import { COLORS } from "../../lib/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabIconProps = {
  focused: boolean;
  icon: React.ReactNode;
  label: string;
};

function TabIcon({ focused, icon, label }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
        {icon}
      </View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111110",
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <House
                  size={22}
                  color={focused ? COLORS.lime : COLORS.textTertiary}
                  weight={focused ? "fill" : "regular"}
                />
              }
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <SquaresFour
                  size={22}
                  color={focused ? COLORS.lime : COLORS.textTertiary}
                  weight={focused ? "fill" : "regular"}
                />
              }
              label="Collections"
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
              icon={
                <MagnifyingGlass
                  size={22}
                  color={focused ? COLORS.lime : COLORS.textTertiary}
                  weight={focused ? "bold" : "regular"}
                />
              }
              label="Search"
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
              icon={
                <ChartBar
                  size={22}
                  color={focused ? COLORS.lime : COLORS.textTertiary}
                  weight={focused ? "fill" : "regular"}
                />
              }
              label="Insights"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <Gear
                  size={22}
                  color={focused ? COLORS.lime : COLORS.textTertiary}
                  weight={focused ? "fill" : "regular"}
                />
              }
              label="Settings"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconWrapper: {
    width: 36,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  iconWrapperActive: {
    backgroundColor: "rgba(200, 241, 53, 0.1)",
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: COLORS.textTertiary,
  },
  tabLabelActive: {
    color: COLORS.lime,
  },
});
