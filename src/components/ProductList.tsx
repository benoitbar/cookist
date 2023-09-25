import React from 'react';

import { api } from '../../convex/_generated/api';
import { Doc, Id } from '../../convex/_generated/dataModel';
import { EditableList } from '../components/editable-list/List';
import { ModalEditProduct } from '../components/modals/EditProduct';
import { ProductItem } from '../components/ProductItem';
import { useMutation } from 'convex/react';

interface Props {
  data: Doc<'products'>[];
  canSwipe?: boolean;
}

export const ProductList: React.FC<Props> = ({ data, canSwipe = false }) => {
  const update = useMutation(api.products.update);
  const remove = useMutation(api.products.remove);

  async function handleUpdate(
    oldItem: Doc<'products'>,
    newItem: Doc<'products'> | void
  ) {
    if (newItem) {
      const { _creationTime, parent, ...data } = newItem;
      await update(data);
    } else {
      await remove({ _id: oldItem._id });
    }
  }

  async function handleDelete(item: Doc<'products'>) {
    await remove({ _id: item._id });
  }

  return (
    <EditableList
      data={data}
      Item={ProductItem}
      Modal={ModalEditProduct}
      onEdit={handleUpdate}
      onSwipe={canSwipe ? handleDelete : undefined}
    />
  );
};
