import React, { useState, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import images from '../../index';
import { AudioCallStyles } from '../../styles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import { Colors, SF, SH } from '../../utils';
import { Spacing, VectorIcon } from '../../components';

const AudioCallScreen = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const AudioCallStyle = useMemo(() => AudioCallStyles(Colors), [Colors]);
  const [Muteicon, SetMuteicon] = useState(0);
  const [Speaker, SetSpeaker] = useState(0);
  const OnLoginPress = () => {
    navigation.navigate(RouteName.ORDER_DROP);
  }
  return (
    <View style={AudioCallStyle.BgColorView}>
      <View style={AudioCallStyle.Container}>
        <View style={AudioCallStyle.MinViewAudioaCall}>
          <Spacing space={SH(25)} />
          <View style={AudioCallStyle.FlexRowSetAudiCall}>
            <View style={AudioCallStyle.MarginRight}>
              <Image source={images.Chat_image_one}
                style={AudioCallStyle.ImagStyle}
                resizeMode={'cover'} />
            </View>
            <View>
              <Text style={AudioCallStyle.SeTharryText}>{t("John_Smith")}</Text>
              <Text style={AudioCallStyle.SetWhiteTextNormal}>{t("Conncting_Text")}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={AudioCallStyle.SetSpaceDiv}>
        <View style={AudioCallStyle.SeTiconView}>
          <View>
            {Muteicon === 0 ?
              <TouchableOpacity onPress={() => SetMuteicon(1)} style={[AudioCallStyle.MicroPhone, AudioCallStyle.IconMarg]} >
                <VectorIcon icon="FontAwesome" name="microphone" size={SF(25)} color={Colors.black_text_color} style={AudioCallStyle.EyeIconse} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => SetMuteicon(0)} style={[AudioCallStyle.MicroPhone, AudioCallStyle.IconMarg]} >
                <VectorIcon icon="FontAwesome" name="microphone-slash" size={SF(25)} color={Colors.black_text_color} style={AudioCallStyle.EyeIconse} />
              </TouchableOpacity>
            }
            <View>
              <Text style={AudioCallStyle.MuteColorText}>{t("Mute_Icon")}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={[AudioCallStyle.IconPositionSet, AudioCallStyle.IconMarg]} onPress={() => OnLoginPress()}>
              <VectorIcon icon="Ionicons" name="call" color={Colors.white_text_color} size={SF(30)} style={AudioCallStyle.EyeIconse} />
            </TouchableOpacity>
            <Text style={AudioCallStyle.MuteColorText}>{t("EndIcon")}</Text>
          </View>
          <View>
            {Speaker === 0 ?
              <TouchableOpacity onPress={() => SetSpeaker(1)} style={[AudioCallStyle.MicroPhone, AudioCallStyle.IconMarg]}>
                <VectorIcon icon="Ionicons" name="volume-high" size={SF(25)} color={Colors.black_text_color} style={AudioCallStyles.eyeiconset} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => SetSpeaker(0)} style={[AudioCallStyle.MicroPhone, AudioCallStyle.IconMarg]} >
                <VectorIcon icon="Ionicons" name="volume-mute" size={SF(25)} color={Colors.black_text_color} style={AudioCallStyles.eyeiconset} />
              </TouchableOpacity>
            }
            <Text style={AudioCallStyle.MuteColorText}>{t("Speaker_Icon")}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AudioCallScreen;