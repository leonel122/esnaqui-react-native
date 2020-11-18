import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import store from '../redux';

import FrequentQuestions from '../screens/FrequentQuestions';
import Home from '../screens/Home';
import Orders from '../screens/Orders';
import OrdersDetails from '../screens/OrdersDetails';
import ProductsDetails from '../screens/ProductsDetails';
import Search from '../screens/Search';
import ShoppingCartDetails from '../screens/ShoppingCartDetails';
import ShopsRegister from '../screens/ShopsRegister';
import Terms from '../screens/Terms';
import UserLogin from '../screens/UserLogin';
import UserRegister from '../screens/UserRegister';

const SCREENS = {
  FrequentQuestions,
  Home,
  Orders,
  OrdersDetails,
  ProductsDetails,
  Search,
  ShoppingCartDetails,
  ShopsRegister,
  Terms,
  UserLogin,
  UserRegister,
};

// export const SCREENS_NAME = Object.assign(
//   {},
//   ...Object.keys(SCREENS).map((it) => ({[it]: it})),
// );

export function registerScreens() {
  const k = Object.keys(SCREENS);

  for (let i = 0; i < k.length; i++) {
    Navigation.registerComponent(
      k[i],
      () => (props) => {
        const Screens = SCREENS[k[i]];
        return (
          <Provider store={store()}>
            <Screens {...props} />
          </Provider>
        );
      },
      () => SCREENS[k[i]],
    );
  }
}
