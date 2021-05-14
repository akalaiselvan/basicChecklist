import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const Setting =({content,Icon,font})=>{
  return (
    <View style={styles.container}>
      <View
        style={styles.button}>
        <View style={styles.iconRow}>
          {Icon}
        </View>
        <Text style={[styles.setting,{fontFamily:font}]}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        alignSelf:'center',
  },
  button: {
    borderRadius:10,
    width: 350,
    height: 54,
    backgroundColor: "rgba(212,244,252,1)",
    flexDirection: "row",
    marginTop: 5,
  },
  iconRow: {
    height: 27,
    flexDirection: "row",
    marginRight: 10,
    marginLeft: 7,
    marginTop: 13,
  },
  setting: {
    color: "#121212",
    fontSize: 19,
    marginTop: 10,
  },
});

export default Setting;
