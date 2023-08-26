import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import { memo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteDevice } from 'renderer/redux/ducks/devices';

const DeleteWarnModal = ({ device }: { device: IDevice }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation('delete-warn');
  const cancelRef = useRef<any>();

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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('title')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('description')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>{t('cancel')}</Button>
              <Button colorScheme="red" onClick={handleRemoveDevice} ml={3}>
                {t('confirm')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default memo(DeleteWarnModal);
