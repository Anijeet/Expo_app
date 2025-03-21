import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import Card from './ui/Card';
import ServiceIcon from './ui/ServiceIcon';
import { Ionicons } from '@expo/vector-icons';
import ServiceCard from './ui/ServiceCard';

const Services = () => {
  const servicesData = [
    {
      title: 'Interior Cleaning Name',
      rating: '2.8k rating',
      image: require('@/assets/images/mobile.png'),
      bulletPoints: ['Complete engine check', 'Oil and filter change', 'Multi-point inspection'],
      isBestSelling: true,
    },
    {
      title: 'Quick Service',
      rating: '2k rating',
      image: require('@/assets/images/mobile.png'),
      bulletPoints: ['Basic diagnostics', 'Fluid level check', 'Safety inspection'],
      isBestSelling: false,
    },
  ];

  const mechanicalServices: Array<{
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    tag?: string;
    IsIonicons?: boolean;
  }> = [
    { title: 'Regular Cleaning', icon: 'car-outline', tag: 'Upcoming', IsIonicons: true },
    { title: 'Deep Cleaning', icon: 'car-sharp', tag: 'Hot', IsIonicons: true },
    //@ts-ignore
    { title: 'Interior Cleaning', icon: 'Upcoming', IsIonicons: false },
    { title: 'Ask Expert', icon: 'people-outline', IsIonicons: true },
    //@ts-ignore
    { title: 'AcCleaning Service', icon: 'car-seat-cooler', IsIonicons: false, tag: 'Upcoming' },
    { title: 'Battery lump start', icon: 'battery-dead', IsIonicons: true, tag: 'Upcoming' },
    //@ts-ignore
    { title: 'Wheel_lift Tow service', icon: 'car-emergency', IsIonicons: false, tag: 'Upcoming' },
    { title: 'Regular service', icon: 'people-outline', IsIonicons: true },
  ];

  const chunkArray = (array: any, size: number) => {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, index + size));
      index += size;
    }
    return chunkedArr;
  };

  const serviceRows = chunkArray(mechanicalServices, 4);

  return (
    <View className='z-0 mt-24'>
      <View className="flex flex-col">
        <View className="flex flex-row items-center justify-between p-2 px-4">
          <Text className="text-xl font-bold">Available car services for you...</Text>
          <Link className="text-blue-500" href={'/service/service'}>
              See More
            </Link>
        </View>
        <ScrollView
          horizontal
          className="py-6"
          contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}>
          {servicesData.map((service, index) => (
            <View key={index} style={{ marginRight: 16 }}>
              <Card
                title={service.title}
                rating={service.rating}
                image={service.image}
                bulletPoints={service.bulletPoints}
                isBestSelling={service.isBestSelling}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View>
        <View className="flex flex-row items-center justify-between p-2 px-4">
          <Text className="text-xl font-bold">Mechanical Services</Text>
          <Link className="text-blue-500" href={'/'}>
            See More
          </Link>
        </View>

        <View className="px-4">
          {serviceRows.map((row, rowIndex) => (
            <View key={rowIndex} className="mb-4 flex-row justify-between">
              {row.map((item: any, colIndex: any) => (
                <React.Fragment key={`${rowIndex}-${colIndex}`}>
                  <View style={{ width: '22%' }}>
                    <ServiceIcon
                      title={item.title}
                      IsIonicons={item.IsIonicons}
                      icon={item.icon}
                      tag={item.tag}
                    />
                  </View>
                  {colIndex < row.length - 1 && (
                    <View className="h-full w-0.5 self-stretch bg-gray-200" />
                  )}
                </React.Fragment>
              ))}

              {row.length < 4 &&
                Array(4 - row.length)
                  .fill(0)
                  .map((_, index) => <View key={`empty-${index}`} style={{ width: '22%' }} />)}
            </View>
          ))}
        </View>
      </View>

      <View>
        <View className="flex flex-row items-center justify-between p-2 px-4">
          <Text className="text-xl font-bold">Your Current Service</Text>
          <Link className="text-blue-500" href={'/'}>
            See More
          </Link>
        </View>

        <View className="flex flex-row gap-3 items-center justify-center border rounded-lg mx-5 m-3 p-5 px-4">
          <View>
            <Ionicons name="car-outline" size={24} color="red" />
          </View>
          <View >
            <Text className='text-md font-bold text-red-500'>You do not have any service request yet.</Text>
          </View>
        </View>

        <View className='mx-5 flex items-center justify-center'>
          <Image style={{height:126, width:350, borderRadius:10, margin:5}} source={require('@/assets/images/service.png')} resizeMode="cover" />
        </View>
      </View>

      <View>
      <View className="flex flex-row items-center justify-between p-2 px-4">
          <Text className="text-xl font-bold">All Service</Text>
          <Link className="text-blue-500" href={'/'}>
            See More
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='gap-4'>
            <ServiceCard image={require('@/assets/images//service1.png')} title="Exterior Cleaning" description="Description" />
            <ServiceCard image={require('@/assets/images/service1.png')} title="Exterior Cleaning" description="Description" />
            <ServiceCard image={require('@/assets/images/service1.png')} title="Exterior Cleaning" description="Description" />
        </ScrollView>
      </View>
    </View>
  );
};

export default Services;
