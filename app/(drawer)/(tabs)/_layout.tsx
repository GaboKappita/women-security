import { Tabs } from 'expo-router';
import { TabBarIcon } from '../../../components/navigation/TabBarIcon';

export default function TabNavigator() {
  return (
    <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#d2a679',
            borderTopColor: 'transparent',
            height: 65,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarActiveTintColor: '#f5f5f5',
          tabBarInactiveTintColor: '#f5f5f5',
        }}
        >
      <Tabs.Screen 
        name="home"
        options={{ 
          tabBarLabel: 'Inicio', 
          headerShown: false,
          tabBarIcon: ({color, focused})=> (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name="grupos" 
        options={{ 
          tabBarLabel: 'Grupos', 
          headerShown: false,
          tabBarIcon: ({color, focused})=> (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }} 
      />
    </Tabs>
    
  );
}

// import { Tabs } from 'expo-router';
// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="grupos"
//         options={{
//           title: 'Mis grupos',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
//           ),
//         }}
//       />
      
//     </Tabs>
//   );
// }
