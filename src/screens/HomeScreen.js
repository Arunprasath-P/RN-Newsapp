import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';

const HomeScreen = props => {
  const [data, setData] = React.useState();

  useEffect(() => {
    fetch('https://newsapi.org/v2/sources?apiKey=d29d58aab88d4ea0b04ddb245a230068', {
    method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      console.warn("Json values", json.sources);
      setData(json.sources);
    })
    .catch(error => {
    console.error(error);
    });
    }, []);

  const renderGrid = itemdata => {
    const image = "https://png.pngtree.com/png-clipart/20191120/original/pngtree-flat-black-newspaper-vector-icons-png-image_5004406.jpg";
    const onselectnews= () => {
      props.navigation.navigate({
        routeName: 'Detail',
        params: {
          newsName: itemdata.item.name,
          newsId: itemdata.item.id,
          newsDes: itemdata.item.description,
          newsCat: itemdata.item.category,
          newsUrl: itemdata.item.url,
        },
      });
    };
    return (
      <View style={styles.screen}>
      <TouchableOpacity onPress={onselectnews}>
        <View>
          <View style={{...styles.newsRow, ...styles.newsHeader}}>
            <ImageBackground
              source={{uri: image}}
              style={styles.bgImage}></ImageBackground>
          </View>
          <View style={styles.newsDetail}>
            <Text>{itemdata.item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
      </View>
      );
  };

  return (
      <FlatList data={data} renderItem={renderGrid} />
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  newsItem: {
    height: 250,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    height: 250,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  newsRow: {
    flexDirection: 'row',
  },
  newsHeader: {
    height: '85%',
  },
  newsDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

