import { View, Text, Image } from 'react-native'
import React from 'react'

type ServiceCardProps = {
  image: any;
  title: string;
  description: string;
}

const ServiceCard = ({ image, title, description }: ServiceCardProps) => {
  return (
    <View className="p-2 max-w-[350px]">
      <View style={{height: 110, width:160}} className="border border-gray-200 rounded-xl overflow-hidden">
        <Image style={{height: 120, width:150}} className='rounded-xl' source={image} resizeMode="contain" />
      </View>
      <View className="mt-3 flex flex-col gap-2">
        <Text className="text-lg font-bold">{title}</Text>
        <Text style={{color:'gray'}} className=" mt-1">{description}</Text>
      </View>
    </View>
  )
}

export default ServiceCard