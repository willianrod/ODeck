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
import { memo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { deletePage } from 'renderer/redux/ducks/pages';

const DeletePageButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const cancelRef = useRef();

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
        Delete Page
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you sure you want to delete this page?
            </AlertDialogHeader>

            <AlertDialogBody>This action cannot be undone.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeletePage} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default memo(DeletePageButton);
