import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  Icon,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import { IKeyType, IKeyTypeItem } from 'interfaces';
import KEY_TYPES from 'renderer/constants/key-types.constant';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const renderKeyTypes = (keyType: IKeyType) => (
    <AccordionItem padding={4} borderColor="gray.800">
      <AccordionButton borderRadius={8} backgroundColor="gray.800" zIndex={4}>
        <Box flex="1" textAlign="left" fontWeight="bold">
          <Text display="flex" flexDir="row" alignItems="center">
            <Icon as={keyType.icon} marginRight={2} />
            {keyType.label}
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
        {keyType.items.map((key: IKeyTypeItem) => (
          <SidebarItem item={key} />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );

  return <Accordion allowToggle>{KEY_TYPES.map(renderKeyTypes)}</Accordion>;
};

export default Sidebar;
