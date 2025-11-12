import { StyleSheet } from 'react-native';
import { SF, Fonts, SW, SH, Colors, widthPercent } from '../../utils';

export default AudioCallStyles = (Colors) => StyleSheet.create({
  SeTiconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  IconPositionSet: {
    backgroundColor: 'red',
    height: SW(60),
    width: SW(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SH(200),
  },
  MicroPhone: {
    backgroundColor: Colors.white_text_color,
    height: SW(60),
    width: SW(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SH(200),
  },
  IconPositionSettext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SH(10),
  },
  MuteColorText: {
    color: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(14),
    textAlign: 'center',
    paddingTop: SH(10),
  },
  SetSpaceDiv: {
    position: 'absolute',
    bottom: SH(20),
    width: '100%'
  },
  Container: {
    width: '100%',
    height: '100%',
  },
  MarginRight: {
    marginRight: SH(15),
  },
  SeTharryText: {
    color: Colors.white_text_color,
    fontSize: SF(25),
    fontFamily: Fonts.Poppins_Medium,
  },
  SetWhiteTextNormal: {
    color: Colors.white_text_color,
    fontSize: SF(16),
    fontFamily: Fonts.Poppins_Medium,
    lineHeight: SH(19)
  },
  ImagStyleendcall: {
    width: SW(100),
    height: SH(100),
    borderRadius: SH(250),
  },
  BgColorView: {
    backgroundColor: Colors.theme_background,
    height: '100%'
  },
  ImagStyle: {
    width: SW(50),
    height: SW(50),
    borderRadius: SH(200)
  },
  FlexRowSetAudiCall: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SH(10),
    paddingLeft: SH(10)
  },
  SpekerImage: {
    tintColor: Colors.theme_background_han_Purple,
    height: SH(30),
    width: SW(30),
  },
  IconMarg: {
    marginHorizontal: SW(10)
  }
});