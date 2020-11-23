import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
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
  Text,
} from 'native-base';
import {StackedFooter} from './shared';

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFooter: false,
      isLoading: false,
    };
  }

  _signup(navigate, goBack) {
    this.setState((previousState) => {
      return {isLoading: true};
    });

    return fetch('https://inmos-api.herokuapp.com/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        store_name: this.state.storeName,
        password: this.state.password,
        contact: {
          email: [this.state.email],
          phone: [this.state.phone],
        },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'success') {
          goBack();
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState((previousState) => {
          return {isLoading: false};
        });
      });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState((previousState) => {
        return {showFooter: true};
      });
    }, 500);
  }

  render() {
    const {navigate, goBack} = this.props.navigation;

    let {showFooter} = this.state;

    if (this.state.isLoading) {
      return (
        <Container>
          <Content contentContainerStyle={styles.contentLoading}>
            <Spinner />
          </Content>
          <StackedFooter style={[showFooter && styles.footer]} />
        </Container>
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={styles.content} padder>
          <View>
            <H1 style={[styles.text, styles.title]}>INMOS</H1>
            <H3 style={styles.text}>Signup on INMOS</H3>
          </View>
          <Form>
            <Item rounded style={styles.item}>
              <Input
                autoCapitalize={'words'}
                style={styles.input}
                placeholder="Store"
                onChangeText={(storeName) => this.setState({storeName})}
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                style={styles.input}
                placeholder="Email"
                onChangeText={(email) => this.setState({email})}
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                keyboardType={'phone-pad'}
                style={styles.input}
                placeholder="Phone"
                onChangeText={(phone) => this.setState({phone})}
              />
            </Item>
            <Item rounded style={styles.item}>
              <Input
                autoCapitalize={'none'}
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
          </Form>
          <Button
            onPress={() => this._signup(navigate, goBack)}
            block
            rounded
            style={styles.button}>
            <Text style={styles.text}>Signup</Text>
          </Button>
        </Content>
        <StackedFooter style={[showFooter && styles.footer]} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'initial',
    textAlign: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 50,
    lineHeight: 50,
  },
  item: {
    marginVertical: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    textAlign: 'center',
  },
  button: {
    marginVertical: 50,
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  contentLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    opacity: 1,
  },
});
