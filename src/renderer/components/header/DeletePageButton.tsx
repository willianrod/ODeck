import {
  Icon,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { deletePage } from 'renderer/redux/ducks/pages';

const DeletePageButton = () => {
  const { t } = useTranslation('header');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const cancelRef = useRef<any>();

  const { currentPage } = useSelector((state: any) => ({
    currentPage: state.pages.currentPage,
  }));

  const handleDeletePage = useCallback(() => {
    dispatch(deletePage(currentPage));
    onClose();
  }, [currentPage, onClose, dispatch]);

  return (
    <>
      <Button
        disabled={currentPage?.main}
        colorScheme="red"
        leftIcon={<Icon as={MdDelete} />}
        size="sm"
        onClick={onOpen}
      >
        {t('delete_page')}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('dialog.delete_title')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('dialog.delete_description')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('dialog.cancel')}
              </Button>
              <Button colorScheme="red" onClick={handleDeletePage} ml={3}>
                {t('dialog.delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default memo(DeletePageButton);
