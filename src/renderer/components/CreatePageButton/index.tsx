import {
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { createDevice } from 'renderer/redux/ducks/devices';
import Form from '../Form';
import TextInput from '../Form/TextInput';

const CreatePageButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const form = useForm<any>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  const handleCreateDevice = useCallback(
    (values) => {
      dispatch(createDevice(values));
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <>
      <Button leftIcon={<Icon as={MdAdd} />} size="sm" onClick={onOpen}>
        Create Device
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new device</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form form={form} onSubmit={handleCreateDevice}>
              <TextInput
                name="name"
                label="Name"
                defaultValue=""
                maxLength={100}
                size="md"
              />
              <TextInput
                type="number"
                name="amountVertical"
                label="Amount of keys vertically"
                defaultValue="4"
                size="md"
              />
              <TextInput
                type="number"
                name="amountHorizontal"
                label="Amount of keys horizontally"
                defaultValue="8"
                size="md"
              />
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              variant="solid"
              onClick={form.handleSubmit(handleCreateDevice)}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(CreatePageButton);
