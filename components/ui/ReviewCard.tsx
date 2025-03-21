import { View, Text, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

type ReviewCardProps = {
  customerImage: any;
  customerName: string;
  rating: number;
  review: string;
  type?: string;
};

const ReviewCard = ({ customerImage, customerName, rating, review,type }: ReviewCardProps) => {
  return (
    <View style={{width: 300}} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm m-2">
      <View className="flex-row items-center mb-3 mr-5">
        <Image style={{width: 50, height: 50, marginRight: 10}}
          source={customerImage}
          className=" rounded-full"
          resizeMode="cover"
        />

            
          <View className="flex-row absolute top-0 right-0 mt-1">
            {Array(5).fill(0).map((_, index) => (
              <AntDesign 
                key={index}
                name={index < rating ? "star" : "staro"}
                size={16}
                color={index < rating ? "#FFBF00" : "#D1D5DB"}
              />
            ))}
          </View>
        
        <View className="ml-3 flex-1">
          
          <Text className="font-bold text-base">{customerName}</Text>
          <Text style={{color: '#F2AB8C'}} className=' text-sm'>Verified user</Text>
      
        </View>
      </View>

      
      <Text style={{marginLeft: 60}} className="text-gray-600 text-md font-bold leading-5 ">
        {review}
      </Text>
      <Text style={{marginLeft: 60}} className="text-gray-600 text-sm font-base mt-3 leading-5 ">
        Service: {type}
      </Text>

    </View>
  )
}

export default ReviewCard