import React, { useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header/Index";

import { VStack } from "native-base";
import { Alert } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  function handleNewRegister() {
    if (!patrimony || !description) {
      return Alert.alert("Register", "Preencha todos os campos.");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possivel registrar o pedido."
        );
      });
  }
  return (
    <VStack flex={1} bg="gray.600" p={6}>
      <Header title="Nova solicitação" />
      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={(text) => setPatrimony(text)}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={(text) => setDescription(text)}
      />

      <Button
        isLoading={isLoading}
        name="Cadastrar"
        w="full"
        mt={5}
        onPress={handleNewRegister}
      />
    </VStack>
  );
}
