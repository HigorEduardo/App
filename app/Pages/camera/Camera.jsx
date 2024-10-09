import { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Button, Pressable, SafeAreaView } from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import { Modal } from "react-native";
import * as Linking from "expo-linking";

export default function CameraScreen() {
    const [permissao, pedirPermissao] = useCameraPermissions();
    const [foto, setFoto] = useState(null);
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState('back');
    const [scanned, setScanned] = useState(false);
    const [uriScan, setUri] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    if (!permissao) return <View />;
    if (!permissao.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissao}>Você precisa conceder permissão para usar a câmera</Text>
                <Button title='Pedir permissão' onPress={pedirPermissao} />
            </View>
        );
    }

    const tirarFoto = async () => {
        const fotoCapturada = await cameraRef.current?.takePictureAsync({ quality: 1 });
        setFoto(fotoCapturada);
    };

    const trocaCamera = () => {
        setFacing(facing === 'back' ? 'front' : 'back');
    };

    const salvarFoto = async () => {
        try {
            await MediaLibrary.saveToLibraryAsync(foto.uri);
            alert('Foto salva na galeria!');
        } catch (error) {
            console.error("Erro ao salvar a foto:", error);
            alert('Erro ao salvar a foto.');
        }
    };
    const confirmQrCodeScan = (data) => {
        setModalVisible(true);
        setUri(data);
    };

    const handleBarCodeScanned = () => {
        setScanned(true);
        //setUri(data);
        if (Linking.canOpenURL(uriScan.raw)) {
            Linking.openURL(uriScan.raw);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {foto ? (
                <>
                    <SafeAreaView style={styles.container}>
                        <Image source={{ uri: foto.uri }} style={styles.foto} />
                    </SafeAreaView>
                    <View style={styles.cancelar}>
                        <Pressable onPress={() => setFoto(null)} style={styles.excluir}>
                            <Ionicons
                                name="trash-sharp"
                                size={20}
                                color="white" />
                        </Pressable>
                    </View>
                    <View style={styles.salvar}>
                        <Pressable onPress={salvarFoto} style={styles.fotografar}>
                            <Feather
                                name="upload"
                                size={40}
                                color="white" />
                        </Pressable>
                    </View>
                </>
            ) : (
                <CameraView
                    facing={facing}
                    style={styles.camera}
                    ref={cameraRef}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    onBarcodeScanned={(data) => confirmQrCodeScan(data)}
                    >
                    <SafeAreaView style={styles.virar}>
                        <Pressable style={styles.hidden}>
                            <Ionicons
                                name="camera-reverse-sharp"
                                size={30}
                                color="white" />
                        </Pressable>
                        <Pressable
                            onPress={tirarFoto}
                            style={styles.fotografar}>
                            <Ionicons
                                name="camera"
                                size={40}
                                color="white" />
                        </Pressable>
                        <Pressable
                            onPress={trocaCamera}
                            style={styles.tirar}>
                            <Ionicons
                                name="camera-reverse-sharp"
                                size={30}
                                color="white" />
                        </Pressable>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Pressable onPress={handleBarCodeScanned}>
                                        <MaterialIcons
                                            name="qr-code-scanner"
                                            size={120}
                                            color="black"
                                        />
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setModalVisible(false)}
                                        style={styles.closeButton}
                                    >
                                        <Text style={styles.closeButtonText}>Fechar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </SafeAreaView>
                </CameraView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    permissao: {
        textAlign: 'center',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    foto: {
        height: '100%',
        width: '100%',
        position: 'relative',
    },
    virar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    fotografar: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        width: 82,
        height: 82,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 50,

    },
    tirar: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 50,

    },
    excluir: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 50,
    },
    cancelar: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        paddingTop: 6,
        paddingLeft: 6,
    },
    salvar: {

        flex: 1,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingBottom: 20,
    },
    hidden: {
        opacity: 0,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#69BA5D",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: "#FFF",
        fontSize: 16,
    },
});
