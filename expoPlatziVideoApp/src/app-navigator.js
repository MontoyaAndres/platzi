import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";

import Home from "./screens/containers/home";
import Movie from "./screens/containers/movie";
import Category from "./screens/containers/category";
import Header from "./sections/components/header";
import About from "./screens/containers/about";
import Profile from "./screens/containers/profile";
import Lucky from "./screens/containers/lucky";
import Loading from "./screens/containers/loading";
import Login from "./screens/containers/login";
import Icon from "./sections/components/icon";
import Drawer from "./sections/components/drawer";

const Main = createStackNavigator(
  {
    Home,
    Category
  },
  {
    navigationOptions: {
      header: Header
    },
    cardStyle: {
      backgroundColor: "white"
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Main,
      navigationOptions: {
        title: "Inicio",
        tabBarIcon: <Icon icon="🏠" />
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        title: "Sobre esta app",
        tabBarIcon: <Icon icon="🤓" />,
        drawerIcon: <Icon icon="🤓" />
      }
    },
    Lucky: {
      screen: Lucky,
      navigationOptions: {
        title: "Voy a tener suerte",
        tabBarIcon: <Icon icon="⭐️" />,
        drawerIcon: <Icon icon="⭐️" />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Perfil",
        tabBarIcon: <Icon icon="😎" />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      activeBackgroundColor: "#65a721"
    }
  }
);

const WithModal = createStackNavigator(
  {
    Main: {
      screen: TabNavigator
    },
    Movie
  },
  {
    mode: "modal",
    headerMode: "none",
    cardStyle: {
      backgroundColor: "white"
    },
    navigationOptions: {
      gesturesEnabled: true
    }
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: WithModal,
      navigationOptions: {
        title: "Inicio",
        drawerIcon: <Icon icon="🏠" />
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        title: "Sobre esta app",
        drawerIcon: <Icon icon="🤓" />
      }
    },
    Lucky: {
      screen: Lucky,
      navigationOptions: {
        title: "Voy a tener suerte",
        drawerIcon: <Icon icon="⭐️" />
      }
    }
  },
  {
    // drawerWidth: 200,
    drawerBackgroundColor: "#f6f6f6",
    contentComponent: Drawer,
    contentOptions: {
      activeBackgroundColor: "#7aba2f",
      activeTintColor: "white",
      inactiveTintColor: "#828282",
      inactiveBackgroundColor: "white",
      itemStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(0,0,0,.5)"
      },
      labelStyle: {
        marginHorizontal: 0
      },
      iconContainerStyle: {
        marginHorizontal: 5
      }
    }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    App: DrawerNavigator,
    Login: Login,
    Loading: Loading
  },
  {
    initialRouteName: "Loading"
  }
);

export default SwitchNavigator;
