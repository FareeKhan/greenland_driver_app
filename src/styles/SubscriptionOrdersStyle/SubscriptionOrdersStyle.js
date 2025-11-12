import { StyleSheet, Platform } from 'react-native';
import { SF, Fonts, SW, SH, Colors, widthPercent } from '../../utils';

export default SubscriptionOrdersStyle = (Colors) => StyleSheet.create({


   homeTabBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SH(10),
      marginBottom: SH(15),      
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
      borderColor: Colors.theme_background,
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
      marginVertical: SH(15),
      marginTop: SH(20)
   },
   pickFoodText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      lineHeight: SH(22),
      color: Colors.white_text_color
   },
   orderidText: {
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(16),
      lineHeight: SH(22),
      color: Colors.black_text_color
   },
   daysText: {
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(16),
      lineHeight: SH(22),
      color: Colors.theme_background
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
      color: Colors.black_text_color
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
   centerstatusBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   statusBox: {
      position: 'absolute',
      bottom: SH(-5),
      backgroundColor: Colors.theme_background,
      borderRadius: SW(50),
      paddingHorizontal: SW(10),
      paddingVertical: SH(5),
      zIndex: 1
   },
   OrderItem: {
      width: SW(80),
      height: SW(80),
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
      borderRadius: SW(7)
   },
   OrderItemImg: {
      width: '100%',
      height: '100%',
      borderRadius: SW(7)
   },
   flexRrowOnly: {
      flexDirection: 'row'
   },
   infoBox: {
      paddingHorizontal: SW(10),
      flex: 1
   },
   priceText: {
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(17),
      color: Colors.black_text_color,
      lineHeight: SH(24)
   }

});