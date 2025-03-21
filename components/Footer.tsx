import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Footer = () => {
  return (
    <View>
      <View className="z-0 flex flex-col py-2 ">
        <View className="flex flex-row bg-gray-100 px-4 p-2">
          <View style={{ width: 220 }}>
            <Text className="text-2xl font-extrabold">Trusted Professional At Your Doorstep</Text>
            <TouchableOpacity>
              <Text
                style={{ width: 150 }}
                className="mt-2 rounded-lg bg-[#FFBD2F] px-4 py-2 text-center font-bold text-black">
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={require('@/assets/images/footer.png')} style={{ width: 130, height: 100 }} />
        </View>

        <View className="flex flex-row px-4 gap-2 mt-4 bg-[#E8F2F0] p-2 justify-between items-center">
          <MaterialIcons name="mobile-screen-share" size={24} color="black" />
          <Text className='font-bold text-xl'>Refer & get a free service</Text>
          <TouchableOpacity className="bg-[#FFBF00] p-2 rounded-lg px-6">
            <Text className='font-bold text-base'>Share</Text>
          </TouchableOpacity>
        </View>

        <View className='flex flex-row gap-2 mt-4 bg-[#91E0D6] p-4 justify-between items-center'>
            <View>
                <Text className='font-bold text-xl'>Help setup your account?</Text>
            </View>
            <TouchableOpacity className='bg-white p-2 rounded-md border px-6'>
                <Text className='font-bold text-base'>Yes</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Footer;
