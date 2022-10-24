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
import { useTranslation } from 'react-i18next';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';
import { createDevice } from 'renderer/redux/ducks/devices';
import Form from '../Form';
import TextInput from '../Form/TextInput';

const CreatePageButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('create-page-button');

  const dispatch = useDispatch();

  const form = useForm<any>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  const handleClose = useCallback(() => {
    form.reset();
    onClose();
  }, [form, onClose]);

  const handleCreateDevice = useCallback(
    (values) => {
      dispatch(createDevice(values));
      handleClose();
    },
    [dispatch, handleClose]
  );

  return (
    <>
      <Button leftIcon={<Icon as={MdAdd} />} size="sm" onClick={onOpen}>
        {t('create_device')}
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('create_new_device')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form form={form} onSubmit={handleCreateDevice}>
              <TextInput
                name="name"
                label={t('label.name')}
                defaultValue=""
                maxLength={100}
                size="md"
              />
              <TextInput
                type="number"
                name="amountVertical"
                label={t('label.amount_vertically')}
                defaultValue="4"
                size="md"
              />
              <TextInput
                type="number"
                name="amountHorizontal"
                label={t('label.amount_horizontally')}
                defaultValue="8"
                size="md"
              />
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleClose} variant="outline">
              {t('cancel')}
            </Button>
            <Button
              variant="solid"
              onClick={form.handleSubmit(handleCreateDevice)}
            >
              {t('create')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(CreatePageButton);
