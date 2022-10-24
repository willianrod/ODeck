import { Box, Flex } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { IDevice } from 'interfaces';
import Key from '../key';

const KEY_SIZE_IN_PIXELS = 70 + 8; // SIZE + MARGIN
const KEYPAD_SIZE_IN_PIXELS = 400;

const KeyPad = () => {
  const device = useSelector(
    (state: any) => state.devices.currentDevice
  ) as IDevice;

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
      h={KEYPAD_SIZE_IN_PIXELS}
      w="100%"
      overflow="auto"
    >
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${device.amountHorizontal}, minmax(${KEY_SIZE_IN_PIXELS}px, 1fr))`}
        gridTemplateRows={`repeat(${device.amountVertical}, minmax(${KEY_SIZE_IN_PIXELS}px, 1fr))`}
        userSelect="none"
        height={
          device.amountVertical * KEY_SIZE_IN_PIXELS > KEYPAD_SIZE_IN_PIXELS
            ? KEYPAD_SIZE_IN_PIXELS
            : undefined
        }
        overflow="auto"
      >
        {buttons.map((button) => {
          return <Key key={button.id} button={button} />;
        })}
      </Box>
    </Flex>
  );
};

export default KeyPad;
