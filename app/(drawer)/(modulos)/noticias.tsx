import ImagenBackground from '../../../components/aplicacion/ImagenBackground'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, Button, Image, Text, View } from 'react-native'

export default function NoticiasScreen() {
  return (
    <ImagenBackground>
      <ScrollView className='flex w-full'>
        <StatusBar style="light" backgroundColor="black" />
        <View className='flex gap-4 p-4'>
          <View className='w-fit rounded p-4 bg-gray-400'>
            <Image source={{ uri: "https://www.dt.gob.cl/portal/1627/articles-119486_imagen_portada.thumb_i860x450.jpg" }}
              className='w-full h-40 mb-4 rounded'></Image>
            <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae doloribus necessitatibus est nisi rem odio dolore vel, accusantium, commodi dolorum officia debitis neque mollitia natus. Laudantium assumenda numquam sunt architecto.</Text>
            <Button title='Ver más...'></Button>
          </View>
          <View className='w-fit rounded p-4 bg-gray-400'>
            <Image source={{ uri: "https://www.dt.gob.cl/portal/1627/articles-119486_imagen_portada.thumb_i860x450.jpg" }}
              className='w-full h-40 mb-4 rounded'></Image>
            <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae doloribus necessitatibus est nisi rem odio dolore vel, accusantium, commodi dolorum officia debitis neque mollitia natus. Laudantium assumenda numquam sunt architecto.</Text>
            <Button title='Ver más...'></Button>
          </View>
          <View className='w-fit rounded p-4 bg-gray-400'>
            <Image source={{ uri: "https://www.dt.gob.cl/portal/1627/articles-119486_imagen_portada.thumb_i860x450.jpg" }}
              className='w-full h-40 mb-4 rounded'></Image>
            <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae doloribus necessitatibus est nisi rem odio dolore vel, accusantium, commodi dolorum officia debitis neque mollitia natus. Laudantium assumenda numquam sunt architecto.</Text>
            <Button title='Ver más...'></Button>
          </View>
          <View className='w-fit rounded p-4 bg-gray-400'>
            <Image source={{ uri: "https://www.dt.gob.cl/portal/1627/articles-119486_imagen_portada.thumb_i860x450.jpg" }}
              className='w-full h-40 mb-4 rounded'></Image>
            <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae doloribus necessitatibus est nisi rem odio dolore vel, accusantium, commodi dolorum officia debitis neque mollitia natus. Laudantium assumenda numquam sunt architecto.</Text>
            <Button title='Ver más...'></Button>
          </View>
        </View>
      </ScrollView>
    </ImagenBackground>
  )
}
