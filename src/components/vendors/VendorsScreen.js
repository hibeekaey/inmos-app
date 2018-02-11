import React, { Component } from 'react';
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
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Text,
  Title
} from 'native-base';

export default class VendorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState(previousState => {
      return { isLoading: true };
    });
    fetch('https://inmos-api.herokuapp.com/vendor/all', {
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
              <Title style={styles.text}>Vendors</Title>
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
            <Title style={styles.text}>Vendors</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List dataArray={this.state.data} renderRow={(item) =>
            <ListItem onPress={() => navigate('VendorDetail', { vendorId: item.vendor_id })}>
              <Text style={styles.text}>{item.vendor_name}</Text>
            </ListItem>}>
          </List>
        </Content>
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