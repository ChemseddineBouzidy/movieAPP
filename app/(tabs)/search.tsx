import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({
    query: searchQuery,
  }))
  useEffect(() => {
    const func = async () => {
    if (searchQuery.trim()) {
      await loadMovies();
    }
    else {
      reset();
    }
  }
    func();
  }, [searchQuery]);
  return (

    <View className='flex-1 bg-primary '>
      <Image source={images.bg} className="flex-1 absolute w-full z-0 " resizeMode='cover' />
      <FlatList
        data={movies}
        renderItem={({ item }) =>
          <MovieCard
            {...item}
          // onPress={() => router.push(`/movie/${item.id}`)}          
          />
        }
        keyExtractor={(item) => item.id.toString()}
        className='px-5 '
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center items-center mt-20'>
              <Image source={icons.logo} className="w-12 h-10 " />
            </View>
            <View className='my-5'>
              <SearchBar
                placeholder="Search  movies ..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3 "
              />
            )}
            {moviesError && (
              <Text className="text-red-500 text-center mt-10">
                {moviesError.message}
              </Text>
            )}
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold   mt-10">
                Search results for {''}
                <Text className="text-accent">
                  {searchQuery}
                </Text>
              </Text>
            )}
          </>
        }


      />
    </View>


  )
}

export default search

const styles = StyleSheet.create({})