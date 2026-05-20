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
        <View style={[styles.centerIconWrapper, focused && styles.centerIconWrapperActive]}>
          {icon}
        </View>
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
  const TAB_HEIGHT = 64;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0E0E0C",
          borderTopColor: "rgba(245,240,232,0.08)",
          borderTopWidth: 1,
          height: TAB_HEIGHT + insets.bottom,
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
    letterSpacing: 0.4,
    color: COLORS.textTertiary,
  },
  tabLabelActive: {
    color: COLORS.lime,
    fontWeight: "700",
  },
  centerTabItem: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  centerIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lime,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.lime,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  centerIconWrapperActive: {
    shadowOpacity: 0.8,
    shadowRadius: 16,
  },
});
