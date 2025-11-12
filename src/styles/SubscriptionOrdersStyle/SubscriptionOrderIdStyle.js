import { StyleSheet, Platform } from 'react-native';
import { SF, Fonts, SW, SH, Colors, widthPercent } from '../../utils';

export default SubscriptionOrderIdStyle = (Colors) => StyleSheet.create({


   flexRowAclCent: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   OrderIdText: {
      fontFamily: Fonts.Poppins_Bold,
      color: Colors.black_text_color,
      fontSize: SF(18),
      paddingLeft: SW(15),
      lineHeight: SH(24)
   },
   padH20: {
      paddingHorizontal: SW(20)
   },
   OrderAddressBox: {
      marginHorizontal: SW(20),
      backgroundColor: Colors.white_text_color,
      borderRadius: SW(7),
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
      flexDirection: 'row'
   },
   width15: {
      width: '15%',
      alignItems: 'center'
   },
   width85: {
      width: '85%'
   },
   centerVerticleLine: {
      width: SW(2),
      height: SH(30),
      backgroundColor: Colors.chinese_silver,
      alignSelf: 'center'
   },
   pickupPitnLabel: {
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.theme_background,
      fontSize: SF(18),
   },
   pickupAddressLabel: {
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.gray_text_color,
      fontSize: SF(16),
   },
   dropLabel: {
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      fontSize: SF(16),
   },
   statusText: {
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      fontSize: SF(17),
      lineHeight: SH(24),
      paddingLeft: SW(5)
   },
   flexRowAlCentJusSpBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   OrderStatusBox: {
      width: '33.33%',
      backgroundColor: Colors.white_text_color,
      borderRadius: SW(7),
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
      marginRight: SW(10),
      marginBottom: SH(15)
   },
   contentContainerStyle: {
      paddingLeft: SW(20),
      paddingRight: SW(38)
   },
   dateText: {
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.white_text_color,
      fontSize: SF(14),
      lineHeight: SH(20),
      paddingHorizontal: SW(5),
   },
   CompletedBox: {
      backgroundColor: Colors.white_text_color,
      borderRadius: SW(7),
      shadowColor: '#b5b2b2',
      shadowOffset: {
         width: 0,
         height: Platform.OS === 'ios' ? 2 : 5,
         minHeight: '100%',
      },
      shadowOpacity: 1,
      shadowRadius: Platform.OS === 'ios' ? 2 : 50,
      elevation: Platform.OS === 'ios' ? 1 : 6,
      paddingVertical: SH(10),
      paddingHorizontal: SW(20),
      position: 'absolute',
      bottom: SH(0),
      width: '100%'
   },
   buttonStyle: {
      backgroundColor: Colors.electric_green_color
   }







});