import React, { useState, useMemo,useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList,StatusBar,ScrollView,StyleSheet } from "react-native";
import { Spacing, OnGoingFlatFun, CompletedFlatFun, NewOrderFlatFun,
    VectorIcon,

} from '../../../components';
import { HomeStyle } from '../../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import { SF } from "../../../utils";
import { getDrivers } from '../../../redux/action/DataAction';
import { useSelector, useDispatch, connect } from "react-redux";
import {Table, Row, Rows} from 'react-native-table-component';

const AssignDriver = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const {route,data} = props;
  const {id} = route;
  const OrderPickupStyles = useMemo(() => OrderPickupStyle(Colors), [Colors]);

  const tableHead = ['Driver Phone','Driver Name'];

  const tableFooter = ['Driver Phone','Driver Name'];


  const tableData = (data?.drivers).map(newItem => [
    newItem.phone,
    newItem.name
  ]);

  useEffect(()=>{
    props.dispatch(getDrivers());
  },[]);

  useEffect(()=>{
    props.dispatch(getDrivers());
  },[route]);

  useEffect(()=>{
    console.warn(data);
  },[data]);


  return (
    <>
      <StatusBar backgroundColor={Colors.theme_background} />
      <View style={[HomeStyles.homeTabBox, HomeStyles.bgwhiteClass]}>

      <View style={{flex: 1}}>
        <TouchableOpacity
          style={OrderPickupStyles.backArrow}
          onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}>
          <VectorIcon
            icon="AntDesign"
            name="arrowleft"
            color={Colors.white_text_color}
            size={SF(25)}
          />
        </TouchableOpacity>

        {/* table  */}
        <ScrollView style={styles.container}>
        <Text style={{marginBottom: 10}}>Drivers:</Text>
           <Table borderStyle={styles.tableBorder}>
             <Row data={tableHead} style={styles.head} textStyle={styles.text} />
             {tableData.map((rowData, index) => (
               <TouchableOpacity
                 key={index}
                 onPress={() => onRowPress(rowData, index)}>
                 <Row
                   data={rowData}
                   style={[
                     styles.row,
                     index % 2 && {backgroundColor: '#F7F6E7'},
                     {borderRightWidth: 1, borderColor: '#c8e1ff'},
                   ]} // Optional: style rows differently
                   textStyle={styles.text}
                 />
               </TouchableOpacity>
             ))}
             <Row
               data={tableFooter}
               style={styles.head}
               textStyle={styles.text}
             />
            
           </Table>
       
        </ScrollView>

        {/* table  */}
      </View>

      </View>
     </>
  );
};


const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, paddingTop: 0, backgroundColor: '#fff'},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
    tableBorder: {borderWidth: 1, borderColor: '#c8e1ff', overflow: 'hidden'},
  });

  

const mapStateToProps = (state) => {
  return {
    data: state.DataReducer
  }
}

export default connect(mapStateToProps)(AssignDriver);