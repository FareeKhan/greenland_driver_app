import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button, Container, Spacing } from "../../../components";

import { RouteName } from "../../../routes";
import { Style } from "../../../styles";
import { SH, Colors, Fonts } from "../../../utils";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { loginUser } from "../../../redux/action/DataAction";
import messaging from "@react-native-firebase/messaging";
import Animated, { Easing, LightSpeedInLeft } from "react-native-reanimated";
import CustomDropDown from "../../../components/CustomDropDown";

const appsName = [
  {
    label: "Kuwaiti",
    id: 1,
    topic: "kuwaiti",
  },
  {
    label: "Diva",
    id: 2,
    topic: "diva",
  },
  {
    label: "Zain",
    id: 2,
    topic: "zain",
  },
];

const LoginScreen = (props) => {
  const { t } = useTranslation();
  const { data } = props;

  const { Colors } = useTheme();
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedAppName, setSlectedAppName] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (data.error !== null) {
      alert(data.error);
    }
  }, [data.error]);

  // useEffect(() => {
  //   if (data.userdata?.id != undefined) {
  //     return props.navigation.navigate(RouteName.SIDE_NAVIGATOR);
  //   }
  // }, [data]);

  async function processLogin() {

    try {
      if (mobileNumber.length == 0) {
        alert("Enter your mobile number");
        return;
      }
   
setLoader(true)
      let token = await messaging().getToken();

      // const isCheckTopicName = appsName?.find(
      //   (item) => item?.label == selectedAppName
      // );
      // Subscribe to selected topic
      // await messaging().subscribeToTopic(isCheckTopicName.topic);
      // console.log(`Subscribed to topic: ${isCheckTopicName.topic}`);

      // Optional: Unsubscribe from other topics
      // const otherTopics = appsName.filter(
      //   (item) => item?.topic !== isCheckTopicName.topic
      // );
      // console.log("otherTopicsotherTopicsotherTopics", otherTopics);
      // for (const topic of otherTopics) {
      //   await messaging().unsubscribeFromTopic(topic?.topic);
      //   console.log(`Unsubscribed from topic: ${topic?.topic}`);
      // }
      props.dispatch(loginUser(mobileNumber, token, 'aljazeera'));
    } catch (error) {
      console.log("error", error);
    } finally {
setLoader(false)

    }
  }

  return (
    <Container>
      <View style={styles.mainContainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <Animated.View
            style={{}}
            entering={LightSpeedInLeft.duration(1000).easing(Easing.in)}
          >
            <View style={Style.MinViewContent}>
              <Text style={styles.welcomeTxt}>{t("Login_Text")}</Text>
              <Spacing space={SH(20)} />

              {/* <CustomDropDown
                data={appsName}
                title={t("selectApp")}
                placeholder={t("selectApp")}
                setValue={setSlectedAppName}
                value={selectedAppName}
              /> */}

              <Text style={styles.title}>{t("Mobile_Number")}</Text>
              <TextInput
                inputMode="numeric"
                maxLength={10}
                placeholder={t("Mobile_Number")}
                onChangeText={(value) => setMobileNumber(value)}
                value={mobileNumber}
                placeholderTextColor={Colors.gray_text_color}
                style={{
                  borderWidth: 1,
                  height: 45,
                  marginBottom: 30,
                  borderRadius: 7,
                  borderColor: "#ccc",
                  paddingHorizontal: 15,
                }}
              />

              <Button
                title={t("login")}
                onPress={() => {
                  processLogin();
                }}
                loading={loader}
              />
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.DataReducer,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: Platform.OS == "ios" ? 60 : 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  welcomeTxt: {
    fontSize: 20,
    color: Colors.theme_background,
    fontFamily: Fonts.Poppins_Bold,
    textTransform: "capitalize",
    textAlign: "center",
  },
  subTxt: {
    fontSize: 20,
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    textTransform: "capitalize",
  },
  LoginText: {
    fontSize: 17,
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.black_text_color,
  },
});

export default connect(mapStateToProps)(LoginScreen);
