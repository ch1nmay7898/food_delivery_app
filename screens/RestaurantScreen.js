import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { MapPinIcon, StarIcon } from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon, ArrowLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    }))
  }, [dispatch])

  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])

  return (
    <View>
      <BasketIcon />
      <ScrollView contentContainerStyle={{
          paddingBottom: 150,
        }}>
        <View className='relative'>
          <Image 
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className='w-full h-56 bg-gray-300 p-4'
          />
          <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
            <ArrowLeftIcon size={20} color="#183F9C" strokeWidth={2.5}/>
          </TouchableOpacity>
        </View>
        <View className='bg-white'>
          <View className='px-4 pt-4'>          
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon color="#183F9C" opacity={0.5} size={22}/>
                <Text className='text-xs text-gray-500'>
                  <Text style={{color: '#183F9C'}}>
                    {rating}
                  </Text>
                  . {genre}
                </Text> 
              </View>
              <View className='flex-row items-center space-x-1'>
                <MapPinIcon color="gray" opacity={0.4} size={22}/>
                <Text className='text-xs text-gray-500'>
                  Nearby . {address}
                </Text> 
              </View>
            </View>
            <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
          </View>
          <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-200'>
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={22} strokeWidth={2}/>
            <Text className='pl-2 flex-1 text-md font-bold'>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#183F9C" size={14} strokeWidth={4}/>
          </TouchableOpacity>
        </View>
        <View>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
          {/* Dishes */}
          {dishes.map(dish => (
            <DishRow 
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </View>
    
    
  )
}

export default RestaurantScreen