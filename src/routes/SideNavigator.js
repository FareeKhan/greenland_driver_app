import React, { useState, useEffect } from 'react';
import RouteName from './RouteName';
import { CustomSidebarMenu, AppHeader, CaLLicon } from '../components';
import { Colors } from '../utils';
import { DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TabNavigator } from '../routes';
import {
  SettingsScreen, HelpScreen, FAQScreen, ReviewsScreen,
  SubscriptionOrders, OrderDrop, EditProfile
} from '../screens';

const SideNavigator = (props) => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const { detailsStore } = useSelector(state => state.DataReducer) || { detailsStore };
  const { t } = useTranslation();
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
  const HeaderArray = {
    headerShown: true,
    headerTintColor: Colors.white_text_color,
    headerShadowVisible: false,
    headerStyle: { backgroundColor: Colors.theme_background },
  };
  const [colorValue, setColorValue] = useState(MyTheme)
 
  return (
    <Drawer.Navigator theme={colorValue} drawerContent={(props) => <CustomSidebarMenu {...props} />} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={RouteName.HOME_SCREEN} component={TabNavigator} />
    </Drawer.Navigator>
  );
}
export default SideNavigator;