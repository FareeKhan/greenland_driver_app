import React, { useMemo, } from "react";
import { View, Image, Text } from 'react-native'
import { Container, VectorIcon, Avtar, Spacing, RatingScreen, TimelineComponent, Lottie, Button } from '../../components';
import { OrderPickupStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { SH, Colors, SF, SW } from "../../utils";
import images from "../../index";

const DeliveryComplete = (props) => {
   const { navigation } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const OrderPickupStyles = useMemo(() => OrderPickupStyle(Colors), [Colors]);

   const completeData = [
      {
         title: t("Pickup_Address_Label_1"), description: t("Pickup_Time_Label"),
         icon: <Image source={images.restaurantIcon} resizeMode="contain" style={OrderPickupStyles.DestinationIcon} />
      },
      {
         title: t("Delivery_Address_Label_1"), description: t("Drop_Label"),
         icon: <VectorIcon icon="MaterialIcons" name="location-pin" size={SF(21)} color={Colors.theme_background} />
      },
   ]

   return (
      <Container>
         <Spacing />
         <View style={OrderPickupStyles.centerHClass}>
            <Lottie source={images.deliverycomplete} Lottiewidthstyle={OrderPickupStyles.Lottiewidthstyle} />
            <Text style={OrderPickupStyles.deliveryComplete}>{t("Delivery_Complete_Label")}</Text>
            <Text style={OrderPickupStyles.yourEarnedText}>{t("You_Earned_Label")}</Text>
         </View>
         <Spacing space={SH(25)} />
         <View style={OrderPickupStyles.OrderCompleteBoxWrap}>
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
               <View>
                  <Text style={OrderPickupStyles.yourEarnedText}>{t("$5")}</Text>
                  <VectorIcon icon="MaterialIcons" name="payment" size={SF(25)} color={Colors.theme_background} />
               </View>
            </View>
            <Spacing />
            <View style={OrderPickupStyles.timelineBox}>
               <TimelineComponent
                  data={completeData}
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
            <View style={[OrderPickupStyles.flexRowAlCentJusSpBtn, OrderPickupStyles.padTop]}>
               <Text style={OrderPickupStyles.trancsactonId}>{t("Complete_Deli_TimeDate_Label")}</Text>
               <Text style={OrderPickupStyles.trancsactonId}>{t("Complete_Deli_ID_Label")}</Text>
            </View>
         </View>
         <Spacing space={SH(60)} />
         <View style={OrderPickupStyles.padH20}>
            <Button title={t("Rate_Your_Driver_Label")} onPress={() => navigation.navigate(RouteName.REVIEWS_SCREEN)} />
         </View>
      </Container>
   )
}

export default DeliveryComplete