import {Navigation} from 'react-native-navigation';
import testIDs from './TestIDs';

export default function setRoot() {
  // noinspection JSIgnoredPromiseFromCall
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Inicio',
                  testID: testIDs.LAYOUTS_TAB,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Orders',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Pedidos',
                  testID: testIDs.LAYOUTS_TAB,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'ShopsRegister',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Quiero vender',
                  testID: testIDs.LAYOUTS_TAB,
                },
              },
            },
          },
        ],
      },
    },
  });
}
