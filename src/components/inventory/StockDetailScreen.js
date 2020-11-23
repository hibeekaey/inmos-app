/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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
} from 'native-base';

export default class StockDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;

    // this.setState((previousState) => {
    //   return {isLoading: true};
    // });

    fetch('https://inmos-api.herokuapp.com/stock/' + params.stockId, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'success') {
          this.setState((previousState) => {
            return {data: [responseJson.data]};
          });
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

  render() {
    const {goBack} = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => goBack()}>
                <Icon name="md-arrow-back" style={{color: '#f0f0f0'}} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.text}>Stock Detail</Title>
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
              <Icon name="md-arrow-back" style={{color: '#f0f0f0'}} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.text}>Stock Detail</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={this.state.data}
            renderRow={(item) => (
              <ListItem itemHeader first>
                <Text style={[styles.text, styles.itemHeader]}>
                  {item.stock_name}
                </Text>
              </ListItem>
            )}
          />
          <List
            dataArray={this.state.data}
            renderRow={(item) => (
              <ListItem>
                <Body>
                  <Text>Category</Text>
                  <Text note style={styles.text}>
                    {item.category}
                  </Text>
                </Body>
              </ListItem>
            )}
          />
          <List
            dataArray={this.state.data}
            renderRow={(item) => (
              <ListItem>
                <Body>
                  <Text>Quantity</Text>
                  <Text note style={styles.text}>
                    {item.quantity}
                  </Text>
                </Body>
              </ListItem>
            )}
          />
          <List
            dataArray={this.state.data}
            renderRow={(item) => (
              <ListItem>
                <Body>
                  <Text>Cost Price</Text>
                  <Text note style={styles.text}>
                    # {item.cost_price}
                  </Text>
                </Body>
              </ListItem>
            )}
          />
          <List
            dataArray={this.state.data}
            renderRow={(item) => (
              <ListItem>
                <Body>
                  <Text>Selling Price</Text>
                  <Text note style={styles.text}>
                    # {item.selling_price}
                  </Text>
                </Body>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'initial',
  },
  contentLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemHeader: {
    fontSize: 25,
  },
});
