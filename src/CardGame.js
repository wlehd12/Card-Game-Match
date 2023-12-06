import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { theme } from './theme';
import { useNavigation } from '@react-navigation/native';
import Task from './components/Task';
import GAMEDATA from './components/data';

const MAXCOUNT = 2;

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;

const Countdown = styled.Text`
    color: black;
    margin: 20px;
    padding: 20px;
    border-radius: 30px;
    font-size: 18px;
`;

const ButtonView = styled.View`
    flexDirection: row;
    padding: 20px;
    margin: 20px;
`
const REButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.BLUE};
    padding: 10px 20px;
    border-radius: 10px;
    margin: 20px;
`;

const REButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;

function    mixedCard() {
    let arraylist = Array.from({ length: 16 }, () => { return {} });
    let mix = [...GAMEDATA, ...GAMEDATA].sort(() => 0.5 - Math.random());
    if(arraylist) {
        arraylist.forEach((e, i) => {
            e.id = mix[i].id;
            e.item = mix[i].item;
            e.status = true;
            e.idx = i;
        });
    }
    return arraylist;
};

export default function CardGame() {
    const [count, setCount] = useState(MAXCOUNT);
    const [clicked, setClicked] = useState(Array.from([]));
    const [MixedCardList, setMixedCardList] = useState(() => mixedCard());
    const [isGameOverModalVisible, setGameOverModalVisible] = useState(false);
    const [GameStart, setGameStart] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMixedCardList((prevList) => {
                return prevList.map((e) => {
                    return { ...e, status: false };
                });
            });
        }, 300);
        setGameStart(true);
        return () => clearTimeout(timeoutId);
    }, []); 

    const reverseCard = (idx) => {
        setMixedCardList((prevList) => {
            return prevList.map((e) => {
                if (e.idx === idx) {
                    return { ...e, status: !e.status };
                }
                return e;
            });
        });
        setClicked((prevClicked) => [...prevClicked, idx]);
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };
    
    useEffect(() => {
        setTimeout(() => {
            if (clicked.length === 2 ) {
                let a = MixedCardList.find((e) => e.idx === clicked[0]).id;
                let b = MixedCardList.find((e) => e.idx === clicked[1]).id;
                if (a !== b) {
                    setMixedCardList((prevList) =>
                    prevList.map((card) =>
                        clicked.includes(card.idx) ? { ...card, status: false } : card )
                    );
                }
                setClicked([]);
            }
        }, 200)
    }, [clicked]);

    useEffect(() => {
        if ((GameStart === true &&  MixedCardList.every((e) => e.status === true)) || count === 0) {
          setTimeout(() => {
            setGameOverModalVisible(true);
            setGameStart(false);
          }, 200);
        }
    }, [clicked]);
            

    const handleRestart = () => {
        console.log('Restart Pressed');
        setCount(MAXCOUNT);
        setClicked([]);
        setMixedCardList(mixedCard());
        setGameOverModalVisible(false); 
        setGameStart(false);
        setTimeout(()=>{
            setMixedCardList((prevList) => {
            return prevList.map((e) => {
                return { ...e, status: false };
            });
        });},300);
    };

    const handleCancel = () => {
        setGameOverModalVisible(false);
        console.log('Cancel Pressed');
        navigation.goBack();
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Title>Card Math Game</Title>
                <FlatList
                    data={MixedCardList}
                    keyExtractor={(item) => `${item.idx}-${item.item}`}
                    renderItem={({ item }) => (     
                        <Task
                            data={item}
                            reverseCard={clicked.length < 2 ? reverseCard : null}
                        />
                    )}
                    numColumns={4}
                />
                <Countdown>Countdown : {count} </Countdown>
                <ButtonView>
                    <REButton onPress={handleRestart}>
                        <REButtonText>Restart</REButtonText>
                    </REButton>
                    <REButton onPress={handleCancel}>
                        <REButtonText>Cancel</REButtonText>
                    </REButton>
                </ButtonView>
                <Modal isVisible={isGameOverModalVisible}>
                    <Title>Game Over</Title>
                    <ButtonView> 
                        <REButton onPress={handleRestart}>
                            <REButtonText>Restart</REButtonText>
                        </REButton>
                        <REButton onPress={handleCancel}>
                            <REButtonText>Cancel</REButtonText>
                        </REButton>
                    </ButtonView>
                </Modal>
            </Container>
        </ThemeProvider>
    );
}