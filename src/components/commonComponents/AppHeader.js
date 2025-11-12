import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import propTypes from 'prop-types';
import { RowComponent, VectorIcon } from '../../components';
import { SF, SH, SW, Fonts, Colors } from '../../utils';

function AppHeader({ headerStyle, LeftIconStyle, rightView, LeftIconLeftStyle, headerTitle, onPress, titleStyle, Iconname }) {

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...headerStyle
                },
               
                headerTitle: {
                    fontSize: SF(23),
                    fontWeight: '700',
                    fontFamily: Fonts.Poppins_Medium,
                    textAlign:'center',
                    color: Colors.white_text_color,
               
                    ...titleStyle
                },
         
            }),
        [headerStyle, Colors],
    );
    return (
        <RowComponent rowStyle={styles.container}>
            <View style={[styles.rightView, { ...rightView }]}>
                <TouchableOpacity onPress={onPress} style={styles.LeftIconLeftStyle}>
                    {Iconname && <VectorIcon icon="AntDesign" name={'arrowleft'} style={styles.LeftIconStyle} />}
                    {headerTitle ? <Text style={styles.headerTitle}>{headerTitle}</Text> : null}
                </TouchableOpacity>
            </View>
        </RowComponent>
    )
}
AppHeader.defaultProps = {
    headerStyle: {},
    LeftImageView: null,
    LeftComponent: null,
    title: '',
    rightImage: null,
    onLeftPress: () => { },
};
AppHeader.propTypes = {
    headerStyle: propTypes.shape({}),
    LeftImageView: propTypes.any,
    LeftComponent: propTypes.any,
    title: propTypes.string,
    rightImage: propTypes.any,
    onLeftPress: propTypes.func
};
export default AppHeader;