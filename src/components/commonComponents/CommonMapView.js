import React from 'react';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const CommonMapView = (props) => {
    // const { region, initialRegion, showsUserLocation, showsMyLocationButton, followsUserLocation, showsCompass, scrollEnabled, zoomEnabled, pitchEnabled, rotateEnabled, style, children, onPress } = props;

    return (
    <>
        {/* <MapView
            region={region}
            initialRegion={initialRegion}
            showsUserLocation={showsUserLocation}
            showsMyLocationButton={showsMyLocationButton}
            followsUserLocation={followsUserLocation}
            showsCompass={showsCompass}
            scrollEnabled={scrollEnabled}
            zoomEnabled={zoomEnabled}
            pitchEnabled={pitchEnabled}
            rotateEnabled={rotateEnabled}
            style={style}
            provider={PROVIDER_GOOGLE}
            onPress={onPress}
        >
            {children}
        </MapView> */}
        </>
    );
};
export default CommonMapView;
