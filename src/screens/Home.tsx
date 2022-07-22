import { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  IconButton,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";

import { Loading } from "../components/Loading";
import Logo from "../assets/logo_secondary.svg";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";
import { Button } from "../components/Button";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import firestore from "@react-native-firebase/firestore";

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { dateFormat } from "../utils/firestoreDateFormat";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const [statusSelector, setStatusSelector] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .then(() => {
        Alert.alert("Sair", "Você saiu com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Sair", "Não foi possível sair.");
      });
  }
  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelector)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          };
        });
        setOrders(data);
        setIsLoading(false);
      });
    return subscriber;
  }, [statusSelector]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={5}
      >
        <Logo />
        <IconButton
          pl={4}
          icon={<SignOut size={26} color={colors.green[700]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelector("open")}
            isActive={statusSelector === "open"}
          />
          <Filter
            type="closed"
            title="Finalizado"
            onPress={() => setStatusSelector("closed")}
            isActive={statusSelector === "closed"}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order
                data={item}
                onPress={() => {
                  handleOpenDetails(item.id);
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            // Quando a Lista tiver vazia
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não tem possui {"\n"}
                  Solicitações de chamado{" "}
                  {statusSelector === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button name="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
