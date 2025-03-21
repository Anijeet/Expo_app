import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Formik } from 'formik'
import { signupSchema } from '@/utils/authSchema'
import { db } from '@/config/firebase'
import { doc } from 'firebase/firestore'
import { setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from "@/config/firebase";


const signup = () => {
  const [isLoading, setIsLoading] = useState(false)

    const auth = getAuth();
    const [user]=useAuthState(auth)
    if(user){
      router.push("/home")
    }
    const handleSignup = async (values: any) => {
        try {
          setIsLoading(true)
            const userCredentials = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            const user = userCredentials.user;
      
            await setDoc(doc(db, "users", user.uid), {
              email: values.email,
              name: values.name,
              createdAt: new Date(),
            });
      
            await AsyncStorage.setItem("userEmail", values.email);
            // await AsyncStorage.setItem("isGuest", "false");
      
            router.push("/home");
          } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
              Alert.alert(
                "Signup Failed!",
                "This email address is already in use. Please use a different email.",
                [{ text: "OK" }]
              );
            } else {
              Alert.alert(
                "Signup Error",
                "An unexpected error occurred. Please try again later.",
                [{ text: "OK" }]
              );
              console.log('error', error)
            }
          } finally {
            setIsLoading(false)
          }
    }
  
  return (
    <SafeAreaView className='bg-white'>
    
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View className=" mt-20 flex justify-center items-center">
        
        <Text className='text-black mt-10 text-4xl font-serif'>Let's get started 😊</Text>
        <View className="w-5/6">
            <Formik initialValues={{email:"", password:"", name:""}} validationSchema={signupSchema} onSubmit={handleSignup}>
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <View className='w-full mt-10'>
                        <Text className='text-black text-lg font-semibold'>Email:</Text>
                        <TextInput className='border-2 rounded-lg  border-gray-300 p-2' keyboardType='email-address' onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} />
                        {errors.email && touched.email && <Text className='text-red-500 mb-3'>{errors.email}</Text>}

                        <Text className='text-black text-lg font-semibold'>Password:</Text>
                        <TextInput className='border-2 rounded-lg  border-gray-300 p-2' secureTextEntry onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} />
                        {errors.password && touched.password && <Text className='text-red-500 mb-3'>{errors.password}</Text>}

                        <Text className='text-black text-lg font-semibold'>Name:</Text>
                        <TextInput className='border-2 rounded-lg  border-gray-300 p-2' keyboardType='default' onChangeText={handleChange("name")} onBlur={handleBlur("name")} value={values.name} />
                        {errors.name && touched.name && <Text className='text-red-500 mb-3'>{errors.name}</Text>}
                        
                        <TouchableOpacity onPress={() => handleSubmit()} className="mt-4 bg-[#FEC110] rounded-lg px-28 p-3">
                         {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : <Text className="text-black text-center text-xl font-bold">Sign Up</Text>}
                         </TouchableOpacity>
                    </View>
                )}
            </Formik>
          
          
          <View className="flex flex-row items-center justify-center gap-1">
            <Text className="text-slate-600 text-center text-base font-semibold">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")} className="">
             <Text className="text-slate-800 text-center text-base font-semibold underline">Sign In</Text>
          </TouchableOpacity>
          </View>
            
            <View className='flex items-center justify-center mt-10'>
                <Image  source={require("@/assets/images/car.png")} className='w-80 h-80' />
            </View>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default signup