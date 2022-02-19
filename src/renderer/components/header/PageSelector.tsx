import {
  Icon,
  Box,
  Select,
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
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { IPage } from 'interfaces';
import { createPage, setCurrentPage } from 'renderer/redux/ducks/pages';
import { getKeysByPage } from 'renderer/redux/ducks/keys';
import TextInput from '../Form/TextInput';
import Form from '../Form';
import DeletePageButton from './DeletePageButton';

const PageSelector = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { currentDevice, pages, currentPage } = useSelector((state: any) => ({
    currentDevice: state.devices.currentDevice,
    pages: state.pages.items,
    currentPage: state.pages.currentPage,
  }));

  const form = useForm<any>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  const handleAddNewPage = useCallback(
    (values) => {
      const newPage = {
        deviceId: currentDevice?.id,
        ...values,
      };

      dispatch(createPage(newPage));
      onClose();
    },
    [currentDevice, dispatch, onClose]
  );

  const handleChangePage = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const pageId = event.target.value;

      const newPage = pages.find((p: IPage) => p.id === pageId);
      if (newPage) dispatch(setCurrentPage(newPage));

      dispatch(getKeysByPage(pageId));
    },
    [pages, dispatch]
  );

  return (
    <>
      <Box width={160}>
        <Select
          placeholder="Select a page"
          value={currentPage?.id}
          size="sm"
          onChange={handleChangePage}
        >
          {pages.map((p: IPage) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
      </Box>
      <DeletePageButton />
      <Button leftIcon={<Icon as={MdAdd} />} size="sm" onClick={onOpen}>
        Add Page
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form form={form} onSubmit={handleAddNewPage}>
              <TextInput
                name="name"
                label="Name"
                defaultValue=""
                maxLength={100}
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
              onClick={form.handleSubmit(handleAddNewPage)}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(PageSelector);
