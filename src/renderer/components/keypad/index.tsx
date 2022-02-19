import { Box, Flex } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Key from '../key';

const KeyPad = () => {
  const device = useSelector((state: any) => state.devices.currentDevice);

  const buttons = useMemo(
    () =>
      Array(device.amountHorizontal * device.amountVertical)
        .fill({})
        .map((_, index) => ({ id: index })),
    [device]
  );

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100%"
      w="100%"
      overflow="auto"
    >
      <Box
        display="flex"
        flexDir="row"
        flexWrap="wrap"
        minW="624px"
        minH="321px"
        w="624px"
        h="321px"
        userSelect="none"
      >
        {buttons.map((button) => {
          return <Key key={button.id} button={button} />;
        })}
      </Box>
    </Flex>
  );
};

export default KeyPad;
