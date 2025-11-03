import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Card} from 'react-native-paper';

export default class Registro extends React.Component {
  render() {
    return (
      <View>
        <View>
          <View style={stylesRegitro.blocks}>
            <Card style={stylesRegitro.card}>
              <Card.Title title="Madeira"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem da madeira é crucial para a sustentabilidade ambiental, pois contribui diretamente para a preservação dos recursos naturais, a redução do desmatamento e a mitigação das mudanças climáticas. '}</Text>
              </Card.Content>
            </Card>

            <Card style={stylesRegitro.card}>
              <Card.Title title="Plástico"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem do plástico é crucial para o meio ambiente, a economia e a sociedade, pois reduz a poluição ao diminuir o descarte em aterros e oceanos, economiza recursos naturais (como petróleo e energia) e gera empregos e renda para milhares de pessoas'}</Text>
              </Card.Content>
            </Card>
          </View>

          <View style={stylesRegitro.blocks}>
            <Card style={stylesRegitro.card}> 
              <Card.Title title="Derivados de Borracha"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem de derivados de borracha, especialmente de pneus, é crucial por razões ambientais e econômicas, transformando um resíduo de difícil degradação em matéria-prima valiosa. '}</Text>
              </Card.Content>
            </Card>

            <Card style={stylesRegitro.card}>
              <Card.Title title="Materiais de Construção"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem de materiais de construção é vital para a sustentabilidade ambiental e econômica do setor. Ela reduz a extração de matérias-primas virgens e a quantidade de resíduos em aterros, preservando recursos naturais e ecossistemas'}</Text>
              </Card.Content>
            </Card>
          </View>

          <View style={stylesRegitro.blocks}>
            <Card style={stylesRegitro.card}>
              <Card.Title title="Metais"/>
              <Card.Content>
                <Text variant="bodyMedium">{'A reciclagem de metais é crucial para a sustentabilidade ambiental, pois reduz drasticamente a necessidade de mineração e o consumo de energia. Economicamente, impulsiona a economia circular, gerando empregos e conservando recursos valiosos. Em suma, é um processo vital que protege o planeta e otimiza o uso de materiais.'}</Text>
              </Card.Content>
            </Card>

            <Card style={stylesRegitro.card}>
              <Card.Title title="Contaminados"/>
              <Card.Content>
                <Text variant="bodyMedium">{'O descarte correto de resíduos contaminados é fundamental para proteger a saúde pública e preservar o meio ambiente, prevenindo a propagação de doenças e a contaminação do solo e da água.'}</Text>
              </Card.Content>
            </Card>
          </View>

        </View>
      </View>
    );
  }
}

const stylesRegitro = StyleSheet.create({
  card: { 
    flex: 1, 
    width: 150,
    height: 150,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f5f5f5ff", 
    borderCurve: 45
  },

  blocks:{
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingBlockStart: 30,
    placeholder: 40
  },
  text: { 
    color: "#fff", 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
});