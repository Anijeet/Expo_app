import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCart } from '@/context/CartContext'; // Import the cart context

type CardProps = {
  title: string;
  rating: string;
  image: any;
  bulletPoints: string[];
  isBestSelling?: boolean;
  price?: number; // Added price prop
};

const Card = ({ title, rating, image, bulletPoints, isBestSelling = false, price = 329 }: CardProps) => {
  const { addToCart } = useCart(); // Use the cart context

  const handleAddToCart = () => {
    // Generate a unique ID for the cart item
    const id = Date.now().toString();
    
    // Add the item to the cart
    addToCart({
      id,
      title,
      price,
      image
    });
    
    // Optional: Show a confirmation
    Alert.alert("Added to Cart", `${title} has been added to your cart.`);
  };

  return (
    <View
      style={{
        padding: 0,
        marginBottom: 16,
        width: '98%',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          height: 520,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 4,
        }}
        className="relative bg-white">
        {isBestSelling && (
          <View
            style={{
              backgroundColor: '#232f3e',
              borderBottomLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            className="absolute right-0 top-0 z-10 rounded-br-2xl px-4 py-1">
            <Text style={{ color: '#A3831A' }} className="text-sm font-bold text-white">
              Best Selling
            </Text>
          </View>
        )}

        <View className="mb-4 mt-4 gap-4 flex-row items-center justify-between">
          <View className="flex flex-col gap-1">
            <Text style={{width:150, height:50}} className="text-xl font-bold text-black">{title}</Text>
            <View
              style={{
                backgroundColor: '#E3FF00',
                width: 80,
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 10,
                marginBottom:10
              }}
              className=" flex flex-row items-center justify-center gap-1">
              <MaterialCommunityIcons name="clock-outline" size={16} color="black" />{' '}
              <Text className=" text-sm ">30+Min</Text>
            </View>
          </View>
          <View className="flex-col items-center">
            <View className="flex-row">
              <AntDesign name="star" size={16} color="#FFBF00" />
              <AntDesign name="star" size={16} color="#FFBF00" />
              <AntDesign name="star" size={16} color="#FFBF00" />
              <AntDesign name="star" size={16} color="#FFBF00" />
              <AntDesign name="star" size={16} color="#FFBF00" />
            </View>
            <Text style={{ color: '#4b5563' }} className="ml-1 text-sm font-semibold">
              {rating}
            </Text>
          </View>
        </View>

        <View style={{marginBottom:10}} className="my-6 items-center justify-center">
          <Image style={{height:150, width:200}} source={image}  resizeMode="contain" />
        </View>

        <View className="mb-4">
          {bulletPoints.map((point, index) => (
            <View key={index} className="mb-2 flex-row items-center">
              <View style={{ backgroundColor: 'black',marginRight:5 }} className="mr-2 h-2 w-2 rounded-full" />
              <Text className="text-gray-600">{point}</Text>
            </View>
          ))}
          <View className="flex flex-row items-center gap-1">
            <Text style={{ color: 'blue' }} className="text-sm">
              More Details{' '}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color="blue" />
          </View>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-lg font-semibold text-gray-600">₹{price} /-</Text>
          </View>
          <View style={{marginBottom:10}} className="flex flex-row items-center gap-1">
            <View>
              <Text style={{ color: '#9ca3af' }} className="text-sm">
                M.R.P. ₹599/-
              </Text>
              <View
                style={{
                  backgroundColor: '#9ca3af',
                  width: 30,
                  height: 2,
                  borderRadius: 10,
                  position: 'absolute',
                  top: 10,
                  left: 40,
                }}></View>
            </View>
            <View>
              <Text style={{ color: 'orange' }} className="text-sm">
                Save Rs 270 /-
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          className="items-center rounded-xl bg-[#FFBF00] p-2"
          onPress={handleAddToCart} // Add the onPress handler
        >
          <Text className="text-lg font-bold text-black">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;