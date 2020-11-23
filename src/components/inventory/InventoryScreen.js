import React, { Component } from 'react';
import CookieManager from 'react-native-cookies';
import { NavigationActions } from 'react-navigation';
import {
  Alert,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title,
  Thumbnail
} from 'native-base';

export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  signout() {
    CookieManager.clearAll();
    AsyncStorage.clear();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Signin' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentDidMount() {
    this.setState(previousState => {
      return { isLoading: true };
    });
    
    fetch('https://inmos-api.herokuapp.com/stock/all', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "success") {
          this.setState(previousState => {
            return { data: responseJson.data };
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState(previousState => {
          return { isLoading: false };
        });
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => navigate('DrawerOpen')}>
                <Icon
                  name='md-menu'
                  style={{ color: '#f0f0f0' }}
                />
              </Button>
            </Left>
            <Body>
              <Title style={styles.text}>Inventory</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.contentLoading}>
            <Spinner />
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigate('DrawerOpen')}>
              <Icon
                name='md-menu'
                style={{ color: '#f0f0f0' }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.text}>Inventory</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List dataArray={this.state.data} renderRow={(item) =>
            <ListItem avatar onPress={() => navigate('StockDetail', { stockId: item.stock_id })}>
              <Left>
                <Thumbnail source={require('../../assets/img/tag.png')} />
              </Left>
              <Body>
                <Text>{item.stock_name}</Text>
                <Text note># {item.selling_price}</Text>
              </Body>
              <Right>
                <Text note>{item.quantity} in Stock</Text>
              </Right>
            </ListItem>}>
          </List>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.signout()} full>
              <Text style={styles.text}>Signout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'initial'
  },
  contentLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});