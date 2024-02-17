import { Box, Flex, Grid } from '@chakra-ui/layout';
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
    <Box overflow="auto" height="100%" bgColor="chakra-body-bg">
      <Flex
        justifyContent="center"
        alignItems="center"
        h={device.amountVertical * KEY_SIZE_IN_PIXELS + 100}
        w="100%"
        overflow="auto"
      >
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${device.amountHorizontal}, minmax(${KEY_SIZE_IN_PIXELS}px, 1fr))`}
          gridTemplateRows={`repeat(${device.amountVertical}, minmax(${KEY_SIZE_IN_PIXELS}px, 1fr))`}
          userSelect="none"
          height="fit-content"
          bgColor="chakra-body-bg"
        >
          {buttons.map((button) => {
            return <Key key={button.id} button={button} />;
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default KeyPad;
