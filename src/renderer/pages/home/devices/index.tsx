import { useCallback } from 'react';
import { Box, Flex, Text, Button, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IDevice } from 'interfaces';
import { useNavigate } from 'react-router-dom';
import { selectDevice } from 'renderer/redux/ducks/devices';
import CreatePageButton from 'renderer/components/CreatePageButton';
import DeleteWarnModal from 'renderer/components/DeleteWarnModal';

const Devices = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const devices = useSelector((state: any) => state.devices.items);
  const dispatch = useDispatch();

  const handleSelectDevice = useCallback(
    (device: IDevice) => {
      dispatch(selectDevice({ device, deviceType: 'ADMIN' }));

      navigate('/dashboard');
    },
    [navigate, dispatch]
  );

  const renderDevice = (device: IDevice) => {
    return (
      <Box
        p={4}
        mb={3}
        mt={4}
        key={device.id}
        borderRadius={8}
        bgColor="gray.800"
      >
        <Flex alignItems="center">
          <Box flex={1}>
            <Heading size="md">{device.name}</Heading>
            <Text color="gray.600" userSelect="unset">
              Id: {device.id}
            </Text>
          </Box>
          <Flex gap={4}>
            {/* TODO: Add a delete button */}
            <DeleteWarnModal device={device} />
            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={() => handleSelectDevice(device)}
            >
              {t('select')}
            </Button>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Flex
      flexDir="column"
      w="100%"
      h="100%"
      alignItems="center"
      p={4}
      borderRadius={4}
      overflow="auto"
    >
      <Box bgColor="gray.900" w="100%" borderRadius={10} p={4}>
        <Flex flexDir="row" alignItems="center" justifyContent="space-between">
          <Heading size="sm">{t('select_device')}</Heading>
          <CreatePageButton />
        </Flex>
        {devices.map(renderDevice)}
      </Box>
    </Flex>
  );
};

export default Devices;
