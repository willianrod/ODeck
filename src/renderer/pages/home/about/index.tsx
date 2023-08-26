import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react';

const AboutPage = () => {
  const { t } = useTranslation('about');

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
        <Flex flexDir="column" alignItems="center">
          <Heading as="h1" size="xl" mb={1}>
            {t('about_title')}
          </Heading>
          <Text fontSize="md" mb={5} color="gray.400">
            {t('about_subtitle')}
          </Text>
        </Flex>
        <Divider mb={5} />
        <Flex justify="space-between" align="center" mt={5} gap={5}>
          <Button
            as="a"
            href="https://github.com/sponsors/willianrod"
            target="_blank"
            flex={1}
            bgColor="gray.800"
            _hover={{
              bgColor: 'gray.700',
            }}
            _active={{
              bgColor: 'gray.600',
            }}
          >
            {t('contribute')}
          </Button>
          <Button
            as="a"
            href="https://github.com/willianrod/odeck/releases"
            target="_blank"
            flex={1}
            bgColor="gray.800"
            _hover={{
              bgColor: 'gray.700',
            }}
            _active={{
              bgColor: 'gray.600',
            }}
          >
            {t('check_releases')}
          </Button>
        </Flex>
        <Flex justify="space-between" align="center" mt={5} gap={5}>
          <Button
            as="a"
            href="https://play.google.com/store/apps/details?id=com.willianrod.odeck"
            target="_blank"
            flex={1}
            bgColor="gray.800"
            _hover={{
              bgColor: 'gray.700',
            }}
            _active={{
              bgColor: 'gray.600',
            }}
          >
            {t('google_play')}
          </Button>
          <Button
            as="a"
            href="https://apps.apple.com/br/app/odeck/id6463042332"
            target="_blank"
            flex={1}
            bgColor="gray.800"
            _hover={{
              bgColor: 'gray.700',
            }}
            _active={{
              bgColor: 'gray.600',
            }}
          >
            {t('app_store')}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AboutPage;
