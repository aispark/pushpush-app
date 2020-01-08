import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import axios from "axios";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/logo2.png")]);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [notificationStatus, setStatus] = useState(false);
  const ask = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    setStatus(status);
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    // axios
    //   .post(
    //     `https://us-central1-pushpush-10520.cloudfunctions.net/PushgunSubscription`,
    //     { token }
    //   )
    //   .then(response => {
    //     // window.localStorage.setItem("messagingToken", token);
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
  useEffect(() => {
    preLoad();
    ask();
  }, []);

  return loaded ? (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  ) : (
    <AppLoading />
  );
}
