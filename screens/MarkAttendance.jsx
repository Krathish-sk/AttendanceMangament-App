import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

const statusBarHeight = StatusBar.currentHeight;
const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function MarkAttendance({ navigation }) {
  const [currentDate, setCurrentDate] = useState(moment());
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const alterMonth = function (alterValue) {
    let month;
    if (alterValue === "add") {
      month = moment(currentDate).add(1, "months");
    } else {
      month = moment(currentDate).subtract(1, "months");
    }
    setCurrentDate(month);
  };

  const formateDate = function (date) {
    return date.format("MMMM D, YYYY");
  };

  async function fetchEmployees() {
    try {
      const response = await axios.get(`${baseUrl}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.log("Failed to fetch the employees", error);
    }
  }

  async function fetchAttendance() {
    try {
      const response = await axios.get(`${baseUrl}/attendance`, {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(response.data.attendanceData);
    } catch (error) {
      console.log("Failed fetching attendace data", error);
    }
  }

  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // 'Not Marked' or a default status
    };
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  return (
    <View
      style={{ backgroundColor: "white", flex: 1, marginTop: statusBarHeight }}
    >
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            gap: 10,
            marginVertical: 20,
          }}
        >
          <AntDesign onPress={alterMonth} name="left" size={24} color="black" />
          <Text>{formateDate(currentDate)}</Text>
          <AntDesign
            onPress={() => alterMonth("add")}
            name="right"
            size={24}
            color="black"
          />
        </View>
        <View style={{ marginHorizontal: 12 }}>
          {employeeWithAttendance.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("user", {
                    name: item.employeeName,
                    id: item.employeeId,
                    salary: item.salary,
                    designation: item.designation,
                  });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#4b6cb7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>
                    {item?.employeeName?.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.employeeName}
                  </Text>
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item.designation} ({item.employeeId})
                  </Text>
                </View>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#ff69b4",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                  >
                    {item.status.charAt(0).toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </View>
  );
}
