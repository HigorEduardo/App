import { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, Button } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

export default function Camera() {
    const [permissao, pedirPermissao] = useCameraPermissions()
    const [foto, setFoto] = useState(null)
    const cameraRef = useRef(null)
    const [lado, setLado] = useState('back')

    if (!permissao) {
        return <View></View>
    }
    if (!permissao.granted) {
        return (
            <View style={style.container}>
                <Text style={style.textopermissao}> Você precisa pedir a permissão para usar a camera</Text>
                <Button title='Pedir Permissao' onPress={pedirPermissao}></Button>
            </View>
        )
    }

    const tirarFoto = async () => {
        const foto = await cameraRef.current?.takePictureAsync({
            quality: 1,
            base64: true
        })
        console.log(foto)
    }

    const trocaCamera = () => {
        setLado(lado == 'back' ? 'front' : 'back')
    }

    const salvarfoto = () => {
        MediaLibrary.saveToLibreryasync(foto.uri)
        setFoto(null)
    }

    return (
        <View style={style.container}>
            {foto ?
                <View>
                    <Image source={{ uri: foto.uri }} style={style.foto} />
                    <Button title="limpar foto" onPress={() => setFoto(null)}/>
                    <Button title="Salvar foto" onPress={salvarfoto}/>
                </View> :
                <CameraView 
                facing={lado} 
                style={style.camera} 
                ref={cameraRef}
                >
                    <Button title='Tirar foto' onPress={tirarFoto} />
                    <Button title='Troca camera' onPress={trocaCamera} />
                </CameraView>

            }
        </View>
    )
}   

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    textopermissao: {
        textAlign: 'center',
    },
    camera: {
        flex: 1
    },
    foto: {
        width: '100%'

    }

})