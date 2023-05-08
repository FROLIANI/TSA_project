import React from "react";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";

const Confirm = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);
    return <view>
     <Button colorScheme="success" onPress={() => setIsOpen(!isOpen)}>
            Confirm Request
        </Button>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header textAlign={'center'}>Confirm Request</AlertDialog.Header>
                <AlertDialog.Body>
                    This will approve the request
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="success" onPress={onClose}>
                            Confirm
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
        </view>
    
};

export default () => {
    return (
        <NativeBaseProvider>
            <Confirm />
        </NativeBaseProvider>
    );
};
