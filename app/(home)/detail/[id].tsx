import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Product, useProductDetails } from "@/hooks/productHooks";
import ProductDetails from "@/components/ProductDetails";
import { useAppDispatch, useAppSelector } from "@/redux";
import { selectAddedProducts, add, remove } from "@/redux/cartSlice";
import { selectBalance } from "@/redux/balanceSlice";

const Detail = () => {
  const { id } = useLocalSearchParams<"/detail/[id]">();
  const { error, isLoading, productDetail } = useProductDetails(id);
  const productId = parseInt(id, 10);
  const dispatch = useAppDispatch();
  const addedProducts = useAppSelector(selectAddedProducts);
  const isAdded = addedProducts.filter((f) => f.id === productId).length === 1;

  const product: Product = {
    title: productDetail?.title ?? "",
    id: productId,
    price: productDetail?.price ?? 0,
    description: productDetail?.description ?? "",
    image: productDetail?.image ?? "",
    category: productDetail?.category ?? "",
  };

  const balance = useAppSelector(selectBalance);

  const handleAddRemoveProduct = () => {
    if (isAdded) {
      dispatch(remove(product));
      alert(
        "Success!\nProduct was sold successfully!\nYour current balance is $" +
          (balance + product.price).toFixed(2)
      );
    } else if (balance >= product.price) {
      dispatch(add(product));
      alert(
        "Success!\nProduct was bought successfully!\nYour current balance is $" +
          (balance - product.price).toFixed(2)
      );
    } else {
      alert("Insufficient balance");
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <Text style={styles.error}>Error loading product details</Text>
      ) : product ? (
        <View style={styles.container}>
          <ScrollView style={styles.detailsContainer}>
            <ProductDetails product={product} />
          </ScrollView>
          <TouchableOpacity
            style={[
              styles.buyButton,
              {
                backgroundColor: isAdded ? "white" : "#8775a9",
              },
            ]}
            onPress={handleAddRemoveProduct}
          >
            <Text
              style={[
                styles.buyButtonText,
                { color: isAdded ? "#8775a9" : "white" },
              ]}
            >
              {isAdded ? "Remove from Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.error}>Product not found</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  error: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buyButton: {
    marginHorizontal: 40,
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1, 
    borderColor: "#8775a9",
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Detail;
