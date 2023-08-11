import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
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
import { close, list } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import { Recipe } from '../../modules/resources/recipes';
import {
  Shopping,
  useShoppingCollectionSnapshot,
} from '../../modules/resources/shopping';
import { extractUnit } from '../../utils/quantity';

import './ChooseList.css';
import './modal.css';
import {
  Product,
  useProductCollectionSnapshot,
  useProductSet,
} from '../../modules/resources/products';

interface Props {
  recipe: Recipe;
  onDismiss: () => void;
}

export const ModalChooseList: React.FC<Props> = ({ recipe, onDismiss }) => {
  // TODO: no need to use snapshots here
  const { data: shoppingList } = useShoppingCollectionSnapshot();
  const { data: productList } = useProductCollectionSnapshot(recipe.ref);

  const { set } = useProductSet();

  const [unit, setUnit] = useState<number>(recipe.unit);
  const [products, setProducts] = useState<Product[]>([]);
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

  async function handleAddToList(item: Shopping) {
    if (Array.isArray(checked) && checked.length > 0) {
      // TODO: update shopping products if already exist ?
      await Promise.allSettled(
        products
          .filter(product => checked.includes(product.name))
          .map(async product => {
            await set({ ...product, parent: item.ref });
          })
      );
    }
    onDismiss();
  }

  return (
    <div className="block">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter à une liste</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={onDismiss}>
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
      <IonItemDivider>
        <IonLabel>Listes</IonLabel>
      </IonItemDivider>
      <IonContent>
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
      </IonContent>
    </div>
  );
};
