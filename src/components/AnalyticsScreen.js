import React, { Component, PureComponent } from 'react';
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
  Separator,
  Text,
  Title
} from 'native-base';
import { BarChart } from 'react-native-svg-charts';

class SalesChart extends PureComponent {
  render() {
    const data = [ 50, 10, 40, 95, 85, 91, 35, 53, 53, 24, 50 ];
    const barData = [
      {
        values: data,
        positive: {
          fill: '#8800cc'
        }
      }
    ];

    return (
      <BarChart
        style={styles.salesChart}
        data={barData}
      />
    );
  }
}

export default class AnalyticsScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

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
            <ListItem>
              <Body>
                <Text>Total Quantity</Text>
                <Text note>2000</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Total Value</Text>
                <Text note># 20,000,000.00</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Total Vendors</Text>
                <Text note>12</Text>
              </Body>
            </ListItem>
            <Separator bordered>
              <Text style={styles.text}>SALES</Text>
            </Separator>
          </List>
          <SalesChart />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'initial'
  },
  salesChart: {
    marginHorizontal: 10,
    marginVertical: 50,
    height: 200
  }
});