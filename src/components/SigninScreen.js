import React, { Component } from 'react';
import CookieManager from 'react-native-cookies';
import { NavigationActions } from 'react-navigation';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  H1,
  H3,
  Input,
  Item,
  Spinner,
  Text
} from 'native-base';
import { StackedFooter } from './shared';

export default class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFooter: false,
      isLoading: false
    };
  }
  
  _signin(navigate, goBack) {
    this.setState(previousState => {
      return { isLoading: true };
    });
    return fetch('https://inmos-api.herokuapp.com/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        store_id: "fb271289-f7e4-4263-bfd3-f47effea8d53",
	      password: "TaYo4942++"
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "success") {
          // Get cookies as a request header string
          CookieManager.get('https://inmos-api.herokuapp.com')
          .then((res) => {
            AsyncStorage.setItem('InmosUser', res.inmos_user);
            navigate('MainNavigator');
            return;
          });
        }
        this.setState(previousState => {
          return { isLoading: false };
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState(previousState => {
          return { isLoading: false };
        });
      });
  }

  componentDidMount() {
    // clear cookies
      /*CookieManager.clearAll();*/
    this.setState(previousState => {
      return { isLoading: true };
    });
    AsyncStorage.getItem('InmosUser', (err, result) => {
      this.setState(previousState => {
        return { user: result };
      });
      if (this.state.user) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'MainNavigator' })],
        });
        this.props.navigation.dispatch(resetAction);
      }
    });

    setTimeout(() => {
      this.setState(previousState => {
        return { showFooter: true };
      });
    }, 500);
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    
    let { showFooter } = this.state;

    if (this.state.isLoading) {
      return (
        <Container>
          <Content contentContainerStyle={styles.contentLoading}>
            <Spinner />
          </Content>
          <StackedFooter style={[ showFooter && styles.footer ]} />
        </Container>
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.content} padder>
          <View>
            <H1 style={[styles.text, styles.title]}>INMOS</H1>
            <H3 style={styles.text}>Signin to INMOS</H3>
          </View>
          <Form>
            <Item rounded style={styles.item}>
              <Input style={styles.input} placeholder="StoreID" />
            </Item>
            <Item rounded style={styles.item}>
              <Input style={styles.input} placeholder="Password" />
            </Item>
          </Form>
          <View>
            <Button onPress={() => this._signin(navigate, goBack)} block rounded style={styles.button}>
              <Text style={styles.text}>Signin</Text>
            </Button>
            <Button onPress={() => navigate('Signup')} block rounded style={styles.button}>
              <Text style={styles.text}>Signup</Text>
            </Button>
          </View>
        </Content>
        <StackedFooter style={[ showFooter && styles.footer ]}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'initial',
    textAlign: 'center',
    marginVertical: 20
  },
  title: {
    fontSize: 50,
    lineHeight: 50
  },
  item: {
    marginVertical: 15,
    backgroundColor: '#ffffff'
  },
  input: {
    textAlign: 'center'
  },
  button: {
    marginVertical: 25
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  contentLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    opacity: 1
  }
});