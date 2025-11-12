import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Spacing } from '../../components';
import { useTranslation } from "react-i18next";
import { SF, Fonts, SW, SH, Colors } from "../../utils";
import images from "../../index";
import moment from 'moment';
const OnGoingFlatFun = (props) => {
   const { item, onPress ,} = props;
   const { t } = useTranslation();


   const TextStatusShow = (text) => {

      if(text == 'confirmed'){
          return "confirmed";
      }else if(text == 'prepared'){
         return "Fulfilled";
      }else if(text == 'on_the_way'){
         return "Assigned";
      }else if(text == 'on_the_way_accepted'){
         return "Accepted";
      }else if(text == 'on_the_way_rejected'){
         return "Rejected";
      }else if(text == 'delivered'){
         return "Delivered";
      }else{
         return "confirmed";
      }
      return "confirmed";
  }

  const pickup_point = "Aljazeera"


   return (
      <TouchableOpacity onPress={() => onPress()} style={HomeStyles.onGoingBox}>
        <Spacing space={SH(5)} />
         <View style={HomeStyles.flexRowAlCeJusSpbtn}>
            <Text style={HomeStyles.pickFoodText}>Pick Order</Text>
            <Text style={[HomeStyles.pickFoodText, HomeStyles.textRightClass],{textTransform:"uppercase"}}>{item?.order_status?.status === "assigned" ? `Assigned to ${item?.order_status?.driver?.name}` : (TextStatusShow(item?.order_status?.status))}</Text>
         </View>
         <Spacing space={SH(10)} />
         <View style={HomeStyles.flexRowAlCeJusSpbtn}>
            <Text style={HomeStyles.orderidText}>Order ID:{' '}#{item?.id}</Text>
            <Text style={[HomeStyles.orderTimeDateText, HomeStyles.textRightClass]}>Order Date: {moment(item?.created_at).format("MMM DD YYYY")}</Text>
         </View>
       <Spacing space={SH(10)} />
      
         <Spacing space={SH(15)} />
     <View style={HomeStyles.flexrowAlcne}>
            <View style={[HomeStyles.widthEqual, HomeStyles.activeBorder]}>
               <Text style={HomeStyles.labelText}>{pickup_point}</Text>
               <Spacing space={SH(5)} />
               <Text style={HomeStyles.pointlabelText}>Pickup Point</Text>
            </View>
            <View style={HomeStyles.centerLine}>
               <Image source={images.deliverybike} style={HomeStyles.bikeImg} />
            </View>
            <View style={HomeStyles.widthEqual}>
               <Text style={HomeStyles.labelText}>{item?.shipping_address?.area}</Text>
               <Spacing space={SH(5)} />
               <Text style={HomeStyles.pointlabelText}>{t("Delivery_Point_Label")}</Text>
            </View>

               {/* <Text style={HomeStyles.labelText}>{item.shipping_address }</Text> */}

         
         </View>  
         <Spacing space={SH(5)} />
      </TouchableOpacity>
   )
}

export default OnGoingFlatFun



const  HomeStyles =  StyleSheet.create({

   homeTabBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SH(10)
   },
   tabTocuBox: {
      paddingHorizontal: SW(15),
      paddingVertical: SH(7)
   },
   bgwhiteClass: {
      backgroundColor: Colors.bgwhite
   },
   tabText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      lineHeight: SH(22),
      color: Colors.black_text_color
   },
   tabTocuSelectBox: {
      borderWidth: SW(1),
      borderColor: 'white',
      backgroundColor: '#145827',
      color:'white',
      borderRadius: SW(50)
   },
   onGoingBox: {
      width: '95%',
      alignSelf: 'center',
      borderRadius: SW(7),
      backgroundColor: Colors.bgwhite,
      shadowColor: '#b5b2b2',
      shadowOffset: {
         width: 0,
         height: Platform.OS === 'ios' ? 2 : 5,
         minHeight: '100%',
      },
      shadowOpacity: 1,
      shadowRadius: Platform.OS === 'ios' ? 2 : 50,
      elevation: Platform.OS === 'ios' ? 1 : 6,
      padding: SW(10),
      padding: SW(10),
      marginBottom: SH(15)
   },
   pickFoodText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      lineHeight: SH(22),
      color: Colors.theme_background
   },
   orderidText: {
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(16),
      lineHeight: SH(22),
      color: Colors.black_text_color
   },
   orderTimeDateText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(15),
      lineHeight: SH(22),
      color: Colors.gray_text_color
   },
   flexRowAlCeJusSpbtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   flexrowAlcne: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   centerLine: {
      width: '20%',
      height: SH(2),
      backgroundColor: Colors.gray_text_color,
      justifyContent: 'center',
      alignItems: 'center'
   },
   widthEqual: {
      width: '40%',
      borderWidth: SW(0.5),
      color: Colors.chinese_silver,
      borderRadius: SW(7),
      padding: SW(10),
      justifyContent: 'center',
      alignItems: 'center'
   },
   bikeImg: {
      width: SW(30),
      height: SH(30),
      position: 'absolute',
      bottom: SH(0)
   },
   labelText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(17),
      lineHeight: SH(22),
      color: Colors.black_text_color,
      textAlign:"left"
   },
   pointlabelText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(14),
      lineHeight: SH(18),
      color: Colors.gray_text_color
   },
   activeBorder: {
      borderColor: Colors.theme_background
   },
   textRightClass: {
      textAlign: 'right'
   },












});