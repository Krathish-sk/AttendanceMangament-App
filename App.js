import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Employees from "./screens/Employees";
import Home from "./screens/Home";
import AddDetails from "./screens/AddDetails";
import MarkAttendance from "./screens/MarkAttendance";
import User from "./screens/User";
import Summary from "./screens/Summary";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"home"}
          >
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="employee" component={Employees} />
            <Stack.Screen name="addDetails" component={AddDetails} />
            <Stack.Screen name="markAttendance" component={MarkAttendance} />
            <Stack.Screen name="user" component={User} />
            <Stack.Screen name="summary" component={Summary} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
