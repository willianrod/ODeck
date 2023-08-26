import { Button, Divider, Flex, Icon } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import i18n from 'renderer/i18n';
import { MdExtension, MdPhoneAndroid, MdSettings } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import overlay from '../../public/logo.png';

const SIDEBAR_ITEMS = [
  {
    icon: MdPhoneAndroid,
    label: i18n.t('devices'),
    path: '/',
  },
  {
    icon: MdExtension,
    label: i18n.t('plugins'),
    path: '/plugins',
  },
  {
    icon: MdSettings,
    label: i18n.t('deck'),
    path: '/deck',
  },
] as const;

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex flexDir="row" w="100vw" h="100vh" alignItems="center">
      <Flex
        flexDir="column"
        width="300px"
        bgColor="gray.900"
        height="100%"
        overflow="auto"
        padding="10px"
      >
        <Flex mb={3} alignItems="center" gap={3} justifyContent="center">
          <img width="64px" height="64px" src={overlay} alt="logo" />
        </Flex>
        <Divider mb={3} />
        <Flex gap={3} flexDir="column">
          {SIDEBAR_ITEMS.map((item) => (
            <Button
              leftIcon={<Icon as={item.icon} />}
              width="100%"
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              bgColor="gray.800"
              _hover={{
                bgColor: 'gray.700',
              }}
              _active={{
                bgColor: 'gray.600',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Flex>
      </Flex>
      <Outlet />
    </Flex>
  );
};

export default HomePage;
