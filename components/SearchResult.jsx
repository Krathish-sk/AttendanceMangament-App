import { View, Text, FlatList } from "react-native";
import React from "react";

export default function SearchResult({ data, input, setInput }) {
  function RenderEmployee({ item }) {
    if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
      return (
        <View style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#4b6cb7",
              borderRadius: 8,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {item.employeeName.charAt(0)}
            </Text>
          </View>
          <View style={{ width: "80%" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                width: "100%",
              }}
            >
              {item.employeeName}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: "gray",
                width: "100%",
              }}
            >
              {item.designation} ({item.employeeId})
            </Text>
          </View>
        </View>
      );
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.employeeId}
        renderItem={(item) => <RenderEmployee item={item.item} />}
      />
    </View>
  );
}
