import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { HandlerConfig } from 'interfaces';
import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Form from 'renderer/components/Form';
import SwitchInput from 'renderer/components/Form/SwitchInput';

const PluginsSettingsPage = () => {
  const { t } = useTranslation('handlers');
  const handlers = useSelector(
    (state: any) => state.handlers as HandlerConfig<unknown>[]
  );

  const form = useForm();

  const renderKeyTypes = (item: HandlerConfig<unknown>) => {
    return (
      <AccordionItem key={item.id} padding={4} borderColor="gray.800">
        <AccordionButton borderRadius={8} backgroundColor="gray.800" zIndex={4}>
          <Box flex="1" textAlign="left" fontWeight="bold">
            <Text display="flex" flexDir="row" alignItems="center">
              {t(`settings.${item.id}`)}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          p={4}
          backgroundColor="gray.800"
          marginTop={1}
          borderRadius={8}
        >
          <Flex w="100%" justifyContent="space-between" alignItems="center">
            <Text>{t('active')}</Text>
            <SwitchInput name={`${item.id}.active`} />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    );
  };

  const handleSubmit = useCallback((values: FieldValues) => {
    console.log(values);
  }, []);

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
      <Form form={form} onSubmit={handleSubmit}>
        <Box bgColor="gray.900" w="100%" borderRadius={10}>
          <Accordion allowToggle h="100%" w="100%">
            {handlers.map(renderKeyTypes)}
          </Accordion>
          <Flex p={4} justifyContent="right">
            <Button type="submit">Save</Button>
          </Flex>
        </Box>
      </Form>
    </Flex>
  );
};

export default PluginsSettingsPage;
