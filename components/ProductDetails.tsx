// components/ProductDetails.tsx
import React from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Dimensions } from 'react-native'

interface ProductDetailsProps {
  product: {
    image: string
    title: string
    price: number
    description: string
  }
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        style={styles.productImage} 
        source={{ uri: product.image }} 
      />
      <View style={styles.separator} />
      <Text style={styles.productName}>{product.title}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  productImage: {
    height: Dimensions.get('screen').width - 80,
    width: Dimensions.get('screen').width - 80,  
    backgroundColor: 'white',
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginBottom: 20,
    borderRadius: 16, 
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#888'
  },
  productDescription: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
  },
  separator: {
    height: 1,
    backgroundColor: '#A9A9A9',
    marginHorizontal: -8,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10
  }
})

export default ProductDetails
