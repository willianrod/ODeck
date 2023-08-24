import { useMemo } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HandlerConfig } from 'interfaces';
import SidebarItem from './SidebarItem';
import KeyTypes from '../../../server/enums/keys.enum';

const Sidebar = () => {
  const handlers = useSelector((state: any) => state.handlers);
  const { t } = useTranslation('handlers');

  const groupedHandlers = useMemo<Map<string, HandlerConfig<unknown>[]>>(() => {
    const group = new Map();
    handlers?.forEach((handler: HandlerConfig<unknown>) => {
      if (!group.get(handler.groupKey)) {
        group.set(handler.groupKey, [handler]);
      } else {
        group.set(handler.groupKey, [...group.get(handler.groupKey), handler]);
      }
    }, new Map());

    return group;
  }, [handlers]);

  const renderKeyTypes = ([groupKey, handlersGroup]: [
    string,
    HandlerConfig<unknown>[]
  ]) => {
    return (
      <AccordionItem key={groupKey} padding={4} borderColor="gray.800">
        <AccordionButton borderRadius={8} backgroundColor="gray.800" zIndex={4}>
          <Box flex="1" textAlign="left" fontWeight="bold">
            <Text display="flex" flexDir="row" alignItems="center">
              {t(`group.${groupKey}`)}
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
          {handlersGroup.map((group) => {
            return Object.entries(group.handlers).map(([handlerKey, item]) => (
              <SidebarItem
                key={handlerKey}
                keyType={handlerKey as KeyTypes}
                item={item}
              />
            ));
          })}
        </AccordionPanel>
      </AccordionItem>
    );
  };

  return (
    <Accordion allowToggle>
      {Array.from(groupedHandlers.entries()).map(renderKeyTypes)}
    </Accordion>
  );
};

export default Sidebar;
