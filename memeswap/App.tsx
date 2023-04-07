import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function App() {
  const [meme, setMeme] = useState('');

  useEffect(() => {
    nextMeme();
  }, []);

  const nextMeme = async () => {
    setMeme('');
    try {
      const result = await fetch('https://meme-api.com/gimme');
      const json = await result.json();
      setMeme(json.url);
    } catch (error) {
      console.log(error);
    }
  };

  const shareMeme = async () => {
    try {
      const result = await Share.share({
        message: `Hey, checkout this awesome meme I got from MemeMaster App, ${meme} `,
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text style={styles.headingText}>Meme Swap</Text>
      <Text numberOfLines={3} style={styles.description}>
        MemeMaster is a fun and easy-to-use app for sharing hilarious memes with
        your friends and family. With a vast library of popular memes, you can
        quickly find and share the perfect meme to brighten up anyone's day.
      </Text>
      <View>
        {meme ? (
          <Image
            source={{uri: meme || 'https://i.imgflip.com/11fjj7.jpg'}}
            style={styles.image}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color="red"
            style={styles.activityIndicator}
          />
        )}
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={nextMeme}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 580,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  activityIndicator: {
    width: '100%',
    height: 600,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
