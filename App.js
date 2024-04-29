import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Share,
  Pressable,
  Keyboard,
  FlatList,
} from "react-native";

export default function App() {
  const [peso, setPeso] = useState(null);
  const [altura, setAltura] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [imc, setImc] = useState(null);
  const [imcList, setImcList] = useState([]);

  const calculaImc = () => {
    const resultado = (peso / (altura * 2)).toFixed(2);
    setImcList((array) => [
      ...array,
      { id: new Date().getTime(), total: resultado },
    ]);
    setImc(resultado);

    limpar();
    Keyboard.dismiss();
  };

  const validaValores = () => {
    if (!peso || !altura) {
      setMensagem("Preencha todos os campos");
      setImc(null);
      Vibration.vibrate();
      return;
    }

    calculaImc();
    limpar();
  };

  const limpar = () => {
    setMensagem(null);
    setAltura(null);
    setPeso(null);
  };

  const onShare = async () => {
    await Share.share({
      message: "Meu IMC hoje: " + imc,
    });
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.textTitle}>Onebit Health</Text>
      </View>

      <View style={styles.containerForm}>
        {mensagem ? (
          <Text style={styles.message}>{mensagem}</Text>
        ) : (
          <Text></Text>
        )}
        <Text>Peso</Text>
        <TextInput
          style={styles.input}
          placeholder="Degite seu peso"
          keyboardType="number-pad"
          onChangeText={setPeso}
          value={peso}
        />

        <Text>Altura</Text>
        <TextInput
          style={styles.input}
          placeholder="Degite sua altura"
          keyboardType="number-pad"
          onChangeText={setAltura}
          value={altura}
        />

        <TouchableOpacity style={styles.button} onPress={() => validaValores()}>
          <Text style={styles.textButton}>Calcular</Text>
        </TouchableOpacity>

        {imc ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultMessage}>O seu ICM é</Text>
            <Text style={styles.result}>{imc}</Text>
            <TouchableOpacity onPress={onShare} style={styles.button}>
              <Text style={styles.textButton}>Compartilhar</Text>
            </TouchableOpacity>

            <FlatList
              style={styles.listIcm}
              data={imcList.reverse()}
              renderItem={({ item }) => {
                return (
                  <Text style={styles.listIcmText}>
                    Resultado IMC = {item.total}
                  </Text>
                );
              }}
              keyExtractor={(item) => {
                item.id;
              }}
            />
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e5e5",
    paddingTop: 80,
  },

  boxTitle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  textTitle: {
    color: "#ff0043",
    fontSize: 24,
    fontWeight: "bold",
  },

  containerForm: {
    width: "100%",
    height: "100%",
    bottom: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 30,
    padding: 40,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    gap: 10,
  },

  input: {
    backgroundColor: "#e0e5e5",
    width: "100%",
    height: 40,
    padding: 10,
    borderRadius: 10,
  },

  button: {
    backgroundColor: "#ff0043",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 40,
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },

  textButton: {
    fontSize: 20,
    color: "#fff",
  },

  message: {
    color: "#ff0043",
    fontWeight: "bold",
    marginBottom: 20,
  },

  containerResult: {
    marginTop: 20,
    backgroundColor: "#ff0043",
  },

  result: {
    fontSize: 50,
    color: "#ff0043",
    marginTop: 30,

    textAlign: "center",
  },

  resultMessage: {
    fontSize: 20,
    color: "#ff0043",
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
  },

  resultContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: -10,
    marginTop: 40,
    width: "100%",
  },

  listIcm: {
    marginTop: 50,
  },

  listIcmText: {
    color: "red",
  },
});
