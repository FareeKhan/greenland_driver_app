import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SwiperStyle } from '../../styles';
import { Button, Spacing,Lottie } from '../../components';
import { RouteName } from '../../routes';
import { SH } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import images from '../../index';

const App = ({ navigation }) => {
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const SwiperStyles = useMemo(() => SwiperStyle(Colors), [Colors]);


  const Swiperdata = [
    {
      key: 's1',
      text: 'Swiperfirst',
      title: "Swipertitle",
      animation: images.First_Swiper,
    },
    {
      key: 's2',
      text: 'SwiperFirstTwo',
      title: 'SwiperTitleTwo',
      animation: images.Two_Swiper,
    },
    {
      key: 's3',
      text: 'SwiperFirstThree',
      title: 'Swipertitlethree',
      animation: images.Three_Swiper,
      backgroundColor: 'transparent',
    },
  ]
  

  const RenderItem = ({ item }) => {
    return (
      <View>
         <StatusBar backgroundColor={Colors.theme_background} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={SwiperStyles.ScrollViewStyle}>
          <View>
            <View style={SwiperStyles.AnimationViewStyle}>
              <Lottie
                source={item.animation}
              />
            </View>
          </View>
        </ScrollView>
        <Text style={SwiperStyles.TitleStyles}>
          {t(item.title)}
        </Text>
        <Text style={SwiperStyles.Textstyle}>
          {t(item.text)}
        </Text>
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (

      <View style={SwiperStyles.ButtonCircle}>
        <Button
          title={t("Get_Started")}
          buttonStyle={SwiperStyles.buttonStyle}
          onPress={
            () => navigation.navigate(RouteName.SELECT_LANGUAGE)
          }
        />
      </View>

    );
  };
  const _renderNextButton = () => {
    return (
      <View style={SwiperStyles.BgButtonView}>
        <Spacing space={SH(12)} />
        <Text style={SwiperStyles.NextTextStyle}>{t("Next_Text")}</Text>
      </View>
    );
  };
  const _renderSkipButton = () => {
    return (
      <View style={SwiperStyles.BgButtonView}>
        <TouchableOpacity onPress={() => navigation.navigate(RouteName.SELECT_LANGUAGE)}>
          <Spacing space={SH(12)} />
          <Text style={SwiperStyles.NextTextStyle}>{t("Skip_Text")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <AppIntroSlider
        data={Swiperdata}
        renderItem={RenderItem}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
        showSkipButton={true}
        activeDotStyle={SwiperStyles.ActiveDotStyles}
        dotStyle={SwiperStyles.DotSwiperStyle}
      />
    </>
  );
};
export default App;

