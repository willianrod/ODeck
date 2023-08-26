import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { IDevice } from 'interfaces';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteDevice } from 'renderer/redux/ducks/devices';

const DeleteWarnModal = ({ device }: { device: IDevice }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('delete-warn');

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleRemoveDevice = useCallback(() => {
    dispatch(deleteDevice(device));
  }, [dispatch, device]);

  return (
    <>
      <Button size="sm" variant="ghost" colorScheme="red" onClick={onOpen}>
        {t('delete')}
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('warn')}</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button
              variant="outline"
              onClick={handleRemoveDevice}
              colorScheme="red"
            >
              {t('confirm')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(DeleteWarnModal);
