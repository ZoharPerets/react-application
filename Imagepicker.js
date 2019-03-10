import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

export default class Imagepicker extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="pick an image "
          onPress={this.pickImage}
        />
        {image && <Image source={{ uri: image }} style={{ width: 180, height: 180 }} />}
      </View>
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });


    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}