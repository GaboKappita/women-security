import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useLocation } from "../../../contexts/LocationContext";
import { Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useGenerarAlertaMutation,
  useListarUbicacionSeleccionQuery,
} from "../../../services/api";
import { onValue, ref, set } from "firebase/database";
import { database } from "../../../firebaseConfig";

interface LocationCoords {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Usuario {
  nombre: string;
  apellido: string;
  latitud: number;
  longitud: number;
  timestamp: number;
}

interface GrupoUbicacion {
  [id: string]: Usuario;
}

export default function HomeScreen() {
  // const { location, setLocation, locationEnabled, setLocationEnabled } =
  //   useLocation();

  const { perfil, persona } = useSelector((state: RootState) => state.auth);
  const [locationFirebase, setLocationFirebase] =
    useState<Location.LocationObject | null>(null);
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [grupoUbicacion, setGrupoUbicacion] = useState<GrupoUbicacion | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const id_usuario = persona.id_persona;

  const {
    data: dataGrupoSeleccionado = { miembros: [] },
    error: errorGrupoSeleccionado,
    isLoading: isLoadingGrupoSeleccionado,
    refetch: refetchGrupoSeleccionado,
  } = useListarUbicacionSeleccionQuery({ id_persona: id_usuario });

  const [
    insertarAlerta,
    { isLoading: isLoadingAlerta, error: errorAlerta, data: dataAlerta },
  ] = useGenerarAlertaMutation();

  const handleEnviarAlerta = async (latitude: number, longitude: number) => {
    insertarAlerta({
      id_usuario: id_usuario,
      latitud: latitude,
      longitud: longitude,
      id_gravedad: "jCF8iApdZ0s5wdgkjQ2p",
      mensaje: "Estoy en peligro, por favor ayúdenme.",
    })
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
    const iniciarUbicacion = async () => {
      try {
        // Solicitar permisos de ubicación
        const { status: fgStatus } =
          await Location.requestForegroundPermissionsAsync();
        const { status: bgStatus } =
          await Location.requestBackgroundPermissionsAsync();

        if (fgStatus !== "granted" || bgStatus !== "granted") {
          Alert.alert(
            "Permiso denegado",
            "Se requieren permisos de ubicación para continuar."
          );
          return;
        }

        // Obtener ubicación actual y mostrar en el mapa
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

        // Configurar envío periódico de ubicación a Firebase
        const intervalId = setInterval(async () => {
          const updatedLocation = await Location.getCurrentPositionAsync({});
          setLocationFirebase(updatedLocation);
          enviarUbicacionAFirebase(updatedLocation);
        }, 15000);

        // Limpieza: detener intervalo al desmontar
        return () => clearInterval(intervalId);
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener la ubicación.");
      }
    };

    iniciarUbicacion();
  }, []);

  // Enviar ubicación a Firebase
  const enviarUbicacionAFirebase = (ubicacion: Location.LocationObject) => {
    const ubicacionRef = ref(database, `ubicaciones/${id_usuario}`);
    set(ubicacionRef, {
      nombre: persona.nombre,
      apellido: persona.apellido,
      latitud: ubicacion.coords.latitude,
      longitud: ubicacion.coords.longitude,
      timestamp: Date.now(),
    });
  };

  // Funcion para escuchar las ubicaciones
  useEffect(() => {
    const locationsRef = ref(database, "ubicaciones");

    const unsubscribe = onValue(locationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (dataGrupoSeleccionado.miembros.length === 0) {
          setGrupoUbicacion(null);
        } else {
          const miembros = dataGrupoSeleccionado?.miembros.map(
            (miembro: any) => miembro.id_usuario
          );
          const filtradas = Object.fromEntries(
            Object.entries(data).filter(([id, _]) => miembros.includes(id))
          ) as GrupoUbicacion;
          setGrupoUbicacion(filtradas);
        }
      }
    });

    return () => unsubscribe();
  }, [dataGrupoSeleccionado]);

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton
            initialRegion={location}
          >
            {grupoUbicacion &&
              Object.entries(grupoUbicacion).map(([id, usuario]) => (
                <Marker
                  key={id}
                  coordinate={{
                    latitude: usuario.latitud,
                    longitude: usuario.longitud,
                  }}
                  title={`${usuario.nombre} ${usuario.apellido}`}
                  description="Esta es su ubicación actual"
                  anchor={{ x: 0.25, y: 0.25 }}
                  calloutAnchor={{ x: 0.3, y: 0 }}
                >
                  <Image
                    source={require("../../../assets/profile-user.png")}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </Marker>
              ))}
          </MapView>
          <TouchableOpacity style={styles.fab} onPress={handlePress}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
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
