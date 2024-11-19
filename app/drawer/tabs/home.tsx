import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useLocation } from "../../../contexts/LocationContext";
import { Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGenerarAlertaMutation } from "../../../services/api";
import { onValue, ref } from "firebase/database";
import { database } from "../../../firebaseConfig";

// interface UserLocation {
//   latitud: number;
//   longitud: number;
//   timestamp?: number;
// }

// type UserLocations = {
//   [userId: string]: UserLocation;
// };

export default function HomeScreen() {
  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const { location, setLocation, locationEnabled, setLocationEnabled } =
    useLocation();
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const id_usuario = persona.id_persona;

  const [
    insertarAlerta,
    { isLoading: isLoadingAlerta, error: errorAlerta, data: dataAlerta },
  ] = useGenerarAlertaMutation();

  const handleEnviarAlerta = async (latitude: number, longitude: number) => {
    const data = {
      id_usuario: id_usuario,
      latitud: latitude,
      longitud: longitude,
      id_gravedad: "jCF8iApdZ0s5wdgkjQ2p",
      mensaje: "Estoy en peligro, por favor ayúdenme.",
    };

    insertarAlerta(data)
      .unwrap()
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.error("Error al enviar el Alerta:", error);
      });
  };

  const handlePress = async () => {
    // Mostrar el modal
    setModalVisible(true);

    // Iniciar temporizador de 5 segundos
    timerRef.current = setTimeout(async () => {
      console.log("Alerta generada por acoso/robo");
      // Ocultar el modal después de 5 segundos
      setModalVisible(false);

      // Obtener la ubicación actual
      try {
        const userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;

        console.log(latitude, longitude);

        // Llamar a handleEnviarAlerta con la ubicación actual
        handleEnviarAlerta(latitude, longitude);
      } catch (error) {
        console.error("Error al obtener la ubicación actual:", error);
      }
    }, 5000);
  };

  const handleCancel = () => {
    // Limpiar el temporizador si se cancela
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    // Ocultar el modal
    setModalVisible(false);
  };

  useEffect(() => {
    // Solicitar permisos de ubicación y obtener la ubicación del usuario actual
    const getMyLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getMyLocation();

    // Escuchar ubicaciones de otros usuarios específicos en Firebase
    // const locationsRef = ref(database, 'ubicaciones');
    // const unsubscribe = onValue(locationsRef, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data) {
    //     const filteredLocations: UserLocations = Object.keys(data)
    //       .filter((userId) => specificUsers.includes(userId))
    //       .reduce((acc, userId) => {
    //         acc[userId] = data[userId];
    //         return acc;
    //       }, {} as UserLocations);

    //     setUserLocations(filteredLocations);
    //   }
    // });

    // return () => unsubscribe();
  }, []);

  const requestLocationPermissions = async () => {
    let foregroundStatus: Location.PermissionStatus | null = null;
    let backgroundStatus: Location.PermissionStatus | null = null;

    try {
      // Solicitar permisos de ubicación en primer plano
      const { status: fgStatus } =
        await Location.requestForegroundPermissionsAsync();
      foregroundStatus = fgStatus;

      // Solicitar permisos de ubicación en segundo plano (solo Android)
      const { status: bgStatus } =
        await Location.requestBackgroundPermissionsAsync();
      backgroundStatus = bgStatus;

      // Verificar si ambos permisos han sido otorgados
      if (foregroundStatus === "granted" && backgroundStatus === "granted") {
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
      Alert.alert("Error", "No se pudo obtener la ubicación.");
    }
  };

  const showPermissionAlert = () => {
    if (!hasShownAlert) {
      setHasShownAlert(true);
      Alert.alert(
        "Permisos de ubicación requeridos",
        "La aplicación necesita acceso a tu ubicación todo el tiempo. Ve a la configuración de tu dispositivo para habilitar los permisos.",
        [
          {
            text: "Ir a configuración",
            onPress: async () => {
              const canOpen = await Linking.canOpenURL("app-settings:");
              if (canOpen) {
                Linking.openSettings();
              } else {
                Alert.alert("Error", "No se pudo abrir la configuración.");
              }
            },
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
  }, [locationEnabled, location]);

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
          <TouchableOpacity style={styles.fab} onPress={handlePress}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            La aplicación necesita permisos de ubicación para funcionar.
          </Text>
          <Button
            title="Ir a configuración"
            onPress={() => Linking.openSettings()}
          />
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tienes 5 segundos para cancelar esta alerta para no generar una
              alerta por acoso/robo.
            </Text>
            <Button title="Cancelar" onPress={handleCancel} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#ff80b5",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    color: "#fff",
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
