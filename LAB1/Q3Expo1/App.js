import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [pressCount, setPressCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text>You've pressed the button: {pressCount} times</Text>
      <Button
        title="Press me"
        onPress={() => {
          setPressCount(pressCount + 1);
        }}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
