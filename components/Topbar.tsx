import { View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "@/config/firebase";
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext'; // Import the cart context

const Topbar = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const { getCartCount } = useCart(); // Use the cart context
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data() as any);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    
    fetchUserData();
  }, [user]);

  return (
    <View className="flex flex-col fixed top-4 left-0 right-0 z-10">
      <View className="flex flex-row items-center justify-between bg-[#FEC110] p-4">
        <View>
          <Text className="text-2xl font-bold">Motomate</Text>
        </View>
        <View className="flex flex-row items-center justify-center">
          {/* @ts-ignore */}
          {user ? <Text className="mr-1 text-lg font-bold">Welcome, {userData?.name}</Text> : <Text className='mr-1 text-lg font-bold'>Welcome, Guest</Text>}
          <TouchableOpacity onPress={() => router.push("/cart/cart")} className="relative">
            <AntDesign name="shoppingcart" size={24} color="black" />
            {getCartCount() > 0 && (
              <View style={{
                position: 'absolute',
                right: -8,
                top: -8,
                backgroundColor: 'red',
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                  {getCartCount()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between p-4 bg-[#FED15F]">
        <View className="flex flex-row items-center justify-center">
          <Ionicons name="location-outline" size={24} color="black" />
          <Text className="text-lg font-bold">Home</Text>
          <Entypo name="triangle-down" size={24} color="black" />
        </View>
        <View className="flex flex-row items-center justify-center gap-1">
          <FontAwesome name="car" size={20} color="black" />
          <Text className="text-lg font-base">Car name</Text>
          <Entypo name="triangle-down" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

export default Topbar;