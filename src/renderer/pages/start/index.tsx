import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { IDevice } from 'interfaces';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreatePageButton from 'renderer/components/CreatePageButton';
import DeleteWarnModal from 'renderer/components/DeleteWarnModal';
import { selectDevice } from 'renderer/redux/ducks/devices';
import overlay from '../../public/logo.png';

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
    <Flex flexDir="column" w="100vw" h="100vh">
      <Center height="150px" flex={0.3} bgColor="gray.900">
        <img width="128px" height="128px" src={overlay} alt="logo" />
      </Center>
      <Flex
        height="calc(100% - 150px)"
        flex={0.7}
        padding={4}
        flexDir="row"
        justifyContent="center"
        w="100%"
        gap={4}
      >
        <Box
          overflow="auto"
          flex={0.8}
          bgColor="gray.900"
          borderRadius={8}
          p={4}
        >
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
