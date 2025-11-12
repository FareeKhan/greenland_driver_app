import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Spacing } from '../../components';
import { HomeStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { SH } from "../../utils";
import images from "../../index";

const CompletedFlatFun = (props) => {
   const { item, onPress } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);

   return (
      <TouchableOpacity onPress={() => onPress()} style={HomeStyles.onGoingBox}>
         <Spacing space={SH(5)} />
         <View style={HomeStyles.flexRowAlCeJusSpbtn}>
            <Text style={HomeStyles.pickFoodText}>{t("Pick_Food_Label")}</Text>
            <Text style={[HomeStyles.pickFoodText, HomeStyles.textRightClass]}>{t("Completed_Label")}</Text>
         </View>
         <Spacing space={SH(10)} />
         <View style={HomeStyles.flexRowAlCeJusSpbtn}>
            <Text style={HomeStyles.orderidText}>{t("OrderId_Label")}:{' '}{item.orderId}</Text>
            <Text style={[HomeStyles.orderTimeDateText, HomeStyles.textRightClass]}>{t(item.orderTimeAndDate)}</Text>
         </View>
         <Spacing space={SH(10)} />
         <View style={HomeStyles.flexRowAlCeJusSpbtn}>
            <View>
               <Text style={HomeStyles.pointlabelText}>{t("Distance_Label")}</Text>
               <Text style={HomeStyles.orderidText}>{t(item.distance)}</Text>
            </View>
            <View>
               <Text style={[HomeStyles.pointlabelText, HomeStyles.textRightClass]}>{t("Time_Label")}</Text>
               <Text style={[HomeStyles.orderidText, HomeStyles.textRightClass]}>{t(item.time)}</Text>
            </View>
         </View>
         <Spacing space={SH(15)} />
         <View style={HomeStyles.flexrowAlcne}>
            <View style={[HomeStyles.widthEqual, HomeStyles.activeBorder]}>
               <Text style={HomeStyles.labelText}>{t(item.pickupPoint)}</Text>
               <Spacing space={SH(5)} />
               <Text style={HomeStyles.pointlabelText}>{t("Pickup_Point_Label")}</Text>
            </View>
            <View style={HomeStyles.centerLine}>
               <Image source={images.deliverybike} style={HomeStyles.bikeImg} />
            </View>
            <View style={HomeStyles.widthEqual}>
               <Text style={HomeStyles.labelText}>{t(item.deliveryPoint)}</Text>
               <Spacing space={SH(5)} />
               <Text style={HomeStyles.pointlabelText}>{t("Delivery_Point_Label")}</Text>
            </View>
         </View>
         <Spacing space={SH(5)} />
      </TouchableOpacity>
   )
}

export default CompletedFlatFun