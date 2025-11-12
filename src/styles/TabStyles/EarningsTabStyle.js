import { StyleSheet, Platform } from 'react-native';
import { SF, Fonts, SW, SH, Colors } from '../../utils';

export default EarningsTabStyle = (Colors) => StyleSheet.create({


   earningBox: {
      marginHorizontal: SW(15),
      paddingHorizontal: SW(15),
      paddingVertical: SH(10),
      backgroundColor: Colors.theme_background,
      borderRadius: SW(50),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   earningLabel: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(17),
      color: Colors.white_text_color,
      lineHeight: SH(24)
   },
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
      borderColor: Colors.theme_background,
      borderRadius: SW(50)
   },
   onGoingBox: {
      marginHorizontal: SW(15),
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
      marginBottom: SH(20),
      overflow: 'hidden'
   },
   pickFoodText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(17),
      lineHeight: SH(22),
      color: Colors.white_text_color
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
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
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
   reaningHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.theme_background,
      paddingHorizontal: SW(15),
      paddingVertical: SH(10)

   },
   padH20: {
      paddingHorizontal: SW(15)
   }












});