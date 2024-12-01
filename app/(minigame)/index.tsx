import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import { useAppDispatch } from "@/redux";
import { balanceSlice } from "@/redux/balanceSlice";

type Prize = {
  type: string;
  value: number;
  image: any;
};

const Minigame = () => {
  const dispatch = useAppDispatch();
  const [cracked, setCracked] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);

  const prizes: Prize[] = [
    { type: "gold", value: 100, image: require("@/assets/images/gold-coin.png") },
    { type: "silver", value: 50, image: require("@/assets/images/silver-coin.png") },
    { type: "bronze", value: 20, image: require("@/assets/images/bronze-coin.png") },
  ];

  const handlePress = () => {
    if (!cracked) {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);
      setCracked(true);
      dispatch(balanceSlice.actions.add(randomPrize.value));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.prizesRow}>
        {prizes.map((item, index) => (
          <View key={index} style={styles.prizeItem}>
            <Image source={item.image} style={styles.prizeImage} />
            <Text style={styles.prizeLabel}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.middleSection}>
        {!cracked ? (
          <>
            <Text style={styles.instructionText}>Click on the egg to get your prize!</Text>
            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require("@/assets/images/egg-full.png")}
                style={styles.fullEgg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.messageText}>You got a {prize?.type} coin!</Text>
            <Image source={prize?.image} style={styles.coin} />
            <Image
              source={require("@/assets/images/egg-broken.png")}
              style={styles.fullEgg}
              resizeMode="contain"
            />
            <Text style={[styles.messageText, styles.bottomMessage]}>
              ${prize?.value} have been added to your balance
            </Text>

          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  prizesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  prizeItem: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  prizeImage: {
    width: 45,
    height: 45,
  },
  prizeLabel: {
    fontSize: 18,
    marginTop: 5,
  },
  middleSection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 24,
    marginBottom: 20,
    marginHorizontal: 10,
    textAlign: "center",
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageText: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: "center",
  },
  fullEgg: {
    width: 240,
    height: 240,
    marginBottom: 10,
  },
  coin: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  bottomMessage: {
    marginBottom: 60, 
  },  
});

export default Minigame;
