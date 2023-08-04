import { IonList } from '@ionic/react';
import React from 'react';

import { EditableListItem } from './Item';

interface Props<T> {
  data: T[];
  getKey?: (item: T) => React.Key;
  Item: any;
  Modal: any;
  onContextMenu: (item: T) => void;
  onSwipe?: (item: T) => void;
}

export const EditableList: React.FC<Props<any>> = <T,>({
  data,
  getKey = (item: any) => item.id,
  Item,
  Modal,
  onSwipe,
  onContextMenu,
}: Props<T>) => {
  return (
    <IonList className="ion-no-padding" lines="full">
      {data.map(item => (
        <EditableListItem
          item={item}
          key={getKey(item)}
          Modal={Modal}
          onContextMenu={onContextMenu}
          onSwipe={onSwipe}
        >
          <Item item={item} />
        </EditableListItem>
      ))}
    </IonList>
  );
};
