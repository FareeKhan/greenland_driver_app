import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Container, Spacing, SubscriptionNewOrderFun, SubscriptionOrderFun } from '../../components';
import { SubscriptionOrdersStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { get_data_action } from '../../redux/action/DataAction';
import { useSelector, useDispatch } from "react-redux";
import images from '../../index';

const SubscriptionOrders = (props) => {
   const { navigation } = props;
   const { t } = useTranslation();
   const { Colors } = useTheme();
   const SubscriptionOrdersStyles = useMemo(() => SubscriptionOrdersStyle(Colors), [Colors]);
   const [select, seSelect] = useState(2);

   const dispatch = useDispatch();
   const { detailsStore } = useSelector(state => state.userDataReducer) || { detailsStore };

   const getDataAction = (getDataActiondata) => {
      dispatch(get_data_action(getDataActiondata))
      navigation.navigate(RouteName.SUBSCRIPTION_ORDERS_ID)
   }

   const subscriptionOrderData = [

      {
        id: 1,
        orderId: "10",
        orderTimeAndDate: "Order_Time_Date_Label_1",
        pickupPoint: "PickupPoint_Label_1",
        deliveryPoint: "DeliveryPoint_Label_1",
        distance: "DistanceKm_Label_1",
        day: "Day_Label_1",
        pickupAddress: "Pickup_Address_Label_1",
        deliveryAddress: "Delivery_Address_Label_1",
        imgOfOrder: images.imgOfOrder1,
        moreItem: "MoreItem_Label_1",
        itemPrice: "8499"
      },
      {
        id: 2,
        orderId: "8",
        orderTimeAndDate: "Order_Time_Date_Label_2",
        pickupPoint: "PickupPoint_Label_2",
        deliveryPoint: "DeliveryPoint_Label_2",
        distance: "DistanceKm_Label_2",
        day: "Day_Label_1",
        pickupAddress: "Pickup_Address_Label_2",
        deliveryAddress: "Delivery_Address_Label_2",
        imgOfOrder: images.imgOfOrder1,
        moreItem: "MoreItem_Label_1",
        itemPrice: "7499"
    
      },
      {
        id: 3,
        orderId: "4",
        orderTimeAndDate: "Order_Time_Date_Label_3",
        pickupPoint: "PickupPoint_Label_3",
        deliveryPoint: "DeliveryPoint_Label_3",
        distance: "DistanceKm_Label_3",
        day: "Day_Label_1",
        pickupAddress: "Pickup_Address_Label_3",
        deliveryAddress: "Delivery_Address_Label_3",
        imgOfOrder: images.imgOfOrder1,
        moreItem: "MoreItem_Label_1",
        itemPrice: "7499"
      },
    
    ]

   return (
      <Container backgroundColor={Colors.anti_flash_white}>
         <View style={[SubscriptionOrdersStyles.homeTabBox, SubscriptionOrdersStyles.bgwhiteClass]}>
            <TouchableOpacity style={[SubscriptionOrdersStyles.tabTocuBox, select == 1 && SubscriptionOrdersStyles.tabTocuSelectBox]} onPress={() => seSelect(1)}><Text style={SubscriptionOrdersStyles.tabText}>{t("New_Order_Label")}</Text></TouchableOpacity>
            <TouchableOpacity style={[SubscriptionOrdersStyles.tabTocuBox, select == 2 && SubscriptionOrdersStyles.tabTocuSelectBox]} onPress={() => seSelect(2)}><Text style={SubscriptionOrdersStyles.tabText}>{t("OnGoing_Label")}</Text></TouchableOpacity>
            <TouchableOpacity style={[SubscriptionOrdersStyles.tabTocuBox, select == 3 && SubscriptionOrdersStyles.tabTocuSelectBox]} onPress={() => seSelect(3)}><Text style={SubscriptionOrdersStyles.tabText}>{t("Completed_Label")}</Text></TouchableOpacity>
         </View>
        
         {
            select == 1 ?
               <>
                  <FlatList
                     data={subscriptionOrderData}
                     renderItem={({ item, index }) => (<SubscriptionNewOrderFun item={item} onPress={() => getDataAction(item)} />)}
                     keyExtractor={(item, index) => index.toString()}
                     showsVerticalScrollIndicator={false}
                  />
               </>
               :
               select == 2 ?
                  <>
                     <FlatList
                        data={subscriptionOrderData}
                        renderItem={({ item, index }) => (<SubscriptionOrderFun item={item}
                           onPress={() => getDataAction(item)}
                           orderStatus={t("Processing_Label")}
                        />)}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                     />
                  </>
                  :
                  <>
                     <FlatList
                        data={subscriptionOrderData}
                        renderItem={({ item }) => (<SubscriptionOrderFun item={item} orderStatus={t("Completed_Label")} onPress={() => getDataAction(item)} />)}
                        keyExtractor={(index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                     />
                  </>
         }
      </Container>
   )
}

export default SubscriptionOrders