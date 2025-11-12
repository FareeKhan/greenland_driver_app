import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Container, Spacing, OrderStatusFlatFun, VectorIcon, Button } from '../../components';
import { SubscriptionOrderIdStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { SH, SF } from "../../utils";
import { useSelector } from "react-redux";

const SubscriptionOrderId = (props) => {
   const { navigation } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const SubscriptionOrderIdStyles = useMemo(() => SubscriptionOrderIdStyle(Colors), [Colors]);
   const { userdata } = useSelector(state => state.DataReducer) || {};

   const orderwiseStatusSelectData = [
      {
         id: 1,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.red
      },
      {
         id: 2,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.electric_green_color
      },
      {
         id: 3,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 4,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 5,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 6,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 7,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 8,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 9,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 10,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 11,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
      {
         id: 12,
         date: "orderStatus_Date_Label_1",
         dayName: "Day_Name_Label_1",
         thaliName: "Thali_Name_Label_1",
         statusColor: Colors.gray_text_color
      },
   ]

   return (
      <Container backgroundColor={Colors.anti_flash_white}>
         <Spacing />
         <View style={[SubscriptionOrderIdStyles.flexRowAclCent, SubscriptionOrderIdStyles.padH20]}>
            <TouchableOpacity onPress={() => navigation.navigate(RouteName.SUBSCRIPTION_ORDERS)}>
               <VectorIcon icon="AntDesign" name="arrowleft" color={Colors.black_text_color} size={SF(28)} />
            </TouchableOpacity>
            <Text style={SubscriptionOrderIdStyles.OrderIdText}>{t("OrderId_Label")}{' '}{t(userdata.orderId)}</Text>
         </View>
         <Spacing space={SH(25)} />
         <View style={SubscriptionOrderIdStyles.OrderAddressBox}>
            <View style={SubscriptionOrderIdStyles.width15}>
               <VectorIcon icon="MaterialIcons" name="local-restaurant" color={Colors.black_text_color} size={SF(28)} />
            </View>
            <View style={SubscriptionOrderIdStyles.width85}>
               <Text style={SubscriptionOrderIdStyles.pickupPitnLabel}>{t(userdata.pickupPoint)}</Text>
               <Text style={SubscriptionOrderIdStyles.pickupAddressLabel}>{t(userdata.pickupAddress)}</Text>
            </View>
         </View>
         <View style={SubscriptionOrderIdStyles.centerVerticleLine}></View>
         <View style={SubscriptionOrderIdStyles.OrderAddressBox}>
            <View style={SubscriptionOrderIdStyles.width15}>
               <VectorIcon icon="MaterialIcons" name="location-pin" color={Colors.theme_background} size={SF(30)} />
            </View>
            <View style={SubscriptionOrderIdStyles.width85}>
               <Text style={SubscriptionOrderIdStyles.dropLabel}>{t("Office_Label")}</Text>
               <Text>{t(userdata.deliveryAddress)}</Text>
            </View>
         </View>
         <Spacing space={SH(25)} />
         <View style={[SubscriptionOrderIdStyles.OrderAddressBox, SubscriptionOrderIdStyles.flexRowAlCentJusSpBtn]}>
            <View style={SubscriptionOrderIdStyles.flexRowAclCent}>
               <VectorIcon icon="FontAwesome" name="circle" color={Colors.gray_text_color} size={SF(25)} />
               <Text style={SubscriptionOrderIdStyles.statusText}>{t("Pending_Label")}</Text>
            </View>
            <View style={SubscriptionOrderIdStyles.flexRowAclCent}>
               <VectorIcon icon="FontAwesome" name="circle" color={Colors.red} size={SF(25)} />
               <Text style={SubscriptionOrderIdStyles.statusText}>{t("Canceled_Label")}</Text>
            </View>
            <View style={SubscriptionOrderIdStyles.flexRowAclCent}>
               <VectorIcon icon="FontAwesome" name="circle" color={Colors.electric_green_color} size={SF(25)} />
               <Text style={SubscriptionOrderIdStyles.statusText}>{t("Completed_Label")}</Text>
            </View>
         </View>
         <Spacing space={SH(25)} />
         <FlatList
            data={orderwiseStatusSelectData}
            renderItem={({ item, index }) => (<OrderStatusFlatFun item={item} />)}
            numColumns={3}
            contentContainerStyle={SubscriptionOrderIdStyles.contentContainerStyle}
         />
         <Spacing space={SH(50)} />
         <View style={SubscriptionOrderIdStyles.CompletedBox}>
            <Button title={t("Completed_Label")} buttonStyle={SubscriptionOrderIdStyles.buttonStyle} onPress={() => navigation.navigate(RouteName.HOME_SCREEN)} />
         </View>
      </Container>
   )
}

export default SubscriptionOrderId