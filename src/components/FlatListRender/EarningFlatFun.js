import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { EarningsTabStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { Spacing, } from '../../components';
import { SH, Colors, SF } from '../../utils';
import images from "../../index";

const EarningFlatFun = (props) => {
   const { item } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const EarningsTabStyles = useMemo(() => EarningsTabStyle(Colors), [Colors]);

   return (
      <View onPress={() => onPress()} style={EarningsTabStyles.onGoingBox}>
         <View style={EarningsTabStyles.reaningHeader}>
            <Text style={EarningsTabStyles.pickFoodText}>{t("Earnings_Label")}</Text>
            <Text style={[EarningsTabStyles.pickFoodText, EarningsTabStyles.textRightClass]}>{t(item.earningsAmount)}</Text>
         </View>
         <View style={EarningsTabStyles.padH20}>
            <Spacing space={SH(10)} />
            <View style={EarningsTabStyles.flexRowAlCeJusSpbtn}>
               <Text style={EarningsTabStyles.orderidText}>{t("OrderId_Label")}:{' '}{item.orderId}</Text>
               <Text style={[EarningsTabStyles.orderTimeDateText, EarningsTabStyles.textRightClass]}>{t(item.orderTimeAndDate)}</Text>
            </View>
            <Spacing space={SH(10)} />
            <View style={EarningsTabStyles.flexRowAlCeJusSpbtn}>
               <View>
                  <Text style={EarningsTabStyles.pointlabelText}>{t("Distance_Label")}</Text>
                  <Text style={EarningsTabStyles.orderidText}>{t(item.distance)}</Text>
               </View>
               <View>
                  <Text style={[EarningsTabStyles.pointlabelText, EarningsTabStyles.textRightClass]}>{t("Time_Label")}</Text>
                  <Text style={[EarningsTabStyles.orderidText, EarningsTabStyles.textRightClass]}>{t(item.time)}</Text>
               </View>
            </View>
            <Spacing space={SH(15)} />
            <View style={EarningsTabStyles.flexrowAlcne}>
               <View style={[EarningsTabStyles.widthEqual, EarningsTabStyles.activeBorder]}>
                  <Text style={EarningsTabStyles.labelText}>{t(item.pickupPoint)}</Text>
                  <Spacing space={SH(5)} />
                  <Text style={EarningsTabStyles.pointlabelText}>{t("Pickup_Point_Label")}</Text>
               </View>
               <View style={EarningsTabStyles.centerLine}>
                  <Image source={images.deliverybike} style={EarningsTabStyles.bikeImg} />
               </View>
               <View style={EarningsTabStyles.widthEqual}>
                  <Text style={EarningsTabStyles.labelText}>{t(item.deliveryPoint)}</Text>
                  <Spacing space={SH(5)} />
                  <Text style={EarningsTabStyles.pointlabelText}>{t("Delivery_Point_Label")}</Text>
               </View>
            </View>
         </View>
         <Spacing space={SH(14)} />
      </View>
   )
}

export default EarningFlatFun