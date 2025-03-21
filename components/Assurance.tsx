import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Assurance = () => {
    const bulletPoints = [
        'Trusted Professionals',
        'Quality Cleaning Service',
        'Motomate Trained Professionals',
        'Best-in-class customer service',
        'Customer Protection upto 5000/-',
    ];
  return (
    <View>
      <View className="z-0 my-2 bg-[#EFF9EF] border border-green-400 flex flex-col p-4 px-10">
        <View className="flex flex-row items-center gap-2">
          <Ionicons name="shield-checkmark" size={30} color="#DFEEBE" />
          <Text className="font-bold text-black text-xl">MOTOMATE Assurance</Text>
        </View>
        <View className='m-2 gap-2'>
        {bulletPoints.map((point, index) => (
            <View key={index} className=" flex-row items-center">
              <View style={{ backgroundColor: 'green',marginRight:5 }} className="mr-2 h-2 w-2 rounded-full" />
              <Text className="text-gray-600">{point}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='flex flex-col p-10 '>
        <View>
            <Text className='text-4xl font-bold'>100%</Text>
            <Text className='text-xl font-bold text-[#FEC92D] '>Safe & Secure service by MOTOMATE</Text>
        </View>
        <TouchableOpacity className='bg-[#FEC92D] p-4 mt-3 rounded-lg'>
            <Text className='text-center text-black font-bold'>Get service now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Assurance;
