import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from './styles';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ResultScreen from './CardGame';

const Stack = createStackNavigator();

const App = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Card Match Game">
          {() => {
            const navigation = useNavigation();

            const handleButtonPress = (buttonID) => {
              setSelectedButton(buttonID);
              const buttonTexts = {
                D1: '난이도: 하, 그림의 페어를 맞추십시오',
                D2: '난이도: 중, 페어를 맞추는 순서도 존재합니다',
                D3: '난이도: 상, 매우 어려움',
              };
              setResult(buttonTexts[buttonID]);
            };

            const handleFooterPress = () => {
              if (selectedButton !== null) {
                setResult(null);
                // 결과 화면으로 이동
                navigation.navigate('Result', { result: `ID: ${selectedButton}` });
              } else {
                setResult(null);
              }
            };

            return (
              <View style={commonStyles.container}>
                {/* 헤더 */}
                <View style={commonStyles.header}>
                  {['D1', 'D2', 'D3'].map((buttonID, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        commonStyles.button,
                        selectedButton === buttonID && { backgroundColor: 'lightgreen', height: 40 },
                      ]}
                      onPress={() => handleButtonPress(buttonID)}
                    >
                      <Text style={commonStyles.buttonText}>{`${buttonID}`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 중단 */}
                <View style={commonStyles.section}>
                  <Text style={commonStyles.sectionButton}>{result}</Text>
                </View>

                {/* 푸터 */}
                <View style={commonStyles.footer}>
                  <TouchableOpacity
                    style={[
                      commonStyles.footerButton,
                      { width: '50%', height: 60, marginTop: -10 },
                    ]}
                    onPress={handleFooterPress}
                  >
                    <Text style={[commonStyles.buttonText]}>게임 시작</Text>
                  </TouchableOpacity>
                </View>

                {/* 결과 출력 */}
                { result && (
                  <View style={commonStyles.resultContainer}>
                    <Text style={[commonStyles.resultText]}>버튼을 누르면 게임이 시작됩니다!</Text>
                  </View>
                )} 
              </View>
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;