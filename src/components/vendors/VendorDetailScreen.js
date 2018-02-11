import React, { Component } from 'react';
import {
  Alert,
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
  Title,
  Thumbnail
} from 'native-base';

export default class VendorDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.setState(previousState => {
      return { isLoading: true };
    });
    fetch('https://inmos-api.herokuapp.com/vendor/' + params.vendorId, {
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
          return { data: previousState.data, isLoading: false };
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
    const { navigate, goBack } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => goBack()}>
                <Icon
                  name='md-arrow-back'
                  style={{ color: '#f0f0f0' }}
                />
              </Button>
            </Left>
            <Body>
              <Title style={styles.text}>Vendor Detail</Title>
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
              <Button transparent onPress={() => goBack()}>
                <Icon
                  name='md-arrow-back'
                  style={{ color: '#f0f0f0' }}
                />
              </Button>
            </Left>
            <Body>
              <Title style={styles.text}>Vendor Detail</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List dataArray={this.state.data} renderRow={(item) =>
              <ListItem itemHeader first>
                <Text style={styles.text}>{item.vendor_name}</Text>
              </ListItem>}>
            </List>
            <List dataArray={this.state.data} renderRow={(item) =>
              <ListItem>
                <Body>
                  <Text>Email</Text>
                  <Text note style={styles.text}>{item.contact.email}</Text>
                </Body>
              </ListItem>}>
            </List>
            <List dataArray={this.state.data} renderRow={(item) =>
              <ListItem>
                <Body>
                  <Text>Phone</Text>
                  <Text note style={styles.text}>{item.contact.phone[0]}</Text>
                </Body>
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