import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({id, title, description}) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured" && _id == $id] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->,
                type-> {
                    title
                }
            },
        }[0]
        `, { id }).then(data => {
            setRestaurants(data?.restaurants);
        });
    }, []);

    // console.log(restaurants[0].dishes)
  return (
    <View className="h-66">
        <View className="mt-4 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{title}</Text>
            <ArrowRightIcon color="#183F9C" strokeWidth={2.5}/>
        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>
        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 15,

            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
        >
            {/* RestaurantCards */}
            {restaurants?.map(restaurant => (
                <RestaurantCard
                    key={restaurant._id} 
                    id={restaurant._id}
                    imgUrl={restaurant.image}
                    title={restaurant.name}
                    rating={restaurant.rating}
                    genre={restaurant.type?.title}
                    address={restaurant.address}
                    short_description={restaurant.short_description}
                    dishes={restaurant.dishes}
                    long={restaurant.long}
                    lat={restaurant.lat}
            />
            ))}
            

        </ScrollView>
    </View>
  )
}

export default FeaturedRow