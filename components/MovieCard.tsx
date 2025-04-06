import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className="w-[30%]" >

                    <Image source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : `https://via.placeholder.com/600x400/1a1a1a/ffffff.png`
                    }} 
                    className="w-full h-52 rounded-lg" 
                    resizeMode='cover'
                    />

                        <Text className="text-sm font-bold text-white mt-2">{title}</Text>
                        <Text className="text-white text-sm">{release_date}</Text>
                        <Text className="text-white text-sm">Rating: {vote_average}</Text>
     

            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard

const styles = StyleSheet.create({})