import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomNavigator from '../components/BottomNavigator';

const TableTitle = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Vendor List</Text>
        </View>
    );
};


const TableHeader = () => {
    return (<View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.borderRight]}>Vendor Id</Text>
        <Text style={[styles.headerText, styles.borderRight]}>Vendor Name</Text>
        <Text style={[styles.headerText, styles.borderRight]}>Status</Text>
        <Text style={[styles.headerText, styles.borderRight]}>Edit</Text>
    </View>
    );
};

const TableRow = ({ vid, name, status }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditPress = () => {
        setIsEditing(!isEditing);
    };

    const handleDeletePress = () => {
        // handle delete logic
    };

    const handleActivatePress = () => {
        // handle activate logic
    };

    const handleUpdatePress = () => {
        // handle update logic
    };

    return (
        <View style={styles.tableRow}>
            <Text style={[styles.rowText, styles.borderRight]}>{vid}</Text>
            <Text style={[styles.rowText, styles.borderRight]}>{name}</Text>
            <Text style={[styles.rowText, styles.borderRight]}>{status}</Text>
            {isEditing ? (
                <View style={styles.editButton}>
                    <TouchableOpacity style={styles.activateButton} onPress={handleActivatePress}>
                        <Text style={styles.editText}>Activate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                        <Text style={styles.editText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePress}>
                        <Text style={styles.editText}>Update</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const Table = () => {
    const data = [
        { vid: '1', name: 'Tigo ', status: 'Active' },
        { vid: '2', name: 'Vodacom', status: 'Inactive' },
        { vid: '3', name: 'Halotel', status: 'Active' },
    ];

    return (
        <View style={styles.container}>
            <TableTitle />
            <TableHeader />
            {data.map((item, index) => (
                <TableRow key={index} vid={item.vid} name={item.name} status={item.status} />
            ))}
            <BottomNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
         
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        backgroundColor: 'lightyellow',
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'auto'
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        borderTopColor: 'green',
        paddingHorizontal: 10,
    },

    // borderRight: {
    //     borderWidth: 1, 
    //   },
    rowText: {
        fontSize: 16,
    },
    editButton: {
        backgroundColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },

    activateButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 5
    },
    updateButton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 5
    },
    editText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    titleContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Table;


