import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { icons } from '@/constants/icons'
import Icon from 'react-native-vector-icons/Feather'; // or another icon library
interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}


const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{label}</Text>
    <Text className='text-light-100 font-bold mt-2  text-sm  '>{value || "N/A"}</Text>
  </View>
)
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className='bg-primary flex-1 '>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`, }}
            className='w-full h-[550px]'
            resizeMode='stretch'
          />
            {movie?.homepage && (     
          <TouchableOpacity   
            className='absolute bottom-5 right-5 w-16 h-16 rounded-full bg-accent 
             items-center justify-center z-50 shadow-md'
             onPress={() => Linking.openURL(movie.homepage || '')}
            activeOpacity={0.8}
          >
            <Image source={icons.play} className='w-6 h-6' tintColor="#fff" />
          </TouchableOpacity>
            )}
          {/* <TouchableOpacity
            className=' bottom-5  
        bg-accent rounded-bl-full py-3.5 flex flex-row items-center justify-center
         z-50'
            onPress={router.back}
          >
            <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff" />
            <Text className='text-white text-base font-semibold'>Go back</Text>
          </TouchableOpacity> */}
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white text-xl font-bold'>{movie?.original_title}</Text>
          <View className='flex-row items-center gap-x-1 mt-2 '>
            <Text className='text-light-200  text-sm '>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200  text-sm  '>{movie?.runtime}m</Text>
          </View>
          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white text-sm font-bold'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className='text-light-200  text-sm  '>({movie?.vote_count} votes)</Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo label='Genres' value={movie?.genres?.map((g) => g.name).join('-') || "N/A"} />
          <View className='flex-row items-center justify-between w-1/2 '>
            <MovieInfo label='Budget' value={`$${movie?.budget / 1_000_000} million`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue) / 1_000_000}`} />
          </View>
          <MovieInfo label='Production Compaines' value={movie?.production_companies.map((c) => c.name).join('-') || 'N/A'} />
          {movie?.homepage && (
            <TouchableOpacity
              className='mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg py-3 px-6 flex flex-row items-center justify-center shadow-md transition-colors duration-300'
              onPress={() => Linking.openURL(movie.homepage)}
            >
              <Text className='text-white text-base font-semibold mr-2'>Watch Now</Text>
              <Icon name="play-circle" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0  mx-5 mb-3
        bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center
         z-50'
        onPress={router.back}
      >
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff" />
        <Text className='text-white text-base font-semibold'>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails

const styles = StyleSheet.create({})