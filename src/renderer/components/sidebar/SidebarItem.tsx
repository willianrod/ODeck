import { HandlerItem, IButtonKey } from 'interfaces';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import * as Icons from 'react-icons/md';
import { Box, Icon, Text } from '@chakra-ui/react';
import ItemTypes from 'renderer/constants/item-types.constants';
import { createKey } from 'renderer/redux/ducks/keys';
import KeyTypes from 'server/enums/keys.enum';
import { useTranslation } from 'react-i18next';

interface ISidebarItem {
  item: HandlerItem;
  keyType: KeyTypes;
}

const SidebarItem: React.FC<ISidebarItem> = ({ item, keyType }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('handlers');

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.NEW_KEY,
      item,
      end: (dropedItem: HandlerItem, monitor) => {
        const dropResult = monitor.getDropResult() as any;
        if (dropResult) {
          const newKey = {
            ...dropedItem.defaults,
            id: new Date().toISOString(),
            label: t(dropedItem.defaults.label),
            type: keyType,
            pageId: dropResult.page.id,
            position: dropResult.button.id,
          } as IButtonKey;

          dispatch(createKey(newKey));
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [dispatch, keyType]
  );

  return (
    <Box
      ref={drag}
      cursor="pointer"
      bgColor="gray.900"
      marginTop={1}
      marginBottom={1}
      borderRadius={8}
      padding={4}
      paddingTop={3}
      _hover={{ bg: 'gray.700' }}
      overflow="hidden"
    >
      <Text display="flex" flexDir="row" alignItems="center">
        {/* @ts-expect-error loading icon dinamically from react-icons based on config file */}
        <Icon as={Icons[item.icon]} marginRight={2} />
        {t(item.title)}
      </Text>
      <Text fontSize={12} color="gray.500">
        {t(item.description)}
      </Text>
    </Box>
  );
};

export default SidebarItem;
