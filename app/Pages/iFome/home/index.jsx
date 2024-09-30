import React, { useContext,useState,useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet, FlatList } from "react-native-web";
import { AppContext } from "../../../../scripts/appContext";
import { Link } from "expo-router";

const produtos = [
    {
        id: '1',
        nome: 'Mc Lanche Feliz',
        estabelecimento: 'Mc Donalds',
        preco: 27.90,
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMY5vnXQ1cHEJjuY9hKbxu0zz9IAhclihuUQ&s',
    },
    {
        id: '2',
        nome: 'Wrap Crunhc',
        estabelecimento: 'KFC',
        preco: 8.90,
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD9q1m3wdlFu3HpNUx5UaU1xT__57_AZkpWQ&s',
    },
];

const Produtos = ({ item, onAddToCart }) => (
    <View style={styles.produtoContainer}>
        <Image source={{ uri: item.imagem }} style={styles.produtoImagem} />
        <View style={styles.produtoInfo}>
            <Text style={styles.produtoNome}>{item.nome}</Text>
            <Text style={styles.produtoEstabelecimento}>{item.estabelecimento}</Text>
            <Text style={styles.produtoPreco}>R${item.preco.toFixed(2).replace('.', ',')}</Text>
            <Pressable style={styles.comprarButton} onPress={() => onAddToCart(item)}>
                <Text style={styles.comprarButtonText}>Comprar</Text>
            </Pressable>
        </View>
    </View>
);

export default function App() {
    const { cart, setCart } = useContext(AppContext);
    const [cartLenght, setCartLength] = useState(0)

    const pushCart = (item) => {
        setCart(prevCart => [...prevCart, item]);
        console.log(cart);
    };

    useEffect(() => { if (cart.length) { setCartLength(cart.length); } console.log(cart.length) }, [cart])



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>iFome</Text>
            </View>
            <View style={styles.carrinho}>
                <Link href='../cart'>
                    <Image source={{ uri: '../../assets/images/cart.png' }} style={styles.carrinhoImagem} />
                </Link>
                <Text style={styles.carrinhoTexto}>{`${cartLenght} produtos`}</Text>
            </View>
            <FlatList
                data={produtos}
                renderItem={({ item }) => <Produtos item={item} onAddToCart={pushCart} />}
                keyExtractor={item => item.id}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5DD08F',
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
    },
    carrinho: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'flex-end',
    },
    carrinhoImagem: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    carrinhoTexto: {
        fontSize: 16,
    },
    flatList: {
        marginTop: 10,
    },
    produtoContainer: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    produtoImagem: {
        width: 100,
        height: 100,
        marginRight: 15,
    },
    produtoInfo: {
        flex: 1,
    },
    produtoNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    produtoEstabelecimento: {
        fontSize: 14,
        color: '#666',
    },
    produtoPreco: {
        fontSize: 16,
        color: '#000',
        marginVertical: 5,
    },
    comprarButton: {
        backgroundColor: '#5DD08F',
        padding: 10,
        borderRadius: 5,
    },
    comprarButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});