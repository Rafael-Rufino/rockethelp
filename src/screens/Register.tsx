import React, { useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Header } from "../components/Header/Index";

import { VStack } from "native-base";

export function Register() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleRegister() {
    console.log(title, description);
  }
  return (
    <VStack flex={1} bg="gray.600" p={6}>
      <Header title="Nova solicitação" />
      <Input placeholder="Número do patrimônio" onChangeText={setTitle} />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button name="Cadastrar" w="full" mt={5} onPress={handleRegister} />
    </VStack>
  );
}
