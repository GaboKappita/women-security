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
  ScrollView,
  TouchableWithoutFeedback,
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
import { onValue, push, ref, set } from "firebase/database";
import { database } from "../../../firebaseConfig";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface LocationCoords {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface AlertaPersona {
  nombre: string;
  apellido: string;
  id_gravedad: string;
  gravedad: string;
  mensaje: string;
  latitud: number;
  longitud: number;
  timestamp: number;
}

interface AlertasUbicacion {
  [id: string]: AlertaPersona;
}

interface UbicacionPersona {
  nombre: string;
  apellido: string;
  latitud: number;
  longitud: number;
  timestamp: number;
}

interface GrupoUbicacion {
  [id: string]: UbicacionPersona;
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
  const [alertasUbicacion, setAlertasUbicacion] =
    useState<AlertasUbicacion | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDetalleAlerta, setModalVisibleDetalleAlerta] =
    useState(false);
  const [detalleAlerta, setDetalleAlerta] = useState<any>();
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

  const handleEnviarAlerta = async (
    latitude: number,
    longitude: number,
    userLocation: any
  ) => {
    const id_gravedad = "OC7sjWYWAdH9mo365Tuq";
    const gravedad = "Advertencia";
    const mensaje =
      "Esto es una alerta de advertencia, para que puedan revisar donde estoy.";

    insertarAlerta({
      id_usuario: id_usuario,
      latitud: latitude,
      longitud: longitude,
      id_gravedad: id_gravedad,
      mensaje: mensaje,
    })
      .unwrap()
      .then((response: any) => {
        enviarAlertaAFirebase(userLocation, id_gravedad, gravedad, mensaje);
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
        handleEnviarAlerta(latitude, longitude, userLocation);
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

        if (bgStatus !== "granted") {
          Alert.alert(
            "Permiso denegado",
            "Se requieren permisos de ubicación para continuar."
          );
          return;
        }

        if (fgStatus !== "granted") {
          Alert.alert(
            "Permiso denegado",
            "Se requieren permisos de ubicación en segundo plano."
          );
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

  // Enviar alerta a Firebase
  const enviarAlertaAFirebase = (
    ubicacion: Location.LocationObject,
    id_gravedad: string,
    gravedad: string,
    mensaje: string
  ) => {
    const ubicacionRef = ref(database, `alertas/${id_usuario}`);
    push(ubicacionRef, {
      nombre: persona.nombre,
      apellido: persona.apellido,
      latitud: ubicacion.coords.latitude,
      longitud: ubicacion.coords.longitude,
      id_gravedad: id_gravedad,
      gravedad: gravedad,
      mensaje: mensaje,
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

  // Funcion para escuchar las alertas
  useEffect(() => {
    const locationsRef = ref(database, "alertas");

    const unsubscribe = onValue(locationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ahora = Date.now();
        const miembrosUsuario =
          dataGrupoSeleccionado?.miembros?.length > 0
            ? [
                ...dataGrupoSeleccionado.miembros.map(
                  (miembro: any) => miembro.id_usuario
                ),
                id_usuario,
              ]
            : [id_usuario];

        // Recorremos las alertas por usuario
        const filtradas = Object.entries(data).reduce(
          (acumulador, [id_usuario, alertas]) => {
            if (miembrosUsuario.includes(id_usuario)) {
              // Filtrar las alertas recientes (últimas 24 horas) para cada usuario
              const alertasRecientes = Object.entries(alertas as any)
                .filter(
                  ([id_alerta, alerta]: [string, any]) =>
                    ahora - alerta.timestamp <= 24 * 60 * 60 * 1000
                )
                .map(([id_alerta, alerta]) => ({
                  id_alerta,
                  ...(alerta as any),
                }));

              return [...acumulador, ...alertasRecientes];
            }
            return acumulador;
          },
          [] as any[]
        );

        setAlertasUbicacion(filtradas as any);
      }
    });

    return () => unsubscribe();
  }, [dataGrupoSeleccionado]);

  const focusOnMarker = (latitude: any, longitude: any) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  const handleLocateUser = async () => {
    const userLocation = await Location.getCurrentPositionAsync({});
    mapRef.current?.animateToRegion(
      {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation
            showsMyLocationButton
            customMapStyle={[]}
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
            {alertasUbicacion &&
              Object.entries(alertasUbicacion).map(([id, alerta]) => (
                <Marker
                  key={id}
                  coordinate={{
                    latitude: alerta.latitud,
                    longitude: alerta.longitud,
                  }}
                  onPress={async () => {
                    try {
                      const fecha = new Date(alerta.timestamp);
                      const fechaFormateada = `${fecha.toLocaleDateString(
                        "es-ES"
                      )} ${fecha.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`;

                      const address = await Location.reverseGeocodeAsync({
                        latitude: alerta.latitud,
                        longitude: alerta.longitud,
                      });

                      if (address.length > 0) {
                        const { street, streetNumber, city } = address[0];
                        setDetalleAlerta({
                          ...alerta,
                          calle: street,
                          numero: streetNumber,
                          ciudad: city,
                          fecha: fechaFormateada,
                        });
                        setModalVisibleDetalleAlerta(true);
                      } else
                        setDetalleAlerta({
                          ...alerta,
                          fecha: fechaFormateada,
                        });
                      setModalVisibleDetalleAlerta(true);
                    } catch (error) {
                      console.error("Error al obtener dirección:", error);
                    }
                  }}
                />
              ))}
          </MapView>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.fab2}
            onPress={handleLocateUser}
          >
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={28}
              color={"white"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.fab}
            onPress={handlePress}
          >
            <MaterialCommunityIcons name="plus" size={28} color={"white"} />
          </TouchableOpacity>

          {grupoUbicacion && (
            <View className="absolute bottom-4 left-4 bg-[#ff80b5] h-fit flex-col justify-center items-center max-h-64 w-16 p-2 rounded-lg">
              <ScrollView className="h-full w-full">
                {Object.entries(grupoUbicacion).map(([id, usuario]) => (
                  <TouchableOpacity
                    key={id}
                    className="w-full aspect-square bg-white mx-auto justify-center items-center rounded-full"
                    onPress={() => {
                      focusOnMarker(usuario.latitud, usuario.longitud);
                    }}
                  >
                    <Image
                      source={require("../../../assets/profile-user.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
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

      {/* Modal detalle alerta: */}
      {detalleAlerta && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleDetalleAlerta}
        >
          <TouchableWithoutFeedback
            onPress={() => setModalVisibleDetalleAlerta(false)}
          >
            <View className="flex-1 bg-black/50 justify-end items-center">
              <View className="w-full p-5 bg-white rounded-t-xl shadow-lg">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-lg font-bold flex-1 mb-2">
                    Detalles de la Alerta
                  </Text>
                  <Text className="text-base text-end text-gray-500">
                    {detalleAlerta.fecha}
                  </Text>
                </View>
                <View className="mb-6">
                  <Text className="text-base">
                    Nombre: {detalleAlerta.nombre} {detalleAlerta.apellido}
                  </Text>
                  <Text className="text-base">
                    Mensaje: {detalleAlerta.mensaje}
                  </Text>
                  {detalleAlerta.calle &&
                    detalleAlerta.numero &&
                    detalleAlerta.ciudad && (
                      <Text className="text-base">
                        Ubicación: {detalleAlerta.calle} {detalleAlerta.numero},{" "}
                        {detalleAlerta.ciudad}.
                      </Text>
                    )}
                </View>

                <TouchableOpacity
                  onPress={() => setModalVisibleDetalleAlerta(false)}
                  className="bg-gray-300 py-4 rounded-md mb-4"
                >
                  <Text className="text-center text-gray-700">Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Modal alerta/cancelar */}
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
  fab2: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#ff80b5",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
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
