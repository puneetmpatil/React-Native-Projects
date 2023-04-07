import {Button, Image, StyleSheet, Text, View, Linking} from 'react-native';
import React from 'react';

export default function NewsItem(props) {
  let {author, title, description, url, urlToImage, isDarkMode} = props;
  const openInBrowser = () => {
    if (url == null){
      url = 'https://www.google.com/';
    }
    Linking.openURL(url);
  };
  return (
    <View style={styles.card}>
      <Text
        style={[styles.title, isDarkMode ? styles.darkText : styles.whiteText]}>
        {title}
      </Text>
      <Image
        style={styles.styleImage}
        source={{
          uri: urlToImage
            ? urlToImage
            : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw1EQT2EDhcisZqL4RaDuSFs&ust=1677354153124000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIih7qX1rv0CFQAAAAAdAAAAABAD',
          height: 200,
        }}
      />
      <Text
        style={[
          isDarkMode ? styles.darkText : styles.whiteText,
          styles.description,
        ]}>
        {description}
      </Text>
      <Text style={[isDarkMode ? styles.darkText : styles.whiteText]}>
        <Text
          style={[
            isDarkMode ? styles.darkText : styles.whiteText,
            styles.bold,
          ]}>
          Author
        </Text>
        :{author}
      </Text>
      <Button title="Read More" onPress={openInBrowser} />
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    margin: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom:10,
  },
  whiteText: {
    color: '#FFFFFF',
    padding:10
  },
  darkText: {
    color: '#000000',
    padding:10
  },
  description:{
    fontSize: 14,
  },
  bold:{
    fontWeight: 'bold',
  },
  styleImage:{
    marginHorizontal: 10,
  },
});
