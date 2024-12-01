import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '@/redux';
import { selectAddedProducts } from '@/redux/cartSlice';
import HomeRow from '@/components/HomeRow';

const Cart = () => {
  const addedProducts = useAppSelector(selectAddedProducts);

  return (
    <>
      <FlatList
          data={addedProducts}
          renderItem={({ item }) =>
            <HomeRow item={item} />
          }
          contentContainerStyle={styles.listContainer}
      />
    </>
  )
}

export default Cart

const styles = StyleSheet.create({
  title: {
    margin: 16,
    fontSize: 20
  },
  listContainer: {
    marginTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
})