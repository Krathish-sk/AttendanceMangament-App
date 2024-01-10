import { View, Text, StatusBar, Pressable, TextInput } from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SearchResult from "../components/SearchResult";

const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
const statusBarHeight = StatusBar.currentHeight;

export default function Employees({ navigation }) {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        marginTop: statusBarHeight,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.navigate("home");
          }}
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            backgroundColor: "white",
            borderRadius: 3,
            height: 50,
            flex: 1,
            justifyContent: "center",
            padding: 5,
          }}
        >
          <TextInput
            placeholder="Search ..."
            value={input}
            onChangeText={(text) => {
              setInput(text);
            }}
            style={{
              fontSize: 14,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              borderWidth: 1,
              padding: 10,
              flex: 1,
              marginLeft: 20,
              borderColor: "#0072b1",
            }}
          />
          <AntDesign
            style={{ marginHorizontal: 15 }}
            color="black"
            size={24}
            name="search1"
          />
          {employees.length > 0 && (
            <View>
              <Pressable
                onPress={() => {
                  navigation.navigate("addDetails");
                }}
              >
                <AntDesign name="pluscircle" size={26} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {/* Content */}
      {employees.length >= 0 ? (
        <SearchResult data={employees} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              width: "100%",
              fontSize: 18,
              color: "#0072b1",
              textAlign: "center",
              margin: 10,
            }}
          >
            No Emplyoees added till now !!
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("addDetails");
            }}
          >
            <View
              style={{
                backgroundColor: "#3BACB6",
                padding: 10,
                borderRadius: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginHorizontal: 10,
                  width: "100%",
                  color: "white",
                }}
              >
                ADD EMPLOYEE
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}
