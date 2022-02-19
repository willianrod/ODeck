import {
  Icon,
  Button,
  Text,
  Select,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdQrCode2 } from 'react-icons/md';
import QRCode from 'react-qr-code';

const PairDeckButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedIp, setSelectedIp] = useState<string>('');
  const { ips, currentDevice } = useSelector((state: any) => ({
    ips: state.ips,
    currentDevice: state.devices.currentDevice,
  }));

  const handleChangeIp = useCallback((e) => {
    setSelectedIp(e.target.value);
  }, []);

  const qrCodeData = useMemo(
    () =>
      JSON.stringify({
        host: `http://${selectedIp}:3000`,
        deviceId: currentDevice.id,
      }),
    [selectedIp, currentDevice]
  );

  useEffect(() => {
    if (!ips.length) return;
    setSelectedIp(ips[0]);
  }, [ips]);

  return (
    <>
      <Button leftIcon={<Icon as={MdQrCode2} />} size="sm" onClick={onOpen}>
        Pair Deck
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect your device:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="gray.500" mb={4}>
              Select your local network IP address, then open the app and scan
              the QR Code below with your device.
            </Text>
            <Select
              placeholder="Select an IP address"
              value={selectedIp}
              size="sm"
              mb={5}
              onChange={handleChangeIp}
            >
              {ips.map((ip: string) => (
                <option key={ip} value={ip}>
                  {ip}
                </option>
              ))}
            </Select>
            <Flex
              p={4}
              backgroundColor="white"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <QRCode value={qrCodeData} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="outline">
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(PairDeckButton);
