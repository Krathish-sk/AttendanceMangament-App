import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const statusBarHeight = StatusBar.currentHeight;
const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const intialUserValue = {
  name: "",
  employeeId: "",
  dob: "",
  phone: "",
  joiningDate: "",
  salary: "",
  address: "",
  designation: "",
};

export default function AddDetails({ navigation }) {
  const [userValue, setUserValue] = useState(intialUserValue);

  function updateUserValueHandler(inputIdentifier, userInput) {
    setUserValue((values) => {
      return { ...values, [inputIdentifier]: userInput };
    });
  }

  async function registerHandler() {
    const employeeData = {
      employeeName: userValue.name,
      employeeId: userValue.employeeId,
      designation: userValue.designation,
      phoneNumber: userValue.phone,
      dateOfBirth: userValue.dob,
      joiningDate: userValue.joiningDate,
      salary: userValue.salary,
      address: userValue.address,
      activeEmployee: true,
    };

    try {
      const response = await axios.post(`${baseUrl}/addEmployee`, employeeData);
      setUserValue(intialUserValue);
      Alert.alert("Registration Success", "Employee has been addedd !!", [
        {
          text: "OK",
          style: "default",
          onPress: () => navigation.navigate("employee"),
        },
      ]);
    } catch (error) {
      Alert.alert("Reagistration Failed", "Please try again");
      console.log("Error while registering", error);
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", marginTop: statusBarHeight }}
    >
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.navigate("employee")}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              fontWeight: "bold",
              textAlign: "center",
              marginRight: 25,
              padding: 10,
            }}
          >
            Add New Employee
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Full Name</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter your full name"
            placeholderTextColor={"black"}
            value={userValue.name}
            onChangeText={updateUserValueHandler.bind(this, "name")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Employee ID</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter your Employee ID"
            placeholderTextColor={"black"}
            value={userValue.employeeId}
            onChangeText={updateUserValueHandler.bind(this, "employeeId")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Designation</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter your job role"
            placeholderTextColor={"black"}
            value={userValue.designation}
            onChangeText={updateUserValueHandler.bind(this, "designation")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Contact</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter your phone number"
            placeholderTextColor={"black"}
            value={userValue.phone}
            onChangeText={updateUserValueHandler.bind(this, "phone")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Date Of Birth
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter your birth date"
            placeholderTextColor={"black"}
            value={userValue.dob}
            onChangeText={updateUserValueHandler.bind(this, "dob")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Joining Date</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter the first day of joining"
            placeholderTextColor={"black"}
            value={userValue.joiningDate}
            onChangeText={updateUserValueHandler.bind(this, "joiningDate")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Salary</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter your take home salary"
            placeholderTextColor={"black"}
            value={userValue.salary}
            onChangeText={updateUserValueHandler.bind(this, "salary")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Enter your address"
            placeholderTextColor={"black"}
            value={userValue.address}
            onChangeText={updateUserValueHandler.bind(this, "address")}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={registerHandler}>
            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "#abcaba",
                color: "white",
                textAlign: "center",
                padding: 10,
                borderRadius: 5,
              }}
            >
              Add Employee
            </Text>
          </TouchableOpacity>
          <AntDesign
            name="reload1"
            size={24}
            color="black"
            onPress={() => {
              setUserValue(intialUserValue);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
