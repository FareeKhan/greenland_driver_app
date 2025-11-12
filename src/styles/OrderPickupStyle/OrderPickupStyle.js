import { StyleSheet, Platform } from 'react-native';
import { SF, Fonts, SW, SH, Colors, widthPercent } from '../../utils';

export default OrderPickupStyle = (Colors) => StyleSheet.create({

   mapContainer: {
      flex: 1,
   }, 
   mapstyleset: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      ...StyleSheet.absoluteFillObject,
   },
   SetImahMapStyle: {
      height: SH(50),
      width: SW(50),
   },
   HomeMapStyle: {
      height: SH(50),
      width: SW(50),
   },
   OrderBottomBoxWrap: {
      position: 'absolute',
      bottom: SH(0),
      width: '95%',
      alignSelf: 'center',
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
      minHeight: SH(100),
      padding: SW(15),
      borderTopLeftRadius: SW(10),
      borderTopRightRadius: SW(10)
   },
   OrderStartBottomBoxWrap: {
      position: 'absolute',
      bottom: SH(0),
      width: '95%',
      alignSelf: 'center',
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
      padding: SW(15),
      borderTopLeftRadius: SW(10),
      borderTopRightRadius: SW(10)
   },
   OrderBottomBox: {
      borderRadius: SW(7),
      flexDirection: 'row',
      alignItems: 'center'
   },
   pilckupPotnName: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(17),
      lineHeight: SH(18),
      color: Colors.black_text_color
   },

   DestinationIcon: {
      width: SW(20),
      height: SH(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   Title: {
      fontFamily: Fonts.Poppins_Regular,
      fontSize: SF(16),
      color: Colors.black_text_color,
      marginTop: SH(-10),
      marginBottom: SH(-10),
   },
   DescriptionStyle: {
      textAlign: 'left',
      fontSize: SF(15),
      color: Colors.black_text_color,
      marginBottom: SH(-5),
   },
   width70: {
      width: '70%'
   },
   pointlabelText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(14),
      lineHeight: SH(18),
      color: Colors.gray_text_color
   },
   orderidText: {
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(16),
      lineHeight: SH(22),
      color: Colors.black_text_color
   },
   pointlabelText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(14),
      lineHeight: SH(18),
      color: Colors.gray_text_color
   },

   textRightClass: {
      textAlign: 'right'
   },
   width30: {
      width: '30%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
   },
   flexRowAlCent: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   widFull: {
      width: '100%'
   },
   AcceptbBtn: {
      width: widthPercent(70)
   },
   flexRowAlCentJusSpBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   notAcceptBtn: {
      width: SW(40),
      paddingLeft: SW(10)
   },
   backArrow: {
      position: 'absolute',
      top: SH(15),
      left: SW(15),
      width: SW(35),
      height: SW(35),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.theme_background,
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
   pickupPointLabel: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      lineHeight: SH(18),
      color: Colors.theme_background
   },
   pickupPointText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      lineHeight: SH(18),
      color: Colors.black_text_color,
      textAlign:"left"
   },
   pickupAddressText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      color: Colors.gray_text_color
   },
   callBtn: {
      position: 'absolute',
      right: SW(5),
      top: SH(-5),
      width: SW(35),
      height: SW(35),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1
   },
   inputStyle: {
      borderWidth: 0,
      paddingHorizontal: 0
   },
   containerStyle: {
      borderWidth: SW(1),
      borderColor: Colors.black_text_color,
      borderRadius: SW(7),
      height: SH(55)
   },
   driverText: {
      fontFamily: Fonts.Poppins_Regular,
      fontSize: SF(20),
      color: Colors.black_text_color,
      fontWeight: '700',
      textAlign: 'center'
   },
   arrivingText: {
      fontFamily: Fonts.Poppins_Regular,
      fontSize: SF(16),
      color: Colors.gray_text_color,
      textAlign: 'center'
   },
   userNameText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      color: Colors.black_text_color,
   },
   rateText: {
      fontFamily: Fonts.Poppins_Regular,
      fontSize: SF(15),
      color: Colors.gray_text_color,
   },
   userLeftSpace: {
      paddingLeft: SW(10)
   },
   borderTopBtn: {
      borderTopWidth: SW(0.5),
      borderBottomWidth: SW(0.5),
      borderTopColor: Colors.gray_text_color,
      borderBottomColor: Colors.gray_text_color,
      paddingVertical: SH(8),
      paddingHorizontal: SW(10)
   },
   flexRowAlStart: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
   },
   centerHClass: {
      justifyContent: 'center',
      alignItems: 'center'
   },
   deliveryComplete: {
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(20),
      color: Colors.black_text_color,
      letterSpacing: SW(1)
   },
   yourEarnedText: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(18),
      color: Colors.theme_background,
   },
   OrderCompleteBoxWrap: {
      width: '95%',
      alignSelf: 'center',
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
      padding: SW(15),
      // minHeight: SH(230)
   },
   trancsactonId: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(16),
      color: Colors.gray_text_color,
   },
   padH20: {
      paddingHorizontal: SW(20)
   },
   Lottiewidthstyle: {
      // height: SH(200)
   },
   padTop: {
      marginTop: SH(20)
   },
   timelineBox: {
      minHeight: SH(120),
   },
   rateYourDrive: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(20),
      color: Colors.gray_text_color,
      textAlign: 'center'
   }






});