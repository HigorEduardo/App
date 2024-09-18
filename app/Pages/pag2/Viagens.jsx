import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

const Jogos = () => {
    return (
        <View style={style.container}>
            <View style={style.navb}>
               
                <Text style={style.textoT}>Viagens que quero fazer</Text>
            </View>
            <ScrollView contentContainerStyle={style.box}>
                <View style={style.box3}>
                    <View style={style.box2}>
                        <Image style={style.img} source={require('../../../assets/images/tokyo.jpg')} />
                        <View style={style.boxT}>
                            <Text style={style.P1}>Tokyo - Japão</Text>
                            <Text style={style.P2}>Templo Senso-ji</Text>
                        </View>
                    </View>

                    <View style={style.box2}>
                        <Image style={style.img} source={require('../../../assets/images/madrid.jpg')} />
                        <View style={style.boxT}>
                            <Text style={style.P1}>Madrid - Espanha</Text>
                            <Text style={style.P2}>Museu do Prado</Text>
                        </View>
                    </View>
                    <View style={style.box2}>
                        <Image style={style.img} source={require('../../../assets/images/bueno.jpg')} />
                        <View style={style.boxT}>
                            <Text style={style.P1}>Buenos Aires - Argentina</Text>
                            <Text style={style.P2}>Caminito</Text>
                        </View>
                    </View>
                    <View style={style.box2}>
                        <Image style={style.img} source={require('../../../assets/images/paris.jpg')} />
                        <View style={style.boxT}>
                            <Text style={style.P1}>Paris - França</Text>
                            <Text style={style.P2}>Torre Eiffel</Text>
                        </View>
                    </View>
                    <View style={style.box2}>
                        <Image style={style.img} source={require('../../../assets/images/moscow.jpg')} />
                        <View style={style.boxT}>
                            <Text style={style.P1}>Moscow - Russia</Text>
                            <Text style={style.P2}>Praça Vermelha</Text>
                        </View>
                    </View>
                    <View style={style.box2}>
                        <Image style={style.img} source={require('../../../assets/images/hong kong.jpg')} />
                        <View style={style.boxT}>
                            <Text style={style.P1}>Hong Kong - China</Text>
                            <Text style={style.P2}> Victoria Peak</Text>
                        </View>
                    </View>
                    <View style={style.box2}>
                        <Image style={style.img} source={require('../../../assets/images/cancun.jpg')} />
                        <View style={style.boxT}>
                            <Text style={style.P1}>Cancún - México</Text>
                            <Text style={style.P2}>Zona Hoteleira</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Jogos

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    navb: {
        width: '100%',
        height: 60,
        backgroundColor: '#5DD08F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    textoT: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    box: {
        flex: 1,
        padding: 20,
    },
    box2: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    box3: {
        marginBottom: 20
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 20,
    },
    boxT: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    P1: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    P2: {
        color: 'black',
        fontSize: 15,
        marginTop: 5,
    },
});