import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket, selectBasketItems } from '../features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { formatCurrency } from '../Utils';

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch()

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results
        }, {})
        setGroupedItemsInBasket(groupedItems)
    }, [items])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className='flex-1 bg-gray-100'>
                <View className='p-5 border-b border-[#183F9C] bg-white'>
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">
                            {restaurant.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color="#183F9C" height={50} width={50}/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image 
                        source={{
                            uri: "https://cdn1.iconfinder.com/data/icons/food-delivery-69/512/Food_Delivery_20-1024.png"
                        }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className='flex-1'>Deliver in 50-75 min</Text>
                    <TouchableOpacity>
                        <Text className="text-[#183F9C]">Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                        <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                            <Text className="text-[#183F9C]">{items.length} x</Text>
                            <Image
                                source={{
                                    uri: urlFor(items[0]?.image).url()
                                }}
                                className="h-12 w-12 rounded-full"
                            />
                            <Text className="flex-1">{items[0]?.name}</Text>
                            <Text className="text-gray-600">
                                {formatCurrency(items[0]?.price)}
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    className="text-[#183F9C] text-xs"
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                >
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen