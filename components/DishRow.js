import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity';
import { formatCurrency } from '../Utils';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectBasketItemsWithId, selectBasketItemsId, removeFromBasket } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const formattedCurrency = formatCurrency(price);
    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    const dispatch = useDispatch()
    const addItemToBasket = () => {
        dispatch(addToBasket({id, name, description, price, image}))
    }

    const removeItemsFromBasket = () => {
        if (!items.length > 0) return;
        dispatch(removeFromBasket({ id }))
    }
    return (
        <View className='bg-white border p-4 border-gray-200'>
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
                <View className="flex-row">
                    <View className='flex-1 pr-2'>
                        <Text className='text-lg mb-1'>{name}</Text>
                        <Text className='text-gray-400'>{description}</Text>
                        <Text className='text-gray-400 mt-2'>
                            {formattedCurrency}
                        </Text>
                    </View>
                
                    <View className='h-20 w-20 border border-gray-200'>
                        <Image
                            source={{uri: urlFor(image).url()}}
                            className='h-20 w-20 bg-gray-300 opacity-90'
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View>
                    <View className='flex-row items-center space-x-2 pb-3 pt-3'>
                        <TouchableOpacity onPress={removeItemsFromBasket} disabled={!items.length}>
                            <MinusCircleIcon
                                color={items.length > 0 ? "#183F9C": "gray"}
                                // color={items.length > 0 ? "#183F9C" : "gray"}
                                size={40}
                            />
                        </TouchableOpacity>
                        <Text>{items.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon
                                color="#183F9C"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
        
    )
}

export default DishRow