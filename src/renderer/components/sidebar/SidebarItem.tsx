import { IButtonKey, IKeyTypeItem } from 'interfaces';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Box, Icon, Text } from '@chakra-ui/react';
import ItemTypes from 'renderer/constants/item-types.constants';
import { createKey } from 'renderer/redux/ducks/keys';

interface ISidebarItem {
  item: IKeyTypeItem;
}

const SidebarItem: React.FC<ISidebarItem> = ({ item }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.NEW_KEY,
      item,
      end: (dropedItem: any, monitor) => {
        const dropResult = monitor.getDropResult() as any;
        if (dropedItem && dropResult) {
          const newKey = {
            ...dropedItem.defaults,
            id: new Date().toISOString(),
            type: dropedItem.type,
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
    [dispatch]
  );

  return (
    <Box
      ref={drag}
      isFullWidth
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
        <Icon as={item.icon} marginRight={2} />
        {item.label}
      </Text>
      <Text fontSize={12} color="gray.500">
        {item.description}
      </Text>
    </Box>
  );
};

export default SidebarItem;
