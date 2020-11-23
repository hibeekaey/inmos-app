import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { SigninScreen, SignupScreen, InventoryScreen, StockDetailScreen, VendorsScreen, VendorDetailScreen, AnalyticsScreen } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MainNavigator = DrawerNavigator({
  Inventory: {
    screen: InventoryScreen,
    navigationOptions: {
      drawerLabel: 'Inventory',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name={'view-list'}
          size={27}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Vendors: {
    screen: VendorsScreen,
    navigationOptions: {
      drawerLabel: 'Vendors',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name={'people'}
          size={27}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Analytics: {
    screen: AnalyticsScreen,
    navigationOptions: {
      drawerLabel: 'Analytics',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name={'assessment'}
          size={27}
          style={{ color: tintColor }}
        />
      )
    }
  }
});

const RootNavigator = StackNavigator({
  Signin: {
    screen: SigninScreen
  },
  Signup: {
    screen: SignupScreen
  },
  MainNavigator: {
    screen: MainNavigator
  },
  StockDetail: {
    screen: StockDetailScreen
  },
  VendorDetail: {
    screen: VendorDetailScreen
  }
}, {
  headerMode: 'none'
});

export default RootNavigator;