import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  UserCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
  navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`).then(data => {
      setFeaturedCategories(data)
    }) 
  }, []);


  return (
    <View className="flex-1">
    <SafeAreaView className="bg-white pt-5">
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              // uri: 'https://links.papareact.com/wru',
              uri: 'https://cdn1.iconfinder.com/data/icons/food-delivery-69/512/Food_Delivery_20-1024.png',
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#183F9C" strokeWidth={3}/>
            </Text>
          </View>
          <UserCircleIcon size={35} color="#183F9C" strokeWidth={2}/>
        </View>
        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon size={20} color="gray" strokeWidth={2}/>
            <TextInput 
              placeholder='Foood!'
              keyboardType='default'
            />
          </View>
          <AdjustmentsVerticalIcon color="#183F9C" strokeWidth={2}/>
        </View>
      </SafeAreaView>
        {/* Body */}

        <ScrollView className="bg-gray-100" contentContainerStyle={{
          paddingBottom: 100,
        }}>
          {/* <View className="pb-10"> */}
            {/* Categories */}
            <Categories />
            {/* Featured Rows */}
            {featuredCategories?.map((category) => (
              <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
              />
            ))}
          {/* </View> */}
            
        </ScrollView>
        
        </View>
    
  )
} 

export default HomeScreen