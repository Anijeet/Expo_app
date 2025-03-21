import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type ServiceIconProps = {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  tag?: string;
  IsIonicons?:boolean;
};
const ServiceIcon = ({ title, icon, tag,IsIonicons }: ServiceIconProps) => {
  const [firstWord, ...restWords] = title.split(/[\s-]+/);

  return (
    <View className='relative p-2 w-auto'>
      {tag && (
        <View 
          style={{backgroundColor:"#E3FF00"}} 
          className='absolute -top-2 right-0 px-1 rounded-full py-1 z-10 min-w-max'
        >
          <Text className='text-sm font-base text-center whitespace-nowrap'>{tag}</Text>
        </View>
      )}
      <View className='items-center w-auto'>
        <View className='p-2 bg-gray-100 rounded-full w-auto'>
          {IsIonicons ? <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color="black" /> : <MaterialCommunityIcons name={icon as keyof typeof MaterialCommunityIcons.glyphMap} size={24} color="black" />}
        </View>
        <View className='mt-1'>
          <Text className='text-center font-medium text-xs'>{firstWord}</Text>
          {restWords.length > 0 && (
            <Text className='text-center text-gray-600 text-xs'>{restWords.join(' ')}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ServiceIcon;