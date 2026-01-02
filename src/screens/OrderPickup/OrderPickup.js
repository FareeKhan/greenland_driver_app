import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { Button, Container, Spacing, VectorIcon } from "../../components";
import { OrderPickupStyle } from "../../styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { RouteName } from "../../routes";
import { SF } from "../../utils";
import { connect } from "react-redux";
import { Table, Row } from "react-native-table-component";
import { Actionsheet, Center } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  updateStatus,
  assignOrderToDriver,
  BASE_URL,
} from "../../redux/action/DataAction";
import axios from "axios";
import * as Device from "expo-device";
import DataWedgeIntents from "react-native-datawedge-intents";
import { DeviceEventEmitter } from "react-native";

const OrderPickup = (props) => {
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const OrderPickupStyles = useMemo(() => OrderPickupStyle(Colors), [Colors]);
  const [accept, setAccept] = useState("");
  const [otp, setOtp] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState([]);
  const [clickedRow, setClickedRow] = useState({});
  const [assignDriver, setAssignDriver] = useState(false);
  const [assignedDriver, setAssignedDriver] = useState("");
  const [barcodeCamera, setBarCodeCamera] = useState(false);
  const [isBarCodeScanned, setIsBarCodeScanned] = useState(false);
  const [item, setItem] = useState({});
  const [drivers, setDrivers] = useState([]);
  const [showOrderDelivery, setShowOrderDelivery] = useState(false);
  const [isZebraDevice, setIsZebraDevice] = useState(false);
  console.log("ssssspropspropspropspropss", item?.payment_type == 'pending' ? "Cash" : "Card");

  const { id } = props.route.params;
  const { userdata } = props?.data;

  // return(
  //   <Scanner/>
  // )

  async function getOrder() {
    // await axios
    //   .get(BASE_URL(userdata?.selectedAppName)+ "/other_user/getOrderDetail?order_id=" + id)
    //   .then(res => {
    //     console.log('pppppppp',res.data.data.original);
    //   })
    //   .catch(err => {
    //     console.error(err.response);
    //   });
    let currentItem = props?.common?.currentItem;
    if (currentItem.id !== undefined) {
      setItem(currentItem);
    }
  }

  const isScanned = (p_id, quantity) => {
    var scanned_completely = scanned.find(
      (q) => q.p_id === p_id && q.quantity >= quantity
    );
    var scanned_partially = scanned.find((q) => q.p_id === p_id);

    console.error(1);
    return scanned_completely
      ? "Scanned Completely"
      : `Scanned ${scanned_partially?.quantity || 0} Times`;
  };

  const getProductScan = (p_id) => {
    var find_scan = scanned.find((q) => q.p_id === p_id);
    return find_scan.quantity;
  };

  if (assignDriver && drivers.length > 0) {
    var tableHead = ["#", "Driver Name", "Driver Phone"];
    var tablePayment = ["", ""];

    var tableData = drivers?.map((newItem) => [
      newItem.id,
      newItem.name,
      newItem.phone,
    ]);
  } else {
    var tableHead = ["Product Name", "Quantity", "Price", "Is Scanned"];
    var tablePayment = ["Payment Type", "", "", item?.payment_status];

    var tableData = item?.products?.map((newItem) => [
      newItem?.product_id[1],
      newItem.product_uom_qty,
      newItem.price_unit + " AED",
      isScanned(newItem.p_id, newItem.quantity),
    ]);
  }

  const wareHouseSelection = {
    Kuwaiti: "Kuwaiti Warehouse",
    Diva: "Diva Warehouse",
    Zain: "Zain Warehouse",
  };

  // const pickup_point = wareHouseSelection[userdata?.selectedAppName];
  const pickup_point = "Green Island";

  var delivery_point_key = "";
  var delivery_point_Value = "";

  if (item?.id !== undefined) {
    const allowedKeys = [
      "block_avenue",
      "street",
      "governorate",
      "house",
      "phone",
      "city",
      "country",
    ];

    for (const [key, value] of Object?.entries(item?.shipping_address)) {
      if (allowedKeys.includes(key) && value !== "" && value != null) {
        delivery_point_key += `${key.charAt(0).toUpperCase()}${key.slice(
          1
        )}\r\n`;
        delivery_point_Value += `: ${value}\r\n`;
      }
    }
  }

  // Define your action for row press
  const onRowPress = (rowData, index) => {
    const filterDriver = drivers?.find((item) => item?.id == rowData[0]);

    // props.dispatch(
    //   setCurrentItem({
    //     ...item,
    //     driver: filterDriver,
    //   })
    // );

    var scanned_completely = scanned.find(
      (q) => q.p_id === rowData[0] && q.quantity >= rowData[1]
    );

    if (!scanned_completely) {
      setIsOpen(!isOpen);
    }
    if (assignDriver === true) {
      setAssignedDriver(rowData[0]);
    } else {
      setClickedRow({
        p_id: rowData[0],
        quantity: rowData[1],
      });
    }
  };

  const openGoogleMaps = (address) => {
    console.log("addressaddressaddress", address);
    // Handle the special warehouse case
    if (address === "codingeagle") {
      const warehouseUrl =
        // "https://www.google.com/maps/dir//cyber+pixel/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3e5f6a416379d7b3:0x9f4338b7accb0a43?sa=X&ved=2ahUKEwjM3pzN0NyEAxW2iv0HHeiZAHMQ9Rd6BAg7EAA";
        "https://www.google.com/maps?q=25.184102,55.264344";
      Linking.openURL(warehouseUrl).catch((err) =>
        console.log("Couldn't load page", err)
      );
      return;
    }

    // Handle case where address is an object with lat/lng
    const lat = address?.latitude;
    const lng = address?.longitude;

    if (item?.billing_address?.area) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        item?.billing_address?.area
      )}`;
      Linking.openURL(url).catch((err) =>
        console.log("Couldn't load page", err)
      );
      Alert.alert(
        "Error",
        "Unable to open the location. Please check the address."
      );
    } else if (item?.google_maps_url) {
      const url = item?.google_maps_url;
      Linking.openURL(url).catch((error) => console.log("urlnotworking"));
      Alert.alert("Error", "Unable to open the location. Please check the address.");
    } else {
      console.log("Invalid address or coordinates not found.");
    }
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  const handleBarcodeScan = (scanData) => {
    console.log("Scanned Data Intent:", scanData);

    const scannedData = scanData["com.symbol.datawedge.data_string"];
    const scannedType = scanData["com.symbol.datawedge.label_type"];

    // Find the index of the product in the order's products
    const getIndex = item?.products?.findIndex((product) => {
      return product?.barcode === scannedData;
    });

    if (getIndex !== -1) {
      let getProduct = item?.products[getIndex];

      const existingProductIndex = scanned.findIndex(
        (scannedItem) => scannedItem.p_id === getProduct?.p_id[0]
      );

      console.error(existingProductIndex);

      if (existingProductIndex !== -1) {
        // If the product exists in scanned array, update the quantity
        const updatedScanned = scanned.map((scannedItem, index) => {
          if (index === existingProductIndex) {
            var quant = scannedItem.quantity;
            return { ...scannedItem, quantity: quant + 1 };
          }
          return scannedItem;
        });

        setScanned(updatedScanned);
      } else {
        // If the product doesn't exist, add it to the scanned array
        setScanned([
          ...scanned,
          {
            // p_id: getProduct?.p_id[0],
            p_id: getProduct?.p_id,
            quantity: 1,
          },
        ]);
      }

      setIsOpen(false);
      Alert.alert("Product scanned successfully!");
    } else {
      Alert.alert(
        `Scanned barcode ${scannedData} does not match any product in the order.`
      );
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    if (true) {
      getBarCodeScannerPermissions();
    } else {
      // Alert.alert('Need an actual device for barcode scanning');
    }

    const checkZebraDevice = async () => {
      const deviceModel = Device.modelName;
      if (deviceModel.includes("TC27")) {
        setIsZebraDevice(true);

        // Register broadcast receiver to listen for barcode scans
        DataWedgeIntents.registerBroadcastReceiver({
          filterActions: [
            "com.cyberpixel.kuwaitideliveryapp.SCAN",
            "com.symbol.datawedge.api.RESULT_ACTION",
          ],
          filterCategories: ["android.intent.category.DEFAULT"],
        });

        configureDataWedge();
      } else {
        setIsZebraDevice(false);
      }
    };

    checkZebraDevice();

    const subscription = DeviceEventEmitter.addListener(
      "datawedge_broadcast_intent",
      handleBarcodeScan
    );

    return () => {
      subscription.remove();
    };
  }, [item?.products, scanned]);
  console.log("fareed", BASE_URL() + "/other_user/getDrivers");

  const fetchDrivers = useCallback(async () => {
    const response = await axios.get(BASE_URL() + "/other_user/getDrivers");
    console.log("sshhhhhhhh", response.data?.data);
    // console.log("Robin Response received Eleven:", response.data.data);
    setDrivers(response?.data?.data);
  });

  useEffect(() => {
    let status = item?.order_status;

    // Only fetch drivers if status is 'fulfilled' and user is not a driver
    if (
      (status === "prepared" || status === "on_the_way_rejected") &&
      userdata.role !== "driver"
    ) {
      fetchDrivers();
    }
    if (userdata?.role === "driver" && status === "on_the_way") {
      setShowOrderDelivery(true);
    }
    return () => {
      setShowOrderDelivery(false);
    };
  }, [item?.order_status, userdata]);

  if (hasPermission === false && Device.isDevice) {
    Alert.alert("permission disallowed, functionality limited");
  }

  const scanCode = () => {
    if (isZebraDevice) {
      DataWedgeIntents.sendIntent(
        DataWedgeIntents.ACTION_SOFTSCANTRIGGER,
        DataWedgeIntents.START_SCANNING
      );
    } else {
      setBarCodeCamera(!barcodeCamera);
    }
  };

  const configureDataWedge = () => {
    try {
      // Create the profile
      sendCommand("com.symbol.datawedge.api.CREATE_PROFILE", "ScannerDemo");

      // Configure the Barcode plugin
      var profileConfig = {
        PROFILE_NAME: "ScannerDemo",
        PROFILE_ENABLED: "true",
        CONFIG_MODE: "UPDATE",
        PLUGIN_CONFIG: {
          PLUGIN_NAME: "BARCODE",
          RESET_CONFIG: "true",
          PARAM_LIST: {
            configure_all_scanners: "true",
            scanner_input_enabled: "true",
            aim_type: "3",
            EXTRA_DATA: {
              aim_type: "3",
            },
          },
        },
        APP_LIST: [
          {
            PACKAGE_NAME: "com.cyberpixel.kuwaitideliveryapp",
            ACTIVITY_LIST: ["*"],
          },
        ],
      };
      sendCommand("com.symbol.datawedge.api.SET_CONFIG", profileConfig);

      // Configure the Intent plugin
      var profileConfig2 = {
        PROFILE_NAME: "ScannerDemo",
        PROFILE_ENABLED: "true",
        CONFIG_MODE: "UPDATE",
        PLUGIN_CONFIG: {
          PLUGIN_NAME: "INTENT",
          RESET_CONFIG: "true",
          PARAM_LIST: {
            intent_output_enabled: "true",
            intent_action: "com.cyberpixel.kuwaitideliveryapp.SCAN",
            intent_delivery: "2", // 2 = Broadcast Intent
          },
        },
      };
      sendCommand("com.symbol.datawedge.api.SET_CONFIG", profileConfig2);
    } catch (error) {
      console.error("Error configuring DataWedge: ", error);
    }
  };

  const sendCommandResult = "false";

  // Send DataWedge commands
  const sendCommand = (extraName, extraValue) => {
    const broadcastExtras = {};
    broadcastExtras[extraName] = extraValue;
    broadcastExtras["SEND_RESULT"] = sendCommandResult;
    DataWedgeIntents.sendBroadcastWithExtras({
      action: "com.symbol.datawedge.api.ACTION",
      extras: broadcastExtras,
    });
  };

  const markAsScanned = (code = null) => {
    // Check if the p_id already exists in the scanned array
    const existingProductIndex = scanned.findIndex(
      (item) => item.p_id === clickedRow?.p_id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, create a new array with the updated quantity for this product
      const updatedScanned = scanned.map((item, index) => {
        if (index === existingProductIndex) {
          var quant = item.quantity;
          return { ...item, quantity: quant + 1 };
        }
        return item;
      });

      setScanned(updatedScanned);
    } else {
      // If the product doesn't exist, add it to the scanned array
      setScanned([
        ...scanned,
        {
          p_id: clickedRow?.p_id,
          quantity: 1,
        },
      ]);
    }

    setIsOpen(false);
    return Alert.alert("Scanned!");
  };

  const processOrder = (role, status) => {
    if (item?.order_status == "prepared" && !assignedDriver && assignDriver) {
      alert("Please Select Driver");
      return;
    }

    if (item?.order_status == "confirmed" && scanned?.length == 0) {
      alert("Please Scan the Product");
      return;
    }

    let old_status = status;

    // if (
    //   !__DEV__ &&
    //   scanned?.length < item?.products.length &&
    //   status === "confirmed"
    // ) {
    //   return Alert.alert("Please scan all the products");
    // }

    switch (status) {
      case "confirmed":
        status = "prepared";
        break;

      case "prepared":
        status = "on_the_way";
        break;

      case "on_the_way":
        status = "on_the_way_accepted";
        break;
      case "on_the_way_accepted":
        status = "delivered";
        break;
    }

    if (
      (old_status === "prepared" || old_status === "on_the_way_rejected") &&
      !assignDriver &&
      userdata?.role !== "driver"
    ) {
      return setAssignDriver(true);
    } else {
      console.log("showmeSomething", status, item?.id);

      props.dispatch(updateStatus(status, item?.id));
      // Alert.alert(status+"|"+item?.odoo_id);

      Alert.alert(`Order Status Updated to ${status}`);
      return props.navigation.navigate("SideNavigator");
    }
  };

  const assignCurrDriver = () => {
    var driver_id = assignedDriver;
    var order_id = item?.id;

    props.dispatch(assignOrderToDriver(order_id, driver_id));
    Alert.alert("Order Assigned to Driver");
    props.navigation.navigate("SideNavigator");
  };

  const handleBarCodeCameraScanned = ({ type, data }) => {
    setIsOpen(false);
    setIsBarCodeScanned(true);

    // mark as scanned
    // Check if the p_id already exists in the scanned array
    const existingProductIndex = scanned.findIndex(
      (item) => item.p_id === clickedRow?.p_id
    );

    if (existingProductIndex !== -1) {
      // If the product exists, create a new array with the updated quantity for this product
      const updatedScanned = scanned.map((item, index) => {
        if (index === existingProductIndex) {
          var quant = item.quantity;
          var total_quant = clickedRow?.quantity;
          Alert.alert(`Scanned ${quant} times out of ${total_quant} Times`);

          if (quant + 1 > total_quant) {
            setBarCodeCamera(false);
          } else {
            return { ...item, quantity: quant + 1 };
          }
        }

        return item;
      });

      setScanned(updatedScanned);
    } else {
      // If the product doesn't exist, add it to the scanned array
      var barcode = item?.products?.filter((item) => {
        return item.p_id[0] === clickedRow.p_id;
      });
      var barcodeText = barcode[0]?.product_details?.barcode;
      if (data === barcodeText) {
        setScanned([
          ...scanned,
          {
            p_id: clickedRow?.p_id,
            quantity: 1,
          },
        ]);

        alert(`Bar code with type ${type} and data ${data} has been scanned!`);

        setBarCodeCamera(!barcodeCamera);
      } else {
        return Alert.alert(
          "Not Matching, Readed Barcode: " +
          data +
          " and needed: " +
          barcodeText
        );
      }
    }

    // end mark as scanned
  };

  var getOrderStatus = (status) => {
    // if(userdata?.role === 'driver'){
    //   return 'Deliver';
    // }
    switch (status) {
      case "confirmed":
        return "Fulfill";

      case "on_the_way_rejected":
      case "prepared":
        return "Assign Driver";

      case "on_the_way_accepted":
        return "Delivered";
      default:
        return false;
    }
  };

  const shouldViewTable = () => {
    // if(userdata?.role === 'driver'){
    //   return true;
    // }

    if (item?.order_status === "confirmed") {
      return true;
    }

    if (assignDriver === true) {
      return true;
    }

    return false;
  };

  const openProductPage = (productId) => {
    const productUrl = `https://sk-cosmetics.vercel.app/product/${productId}`;
    Linking.openURL(productUrl).catch((err) =>
      console.error("Couldn't open product page", err)
    );
  };
  console.log("itemitemitemitemitemitemitemitem", item);

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={OrderPickupStyles.backArrow}
          onPress={() => props.navigation.navigate(RouteName.HOME_SCREEN)}
        >
          <VectorIcon
            icon="AntDesign"
            name="arrowleft"
            color={Colors.white_text_color}
            size={SF(25)}
          />
        </TouchableOpacity>

        <View style={{ marginTop: 40, padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 0,
              marginBottom: 30,
              textAlign: "center",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#2c3e50",
            }}
          >
            {item?.order_status === "on_the_way"
              ? `Assigned to ${item?.order_status?.driver?.name} (${item?.order_status?.driver?.id})`
              : item?.order_status}
            {item?.order_status === "on_the_way" &&
              `\nContact: ${item?.order_status?.driver?.phone}`}
          </Text>

          <Text style={{ color: "gray", marginBottom: 15 }}>
            Click Address To Open Maps*
          </Text>

          <Text style={{ color: "gray", marginBottom: 15 }}>
            Order Date: {item?.date_order}
          </Text>

          <TouchableOpacity onPress={() => openGoogleMaps("codingeagle")}>
            <View>
              <Text style={OrderPickupStyles.pickupPointLabel}>
                Pickup Point
              </Text>
              <Spacing />
              <Text style={OrderPickupStyles.pickupPointText}>
                {pickup_point}
              </Text>
              <Spacing />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openGoogleMaps(item?.google_maps_url)}
          >
            <View style={{ marginTop: 20 }}>
              <Text style={OrderPickupStyles.pickupPointLabel}>
                Delivery Point
              </Text>
              <Spacing />
              <View style={{ flexDirection: "row" }}>
                <Text style={OrderPickupStyles.pickupPointText}>
                  {item?.shipping_address?.area}
                </Text>

                <Text style={OrderPickupStyles.pickupPointText}>
                  {/* {delivery_point_Value} */}
                </Text>
              </View>
              <Spacing />
            </View>
          </TouchableOpacity>



          <View style={{}}>
            <Text style={OrderPickupStyles.pickupPointLabel}>
              Payment type
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={OrderPickupStyles.pickupPointText}>
                {item?.payment_type == 'pending' ? "Cash" : "Card"}
              </Text>
            </View>
            <Spacing />
          </View>

          <View style={{ marginTop: 0 }}>
            <Text style={OrderPickupStyles.pickupPointLabel}>Products</Text>
            {item?.products?.map((product) => (
              <TouchableOpacity key={product.p_id}>
                <Text style={OrderPickupStyles.pickupPointText}>
                  {product?.product_id[1]} - Quantity: {product.product_uom_qty}
                </Text>
                <Spacing />
              </TouchableOpacity>
            ))}
          </View>
          {
            userdata?.role == "driver" &&
            <View>
              <Text style={OrderPickupStyles.pickupPointLabel}>Payment</Text>
              <Text style={OrderPickupStyles.pickupPointText}>
                {item?.payment_type}
              </Text>
            </View>
          }
        </View>



        {/* table  */}
        <View style={styles.container}>
          {/* {shouldViewTable() && ( */}
          {shouldViewTable() && (
            <>
              <Text style={{ marginBottom: 10 }}>
                {assignDriver ? "Drivers" : "Products"}:
              </Text>
              <Table borderStyle={styles.tableBorder}>
                <Row
                  data={tableHead}
                  style={styles.head}
                  textStyle={styles.text}
                />
                {tableData?.map((rowData, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onRowPress(rowData, index)}
                  >
                    <Row
                      data={rowData}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" },
                        { borderRightWidth: 1, borderColor: "#c8e1ff" },
                      ]} // Optional: style rows differently
                      textStyle={styles.text}
                    />
                  </TouchableOpacity>
                ))}

                {assignDriver === false ? (
                  <Row
                    data={tablePayment}
                    style={styles.head}
                    textStyle={styles.text}
                  />
                ) : (
                  <></>
                )}
              </Table>
            </>
          )}
          <Button
            buttonStyle={{ marginTop: 15, backgroundColor: "#2c3e50" }}
            title={"Call Customer"}
            onPress={() => Linking.openURL("tel:" + item?.billing_address?.phone)}
          />
        </View>

        <View style={{ marginTop: 0, padding: 20, marginBottom: 60 }}>
          {item?.order_status_dates &&
            Object.values(item.order_status_dates).some(
              (value) => value !== null
            ) && (
              <View style={{ marginTop: 0 }}>
                <Text style={OrderPickupStyles.pickupPointLabel}>
                  Order Status Date Time:
                </Text>

                {item.order_status_dates.confirmed_datetime && (
                  <Text style={OrderPickupStyles.pickupPointText}>
                    Confirmed: {item.order_status_dates.confirmed_datetime}
                  </Text>
                )}

                {item.order_status_dates.fulfilled_datetime && (
                  <Text style={OrderPickupStyles.pickupPointText}>
                    Fulfilled: {item.order_status_dates.fulfilled_datetime}
                  </Text>
                )}

                {item.order_status_dates.assigned_datetime && (
                  <Text style={OrderPickupStyles.pickupPointText}>
                    Assigned: {item.order_status_dates.assigned_datetime}
                  </Text>
                )}

                {item.order_status_dates.accepted_datetime && (
                  <Text style={OrderPickupStyles.pickupPointText}>
                    Accepted: {item.order_status_dates.accepted_datetime}
                  </Text>
                )}

                {item.order_status_dates.delivered_datetime && (
                  <Text style={OrderPickupStyles.pickupPointText}>
                    Delivered: {item.order_status_dates.delivered_datetime}
                  </Text>
                )}
              </View>
            )}
        </View>

        {/* table  */}
      </ScrollView>
      <View>
        <View
          style={
            ([
              OrderPickupStyles.flexRowAlCentJusSpBtn,
              OrderPickupStyles.widFull,
            ],
              { marginBottom: 10, marginLeft: 10, marginRight: 10 })
          }
        >
          {/* <TouchableOpacity style={OrderPickupStyles.notAcceptBtn}
                         onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}
                      >
                         <VectorIcon icon="MaterialIcons" name="not-interested" color={Colors.red} size={SF(25)} />
                      </TouchableOpacity> */}

          {item?.order_status !== "delivered" &&
            !showOrderDelivery &&
            getOrderStatus(item?.order_status) !== false && (
              <Button
                title={getOrderStatus(item?.order_status)}
                buttonStyle={(OrderPickupStyles.AcceptbBtn, { width: "100%" })}
                onPress={() => processOrder(userdata?.role, item?.order_status)}
              />
            )}
          {showOrderDelivery && (
            <>
              <Button
                title={"Accept Order"}
                buttonStyle={(OrderPickupStyles.AcceptbBtn, { width: "100%" })}
                onPress={() => processOrder(userdata?.role, "on_the_way")}
              />
              <Button
                title={"Reject Order"}
                buttonStyle={
                  (OrderPickupStyles.AcceptbBtn,
                    { width: "100%", marginTop: 10, backgroundColor: "black" })
                }
                onPress={() =>
                  processOrder(userdata?.role, "on_the_way_rejected")
                }
              />
            </>
          )}
        </View>
      </View>

      <Center>
        <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <Actionsheet.Content>
            {assignDriver ? (
              <>
                <Actionsheet.Item onPress={() => assignCurrDriver()}>
                  Assign this driver
                </Actionsheet.Item>
              </>
            ) : (
              <>
                <Actionsheet.Item onPress={() => scanCode()}>
                  Scan Code
                </Actionsheet.Item>
                {/* <Actionsheet.Item onPress={() => markAsScanned()}>
             Mark As Scanned
           </Actionsheet.Item> */}
              </>
            )}
          </Actionsheet.Content>
        </Actionsheet>
      </Center>

      {barcodeCamera && (
        <>
          <BarCodeScanner
            onBarCodeScanned={
              isBarCodeScanned ? undefined : handleBarCodeCameraScanned
            }
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              buttonStyle={{ borderRadius: 0 }}
              onPress={() => setIsBarCodeScanned(false)}
            />
          )}
          <Button
            title={"Go Back"}
            buttonStyle={{
              borderRadius: 0,
              marginTop: 10,
              backgroundColor: "black",
              border: 1,
            }}
            onPress={() => setBarCodeCamera(false)}
          />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.DataReducer,
    common: state.commonReducer,
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 0, backgroundColor: "#fff" },
  head: { height: 60, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  tableBorder: { borderWidth: 1, borderColor: "#c8e1ff", overflow: "hidden" },
});

export default connect(mapStateToProps)(OrderPickup);
