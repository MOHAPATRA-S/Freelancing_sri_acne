import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  // Button,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { Component, useState, Fragment, useEffect, useRef } from "react";

const { height, width } = Dimensions.get("window");

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignSelf: "center",
          paddingTop: height / 3,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            width: 20,
            height: 20,
            margin: 60,

            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            borderWidth: 3,
            position: "absolute",
          }}
          onPress={() => {
            this.props.navigation.navigate("CameraApp");
          }}
        >
          <Text style={{ color: "white" }}> Back</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 25, color: "green" }}>
          “Thank you for going through this demo. Stay tuned for more exciting
          details.”
        </Text>

        <TouchableOpacity
          style={{
            margin: 50,
          }}
          onPress={() =>
            Linking.openURL(
              "https://www.instagram.com/cleanyouracne/?r=nametag",
            )
          }
        >
          <Text style={{ color: "brown", fontSize: 20 }}>
            Follow us on instagram @cleanyouracne
          </Text>
        </TouchableOpacity>

        {/* <View>
          <Text style={{ fontSize: 30, color: "green" }}>
            Your results are Uploaded to the backend.
          </Text>
        </View>

        <View
          style={{
            paddingTop: 50,
          }}
        >
          <Text style={{ fontSize: 20, color: "blue" }}>
            1. Probiotic Cleanser
          </Text>
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={{
              uri:
                "https://m.clinique.com/media/export/cms/products/1200x1500/cl_sku_6L4N01_1200x1500_0.png",
            }}
          ></Image>
        </View>

        <View
          style={{
            paddingTop: 50,
          }}
        >
          <Text style={{ fontSize: 20, color: "blue" }}> 2. Before/After </Text>
          <Image
            style={{
              width: 200,
              height: 200,
              paddingTop: 10,
            }}
            source={require("../images/beforeafter.png")}
          ></Image>
        </View> */}
      </View>
    );
  }
}
