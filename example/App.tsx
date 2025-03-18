import { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PhotoEditor from 'expo-photo-edit';

export default function App() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const editImage = async () => {
    let result = await PhotoEditor.open({
      path: image || '',
      stickers: [
        'https://cdn-icons-png.flaticon.com/512/5272/5272912.png',
        'https://cdn-icons-png.flaticon.com/512/5272/5272913.png',
        'https://cdn-icons-png.flaticon.com/512/5272/5272916.png',
      ],
    });

    console.log(result);

    if (result) {
      setImage(result.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {image && <Button title="Edit this image" onPress={editImage} />}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  image: {
    width: 200,
    height: 200,
  },
};
