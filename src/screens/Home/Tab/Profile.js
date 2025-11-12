import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { ProfileTabStyles, } from '../../../styles';
import { Spacing, VectorIcon, ConfirmationAlert, RatingScreen } from '../../../components';
import { SH, SF, SW, Colors } from '../../../utils';
import images from "../../../index";
import RouteName from "../../../routes/RouteName";
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/action/DataAction";
import messaging from '@react-native-firebase/messaging';

const ProfileTab = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();

  const { Colors } = useTheme();
  const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);
  const { data } = props;
  const appName = data?.userdata?.selectedAppName?.toLowerCase()
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    'logout': t("Are_You_Sure_logout"),
  }
  const onoknutton =async () => {

      props.dispatch(logoutUser());
      await messaging().unsubscribeFromTopic(appName);
      console.log(`Unsubscribed from topic: ${appName}`);
    return props.navigation.navigate(RouteName.LOGIN_SCREEN);

  }

 
  return (
    <View style={ProfileTabStyle.BackgroundWhite}>
      <View style={ProfileTabStyle.whilistminbody}>
        <ScrollView>
          <View style={ProfileTabStyle.ImagCenter}>
            <View>
              <Text style={ProfileTabStyle.UserName}>{props.data?.userdata?.name}</Text>
            </View>
          </View>
          <Spacing space={SH(30)} />
      
          <Spacing space={SH(30)} />
          <View style={ProfileTabStyle.ProfileDetailesMinview}>
      
            <TouchableOpacity onPress={() => {
              setAlertVisible(true);
              setAlertMessage(alertdata.logout);
            }}>
              <View style={ProfileTabStyle.IconAndTextFlex}>
                <View>
                  <Text style={ProfileTabStyle.LogOutView}>{t("Log_Out")}</Text>
                </View>
                <View>
                  <VectorIcon
                    icon="AntDesign"
                    size={SF(27)}
                    name="arrowright"
                    color={Colors.theme_background}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ConfirmationAlert
        message={alertMessage}
        modalVisible={alertVisible}
        setModalVisible={setAlertVisible}
        onPressCancel={() => setAlertVisible(!alertVisible)}
        onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
        cancelButtonText={t("Cancel_Button")}
        buttonText={t("Ok")}
        cancelButtonTextStatus={true}
      />
    </View>
  );
};
const mapStateToProps = (state) => {
  return{
    data: state.DataReducer
  }
};

export default connect(mapStateToProps)(ProfileTab);