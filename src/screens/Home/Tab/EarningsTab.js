import React, { useMemo } from 'react';
import { View, Text, FlatList, } from 'react-native';
import { EarningsTabStyle } from '../../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { Container, Spacing, EarningFlatFun } from '../../../components';
import { SH } from '../../../utils';

const EarningsTab = (props) => {
    const { navigation } = props;
    const { t } = useTranslation();
    const { Colors } = useTheme();
    const EarningsTabStyles = useMemo(() => EarningsTabStyle(Colors), [Colors]);

    const earninsgData = [

        {
          id: 1,
          orderId: "10",
          orderTimeAndDate: "Order_Time_Date_Label_1",
          pickupPoint: "PickupPoint_Label_1",
          deliveryPoint: "DeliveryPoint_Label_1",
          distance: "DistanceKm_Label_1",
          time: "Time_Label_1",
          pickupAddress: "Pickup_Address_Label_1",
          deliveryAddress: "Delivery_Address_Label_1",
          earningsAmount: "$5"
        },
        {
          id: 2,
          orderId: "8",
          orderTimeAndDate: "Order_Time_Date_Label_2",
          pickupPoint: "PickupPoint_Label_2",
          deliveryPoint: "DeliveryPoint_Label_2",
          distance: "DistanceKm_Label_2",
          time: "Time_Label_2",
          pickupAddress: "Pickup_Address_Label_2",
          deliveryAddress: "Delivery_Address_Label_2",  
          earningsAmount: "$9"
      
        },
        {
          id: 3,
          orderId: "4",
          orderTimeAndDate: "Order_Time_Date_Label_3",
          pickupPoint: "PickupPoint_Label_3",
          deliveryPoint: "DeliveryPoint_Label_3",
          distance: "DistanceKm_Label_3",
          time: "Time_Label_3",
          pickupAddress: "Pickup_Address_Label_3",
          deliveryAddress: "Delivery_Address_Label_3",    
          earningsAmount: "$7"
        },
        {
          id: 4,
          orderId: "3",
          orderTimeAndDate: "Order_Time_Date_Label_4",
          pickupPoint: "PickupPoint_Label_4",
          deliveryPoint: "DeliveryPoint_Label_4",
          distance: "DistanceKm_Label_4",
          time: "Time_Label_4",
          pickupAddress: "Pickup_Address_Label_4",
          deliveryAddress: "Delivery_Address_Label_4",
          earningsAmount: "$15"
      
        },
      
      ]
    
    return (
        <Container>
            <Spacing />
            <View style={EarningsTabStyles.earningBox}>
                <Text style={EarningsTabStyles.earningLabel}>{t("Total_Earning_Label")}</Text>
                <Text style={EarningsTabStyles.earningLabel}>{t("$2000")}</Text>
            </View>
            <Spacing space={SH(25)} />
            <FlatList
                data={earninsgData}
                renderItem={({ item }) => (<EarningFlatFun item={item} />)}
            />
        </Container>
    );
};
export default EarningsTab;