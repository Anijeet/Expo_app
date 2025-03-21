import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import ReviewCard from './ui/ReviewCard';

const Customer = () => {
  return (
    <View>
      <View>
        <View className="flex flex-row items-center justify-between p-2 px-4">
          <View>
            <Text className="text-xl font-bold">Customer Appreciations</Text>
            <Text className="text-sm text-gray-500">
              See what our customers say about our services.
            </Text>
          </View>
          <Link className="text-blue-500" href={'/'}>
            See all
          </Link>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='gap-3'>
        <ReviewCard customerImage={require('@/assets/images/customer.jpg')} customerName="John Doe" rating={5} review="Motomate delivers extraordinary car cleaning services. Their recent launch..." type="Interior & exterior cleaning" />
        <ReviewCard customerImage={require('@/assets/images/customer.jpg')} customerName="John Doe" rating={5} review="Motomate delivers extraordinary car cleaning services. Their recent launch..." type="Interior & exterior cleaning" />
      </ScrollView>
    </View>
  );
};

export default Customer;
