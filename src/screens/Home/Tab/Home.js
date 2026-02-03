import React, { useState, useMemo, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, StatusBar, ActivityIndicator, Dimensions, ScrollView, Alert } from "react-native";
import { Spacing, OnGoingFlatFun } from '../../../components';
import { HomeStyle } from '../../../styles';
import { useTranslation } from "react-i18next";
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import { SH } from "../../../utils";
import { BASE_URL, fetchData,  setCurrentItem } from '../../../redux/action/DataAction';
import { connect } from "react-redux";

const Home = (props) => {
  const { t } = useTranslation();

  const { Colors } = useTheme();
  const HomeStyles = useMemo(() => HomeStyle(Colors), [Colors]);
  const [select, setSelect] = useState(1); // Fixed typo: seSelect -> setSelect
  const { data } = props;
  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState([]);
  const [noData, setNoData] = useState(false);
  // Set initial tab based on user role
  const baseUrl = BASE_URL()
  console.log('BASE_URdata?.userdata?.selectedAppNameL', data?.userdata?.selectedAppName)

  useEffect(() => {
    if (data?.userdata.role === 'driver') {
      setSelect(5); // Set to 'OnGoing' for assigners
    }

  }, [data?.userdata]);

  useEffect(() => {
    try {
      if (data?.cachedData?.length > 0 && select === 1) {
        setLoading(false);
      }
      else {
        if (data?.listingData?.length > 0) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('erorr', error)
    }
  }, [data]);

  const processData = async () => {
    let status;
    switch (select) {
      case 1:
        status = 'confirmed';
        break;
      case 2:
        status = data?.userdata?.role === 'driver' ? 'on_the_way_accepted' : 'on_the_way';
        break;
      case 3:
        status = 'delivered';
        break;
      case 4:
        status = 'prepared';
        break;
      case 5:
        status = 'on_the_way';
        break;
      default:
        status = 'confirmed'; // Default case
    }

    try {
      testingData()
      // await props.dispatch(fetchData(status, data?.userdata?.selectedAppName)); // Fetch data for the given status
    } catch (error) {
      console.log('Error fetching data:', error);
    }
    // finally {
    //   setLoading(false); // Ensure loading is turned off
    // }

  }


  useEffect(() => {
    testingData()
  }, [select])


  const testingData = async () => {
    setLoading(true)
    // let status;
    const status =
      select === 1 ? 'confirmed' :
        select === 2 ? (data?.userdata?.role === 'driver' ? 'on_the_way_accepted' : 'on_the_way') :
          select === 3 ? 'delivered' :
            select === 4 ? 'prepared' :
              select === 5 ? 'on_the_way' :
                '';
  
    try {
      var get_url;

      if (data?.userdata?.role == 'driver') {
        get_url =
          baseUrl +
          '/other_user/getUserOrders?user_id=' + data?.userdata?.id +'&status=' +
          status;
      }
      if (data?.userdata?.role == 'stocker') {
        get_url =
          baseUrl +
          '/other_user/getUserOrders'+
          '?get_all=true&status=' +
          status;
      }

      if (data?.userdata?.role == 'assigner') {
        get_url =
          baseUrl +
          '/other_user/getUserOrders?assigned=true&status=' +
          status;
      }

      get_url = get_url + '&role=' + data?.userdata.role;
      console.log('-=-=ss--=-=-', get_url)
      const response = await fetch(get_url)
      const result = await response?.json()

      if (result?.original?.length > 0) {
        setShowData(result?.original)
        setLoading(false)
      } else {
        setShowData([])
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log('showErress', error)
    }

  };

  useFocusEffect(
    useCallback(() => {
      processData();
    }, [select])
  );

  const getDataAction = (item) => {
    props.dispatch(setCurrentItem(item));
    return props.navigation.push(RouteName.ORDER_PICKUP, { id: item?.id });
  };


  return (
    <>
      <StatusBar backgroundColor={Colors.theme_background} />
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:20,marginHorizontal:10}}>
        {data.userdata.role !== 'driver' && (
          <TouchableOpacity
            style={[HomeStyles.tabTocuBox, select === 1 && HomeStyles.tabTocuSelectBox]}
            onPress={() => {
              setSelect(1);
            }}
          >
            <Text style={[HomeStyles.tabText, { color: select === 1 ? 'white' : 'black' }]}>
              New
            </Text>
          </TouchableOpacity>
        )}


        {data.userdata.role !== 'driver' && (
          <TouchableOpacity
            style={[HomeStyles.tabTocuBox, select === 4 && HomeStyles.tabTocuSelectBox]}
            onPress={() => {
              setSelect(4);
            }}
            key={4}
          >
            <Text style={[HomeStyles.tabText, { color: select === 4 ? 'white' : 'black' }]}>
              Fulfilled
            </Text>
          </TouchableOpacity>
        )}

        {data.userdata.role === 'driver' && (
          <TouchableOpacity
            style={[HomeStyles.tabTocuBox, select === 5 && HomeStyles.tabTocuSelectBox]}
            onPress={() => setSelect(5)} 
            key={5}
          >
            <Text style={[HomeStyles.tabText, { color: select === 5 ? 'white' : 'black' }]}>
              Pending
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[HomeStyles.tabTocuBox, select === 2 && HomeStyles.tabTocuSelectBox]}
          onPress={() => setSelect(2)}
          key={2}
        >
          <Text style={[HomeStyles.tabText, { color: select === 2 ? 'white' : 'black' }]}>
            {data?.userdata?.role === 'driver' ? 'Ongoing' : 'Assigned'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[HomeStyles.tabTocuBox, select === 3 && HomeStyles.tabTocuSelectBox]}
          onPress={() => setSelect(3)}
          key={3}
        >
          <Text style={[HomeStyles.tabText, { color: select === 3 ? 'white' : 'black' }]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, minHeight: Dimensions.get('screen').height / 2, width: "100%", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" animating={true} color={"#67300f"} />
        </View>
      ) : (
        <>
          <Spacing space={SH(15)} />

          <FlatList
            data={showData}
            renderItem={({ item }) => (
              <OnGoingFlatFun item={item} onPress={() => getDataAction(item)} />
            )}
            ListEmptyComponent={<View style={{ height: 200, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#000", fontSize: 15, }}>No Data Found</Text>
            </View>}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => processData(true)}

            refreshing={loading}
            extraData={select}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.DataReducer,
  };
};

export default connect(mapStateToProps)(Home);
