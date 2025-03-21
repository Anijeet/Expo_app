import { View, Text, TouchableOpacity, StatusBar, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Formik } from 'formik'
import { signupSchema } from '@/utils/authSchema'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { useAuthState } from 'react-firebase-hooks/auth'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const auth = getAuth();
    const [user]=useAuthState(auth)
    if(user){
      router.push("/home")
    }
    const handleLogin = async () => {
        if (!email || !password) return Alert.alert('Incomplete fields');
        
        setIsSigningIn(true);
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            if (!user) return Alert.alert('Login failed!');
            router.push('/home');
        } catch (error) {
            Alert.alert('Login failed!');
        } finally {
            setIsSigningIn(false);
        }
    }
    
    return (
        <SafeAreaView className='bg-white'>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className=" mt-20 flex justify-center items-center">
                    <Text className='text-black mt-10 text-4xl font-serif'>Welcome Back!</Text>
                    <View className="w-5/6">
                        <Formik initialValues={{email:"", password:""}} validationSchema={signupSchema} onSubmit={handleLogin}>
                            {({handleBlur, errors, touched}) => (
                                <View className='w-full mt-10'>
                                    <Text className='text-black text-lg font-semibold'>Email:</Text>
                                    <TextInput 
                                        className='border-2 rounded-lg border-gray-300 p-2' 
                                        keyboardType='email-address'  
                                        onBlur={handleBlur("email")} 
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                    {/* {errors.email && touched.email && <Text className='text-red-500 mb-3'>{errors.email}</Text>} */}

                                    <Text className='text-black text-lg font-semibold'>Password:</Text>
                                    <TextInput 
                                        className='border-2 rounded-lg border-gray-300 p-2' 
                                        secureTextEntry 
                                        onBlur={handleBlur("password")} 
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                    {/* {errors.password && touched.password && <Text className='text-red-500 mb-3'>{errors.password}</Text>} */}

                                    <TouchableOpacity onPress={() => router.push("/forgetPassword")}>
                                        <Text className='text-[#b58b0c] text-center text-base font-semibold underline'>Forget Password?</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        onPress={handleLogin} 
                                        className="mt-4 bg-[#FEC110] rounded-lg px-28 p-3"
                                        disabled={isSigningIn}
                                    >
                                        <Text className="text-black text-center text-xl font-bold">
                                            {isSigningIn ? "Signing in..." : "Sign In"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                    
                        <View className="flex flex-row items-center justify-center gap-1">
                            <Text className="text-slate-600 text-center text-base font-semibold">Don't have an account?</Text>
                            <TouchableOpacity onPress={() => router.push("/signup")} className="">
                                <Text className="text-slate-800 text-center text-base font-semibold underline">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='flex items-center justify-center mt-10'>
                            <Image source={require("@/assets/images/car.png")} className='w-80 h-80' />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login