import { HandlerItem, IButton, IButtonKey } from 'interfaces';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import ItemTypes from 'renderer/constants/item-types.constants';
import { createKey, deleteKey, setCurrentKey, updateKey } from 'renderer/redux/ducks/keys';

import overlay from '../../public/button-overlay.png';
import styles from './key.module.scss';

interface IKey {
  button: IButton;
}

const Key: React.FC<IKey> = ({ button }) => {
  const { keys, currentPage, currentKey } = useSelector((state: any) => ({
    keys: state.keys.items,
    currentKey: state.keys.currentKey,
    currentPage: state.pages.currentPage,
  }));

  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [ItemTypes.KEY, ItemTypes.NEW_KEY],
      drop: () => ({
        button,
        page: currentPage,
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [currentPage, button]
  );

  const buttonKey = useMemo(
    () => keys?.find((key: IButtonKey) => button.id === key.position) || null,
    [keys, button]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.KEY,
      item: buttonKey,
      canDrag: () => {
        return !!buttonKey;
      },
      end: (dropedItem: HandlerItem, monitor) => {
        const dropResult = monitor.getDropResult() as any;

        if (!dropResult) {
          return;
        }

        const newPosition = dropResult?.button?.id;
        const exists = keys?.find((key: IButtonKey) => newPosition === key.position);
        if (exists) {
          return;
        }

        const newKey = {
          ...buttonKey,
          position: newPosition,
        };
        dispatch(updateKey(newKey));
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [dispatch, buttonKey]
  );

  const buttonStyle = useMemo<React.HTMLAttributes<HTMLDivElement>>(
    () => ({
      backgroundColor: buttonKey?.backgroundColor || 'var(--chakra-colors-chakra-body-bg)',
      color: buttonKey?.color,
      width: 70,
      height: 70,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundImage: `url(${buttonKey?.backgroundUrl})`,
      display: 'flex',
      textAlign: 'center',
      alignItems: buttonKey?.backgroundUrl ? 'flex-end' : 'center',
      justifyContent: 'center',
      borderRadius: '17%',
      position: 'relative',
      transition: 'transform .1s',
      margin: 4,
      transform:
        (canDrop && isOver) || currentKey?.position === button.id
          ? 'scale(1.1)'
          : undefined,
    }),
    [buttonKey, canDrop, isOver, currentKey, button]
  );

  const handleSelectKey = useCallback(() => {
    dispatch(setCurrentKey(buttonKey));
  }, [dispatch, buttonKey]);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={buttonStyle}
      onClick={handleSelectKey}
      role="button"
      tabIndex={-1}
    >
      <img
        src={overlay}
        alt="overlay"
        draggable={false}
        className={styles.buttonOverlay}
      />
      {!buttonKey?.hideLabel && (
        <span className={styles.buttonLabel}>{buttonKey?.label}</span>
      )}
    </div>
  );
};

export default Key;
