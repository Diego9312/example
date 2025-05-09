import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useWindowDimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Icon component for tab bar
const TabBarIcon: React.FC<{ name: React.ComponentProps<typeof FontAwesome>['name']; color: string }> = ({ name, color }) => (
  <FontAwesome size={28} style={{ marginBottom: -3 }} name={name} color={color} />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 1024;
  
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const headerShown = useClientOnlyValue(false, true);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        headerShown,
        tabBarStyle: {
          paddingHorizontal: isLargeScreen ? 50 : 20,
          height: isLargeScreen ? 80 : 60,
        },
        tabBarLabelStyle: {
          fontSize: isLargeScreen ? 20 : 14,
          fontWeight: '600',
        },
      }}>
      {[
        { name: 'index', title: 'Tab One' },
        { name: 'two', title: 'Tab Two' },
      ].map(({ name, title }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />, 
            tabBarAccessibilityLabel: title,
            ...(name === 'index' && {
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="info-circle"
                        size={25}
                        color={textColor}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),
            }),
          }}
        />
      ))}
    </Tabs>
  );
}

