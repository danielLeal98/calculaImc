import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  CheckBox
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {
  
  constructor(props){
    super(props);
    //this.state = {resultado: '', altura: 0, peso: 0, resultadoText:''};
    this.state = {altura:0,peso:0,resultado:0,resultadoText:"", grau:''}
    this.calculaImc = this.calculaImc.bind(this);
    this.limparDados = this.limparDados.bind(this);    
  }

  calculaImc(){  
    if(this.state.peso == 0 || this.state.altura == 0) {      
      Alert.alert('Atenção', 'Preencha o Campo por favor!');
      return false;
    } 
    let peso = parseFloat(this.state.peso);
    let altura = parseFloat(this.state.altura);
    let imc = peso / (altura * altura)
    let s = this.state   
    s.resultado = imc
    if (s.resultado < 18.5){
      s.resultadoText =' - Você está Abaixo do peso'
      s.grau = ' - Grau de Obesidade 0';
    }
    else if (s.resultado > 18.5 && s.resultado <= 25){
      s.resultadoText =' - Você está no Peso ideal';
      s.grau = ' - Grau de Obesidade 0';
    }
    else if (s.resultado > 25 && s.resultado <= 29.9){
      s.resultadoText =' - Você está Sobrepeso';
      s.grau = ' - Grau de Obesidade 1';
    }
    else if (s.resultado > 30 && s.resultado <= 39.9) {
      s.resultadoText =' - Você está com Obesidade';
      s.grau = ' - Grau de Obesidade 2';
    }
    else if (s.resultado > 40) {
      s.resultadoText =' - Você está com Obesidade Grave';
      s.grau = ' - Grau de Obesidade 3';
    }
    this.setState(s)
  }

    limparDados(){
      let s = this.state;    
      s.altura = 0;
      s.peso = 0;
      s.resultadoText = '';
      s.resultado = 0;   
      s.grau ='';   
      this.setState(s);
    }      
  
  render(){    
    return (
      <View style={styles.body}>
        <ImageBackground source={require('../calculaImc/imagens/background2.jpg')} style={styles.bgImage}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Calculo IMC </Text>                               
        </View>   
        <View style={styles.sectionIcon}>
          <Image source={require('../calculaImc/imagens/regua.png')} style={styles.reguaImg}></Image> 
       </View>
      
        <View style={styles.sectionContainer}>
          <Text style={styles.textInput}>Altura <Text style={styles.infoInputSmall}>(ex: 1.70)</Text></Text>            
            <TextInput autoCapitalize="none" style={styles.input} value={this.state.altura} keyboardType="numeric" placeholder="Altura"  onChangeText={(altura)=>{this.setState({altura})}}/>          
          <Text style={styles.textInput}>Peso <Text style={styles.infoInputSmall}>(ex: 69.2)</Text></Text>
            <TextInput autoCapitalize="none" style={styles.input} value={this.state.peso}  keyboardType="numeric"  placeholder="Quilos"  onChangeText={(peso)=>{this.setState({peso})}}/>  
        </View>

        <View style={styles.viewBotao}>        
          <Button title="Calcular" onPress={this.calculaImc} color="#428bca"/>   
          <Button title="Limpar"   onPress={this.limparDados} color="#ff3232"/>                
        </View>

        <View style={styles.sectionResult}>
            <Text style={styles.resultadoText1}>Seu IMC: {this.state.resultado.toFixed(2)}</Text> 
            <Text style={styles.resultadoText2}>{this.state.resultadoText}</Text> 
            <Text style={styles.resultadoText3}>{this.state.grau}</Text>
        </View>        
        </ImageBackground>
      </View>
     );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'transparent',
    flex:1   
  },
  bgImage:{
    flex: 1    
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems:'center'
    
  },
  sectionTitle: {
    fontSize: 30,    
    color: '#121111',
    justifyContent: 'center',
    textAlign: 'center'
  },
  sectionIcon:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputStyle: {  
    borderColor: '#121111',        
    width:500,
    margin: 20,  
    padding: 10, 
    alignContent:'center',    
    backgroundColor: '#DCDCDC',
    fontSize:17,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  reguaImg:{
    height:40,
    width:40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
    fontSize:25,    
    color:'#696969',
    fontWeight:'bold'    
  },
  infoInputSmall:{
    fontSize:12    
  },
  viewBotao: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:70,
    position: 'absolute',    
    left: 30, 
    right: 30, 
    bottom: 40
  },
  resultadoText1:{    
    fontSize:17,
    color:'#fff',
    margin:10,
    textAlign:'center'
  },
  resultadoText2:{
    fontSize:17,
    color:'#fff',
    margin:10,
    textAlign:'center'
  },
  resultadoText3:{
    fontSize:17,
    color:'#fff',
    margin:10,
    textAlign:'center'
  },
  sectionResult:{        
    justifyContent:'center',    
    backgroundColor:'#428bca',
    borderRadius:20,
    marginTop: 40,
    marginLeft:20,
    marginRight:20           
  }
});

