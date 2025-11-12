import { StyleSheet, Platform } from 'react-native';
import { SF, Fonts, SW, SH, Colors } from '../../utils';

export default HomeStyle = (Colors) => StyleSheet.create({


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