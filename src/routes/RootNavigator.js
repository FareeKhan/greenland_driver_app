import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../utils";
import { RouteName, SideNavigator } from "../routes";
import {
  LoginScreen,
  RegisterScreen,
  OtpVeryfiveScreen,
  SplashScreen,
  RegistrationSuccessful,
  Swiperscreen,
  TranslationScreen,
  ForgotPassword,
  OrderPickup,
  OrderPickupDirection,
  SubscriptionOrderId,
  DeliveryComplete,
  AudioCall,
} from "../screens";
import { connect } from "react-redux";
import { ActivityIndicator, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

const RootNavigator = (props) => {
  const { data } = props;

  console.log("sss", data?.userdata);
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors,
  };
  const [colorValue, setColorValue] = useState(MyTheme);
  const [isLoader, setIsLoader] = useState(true);

  // useEffect(() => {
  //   if (data.userdata?.id != undefined) {
  //     return props.navigation.navigate(RouteName.SIDE_NAVIGATOR);
  //   }
  // }, [data]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoader(false);
      }, 1500);
  
      return () => clearTimeout(timer);
    }, []);
  
    if(isLoader){
      return <View style={{flex:1,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
        <Text>Loading  </Text>
       <ActivityIndicator  size={'small'} color={Colors.theme_background} /> 
      </View>
    }
  

  return (
    <NavigationContainer theme={colorValue}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name={RouteName.SPLSH} component={SplashScreen} /> */}
        {data.userdata?.id == undefined ? (
          <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen
              name={RouteName.SIDE_NAVIGATOR}
              component={SideNavigator}
            />
            <Stack.Screen
              name={RouteName.ORDER_PICKUP}
              component={OrderPickup}
            />
          </>
        )}

        {/* <Stack.Screen name={RouteName.REGISTER_SCREEN} component={RegisterScreen} /> */}

        {/* <Stack.Screen name={RouteName.DELIVERY_COMPLETE} component={DeliveryComplete} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.DataReducer,
  };
};
export default connect(mapStateToProps)(RootNavigator);
