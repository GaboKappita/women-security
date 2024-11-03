import CardBlack from '../../../components/aplicacion/CardBlack';
import ImagenBackground from '../../../components/aplicacion/ImagenBackground';
import LogoVolver from '../../../components/aplicacion/LogoVolver';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function ReportesScreen() {
  return (
    <ImagenBackground>
      <ScrollView className='flex p-4 w-full'>
        <StatusBar style="light" backgroundColor="black" />
        <CardBlack>
          <LogoVolver
            titulo="WOMEN'S SECURITY" estilo_titulo='text-white text-2xl font-bold mb-4'
            onPressBack={() => {
              router.push("/(drawer)/(tabs)/home")
            }}
          />
          <View className='w-10/12 h-[1px] bg-white mx-auto my-8'></View>
          <View className='relative w-full'>
            <Text className='text-white' style={{ fontSize: 18, marginBottom: 10 }}>Gráfico de Barras</Text>
            <BarChart
              data={{
                labels: ['Enero', 'Febrero', 'Marzo'],
                datasets: [
                  {
                    data: [20, 45, 28],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 30} // Ancho del gráfico
              height={220} // Altura del gráfico
              yAxisLabel="$" // Etiqueta del eje Y
              yAxisSuffix="" // Sufijo en el eje Y, necesario para evitar errores
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // Cantidad de decimales en los valores
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              verticalLabelRotation={30} // Rotación de etiquetas en el eje X
            />
          </View>
        </CardBlack>
      </ScrollView>
    </ImagenBackground>
  );
}
