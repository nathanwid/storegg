// HomeGrid.tsx
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Product } from "@/hooks/productHooks";
import { Link } from "expo-router";

interface IHomeGridProps {
  item: Product;
}

export default function HomeGrid(props: IHomeGridProps) {
  return (
    <Link
      key={props.item.title}
      href={{
        pathname: "/detail/[id]",
        params: {
          id: props.item.id,
        },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        <Image source={{ uri: props.item.image }} style={styles.image} />
        <Text style={styles.cardTitle} numberOfLines={2}>
          {props.item.title}
        </Text>
        <Text style={styles.cardPrice}>${props.item.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16, 
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    textAlign: "center",
  },
  cardPrice: {
    color: "#555",
    fontSize: 16,
  },
});
