import {
  View,
  Text,
  StatusBar,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

const statusBarHeight = StatusBar.currentHeight;
const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function User({ route }) {
  const { name, designation, id, salary } = route.params;
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [currentDate, setCurrentDate] = useState(moment());

  const alterMonth = function (alterValue) {
    let month;
    if (month == "add") {
      month = moment(currentDate).add(1, "months");
    } else {
      month = moment(currentDate).subtract(1, "months");
    }

    setCurrentDate(month);
  };

  const formatDate = function (date) {
    return date.format("MMMM D, YYYY");
  };

  async function submitAttendanceHandler() {
    try {
      const attendanceData = {
        employeeId: id,
        employeeName: name,
        designation,
        status: attendanceStatus,
        date: currentDate.format("MMMM D, YYYY"),
      };
      const response = await axios.post(`${baseUrl}/attendance`, {
        attendanceData,
      });

      if (response.status === 200) {
        Alert.alert(`Attendace updated for ${name}`);
      }
    } catch (error) {
      console.log("Error while updating the attendance", error);
    }
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", marginTop: statusBarHeight }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
        }}
      >
        <AntDesign onPress={alterMonth} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={() => alterMonth("add")}
          name="right"
          size={24}
          color="black"
        />
      </View>
      <Pressable
        style={{
          marginVertical: 10,
          marginHorizontal: 12,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4b6cb7",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>{name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            {designation} ({id})
          </Text>
        </View>
      </Pressable>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 12 }}>
        Basic Pay: {salary}
      </Text>
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            letterSpacing: 2,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          ATTENDANCE
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setAttendanceStatus("present")}
            style={{
              padding: 10,
              backgroundColor: "#c4e0e5",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "present" ? (
              <FontAwesome5 name="dot-circle" color="black" size={24} />
            ) : (
              <Entypo name="circle" color={"black"} size={24} />
            )}
            <Text style={{ flex: 1 }}>Present</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAttendanceStatus("absent")}
            style={{
              padding: 10,
              backgroundColor: "#c4e0e5",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "absent" ? (
              <FontAwesome5 name="dot-circle" color="black" size={24} />
            ) : (
              <Entypo name="circle" color={"black"} size={24} />
            )}
            <Text style={{ flex: 1 }}>Absent</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setAttendanceStatus("halfday")}
            style={{
              padding: 10,
              backgroundColor: "#c4e0e5",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "halfday" ? (
              <FontAwesome5 name="dot-circle" color="black" size={24} />
            ) : (
              <Entypo name="circle" color={"black"} size={24} />
            )}
            <Text style={{ flex: 1 }}>Half Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAttendanceStatus("holiday")}
            style={{
              padding: 10,
              backgroundColor: "#c4e0e5",
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {attendanceStatus === "holiday" ? (
              <FontAwesome5 name="dot-circle" color="black" size={24} />
            ) : (
              <Entypo name="circle" color={"black"} size={24} />
            )}
            <Text style={{ flex: 1 }}>Holiday</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#e0e0e0",
              flex: 1,
            }}
            placeholder="Advance / Loans"
            placeholderTextColor={"black"}
          />
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#e0e0e0",
              flex: 1,
            }}
            placeholder="Bonus"
            placeholderTextColor={"black"}
          />
        </View>
        <TouchableOpacity
          onPress={submitAttendanceHandler}
          style={{
            backgroundColor: "#00c6ff",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            width: 150,
            marginTop: 30,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
