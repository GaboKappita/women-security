// HomeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocation } from '../../../contexts/LocationContext';

export default function HomeScreen() {
    const { location, setLocation, locationEnabled, setLocationEnabled } = useLocation();
    const [hasShownAlert, setHasShownAlert] = useState(false); 
    const mapRef = useRef<MapView>(null);

    const requestLocationPermissions = async () => {
        let foregroundStatus: Location.PermissionStatus | null = null;
        let backgroundStatus: Location.PermissionStatus | null = null;

        try {
            const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
            foregroundStatus = fgStatus;

            if (Platform.OS === 'android') {
                const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
                backgroundStatus = bgStatus;
            }

            if (foregroundStatus === 'granted' && (Platform.OS === 'ios' || backgroundStatus === 'granted')) {
                setLocationEnabled(true);
                const userLocation = await Location.getCurrentPositionAsync({});
                const newLocation = {
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                };
                setLocation(newLocation);

                if (mapRef.current) {
                    mapRef.current.animateToRegion(newLocation, 1000);
                }
            } else {
                setLocationEnabled(false); 
                showPermissionAlert(); 
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo obtener la ubicación.');
        }
    };

    const showPermissionAlert = () => {
        if (!hasShownAlert) {
            setHasShownAlert(true); 
            Alert.alert(
                'Permisos de ubicación requeridos',
                'La aplicación necesita acceso a tu ubicación todo el tiempo. Ve a la configuración de tu dispositivo para habilitar los permisos.',
                [
                    {
                        text: 'Ir a configuración',
                        onPress: () => Linking.openSettings(), 
                    },
                ],
                { cancelable: false } 
            );
        }
    };

    useEffect(() => {
        if (!locationEnabled || !location) {
            requestLocationPermissions();
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {locationEnabled && location ? (
                <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation
                        showsMyLocationButton
                        initialRegion={location}
                    />
                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => console.log('FAB pressed!')}
                    >
                        <Text style={styles.fabText}>+</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>
                        La aplicación necesita permisos de ubicación para funcionar.
                    </Text>
                    <Button title="Ir a configuración" onPress={() => Linking.openSettings()} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    permissionText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#b17940',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabText: {
        color: '#fff',
        fontSize: 24,
    },
});
