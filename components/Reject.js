import React from "react";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";

const Reject = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);
    return <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header textAlign={'center'}>Reject Request</AlertDialog.Header>
                <AlertDialog.Body>
                    This will reject request

                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={onClose}>
                            Deny
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
  
};

export default () => {
    return (
        <NativeBaseProvider>
            <Reject />
        </NativeBaseProvider>
    );
};
