import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import {
    StyleSheet, Text, View,
    Dimensions, ScrollView, Image,
    ImageBackground, TouchableOpacity,
    SafeAreaView, Modal
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class home extends Component {
    constructor(props) {
        super(props);
        // this.random = this.random.bind(this);
        // this.reset = this.reset.bind(this);
        // this.closeCard = this.closeCard.bind(this);
        // this.matchCards = this.matchCards.bind(this);
        // this.setModalVisible = this.setModalVisible.bind(this)
        this.state = {
            alphaArray: [],
            openCard: [],
            matchedCards: [],
            card1: null,
            card2: null,
            cardIndex1: null,
            cardIndex2: null,
            totalMoves: 0,
            modalVisible: false
        };
    }

    // Trigger on restart click to reset the game
    setModalVisible = (visible) => {
        this.state.modalVisible = visible
        this.setState({ ...this.state })
    }

    // Trigger on App launch
    componentDidMount() {
        this.random()
    }

    // randomizes cards in array
    random = () => {
        var arr1 = [];
        var arr2 = [];
        var possible = "abcdefgh"

        while (arr1.length < 8) {
            var r = Math.floor(Math.random() * 8) + 1;
            if (arr1.indexOf(r) === -1) arr1.push(r);
        }
        while (arr2.length < 8) {
            var r = Math.floor(Math.random() * 8) + 1;
            if (arr2.indexOf(r) === -1) arr2.push(r);
        }
        arr1.map((s) => {
            this.state.alphaArray.push(possible.charAt(s - 1));
        })
        arr2.map((s) => {
            this.state.alphaArray.push(possible.charAt(s - 1));
        })
        this.setState({ ...this.state })
    }

    // On tapping card
    onOpenClick = (data) => {
        if (this.state.openCard.length == 0) {
            this.state.openCard.push(data.index)
            this.state.card1 = data.name
            this.state.cardIndex1 = data.index
            this.setState({ ...this.state })
        } else if (this.state.openCard.length == 1) {
            this.state.openCard.push(data.index)
            this.state.card2 = data.name
            this.state.cardIndex2 = data.index
            this.state.totalMoves = this.state.totalMoves + 1
            this.setState({ ...this.state })
            this.matchCards()
        }
    }

    // Compare opened cards
    matchCards = () => {
        if (this.state.card1 != null && this.state.card2 != null) {
            if (this.state.card1 == this.state.card2) {
                this.state.matchedCards.push(this.state.cardIndex1)
                this.state.matchedCards.push(this.state.cardIndex2)
                this.state.card1 = null
                this.state.card2 = null
                this.state.cardIndex1 = null
                this.state.cardIndex2 = null
                this.state.openCard = []
                this.setState({ ...this.state })
                if (this.state.matchedCards.length == 16) {
                    this.state.modalVisible = true
                    this.setState({ ...this.state })
                }
            } else {
                setTimeout(this.closeCard, 500);
            }
        }
    }

    // Trigger when card didn't matched
    closeCard = () => {
        this.state.card1 = null;
        this.state.card2 = null;
        this.state.cardIndex1 = null;
        this.state.cardIndex2 = null;
        this.state.openCard = [];
        this.setState({ ...this.state })
    }

    // Reset game on reset button click
    reset = () => {
        this.state.card1 = null;
        this.state.card2 = null;
        this.state.cardIndex1 = null;
        this.state.cardIndex2 = null;
        this.state.openCard = [];
        this.state.matchedCards = [];
        this.state.totalMoves = 0;
        this.state.modalVisible = false
        this.state.alphaArray = []
        this.setState({ ...this.state })
        this.random()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../assets/bg.jpeg')} resizeMode="cover" style={styles.container}>
                    <View style={styles.banner}>
                        <Image
                            style={styles.logo}
                            source={require('../assets/memoryIcon.png')}
                        />
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {this.state.alphaArray.length != 0 ? this.state.alphaArray.map((name, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.card} onPress={() => this.state.matchedCards.includes(index) != true ?
                                    this.state.openCard.includes(index) != true ?
                                        this.onOpenClick({ name: name, index: index }) : "" : ""}>
                                    {this.state.matchedCards.includes(index) == true ?
                                        <Image
                                            style={styles.tinyLogo}
                                            source={name == 'a' ? require(`../assets/cards/a.png`) :
                                                name == 'b' ? require(`../assets/cards/b.png`) :
                                                    name == 'c' ? require(`../assets/cards/c.png`) :
                                                        name == 'd' ? require(`../assets/cards/d.png`) :
                                                            name == 'e' ? require(`../assets/cards/e.png`) :
                                                                name == 'f' ? require(`../assets/cards/f.png`) :
                                                                    name == 'g' ? require(`../assets/cards/g.png`) :
                                                                        name == 'h' ? require(`../assets/cards/h.png`) :
                                                                            require(`../assets/cards/a.png`)
                                            }
                                        />
                                        :
                                        this.state.openCard.includes(index) == true ?
                                            <Image
                                                style={styles.tinyLogo}
                                                source={name == 'a' ? require(`../assets/cards/a.png`) :
                                                    name == 'b' ? require(`../assets/cards/b.png`) :
                                                        name == 'c' ? require(`../assets/cards/c.png`) :
                                                            name == 'd' ? require(`../assets/cards/d.png`) :
                                                                name == 'e' ? require(`../assets/cards/e.png`) :
                                                                    name == 'f' ? require(`../assets/cards/f.png`) :
                                                                        name == 'g' ? require(`../assets/cards/g.png`) :
                                                                            name == 'h' ? require(`../assets/cards/h.png`) :
                                                                                require(`../assets/cards/a.png`)
                                                }
                                            />
                                            :
                                            <Image
                                                style={styles.tinyLogoFront}
                                                source={require(`../assets/memoryIcon.png`)}
                                            />
                                    }
                                </TouchableOpacity>
                            )
                        }) :
                            <View style={styles.loader}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require(`../assets/loader.gif`)}
                                />
                            </View>
                        }
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <View onPress={() => this.reset()} style={styles.resetView}>
                            <Text>TURNS : {this.state.totalMoves}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.reset()} style={styles.resetView}>
                            <Text style={styles.reset}>RESET</Text>
                        </TouchableOpacity>
                        <View onPress={() => this.reset()} style={styles.resetView}>
                            <Text>MATCHED : {this.state.matchedCards.length / 2}</Text>
                        </View>
                    </View>

                    <StatusBar style="auto" />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.modelSuccess}>
                            <View style={styles.successModelGif}>
                                <Image
                                    style={styles.successGif}
                                    source={require(`../assets/success.gif`)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.reset()} style={styles.resetView}>
                                <Text style={styles.reset}>RESTART</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around',
        width: windowWidth,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: "wrap",
        marginTop: 10
    },
    banner: {
        width: "100%",
        height: (windowHeight / 5) * 0.5,
        padding: 5
    },
    card: {
        width: windowWidth / 5,
        height: windowWidth / 4,
        margin: '1%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 1
    },
    flatContainer: {
        flex: 1,
        marginVertical: 20,
        backgroundColor: "#fff"
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        resizeMode: "cover"
    },
    tinyLogoFront: {
        width: '100%',
        height: '100%',
        resizeMode: "contain"
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: "contain"
    },
    turns: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 1,
        margin: 2,
        padding: 2
    },
    reset: {
        fontSize: 20,
    },
    resetView: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modelSuccess: {
        backgroundColor: "#000",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    successModelGif: {
        height: windowWidth / 1.5,
        width: windowWidth / 1.5,
    },
    successGif: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    loader: {
        height: windowWidth / 2,
        width: windowWidth / 2,
        backgroundColor: "#f2f2f2",
        borderRadius: 1
    }
});

export default home
