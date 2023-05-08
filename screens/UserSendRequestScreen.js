import react, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Heading, VStack, FormControl, Input, Button, Stack, Icon, NativeBaseProvider } from "native-base";
import BottomNavigator from "../components/BottomNavigator";

const Send = () => {
  const [inputValue, setInputValue] = useState("Value from onchanges");
  const handleCancel = () => {
    setInputValue("");
  };

  return <Box safeArea p="2" w="90%" maxW="290" py="8" marginLeft={10} >
    <Heading size="lg" color="coolGray.800" _dark={{
      color: "warmGray.50"
    }} fontWeight="semibold" >
      Send the Request
    </Heading>
    <Heading mt="1" color="coolGray.600" _dark={{
      color: "warmGray.200"
    }} fontWeight="medium" size="xs">
      Fill the request   
    </Heading>
    <VStack space={3} mt="5">
      <FormControl>
        <FormControl.Label>Date</FormControl.Label>
        <Input />
      </FormControl>

      <FormControl>
        <FormControl.Label>Name</FormControl.Label>
        <Input />
      </FormControl>
      <FormControl>
        <FormControl.Label>Vendor</FormControl.Label>
        <Input type="password" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Reason</FormControl.Label>
        <Input type="password" />
      </FormControl>


      <Stack direction={{
        base: "column",
        md: "row"
      }} space={4}>
        <Button variant="subtle" endIcon={<Icon as={Ionicons} size="sm" />}> Cancel</Button>
        <Button mt="2" colorScheme="indigo">Send </Button>
      </Stack>
    </VStack>
  </Box >

};

export default () => {
  return (
    <NativeBaseProvider>
      <Send />
      <BottomNavigator />
    </NativeBaseProvider>
  );
};
