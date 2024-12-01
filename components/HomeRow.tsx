import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Product } from '@/hooks/productHooks'
import { Link } from 'expo-router'

interface IHomeProps {
    item: Product
}

export default function HomeRow(props: IHomeProps) {  
  return (
    <Link key={props.item.title} href={{ 
      pathname: "/detail/[id]", 
      params: {
        id: props.item.id
      }
    }} asChild>
      <Pressable style={styles.card} key={props.item.id}>
        <Image 
          source={{uri: props.item.image}} 
          style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {props.item.title}
          </Text>
          <Text style={styles.cardPrice}>${props.item.price}</Text>
        </View>
      </Pressable> 
    </Link>
  )
}

const styles = StyleSheet.create({
    textContainer: {
      flexDirection: 'column', 
      marginLeft: 20,
      flex: 1 
    },
    cardTitle: {
      textTransform: 'capitalize', 
      fontWeight: 'bold', 
      fontSize: 18, 
      marginBottom: 8,
      flexWrap: 'wrap', 
      maxWidth: '100%' 
    },
    cardPrice: {
      color: '#555', 
      fontSize: 16
    },
    image: { 
      width: 75, 
      height: 75, 
      borderRadius: 8 
    },
    card: {
      flexDirection: 'row', 
      alignItems: 'center', 
      borderWidth: 1, 
      borderRadius: 16, 
      margin: 8, 
      padding: 16, 
      borderColor: '#ccc',
      backgroundColor: '#fff', 
      elevation: 4, 
      shadowColor: '#000', 
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4
    }
})
