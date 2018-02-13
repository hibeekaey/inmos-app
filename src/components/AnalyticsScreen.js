import React, { Component, PureComponent } from 'react';
import CookieManager from 'react-native-cookies';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  View
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
  Separator,
  Spinner,
  Text,
  Title
} from 'native-base';
import { BarChart, YAxis, XAxis } from 'react-native-svg-charts';

class SalesChart extends PureComponent {
  render() {
    const data = [ 5000, 95000, 60000, 95000, 85000, 91000, 55000, 53000, 53000, 40000, 50000, 67000, 90000, 89000 ];
    const barData = [
      {
        values: data,
        positive: {
          fill: '#8800cc'
        }
      }
    ];
    const contentInset = { top: 5, bottom: 5 };

    return (
      <View style={styles.salesChart}>
        <YAxis
          style={ { position: 'absolute', top: 0, bottom: 33 } }
          dataPoints={data}
          labelStyle={{ color: '#424242' }}
          formatLabel={value => `# ${value}`}
          contentInset={contentInset}
          min={0.00}
        />
        <BarChart
          style={{ flex: 1, marginLeft: 50 }}
          dataPoints={data}
          data={barData}
          contentInset={contentInset}
          gridMin={0.00}
        />
        <XAxis
          style={{ paddingVertical: 8, marginLeft: 50 }}
          values={data}
          formatLabel={(value, index) => index + 1}
          chartType={XAxis.Type.BAR}
          labelStyle={{ color: '#424242' }}
        />
      </View>
    );
  }
}

export default class AnalyticsScreen extends Component {
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

    fetch('https://inmos-api.herokuapp.com/analytics/all', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "success") {
          this.setState(previousState => {
            return { stock: [responseJson.data.stock], sales: responseJson.data.sales };
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
            <Button transparent onPress={() => navigate('DrawerOpen')}>
              <Icon
                name='md-menu'
                style={{ color: '#f0f0f0' }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={styles.text}>Analytics</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <Separator bordered>
              <Text style={styles.text}>STOCK</Text>
            </Separator>
          </List>
          <List dataArray={this.state.stock} renderRow={(item) => 
            <ListItem>
              <Body>
                <Text>Total Quantity</Text>
                <Text note>{item.total_quantity}</Text>
              </Body>
            </ListItem>
          }>   
          </List>
          <List dataArray={this.state.stock} renderRow={(item) =>
            <ListItem>
              <Body>
                <Text>Total Value</Text>
                <Text note># {item.total_value}</Text>
              </Body>
            </ListItem>
          }>
          </List>
          <List>
            <Separator bordered>
              <Text style={styles.text}>SALES</Text>
            </Separator>
          </List>
          <SalesChart />
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
  },
  salesChart: {
    margin: 10,
    height: 200
  }
});