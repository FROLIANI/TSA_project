import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";
import BottomNavigator from "../components/BottomNavigator";

const TableTitle = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>User Request</Text>
        </View>
    );
};

const TableHeader = () => {
    return (
        <View style={styles.tableHeader}>
            <Text style={styles.headerText}>UserId</Text>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Vendor</Text>
            <Text style={styles.headerText}>Reason</Text>
            <Text style={styles.headerText}>Verify</Text>
        </View>
    );
};

const TableRow = ({ vid, name, Date, Vendor, Reason }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

    const [isEditing, setIsEditing] = useState(false);

    const handleEditPress = () => {
        setIsEditing(!isEditing);
    };

    const handleAcceptPress = () => {
        // handle accept logic
    };

    const handleRejectPress = () => {
        // handle reject logic
    };

    return (
        <View style={styles.tableRow}>
            <Text style={styles.rowText}>{vid}</Text>
            <Text style={styles.rowText}>{Date}</Text>
            <Text style={styles.rowText}>{name}</Text>
            <Text style={styles.rowText}>{Vendor}</Text>
            <Text style={styles.rowText}>{Reason}</Text>
            {isEditing ? (
                <View style={styles.editButton}>
                    <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={handleAcceptPress}
                    >
                        <Text style={styles.editText} onPress={() => setIsOpen(!isOpen)}>
                            Confirm
                        </Text>
                        <AlertDialog
                            leastDestructiveRef={cancelRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header textAlign={"center"}>
                                    Confirm Request
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                    This Request will be accessed to be Granted!
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button.Group space={2}>
                                        <Button
                                            variant="unstyled"
                                            colorScheme="coolGray"
                                            onPress={onClose}
                                            ref={cancelRef}
                                        >
                                            Cancel
                                        </Button>
                                        <Button colorScheme="success" onPress={onClose}>
                                            Confirm
                                        </Button>
                                    </Button.Group>
                                </AlertDialog.Footer>
                            </AlertDialog.Content>
                        </AlertDialog>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={handleRejectPress}
                    >
                        <Text style={styles.editText} onPress={() => setIsOpen(!isOpen)}>
                            Reject
                        </Text>
                        <AlertDialog
                            leastDestructiveRef={cancelRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header textAlign={"center"}>
                                    Reject Request
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                    This Request will be denied to be Granted!
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                    <Button.Group space={2}>
                                        <Button
                                            variant="unstyled"
                                            colorScheme="coolGray"
                                            onPress={onClose}
                                            ref={cancelRef}
                                        >
                                            Cancel
                                        </Button>
                                        <Button colorScheme="danger" onPress={onClose}>
                                            Deny
                                        </Button>
                                    </Button.Group>
                                </AlertDialog.Footer>
                            </AlertDialog.Content>
                        </AlertDialog>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Text style={styles.editText}>Verify</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const Table = () => {
    const data = [
        {
            vid: "1",
            Date: "3/3/2023",
            name: "FROLIAN ",
            Vendor: "TIGO",
            Reason: "equip",
        },
        {
            vid: "2",
            Date: "3/3/2023",
            name: "benja ",
            Vendor: "halotel",
            Reason: "equip",
        },
        {
            vid: "3",
            Date: "3/3/2023",
            name: "suniasa",
            Vendor: "zain",
            Reason: "equip",
        },
        {
            vid: "4",
            Date: "3/3/2023",
            name: "noela ",
            Vendor: "voda",
            Reason: "equip",
        },
    ];

    return (
        <View style={styles.container}>
            <TableTitle />
            <TableHeader />
            {data.map((item, index) => (
                <TableRow
                    key={index}
                    vid={item.vid}
                    Date={item.Date}
                    name={item.name}
                    Vendor={item.Vendor}
                    Reason={item.Reason}
                />
            ))}
            <BottomNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        backgroundColor: "lightyellow",
        paddingVertical: 8,
        paddingHorizontal: 3,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "auto",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        alignItems: "center",
        borderBottomColor: "#ccc",
        paddingVertical: 10,
        borderTopColor: "green",
        paddingHorizontal: 10,
    },

    // borderRight: {
    //     borderWidth: 1,
    //   },
    rowText: {
        fontSize: 16,
    },
    editButton: {
        backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },

    acceptButton: {
        backgroundColor: "blue",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    rejectButton: {
        backgroundColor: "red",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 5,
    },
    editText: {
        color: "#fff",
        fontWeight: "bold",
    },
    titleContainer: {
        backgroundColor: "#f2f2f2",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
});

export default () => {
    return (
        <NativeBaseProvider>
            <Table />
        </NativeBaseProvider>
    );
};
