import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMutation, useQuery } from 'convex/react';
import { close, list } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import { api } from '../../../convex/_generated/api';
import { Doc } from '../../../convex/_generated/dataModel';
import { extractUnit } from '../../utils/quantity';

import './ChooseList.css';
import './modal.css';
import { IonReactRouter } from '@ionic/react-router';

interface Props {
  dismiss: () => void;
  history?: IonReactRouter['history'];
  recipe: Doc<'recipes'>;
}

export const ModalChooseList: React.FC<Props> = ({
  dismiss,
  history,
  recipe,
}) => {
  const shoppingList = useQuery(api.shopping.getCollection);
  const productList = useQuery(api.products.getCollection, {
    parent: recipe._id,
  });
  const create = useMutation(api.products.create);

  const [unit, setUnit] = useState<number>(recipe.unit);
  const [products, setProducts] = useState<Doc<'products'>[]>([]);
  const [checked, setChecked] = useState<string[] | void>();

  function handleCheckboxChange(evt: any) {
    if (evt.detail.checked) {
      setChecked(prevState =>
        prevState ? [...prevState, evt.detail.value] : [evt.detail.value]
      );
    } else {
      setChecked(prevState =>
        prevState
          ? prevState.filter(item => item !== evt.detail.value)
          : prevState
      );
    }
  }

  function handleInputChange(evt: any) {
    const value = evt.target.value;
    setUnit(Number(value));
  }

  useEffect(() => {
    if (productList) {
      setProducts(
        productList?.map(product => {
          const { quantity, unit: productUnit } = extractUnit(product.quantity);
          return {
            ...product,
            quantity: `${(quantity * unit) / recipe.unit}${productUnit}`,
          };
        })
      );

      if (!Array.isArray(checked)) {
        setChecked(productList.map(item => item.name));
      }
    }
  }, [productList, unit]);

  async function handleAddToList(item: Doc<'shopping'>) {
    if (Array.isArray(checked) && checked.length > 0) {
      // TODO: update shopping products if already exist ?
      await Promise.allSettled(
        products
          .filter(product => checked.includes(product.name))
          .map(async product => {
            const { _id, _creationTime, parent, ...data } = product;
            await create({ ...data, checked: false, parent: item._id });
          })
      );
      if (history) {
        history.push('/recipes');
      }
    }
    dismiss();
  }

  return (
    <div className="block">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter à une liste</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={dismiss}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonItem lines="none">
        Pour{' '}
        <IonInput
          aria-label="Nombre de personnes"
          className="unit"
          onIonChange={handleInputChange}
          min={1}
          type="number"
          value={unit}
        />{' '}
        personnes
      </IonItem>
      <div className="scrollable">
        {products.map(product => (
          <IonItem key={product.name} lines="none">
            <IonCheckbox
              checked={!!checked && checked.indexOf(product.name) > -1}
              onIonChange={handleCheckboxChange}
              slot="start"
              value={product.name}
            />
            <IonLabel>{product.name}</IonLabel>
            <IonNote slot="end">{product.quantity}</IonNote>
          </IonItem>
        ))}
      </div>
      <IonItemDivider>
        <IonLabel>Listes</IonLabel>
      </IonItemDivider>
      <div className="scrollable">
        <IonList className="ion-no-padding" lines="full">
          {shoppingList?.map(item => (
            <IonItem
              button
              key={item.name}
              onClick={() => handleAddToList(item)}
            >
              <IonIcon slot="start" icon={list} />
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </div>
    </div>
  );
};
