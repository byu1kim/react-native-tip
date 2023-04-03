import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { RadioButton } from "react-native-paper";

const tips = [
  {
    id: 1,
    amount: 0.12,
    value: "12%",
  },
  {
    id: 2,
    amount: 0.15,
    value: "15%",
  },
  {
    id: 3,
    amount: 0.18,
    value: "18%",
  },
  {
    id: 4,
    amount: 0.2,
    value: "20%",
  },
];

// Generate Random Bill, Amount, Bill Amount, Tip Amount, Total
export default function App() {
  const [amount, setAmount] = useState(100);
  const [tipAmt, setTipAmt] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState();

  const calTip = (amt, tip) => {
    const calculated = amt * tip;
    setTipAmt(calculated.toFixed(2));
    setTotal((parseInt(amt) + calculated).toFixed(2));
  };

  const generateAmt = () => {
    setAmount((Math.random() * 100).toFixed(2));
    setSelectedId();
    setTipAmt(0);
    setTotal(0);
  };

  return (
    <View style={styles.container}>
      <Text onPress={generateAmt} style={styles.generate}>
        Generate Amount
      </Text>

      <TextInput
        placeholder="Enter your tip"
        style={styles.nameInput}
        onChangeText={(amount) => setAmount(amount)}
        value={amount.toString()}
      ></TextInput>

      <View style={styles.tipStyle}>
        {tips.map((tip, index) => {
          return (
            <View style={styles.tipContainer} key={index}>
              <RadioButton.Item
                value={tip.id}
                status={selectedId === tip.id ? "checked" : "unchecked"}
                onPress={() => {
                  setSelectedId(tip.id);
                  calTip(amount, tip.amount);
                }}
                style={styles.select}
              />
              <Text style={styles.value}>{tip.value}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.bills}>
        <Text style={styles.font}>Bill Amount: ${amount}</Text>
        <Text style={styles.font}>Tip Amount: ${tipAmt}</Text>
        <View style={styles.line}></View>
        <Text style={styles.font}>Total : ${total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 32,
  },
  generate: {
    backgroundColor: "skyblue",
    padding: 10,
    margin: 20,
    width: "100%",
    textAlign: "center",
  },
  nameInput: {
    marginBottom: scale(30),
    padding: 10,
    fontSize: 30,
    borderWidth: 1,
    borderColor: "lightgray",
    width: "100%",
  },
  tipStyle: {
    width: "70%",
  },
  tipContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    borderColor: "skyblue",
    display: "flex",
    borderRadius: "50%",
    borderWidth: 2,
  },
  value: {
    margin: 10,
    fontSize: 18,
  },
  bills: {
    marginTop: scale(30),
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  line: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: 200,
  },
  font: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 500,
  },
});
