import { IonList } from '@ionic/react';
import React from 'react';

import { EditableListItem } from './Item';
import { Spinner } from '../Spinner';

interface Props<T> {
  data: T[] | void;
  getKey?: (item: T) => React.Key;
  Item: any;
  Modal: any;
  onEdit: (oldItem: T, newItem: T) => void;
  onSwipe?: (item: T) => void;
}

export const EditableList: React.FC<Props<any>> = <T,>({
  data,
  getKey = (item: any) => item._id,
  Item,
  Modal,
  onSwipe,
  onEdit,
}: Props<T>) => {
  return data ? (
    <IonList className="ion-no-padding" lines="full">
      {data.map(item => (
        <EditableListItem
          item={item}
          key={getKey(item)}
          Modal={Modal}
          onEdit={onEdit}
          onSwipe={onSwipe}
        >
          <Item item={item} />
        </EditableListItem>
      ))}
    </IonList>
  ) : (
    <Spinner />
  );
};
