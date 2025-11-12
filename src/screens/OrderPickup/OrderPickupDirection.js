import React, { useState, useMemo, useEffect } from "react";
import { View, Image, TouchableOpacity } from 'react-native'
import { CommonMapView, Container, MapMarkerComponent, VectorIcon, MapViewDirections, Button } from '../../components';
import { OrderPickupStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { SH, Colors, SF } from "../../utils";
import Geolocation from '@react-native-community/geolocation';
import images from "../../index";
import { useSelector } from "react-redux";

const OrderPickupDirection = (props) => {
   const { navigation } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const OrderPickupStyles = useMemo(() => OrderPickupStyle(Colors), [Colors]);
   const { userdata } = useSelector(state => state.DataReducer) || {};
   const destination = { latitude: 22.29681615305303, longitude: 70.79093299806118 };

   const [position, setPosition] = useState({
      latitude: 10,
      longitude: 10,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
   });

   useEffect(() => {
      Geolocation.getCurrentPosition((position) => {
         const crd = position.coords;
         setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
         });
         // console.log("crd",crd)
      })
   }, []);

   




   return (
      <Container>
         <View style={OrderPickupStyles.mapContainer}>
            <CommonMapView
               region={{
                  latitude: 22.2990017,
                  longitude: 70.7945285,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
               }}
               initialRegion={position}
               showsUserLocation={true}
               showsMyLocationButton={true}
               followsUserLocation={true}
               showsCompass={true}
               scrollEnabled={true}
               zoomEnabled={true}
               pitchEnabled={true}
               rotateEnabled={true}
               style={OrderPickupStyles.mapstyleset}
            >
               {
                  <>
                     <MapMarkerComponent coordinate={position}>
                        < Image resizeMethod='resize'
                           source={images.deliveryBikeMarkIcon}
                           style={OrderPickupStyles.SetImahMapStyle}
                           resizeMode="contain"
                        />
                     </MapMarkerComponent>
                     <MapMarkerComponent coordinate={destination}
                        title={t(userdata.pickupPoint)}
                     >
                        < Image resizeMethod='resize'
                           source={images.restaurantIcon}
                           style={OrderPickupStyles.SetImahMapStyle}
                           resizeMode="contain"
                        />
                     </MapMarkerComponent>
                     <MapViewDirections
                        origin={position}
                        destination={destination}
                        apikey="ADD_MAP_API_KEY"
                        strokeWidth={5}
                        strokeColor={Colors.blue_color}
                     />
                  </>
               }
            </CommonMapView>
            <TouchableOpacity style={OrderPickupStyles.backArrow} onPress={() => navigation.navigate(RouteName.ORDER_PICKUP)}>
               <VectorIcon icon="AntDesign" name="arrowleft" color={Colors.white_text_color} size={SF(25)} />
            </TouchableOpacity>
            <View style={OrderPickupStyles.OrderStartBottomBoxWrap}>
               <View style={[OrderPickupStyles.widFull]}>
                  <Button title={t("Start_Label")} onPress={() => navigation.navigate(RouteName.ORDER_DROP)} />
               </View>
            </View>
         </View>
      </Container >
   )
}

export default OrderPickupDirection