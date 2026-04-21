import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [komoditas, setKomoditas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://192.168.1.121:8000/api/komoditas")
      .then((response) => response.json())
      .then((json) => {
        setKomoditas(json.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={komoditas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 15,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text>Satuan: {item.satuan}</Text>
            <Text>Tipe Acuan: {item.tipe_acuan}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
