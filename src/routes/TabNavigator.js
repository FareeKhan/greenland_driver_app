import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NotificationTab, Home, EarningsTab, Profile, } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { ColorPicker, CustomSidebarMenu, HeaderLeftMenuIcon, VectorIcon, AppHeader } from '../components';
import RouteName from '../routes/RouteName';
import { Colors, SH, SF } from '../utils';
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HeaderArray = {
  headerShown: true,
  headerStyle: { backgroundColor: Colors.theme_background },
  headerShadowVisible: false,
};
function DrawerSidebarScreen(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <CustomSidebarMenu {...props} />
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScsreenTabAll" drawerContent={props => <DrawerSidebarScreen {...props} />}>
      <Drawer.Screen name="HomeScsreenTabAll"
        options={{ headerShown: false }}
        component={HomeScsreenTabAll} />
    </Drawer.Navigator>
  );
}
function Root() {
  return (
    <Stack.Navigator screenOptions="screen">
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen name="Homese" component={HomeScsreenTabAll}
        options={{
          title: '',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
export default Root;

function HomeTabScreenStack(props) {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: (props) => <AppHeader {...props} headerTitle={t("Home_Text")} />,
          ...HeaderArray,
          headerStyle: { backgroundColor: Colors.theme_background },
        }}
      />
    </Stack.Navigator>
  );
}

function NotificationTabScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="NotificationTab">
      <Stack.Screen
        name="Notification"
        component={NotificationTab}
        options={{
          headerTitle: (props) => <AppHeader  {...props} headerTitle={t("Notification_Text")} />,
          ...HeaderArray,
          headerStyle: { backgroundColor: Colors.theme_background },
       
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileScreenStack(props) {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: (props) => <AppHeader  {...props} headerTitle={t("Profile_Text")} />,
          ...HeaderArray
         
        }}
      />
    </Stack.Navigator>
  );
}
export function HomeScsreenTabAll() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator initialRouteName="Homes"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.theme_background,
        tabBarInactiveTintColor: Colors.gray_text_color,
        labeled: true,
        labelStyle: {
        },
        tabStyle: {
          height: SH(60),
          backgroundColor: Colors.white_text_color,
          paddingBottom: SH(10),
        },
      }}
    >
      <Tab.Screen
        name={RouteName.HOME_TAB}
        component={HomeTabScreenStack}
        options={{
          tabBarLabel: t("Home_Text"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              color={focused ? Colors.theme_background : Colors.gray_text_color}
              name="home"
              icon="AntDesign"
              size={SF(25)}
            />
          ),
        }}
      />
    
      {/* <Tab.Screen
        name={RouteName.NOTIFICATION_TAB}
        component={NotificationTabScreenStack}
        options={{
          tabBarLabel: t("Notification_Text"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              color={focused ? Colors.theme_background : Colors.gray_text_color}
              name="notifications"
              icon="Ionicons"
              size={SF(20)}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name={RouteName.PROFILE_TAB}
        component={ProfileScreenStack}
        options={{
          tabBarLabel: t("Profile_Text"),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              color={focused ? Colors.theme_background : Colors.gray_text_color}
              name="user-circle"
              icon="FontAwesome"
              size={SF(20)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
