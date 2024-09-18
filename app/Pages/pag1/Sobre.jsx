import React from "react";
import { Text, View, Image, TextInput, Button, StyleSheet } from "react-native";
import { Link } from 'expo-router';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Image: {
        margin: 30,
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    navbar: {
        backgroundColor: '#5DD08F',
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 40
    },
    desc: {
        margin: 20,
        textAlign: 'justify',
    },
    botao: {
        marginTop:50,
        textAlign:'center',
        borderRadius:10,
        padding:20,
        width:100,
        backgroundColor: '#5DD08F'
    },
    box2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly'

    }


})

export default Sobre = function () {
    return (
        <View>
            <View style={style.navbar}>
                <Text style={style.title}>Sobre mim</Text>
            </View>
            <View style={style.box}>
                <Image
                    style={style.Image}
                    source={require('../../../assets/images/woody.jpg')}
                />
                <Text style={style.desc}>
                    Meu nome é Higor e tenho 18 anos. Sou um grande fã de videogames, especialmente de Rainbow Six
                    Siege e Valorant, onde gosto de me desafiar e melhorar minhas habilidades. Além de me dedicar
                    aos jogos, também me empenho bastante em treinar e manter uma boa forma física. Adoro o
                    equilíbrio entre o mundo virtual e o físico, e sempre estou buscando novos desafios e formas de
                    me desenvolver.
                </Text>
            </View>
            <View style={style.box2}>
                <Link href="/Pages/pag2/Viagens" style={style.botao}>
                    <Text>Viagens</Text>
                </Link>
                <Link href="/Pages/pag3/Jogos" style={style.botao}>
                    <Text >Jogos</Text>
                </Link>
            </View>
        </View>
    );
};