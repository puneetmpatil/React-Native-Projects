import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import NewsItem from './components/NewsItem'

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const fetchNews = async () => {
    const YOUR_API_KEY = '4b032228fe12449fa4ed4c0c510a33d3';
    const url = `https://newsapi.org/v2/everything?q=bitcoin?&apiKey=${YOUR_API_KEY}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      const articles = json.articles;
      setNewsData(articles);
    } catch (error) {
      console.error(error);
    }
  };
  fetchNews();

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <ScrollView
        style={[isDarkMode ? styles.darkBackground : styles.whiteBackground]}>
        <Text
          style={[
            styles.heading,
            isDarkMode ? styles.whiteText : styles.darkText,
          ]}>
          Latest News
        </Text>
        <View style={styles.container}>
          {newsData !== undefined ? (
            newsData.map((news, index) => (
              <NewsItem
                key={index}
                title={news.title}
                description={news.description}
                author={news.author}
                url={news.url}
                urlToImage={news.urlToImage}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <ActivityIndicator
              size="large"
              style={styles.loaderContainer}
              color="red"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    margin: 4,
    padding: 5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    margin: 8,
    padding: 10,
  },
  darkBackground: {
    backgroundColor: '#000000',
    height: '100%',
  },
  whiteBackground: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  darkText: {
    color: '#000000',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})

export default App;