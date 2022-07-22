import { CaretLeft } from "phosphor-react-native";

import {
  HStack,
  IconButton,
  useTheme,
  Heading,
  StyledProps,
} from "native-base";

import { useNavigation } from "@react-navigation/native";

type IProps = StyledProps & {
  title: string;
};
export function Header({ title, ...rest }: IProps) {
  const navigation = useNavigation();

  const { colors } = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pt={12}
      pb={6}
      {...rest}
    >
      <IconButton
        icon={<CaretLeft size={24} color={colors.green[200]} />}
        onPress={handleGoBack}
      />
      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
}
