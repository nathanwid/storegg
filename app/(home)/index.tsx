import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import HomeRow from "@/components/HomeRow";
import HomeGrid from "@/components/HomeGrid";
import { useProducts } from "@/hooks/productHooks";
import { useRouter } from "expo-router"; 
import { useAppSelector } from "@/redux";
import { selectBalance } from "@/redux/balanceSlice";
import GridViewIcon from "@/components/GridViewIcon";  
import ListViewIcon from "@/components/ListViewIcon";  
import SearchIcon from "@/components/SearchIcon";  

export default function Index() {
  const router = useRouter(); 
  const balance = useAppSelector(selectBalance);
  const { error, isLoading, products } = useProducts();
  const [isGridView, setIsGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.searchContainer}>
          <SearchIcon style={styles.searchIcon} />  
          <TextInput
            style={styles.searchBar}
            placeholder="Search products..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)" 
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        
        <View style={styles.topRow}>
          <TouchableOpacity 
            style={styles.navigateButton} 
            onPress={() => router.push("/(cart)")} 
          >
            <Text style={styles.navigateButtonText}>My Products</Text>
          </TouchableOpacity>
          <View style={styles.moneyContainer}>
            <Text style={styles.moneyAmount}>${balance.toFixed(2)}</Text>
            <Text style={styles.balanceText}>Balance</Text>
          </View>
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Available Products</Text>
        <TouchableOpacity onPress={() => setIsGridView((prev) => !prev)}>
          {isGridView ? (
            <GridViewIcon width={32} height={32} />  
          ) : (
            <ListViewIcon width={32} height={32} />  
          )}
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.errorText}>Error</Text>
      ) : products ? (
        <FlatList
          data={products}
          renderItem={({ item }) =>
            isGridView ? <HomeGrid item={item} /> : <HomeRow item={item} />
          }
          keyExtractor={(item) => item.id.toString()}
          numColumns={isGridView ? 2 : 1}
          contentContainerStyle={styles.listContainer}
          key={isGridView ? "grid" : "list"}
        />
      ) : (
        <Text style={styles.errorText}>No products available</Text>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(minigame)")}
      >
        <Image
          source={require("@/assets/images/egg-full.png")} 
          style={styles.fabIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    backgroundColor: "#8775a9", 
    padding: 20,
    marginBottom: 20,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8, 
    marginBottom: 16,
    height: 50, 
  },
  searchIcon: {
    marginHorizontal: 8,
    width: 28,
    height: 28,
    color: "#8775a9",
    opacity: 0.5,
  },
  searchBar: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#000",
  },  
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navigateButton: {
    backgroundColor: "#fff",
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 8,
    marginRight: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  navigateButtonText: {
    color: "#8775a9",
    fontWeight: "bold",
    fontSize: 18, 
  },
  moneyContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 16,
    position: "absolute",  
    top: 0, 
    right: 0,  
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  moneyAmount: {
    fontSize: 24, 
    fontWeight: "bold",
    color: "#8775a9", 
  },
  balanceText: {
    fontSize: 18, 
    fontWeight: "condensedBold",
    color: "#8775a9", 
    marginTop: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  headerText: {
    color: "#000", 
    fontSize: 22,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  fab: {
    position: "absolute",
    right: 15,
    bottom: 30,
    backgroundColor: "#fff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  fabIcon: {
    width: 32,
    height: 32,
  },
  scrollView: {
    paddingBottom: 60,
  },
});
