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
import { useCallback, useContext, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Form from 'renderer/components/Form';
import SwitchInput from 'renderer/components/Form/SwitchInput';
import HandlerInputs from 'renderer/components/handler-input';
import { SocketContext } from 'renderer/context/socket.context';
import EventTypes from 'server/enums/event-types.enum';

const PluginsSettingsPage = () => {
  const { t } = useTranslation('handlers');
  const { configs, currentConfig } = useSelector((state: any) => ({
    configs: state.handlers.configs as HandlerConfig[],
    currentConfig: state.handlers.currentConfig as Record<string, unknown>,
  }));

  const { socket } = useContext(SocketContext);

  const form = useForm();

  useEffect(() => {
    form.reset(currentConfig);
  }, [form, currentConfig]);

  const renderKeyTypes = (item: HandlerConfig) => {
    return (
      <AccordionItem key={item.id} padding={4} borderColor="gray.800">
        <AccordionButton borderRadius={8} backgroundColor="gray.800" zIndex={4}>
          <Box flex="1" textAlign="left" fontWeight="bold">
            <Text display="flex" flexDir="row" alignItems="center">
              {t(`handlers.${item.id}.title`)}
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
            <Text>{t('handlers.active')}</Text>
            <SwitchInput name={`${item.id}.active`} />
          </Flex>
          <HandlerInputs prefix={item.id} inputs={item.config} />
        </AccordionPanel>
      </AccordionItem>
    );
  };

  const handleSubmit = useCallback(
    (values: FieldValues) => {
      console.log(values);
      socket.emit(EventTypes.HANDLERS.UPDATE, values);
    },
    [socket]
  );

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
            {configs.map(renderKeyTypes)}
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
