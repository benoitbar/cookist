import React from 'react';
import { DocumentReference } from 'firebase/firestore';

import { EditableList } from '../components/editable-list/List';
import { ModalEditProduct } from '../components/modals/EditProduct';
import { ProductItem } from '../components/ProductItem';
import {
  useProductCollectionSnapshot,
  useProductRemove,
  useProductUpdate,
} from '../modules/resources/products';
import { Recipe } from '../modules/resources/recipes';
import { Shopping } from '../modules/resources/shopping';

interface Props {
  canSwipe?: boolean;
  parent: DocumentReference;
}

export const ProductList: React.FC<Props> = ({ canSwipe = false, parent }) => {
  const { data } = useProductCollectionSnapshot(parent);

  const { remove } = useProductRemove();
  const { update } = useProductUpdate();

  async function handleUpdate(item: Shopping, data: Shopping | void) {
    if (data) {
      await update(item.id, data);
    } else {
      await remove(item.id);
    }
  }

  async function handleDelete(item: any) {
    await remove(item.id);
  }

  return (
    <EditableList
      data={data || []}
      Item={ProductItem}
      Modal={ModalEditProduct}
      onEdit={handleUpdate}
      onSwipe={canSwipe ? handleDelete : undefined}
    />
  );
};
