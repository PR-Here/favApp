import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Home, Favorite } from "../../screen";
import { FAVORITE, HOME } from "../../utils/navString";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={HOME}
          component={Home}
          options={{
            tabBarIcon: () => {
              return <Icon name="home" size={30} color="#900" />;
            },
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name={FAVORITE}
          component={Favorite}
          options={{
            tabBarIcon: () => {
              return <Icon name="star" size={30} color="#900" />;
            },
            tabBarLabel: "Favorite",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
