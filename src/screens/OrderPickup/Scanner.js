import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DataWedgeIntents from 'react-native-datawedge-intents';
import { DeviceEventEmitter } from 'react-native';

const Scanner = () => {
  // State variables
  const [ean8checked, setEan8checked] = useState(true);
  const [ean13checked, setEan13checked] = useState(true);
  const [code39checked, setCode39checked] = useState(true);
  const [code128checked, setCode128checked] = useState(true);
  const [lastApiVisible, setLastApiVisible] = useState(false);
  const [lastApiText, setLastApiText] = useState(
    'Messages from DataWedge will go here'
  );
  const [checkBoxesDisabled, setCheckBoxesDisabled] = useState(true);
  const [scanButtonVisible, setScanButtonVisible] = useState(false);
  const [dwVersionText, setDwVersionText] = useState(
    'Pre 6.3. Please create and configure profile manually. See the ReadMe for more details'
  );
  const [activeProfileText, setActiveProfileText] = useState(
    'Requires DataWedge 6.3+'
  );
  const [enumeratedScannersText, setEnumeratedScannersText] = useState(
    'Requires DataWedge 6.3+'
  );
  const [scans, setScans] = useState([]);

  const [barcodeData, setBarcodeData] = useState('');
  const [barcodeLabelType, setBarcodeLabelType] = useState('');
  const [barcodeSource, setBarcodeSource] = useState('');
  const [profileText, setProfileText] = useState('');
  const [switchText, setSwitchText] = useState('');

  const sendCommandResult = 'false';

  // Send DataWedge commands
  const sendCommand = (extraName, extraValue) => {
    const broadcastExtras = {};
    broadcastExtras[extraName] = extraValue;
    broadcastExtras['SEND_RESULT'] = sendCommandResult;
    DataWedgeIntents.sendBroadcastWithExtras({
      action: 'com.symbol.datawedge.api.ACTION',
      extras: broadcastExtras,
    });
  };

  // Register the broadcast receiver
  const registerBroadcastReceiver = () => {
    DataWedgeIntents.registerBroadcastReceiver({
      filterActions: [
        'com.cyberpixel.kuwaitideliveryapp.ACTION', // This should match the intent action in DataWedge profile
        'com.symbol.datawedge.api.RESULT_ACTION',
      ],
      filterCategories: ['android.intent.category.DEFAULT'],
    });
  };
  

  // Handle incoming intents from DataWedge
  const broadcastReceiver = (intent) => {
    if (intent.hasOwnProperty('RESULT_INFO')) {
      const commandResult =
        intent.RESULT +
        ' (' +
        intent.COMMAND.substring(
          intent.COMMAND.lastIndexOf('.') + 1,
          intent.COMMAND.length
        ) +
        ')';
      commandReceived(commandResult.toLowerCase());
    }

    if (
      intent.hasOwnProperty('com.symbol.datawedge.api.RESULT_GET_VERSION_INFO')
    ) {
      const versionInfo =
        intent['com.symbol.datawedge.api.RESULT_GET_VERSION_INFO'];

      const datawedgeVersion = versionInfo['DATAWEDGE'];

      if (datawedgeVersion >= '11.3') datawedge113();

      setDwVersionText(datawedgeVersion);
    } else if (
      intent.hasOwnProperty(
        'com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS'
      )
    ) {
      const enumeratedScannersObj =
        intent['com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS'];
      enumerateScanners(enumeratedScannersObj);
    } else if (
      intent.hasOwnProperty(
        'com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE'
      )
    ) {
      const activeProfileObj =
        intent['com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE'];
      activeProfile(activeProfileObj);
    } else if (!intent.hasOwnProperty('RESULT_INFO')) {
      barcodeScanned(intent);
    }
  };

  // Determine DataWedge version
  const determineVersion = () => {
    sendCommand('com.symbol.datawedge.api.GET_VERSION_INFO', '');
  };

  // Configure DataWedge for version 11.3
  const datawedge113 = () => {
    sendCommand('com.symbol.datawedge.api.CREATE_PROFILE', 'ScannerDemo');

    setDwVersionText('11.3');
    setCheckBoxesDisabled(false);

    var profileConfig = {
      PROFILE_NAME: 'ScannerDemo',
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'BARCODE',
        RESET_CONFIG: 'true',
        PARAM_LIST: {
          configure_all_scanners: 'true',
          scanner_input_enabled: 'true',
          aim_type: '3',
          EXTRA_DATA: {
            aim_type: '3',
          },
        },
      },
      APP_LIST: [
        {
          PACKAGE_NAME: 'com.cyberpixel.kuwaitideliveryapp',
          ACTIVITY_LIST: ['*'],
        }
      ],
    };
    sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig);

    var profileConfig2 = {
      PROFILE_NAME: 'ScannerDemo',
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'INTENT',
        RESET_CONFIG: 'true',
        PARAM_LIST: {
          intent_output_enabled: 'true',
          intent_action: 'com.cyberpixel.kuwaitideliveryapp.ACTION',
          intent_delivery: '2',
        },
      },
    };
    sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig2);

    setTimeout(() => {
      sendCommand('com.symbol.datawedge.api.GET_ACTIVE_PROFILE', '');
      sendCommand('com.symbol.datawedge.api.ENUMERATE_SCANNERS', '');
    }, 1000);
  };

  // Handle command responses
  const commandReceived = (commandText) => {
    setLastApiText(commandText);
  };

  // Process enumerated scanners
  const enumerateScanners = (enumeratedScanners) => {
    let humanReadableScannerList = '';
    for (let i = 0; i < enumeratedScanners.length; i++) {
      humanReadableScannerList += enumeratedScanners[i].SCANNER_NAME;
      if (i < enumeratedScanners.length - 1)
        humanReadableScannerList += ', ';
    }
    setEnumeratedScannersText(humanReadableScannerList);
  };

  // Handle active profile
  const activeProfile = (theActiveProfile) => {
    setActiveProfileText(theActiveProfile);
  };

  // Handle scanned barcode
  const barcodeScanned = (scanData) => {
    console.error('Scanned Data Intent:', scanData);
  
    const scannedData = scanData['com.symbol.datawedge.data_string'];
    const scannedType = scanData['com.symbol.datawedge.label_type'];
    
    setBarcodeData(scannedData);
    setBarcodeLabelType(scannedType);
  };
  

  // Soft scan trigger
  const _onPressScanButton = () => {
    sendCommand('com.symbol.datawedge.api.SOFT_SCAN_TRIGGER', 'TOGGLE_SCANNING');
  };

  // Set decoders
  const setDecoders = () => {
    var profileConfig = {
      PROFILE_NAME: 'ScannerDemo',
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'BARCODE',
        PARAM_LIST: {
          scanner_selection: 'auto',
          decoder_ean8: '' + ean8checked,
          decoder_ean13: '' + ean13checked,
          decoder_code128: '' + code128checked,
          decoder_code39: '' + code39checked,
        },
      },
    };
    sendCommand('com.symbol.datawedge.api.SET_CONFIG', profileConfig);
  };

  useEffect(() => {
    // Register the listeners
    DeviceEventEmitter.addListener(
      'datawedge_broadcast_intent',
      broadcastReceiver
    );

    registerBroadcastReceiver();
    determineVersion();

    // Cleanup event listeners on component unmount
    return () => {
      DeviceEventEmitter.removeListener(
        'datawedge_broadcast_intent',
        broadcastReceiver
      );
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.rowText}>
            Scanned Data: {barcodeData} - {barcodeLabelType}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>
            DataWedge Version: {dwVersionText}
          </Text>
          <Text style={styles.rowText}>
            Active Profile: {activeProfileText}
          </Text>
          <Text style={styles.rowText}>
            Enumerated Scanners: {enumeratedScannersText}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Soft Scan Trigger:</Text>
          <View style={styles.optionsView}>
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_SOFTSCANTRIGGER,
                  DataWedgeIntents.START_SCANNING
                )
              }>
              <Text style={styles.optionsText}>START SCANNING</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_SOFTSCANTRIGGER,
                  DataWedgeIntents.STOP_SCANNING
                )
              }>
              <Text style={styles.optionsText}>STOP SCANNING</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_SOFTSCANTRIGGER,
                  DataWedgeIntents.TOGGLE_SCANNING
                )
              }>
              <Text style={styles.optionsText}>TOGGLE SCANNING</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _onPressScanButton()}>
              <Text style={styles.optionsText}>TRIGGER SCAN BUTTON</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Scanner Input Plugin:</Text>
          <View style={styles.optionsView}>
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_SCANNERINPUTPLUGIN,
                  DataWedgeIntents.ENABLE_PLUGIN
                )
              }>
              <Text style={styles.optionsText}>ENABLE SCANNING</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_SCANNERINPUTPLUGIN,
                  DataWedgeIntents.DISABLE_PLUGIN
                )
              }>
              <Text style={styles.optionsText}>DISABLE SCANNING</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Enumerate Scanners:</Text>
          <View style={styles.optionsView}>
            <TouchableOpacity
              onPress={() =>
                sendCommand('com.symbol.datawedge.api.ENUMERATE_SCANNERS', '')
              }>
              <Text style={styles.optionsText}>ENUMERATE</Text>
            </TouchableOpacity>
            <Text style={styles.optionsTextNoColor}>
              {enumeratedScannersText}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Set Default Profile:</Text>
          <View style={styles.optionsView}>
            <TextInput
              style={{ width: 250 }}
              placeholder="Profile Name"
              value={profileText}
              onChangeText={setProfileText}
            />
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_SETDEFAULTPROFILE,
                  profileText
                )
              }>
              <Text style={styles.optionsText}>SET DEFAULT PROFILE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Reset Default Profile:</Text>
          <View style={styles.optionsView}>
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_RESETDEFAULTPROFILE
                )
              }>
              <Text style={styles.optionsText}>RESET DEFAULT PROFILE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Switch to Profile:</Text>
          <View style={styles.optionsView}>
            <TextInput
              style={{ width: 250 }}
              placeholder="Profile Name"
              value={switchText}
              onChangeText={setSwitchText}
            />
            <TouchableOpacity
              onPress={() =>
                DataWedgeIntents.sendIntent(
                  DataWedgeIntents.ACTION_SWITCHTOPROFILE,
                  switchText
                )
              }>
              <Text style={styles.optionsText}>SWITCH TO PROFILE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Decoder Settings:</Text>
          <View style={styles.optionsView}>
            <TouchableOpacity
              onPress={() => {
                setEan8checked(!ean8checked);
                setDecoders();
              }}>
              <Text style={styles.optionsText}>
                EAN8: {ean8checked ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEan13checked(!ean13checked);
                setDecoders();
              }}>
              <Text style={styles.optionsText}>
                EAN13: {ean13checked ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCode39checked(!code39checked);
                setDecoders();
              }}>
              <Text style={styles.optionsText}>
                Code39: {code39checked ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCode128checked(!code128checked);
                setDecoders();
              }}>
              <Text style={styles.optionsText}>
                Code128: {code128checked ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowText}>Last API Message:</Text>
          <Text style={styles.optionsTextNoColor}>{lastApiText}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  optionsView: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 5,
  },
  rowText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#555555',
    margin: 2,
  },
  optionsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#0077a0',
    padding: 10,
    margin: 1,
  },
  optionsTextNoColor: {
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    margin: 1,
  },
  row: {
    margin: 5,
    flexDirection: 'column',
  },
});

export default Scanner;
