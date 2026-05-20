import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import {
  House,
  SquaresFour,
  MagnifyingGlass,
  ChartBar,
  Camera,
} from "phosphor-react-native";
import { COLORS } from "../../lib/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabIconProps = {
  focused: boolean;
  icon: React.ReactNode;
  label: string;
  isCenter?: boolean;
};

function TabIcon({ focused, icon, label, isCenter }: TabIconProps) {
  if (isCenter) {
    return (
      <View style={styles.centerTabItem}>
        <View style={styles.centerIconWrapper}>{icon}</View>
      </View>
    );
  }
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
          position: "absolute",
          backgroundColor: "rgba(8,9,7,0.96)",
          borderTopColor: "rgba(245,240,232,0.10)",
          borderTopWidth: 1,
          height: 68 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 9,
          elevation: 0,
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowRadius: 18,
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
        name="import"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              isCenter
              icon={
                <Camera
                  size={24}
                  color="#000"
                  weight="bold"
                />
              }
              label="Scan"
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
      {/* Hide settings from tab bar but keep it routable */}
      <Tabs.Screen
        name="settings"
        options={{ href: null }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  iconWrapper: {
    width: 38,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },
  iconWrapperActive: {
    backgroundColor: "rgba(200, 255, 46, 0.13)",
    borderWidth: 1,
    borderColor: "rgba(200, 255, 46, 0.20)",
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: COLORS.textTertiary,
  },
  tabLabelActive: {
    color: COLORS.lime,
  },
  centerTabItem: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  centerIconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.lime,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.lime,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 6,
  },
});
