import React, { useState, useMemo, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { CommonMapView, Container, MapMarkerComponent, VectorIcon, MapViewDirections, TimelineComponent, RatingScreen, Avtar, Spacing } from '../../components';
import { OrderPickupStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { SH, Colors, SF, SW } from "../../utils";
import Geolocation from '@react-native-community/geolocation';
import images from "../../index";
import { useSelector } from "react-redux";

const OrderDrop = (props) => {
   const { navigation } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const OrderPickupStyles = useMemo(() => OrderPickupStyle(Colors), [Colors]);
   const { userdata } = useSelector(state => state.DataReducer) || {};
   const destination = { latitude: 22.29681615305303, longitude: 70.79093299806118 };
   const origin = { latitude: 22.2989132, longitude: 70.7944731 };

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

      let interval;
      interval = setInterval(() => {
         navigation.navigate(RouteName.DELIVERY_COMPLETE);
         clearInterval(interval);
      }, 5000);
      return () => { clearInterval(interval) };
   }, []);

   const data = [
      {
         title: t(userdata.pickupPoint), description: t(userdata.pickupAddress),
         icon: <Image source={images.restaurantIcon} resizeMode="contain" style={OrderPickupStyles.DestinationIcon} />
      },
      {
         title: t(userdata.deliveryPoint), description: t(userdata.deliveryAddress),
         icon: <VectorIcon icon="MaterialIcons" name="location-pin" size={SF(21)} color={Colors.theme_background} />
      },
   ]

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
               onPress={() => console.log("loc", position)}
            >
               {
                  <>
                     <MapMarkerComponent coordinate={origin}>
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
                        origin={origin}
                        destination={destination}
                        apikey="ADD_MAP_API_KEY"
                        strokeWidth={5}
                        strokeColor={Colors.blue_color}
                     />
                  </>
               }
            </CommonMapView>
            <View style={OrderPickupStyles.OrderBottomBoxWrap}>
               <View style={OrderPickupStyles.widFull}>
                  <Text style={OrderPickupStyles.driverText}>{t("Driver_On_The_Way_Label")}</Text>
                  <Text style={OrderPickupStyles.arrivingText}>{t("Arriving_At_Pick_Up_Point_Label")}</Text>
                  <Spacing />
                  <View style={[OrderPickupStyles.flexRowAlCentJusSpBtn, OrderPickupStyles.borderTopBtn]}>
                     <View style={OrderPickupStyles.flexRowAlCent}>
                        <Avtar
                           source={images.mapDevlivery}
                           size={35}
                        />
                        <View style={OrderPickupStyles.userLeftSpace}>
                           <Text style={OrderPickupStyles.userNameText}>{t("John_Walker_Label")}</Text>
                           <View style={OrderPickupStyles.flexRowAlStart}>
                              <RatingScreen
                                 type='custom'
                                 ratingColor={Colors.amber_color}
                                 ratingBackgroundColor={Colors.chinese_silver}
                                 ratingCount={SW(5)}
                                 tintColor={Colors.white_text_color}
                                 imageSize={SW(14)}
                                 startingValue={SW(4)}
                                 isDisabled={false}
                              />
                           </View>
                        </View>
                     </View>
                     <View style={OrderPickupStyles.flexRowAlCent}>
                        <TouchableOpacity onPress={() => navigation.navigate(RouteName.AUDIO_CALL_SCREEN)}>
                           <VectorIcon icon="Ionicons" name="call" size={SF(25)} color={Colors.theme_background} />
                        </TouchableOpacity>
                        <TouchableOpacity style={OrderPickupStyles.userLeftSpace}>
                           <VectorIcon icon="MaterialIcons" name="message" size={SF(25)} color={Colors.theme_background} />
                        </TouchableOpacity>
                     </View>
                  </View>
                  <Spacing />
                  <TimelineComponent
                     data={data}
                     circleSize={20}
                     circleColor={Colors.white_text_color}
                     lineColor={Colors.black_text_color}
                     isUsingFlatlist={true}
                     innerCircle={'icon'}
                     showTime={false}
                     titleStyle={OrderPickupStyles.Title}
                     descriptionStyle={OrderPickupStyles.DescriptionStyle}
                  />
               </View>
            </View>
         </View>
      </Container >
   )
}

export default OrderDrop