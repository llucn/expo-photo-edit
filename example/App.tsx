import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View, Image } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Expo Photo Edit</Text>
        <Group name="Example">
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {image && <Button title="Edit this image" onPress={editImage} />}
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  image: {
    width: 200,
    height: 200,
  },
};
