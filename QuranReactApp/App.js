import React, { Component } from 'react';  
import { AppRegistry, FlatList, StyleSheet, View, Share } from 'react-native';  
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';

const surahs = require('./assets/surahs.json');
  
class SectionListBasics extends Component {  

  static navigationOptions = {
    title: 'Quran Kinyarwanda Translation',
  };

  getListViewItem = (item) => {  
    alert(item);  
  }  
  
  renderSeparator = () => {  
    return (  
        <View  
            style={{  
                height: 1,  
                width: "100%",  
                backgroundColor: "#000",  
            }}  
        />  
    );  
  };  

  _renderItem = ({item}) => (
    <Content>
      <Card style={{flex: 0, backgroundColor: "#5ead97"  }}>
        <CardItem>
          <Left>
            <Text style={styles.item} onPress={() => this.props.navigation.navigate('Details', { itemId: item.page })}>{item.key}</Text>
            <Body>
              <Text style={styles.item} onPress={() => this.props.navigation.navigate('Details', { itemId: item.page })}>Sourate {item.tname}</Text>
              <Text style={styles.item} onPress={() => this.props.navigation.navigate('Details', { itemId: item.page })} note>{item.type} - {item.ayas} Ayat</Text>
            </Body>
            <Text style={styles.item} onPress={() => this.props.navigation.navigate('Details', { itemId: item.page })}>{item.page}</Text>
          </Left>
        </CardItem>
      </Card>
    </Content>
   )

   _renderHeader = ({section}) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
   )

    render() {  
        return (  
            <View style={styles.container}>  
                <FlatList  
                    data={ surahs }
                    renderItem={this._renderItem}  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
            </View>  
        );  
    }  
}  

class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Page: ' + navigation.getParam('itemId', 'A Nested Details Screen'),
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          itemId: { navigation.getParam('itemId', 'NO-ID') }
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
      </View>
    );
  }
}

class ShareExample extends React.Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>
          itemId: { navigation.getParam('itemId', 'NO-ID') }
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button onPress={this.onShare} title="Share" />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: SectionListBasics,
    Details: ShareExample,
  },
  {
    initialRouteName: 'Home',

    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#44511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: "#5ead97"  
    },  
    sectionHeader: {  
        paddingTop: 2,  
        paddingLeft: 10,  
        paddingRight: 10,  
        paddingBottom: 2,  
        fontSize: 22,  
        fontWeight: 'bold',  
        color: "#fff",  
        backgroundColor: '#8fb1aa',  
    },  
    item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    }  
})  
  
// skip this line if using Create React Native App  
AppRegistry.registerComponent('AwesomeProject', () => SectionListBasics);  