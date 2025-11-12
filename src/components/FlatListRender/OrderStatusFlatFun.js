import React, { useMemo } from "react";
import { View, Text, } from "react-native";
import { Spacing, VectorIcon } from '../../components';
import { SubscriptionOrderIdStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { SH, Colors, SF, } from "../../utils";

const OrderStatusFlatFun = (props) => {
   const { item } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const SubscriptionOrderIdStyles = useMemo(() => SubscriptionOrderIdStyle(Colors), [Colors]);

   return (
      <View style={[SubscriptionOrderIdStyles.OrderStatusBox, { backgroundColor: item.statusColor }]}>
         <View style={SubscriptionOrderIdStyles.flexRowAclCent}>
            <VectorIcon icon="Feather" name="calendar" color={Colors.white_text_color} size={SF(20)} />
            <Text style={SubscriptionOrderIdStyles.dateText}>{t(item.date)}</Text>
         </View>
         <Spacing />
         <View style={SubscriptionOrderIdStyles.flexRowAclCent}>
            <VectorIcon icon="MaterialCommunityIcons" name="alarm" color={Colors.white_text_color} size={SF(20)} />
            <Text style={SubscriptionOrderIdStyles.dateText}>{t(item.dayName)}</Text>
         </View>
         <Spacing />
         <View style={SubscriptionOrderIdStyles.flexRowAclCent}>
            <VectorIcon icon="MaterialCommunityIcons" name="food-fork-drink" color={Colors.white_text_color} size={SF(20)} />
            <Text textBreakStrategy="simple" numberOfLines={1} style={SubscriptionOrderIdStyles.dateText}>{t(item.thaliName)}</Text>
         </View>
      </View>
   )
}

export default OrderStatusFlatFun