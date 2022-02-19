import { Icon, Flex, Spacer, Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { MdNavigateBefore } from 'react-icons/md';
import { useNavigate } from 'react-router';

import PageSelector from './PageSelector';
import PairDeckButton from './PairDeckButton';

const Header = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Flex w="100%" backgroundColor="gray.900" p={2} flexDir="row" gap={2}>
      <Button
        leftIcon={<Icon as={MdNavigateBefore} />}
        size="sm"
        onClick={goBack}
      >
        Go Back
      </Button>
      <PairDeckButton />
      <Spacer flex={1} />
      <PageSelector />
    </Flex>
  );
};

export default Header;
