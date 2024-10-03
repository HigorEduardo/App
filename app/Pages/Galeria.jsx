import React from "react";
import { Text, View, Image, TextInput, Button, StyleSheet} from "react-native";
import ImagePicker from 'expo-image-picker';

export default function ImagePickerExample(){
    const [image,setImage] = useState('');

    const pickImage = async () =>{
        let result = await ImagePicker.launchCameraLibraryAsync({
            mediaTypes: Imagepicker.mediaTypesOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality: 1,
        });

        console.log(result);
        if(!result.canceled){
            setImage(result.assets[0].uri);     
        }
    
    }
    return(
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage}/>
            {image && <Image source={{uri: image}} style={styles.image}/>}
        </View>
    )
};

const stles = StyleSheet.create({

});