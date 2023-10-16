import { IonList } from '@ionic/react';
import React from 'react';

import { Spinner } from './Spinner';

interface Props<T> {
  data: T[] | void;
  getKey?: (item: T) => React.Key;
  Item: any;
}

export const List: React.FC<Props<any>> = <T,>({
  data,
  getKey = (item: any) => item._id,
  Item,
}: Props<T>) => {
  return data ? (
    <IonList className="ion-no-padding" lines="full">
      {data.map(item => (
        <Item item={item} key={getKey(item)} />
      ))}
    </IonList>
  ) : (
    <Spinner />
  );
};
