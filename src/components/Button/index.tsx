import { Button as NativeBaseButton, Heading, IButtonProps } from "native-base";

type IButtonPropsType = IButtonProps & {
  name: string;
};

export function Button({ name, ...rest }: IButtonPropsType) {
  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      rounded="sm"
      fontSize="sm"
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {name}
      </Heading>
    </NativeBaseButton>
  );
}
