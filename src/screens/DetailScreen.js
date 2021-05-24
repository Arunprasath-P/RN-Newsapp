import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Platform,
  Share,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

const DetailScreen = props => {
  const newsName = props.navigation.getParam('newsName');
  const newsId = props.navigation.getParam('newsId');
  const newsDes = props.navigation.getParam('newsDes');
  const newsCat = props.navigation.getParam('newsCat');
  const newsUrl = props.navigation.getParam('newsUrl');
  const image =
    'https://png.pngtree.com/png-clipart/20191120/original/pngtree-flat-black-newspaper-vector-icons-png-image_5004406.jpg';
  const checkPermission = async () => {

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = image;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: newsDes,
          title: newsName,
          url: newsUrl,
        },
        {
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToWeibo',
            'com.apple.UIKit.activity.Print',
            'com.apple.UIKit.activity.CopyToPasteboard',
            'com.apple.UIKit.activity.AssignToContact',
            'com.apple.UIKit.activity.SaveToCameraRoll',
            'com.apple.UIKit.activity.AddToReadingList',
            'com.apple.UIKit.activity.PostToFlickr',
            'com.apple.UIKit.activity.PostToVimeo',
            'com.apple.UIKit.activity.PostToTencentWeibo',
            'com.apple.UIKit.activity.AirDrop',
            'com.apple.UIKit.activity.OpenInIBooks',
            'com.apple.UIKit.activity.MarkupAsPDF',
            'com.apple.reminders.RemindersEditorExtension',
            'com.apple.mobilenotes.SharingExtension',
            'com.apple.mobileslideshow.StreamShareService',
            'com.linkedin.LinkedIn.ShareExtension',
            'pinterest.ShareExtension',
            'com.google.GooglePlus.ShareExtension',
            'com.tumblr.tumblr.Share-With-Tumblr',
            'net.whatsapp.WhatsApp.ShareExtension',
          ],
        },
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          
        } else {
          
        }
      } else if (result.action === Share.dismissedAction) {
        
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: '100%',
            height: 300,
          }}
        />
        <TouchableOpacity
          style={styles.ButtonContainer1}
          onPress={checkPermission}>
          <Text style={styles.text}>Save Image</Text>
        </TouchableOpacity>

        <View style={{...styles.newsRow, ...styles.titleContainer}}>
          <Text style={styles.title}>{newsName}</Text>
        </View>
        <View>
        <TouchableOpacity onPress={onShare} style={styles.ButtonContainer2}>
            <Text style={styles.ButtonText}>
              <Icon name="share" />  Share
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text>{newsDes}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  ButtonText: {
    fontSize: 10,
    color: '#000',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  titleContainer: {
    backgroundColor: '#00BFFF',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  ButtonContainer1: {
    elevation: 0,
    backgroundColor: '#E6E6FA',
    marginVertical: 5,
    borderRadius: 30,
    padding: 5,
    justifyContent: 'center',
    marginHorizontal: 130,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  ButtonContainer2: {
    elevation: 0,
    backgroundColor: '#E6E6FA',
    marginVertical: 5,
    borderRadius: 30,
    padding: 7,
    justifyContent: 'center',
    marginHorizontal: 170,
    borderWidth: 0.75,
    borderColor: '#00BFFF',
  },
  newsRow: {
    flexDirection: 'row',
  },

  newsDetail: {
    paddingHorizontal: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%',
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'orange',
    margin: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: "#E6E6FA"
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailScreen;
