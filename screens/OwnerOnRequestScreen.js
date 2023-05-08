import React, { Component } from "react";
import {
  VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import BottomNavigator from "../components/BottomNavigator";

function AppBar() {
  return (
    <>
      <StatusBar bg="grey" barStyle="light-content" w="full" />
      <Box safeAreaTop bg="grey" />
      <HStack
        bg="#0891b2"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="400"
      >
        <HStack alignItems="center">
          <IconButton
            icon={
              <Icon size="md" as={MaterialIcons} name="menu" color="white" />
            }
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            Owner Request List
          </Text>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="notifications"
                size="md"
                color="white"
              />
            }
          />
          <IconButton
            icon={
              <Icon as={MaterialIcons} name="search" size="md" color="white" />
            }
          />
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="more-vert"
                size="md"
                color="white"
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
}

function SecondHeader() {
  return <h2 style={styles.description}>Available Owner list</h2>;
}

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["DATE", "USER", "VENDOR", "REASON", "STATUS"],
      tableData: [
        ["1/1/2023", "Frolian Ernest", "Tigo", "reason", ""],
        ["1/1/2023", "Frolian Ernest", "voda", "reason", ""],
        ["1/1/2023", "Frolian Ernest", "TTCL", "reason", ""],
        ["1/1/2023", "Frolian Ernest", "Halotel", "reason", ""],
      ],
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>View</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#c8e1ff" }}>
          <TableWrapper style={{ width: "104%" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            {state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 4 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    color: "grey",
    marginTop: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#fff",
    width: "100%",
  },

  head: {
    height: 40,
    backgroundColor: "#808B97",
  },

  text: {
    margin: 6,
  },

  row: {
    flexDirection: "row",
    backgroundColor: "#FFF1C1",
  },

  btn: {
    width: 70,
    height: 30,
    backgroundColor: "blue",
    borderRadius: 2,
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: "25",
  },
});
function Title() {
  return (
    <Center>
      <AppBar />
    </Center>
  );
}
export default () => {
  return (
    <NativeBaseProvider>
      <Title />
      <SecondHeader />
      <TableList />
      <BottomNavigator />
    </NativeBaseProvider>
  );
};
