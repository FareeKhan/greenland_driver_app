import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Spacing, VectorIcon } from '../../components';
import { SubscriptionOrdersStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { SH, Colors, SF } from "../../utils";

const SubscriptionNewOrderFun = (props) => {
   const { item, onPress } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const SubscriptionOrdersStyles = useMemo(() => SubscriptionOrdersStyle(Colors), [Colors]);

   return (
      <TouchableOpacity onPress={() => onPress()} style={SubscriptionOrdersStyles.onGoingBox}>
         <View style={SubscriptionOrdersStyles.centerstatusBox}>
            <View style={SubscriptionOrdersStyles.statusBox}>
               <Text style={[SubscriptionOrdersStyles.pickFoodText]}>{t("Pending_Label")}</Text>
            </View>
         </View>
         <Spacing space={SH(10)} />
         <View style={SubscriptionOrdersStyles.flexRowAlCeJusSpbtn}>
            <Text style={SubscriptionOrdersStyles.orderidText}>{t("OrderId_Label")}:{' '}{item.orderId}</Text>
            <Text style={[SubscriptionOrdersStyles.daysText, SubscriptionOrdersStyles.textRightClass]}>{t(item.day)}</Text>
         </View>
         <Spacing space={SH(10)} />
         <View style={SubscriptionOrdersStyles.flexRrowOnly}>
            <View style={SubscriptionOrdersStyles.OrderItem}>
               <Image source={item.imgOfOrder} style={SubscriptionOrdersStyles.OrderItemImg} />
            </View>
            <View style={SubscriptionOrdersStyles.infoBox}>
               <Text style={SubscriptionOrdersStyles.orderidText}>{t(item.pickupPoint)}</Text>
               <Spacing space={SH(5)} />
               <Text style={SubscriptionOrdersStyles.orderTimeDateText}>{t(item.pickupAddress)}</Text>
               <Spacing space={SH(3)} />
               <Text style={SubscriptionOrdersStyles.orderTimeDateText}>{t(item.moreItem)}</Text>
               <View style={SubscriptionOrdersStyles.flexrowAlcne}>
                  <VectorIcon icon="Foundation" name="dollar" color={Colors.black_text_color} size={SF(25)} />
                  <Text style={SubscriptionOrdersStyles.priceText}>{t(item.itemPrice)}</Text>
               </View>
            </View>
         </View>
         <Spacing space={SH(5)} />
      </TouchableOpacity>
   )
}

export default SubscriptionNewOrderFun