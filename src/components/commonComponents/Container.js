import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import propTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../../utils';

const ContainerComponent = ({
  children,
  backgroundColor,
  fullScreen,
  status_Bar,
  statusBarBackgroundColor,
  statusBarPropStyle,
  containerPropStyle,
}) => {

  const { Colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        statusBarStyle: {
          flex: 0,
          backgroundColor: status_Bar ? Colors.theme_backgound : Colors.theme_backgound,
        },
        containerStyle: {
          flex: 1,
          backgroundColor: backgroundColor ?? Colors.theme_backgound
        },
      }),
    [backgroundColor, status_Bar, Colors],
  );
  return fullScreen ? (
    <View style={[styles.containerStyle, {...containerPropStyle}]}>
      {children}
    </View>
  ) : (
    <View style={[styles.containerStyle, {...containerPropStyle}]}>
      <SafeAreaView
        style={[
          styles.statusBarStyle,
          {statusBarPropStyle, backgroundColor: statusBarBackgroundColor},
        ]}
      />
      <SafeAreaView style={[styles.containerStyle, {...containerPropStyle}]}>
        {children}
      </SafeAreaView>
    </View>
  );
}

ContainerComponent.defaultProps = {
  backgroundColor: Colors.white_text_color,
  fullScreen: false,
  status_Bar: false,
  statusBarBackgroundColor: Colors.white_text_color,
  statusBarPropStyle: {},
  containerPropStyle: {},
};

ContainerComponent.propTypes = {
  backgroundColor: propTypes.string,
  fullScreen: propTypes.bool,
  status_Bar: propTypes.bool,
  statusBarBackgroundColor: propTypes.string,
  statusBarPropStyle: propTypes.shape({}),
  containerPropStyle: propTypes.shape({}),
};

export default ContainerComponent;
