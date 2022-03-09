import { useCallback } from 'react';
import { Box, Flex, Text, Center, Button, Heading } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IDevice } from 'interfaces';
import { useNavigate } from 'react-router-dom';
import { selectDevice } from 'renderer/redux/ducks/devices';
import CreatePageButton from 'renderer/components/CreatePageButton';

const Start = () => {
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
            {/* <Button size="sm" variant="ghost" colorScheme="red">
              Delete
            </Button> */}
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
    <Flex flexDir="column" w="100vw" h="100vh">
      <Center
        flex={0.3}
        background="linear-gradient(265.97deg, #171923 0%, #18202E 28.18%, #1A2D38 43.12%, #1A3638 59.94%, #0E2829 79.05%, #171923 100.72%)"
      >
        <Box padding={8} textAlign="center">
          <Heading>{t('welcome_to')}</Heading>
          <Heading>{t('app_name')}</Heading>
        </Box>
      </Center>
      <Flex flex={0.7} padding={4} flexDir="row" w="100%" gap={4}>
        <Box flex={0.8} bgColor="gray.900" borderRadius={8} p={4}>
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading size="sm">{t('select_device')}</Heading>
            <CreatePageButton />
          </Flex>
          {devices.map(renderDevice)}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Start;
