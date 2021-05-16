import React, { Component, useState, Fragment, useEffect, useRef } from "react";

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
} from "react-native";

import { Video } from "expo-av";

import CameraApp from "./component/cameraApp";
import Results from "./component/results";
import UploadS3 from "./component/uploadS3";
import Terms from "./component/terms"

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const { width, height } = Dimensions.get("window");

export function App({ navigation }) {
  const [text, setText] = useState("");


  return (
    <View
      style={{
        flex: 1,
      }}
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    >
      {/* <Text>Testing here</Text> */}
      <CameraApp navigation={navigation}></CameraApp>
    </View>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="App"
          component={App}
          options={{
            headerTransparent: true,
            headerShown: false,
            // headerStyle: {
            //   style: {
            //     position: "absolute",
            //     backgroundColor: "transparent",
            //     zIndex: 100,
            //     top: 0,
            //     left: 0,
            //     right: 0,
            //   },
            // },
            // headerBackground: () => (
            //   <BlurView
            //     tint="light"
            //     intensity={0}
            //     style={StyleSheet.absoluteFill}
            //   />
            // ),
          }}
          screenOptions={{
            headerShown: false,
            headerTransparent: true,
          }}
        />

        <Stack.Screen name="CameraApp" component={CameraApp}></Stack.Screen>
        <Stack.Screen name="Results" component={Results}></Stack.Screen>
        <Stack.Screen name="UploadS3" component={UploadS3}></Stack.Screen>
        <Stack.Screen name="Terms" component={Terms}></Stack.Screen>

        {/* UploadS3 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
