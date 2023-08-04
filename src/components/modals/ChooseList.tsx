import { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { close, list } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';

import { recipes, shopping } from '../../fixtures';

import './modal.css';

interface Props {
  history: RouteComponentProps['history'];
  recipe: (typeof recipes)[number];
  onDismiss: () => void;
}

export const ModalChooseList: React.FC<Props> = ({
  history,
  recipe,
  onDismiss,
}) => {
  const [checked, setChecked] = useState(
    recipe.products.map(product => product.id)
  );

  function handleChange(evt: any) {
    if (evt.detail.checked) {
      setChecked(prevState => [...prevState, evt.detail.value]);
    } else {
      setChecked(prevState =>
        prevState.filter(item => item !== evt.detail.value)
      );
    }
  }

  function handleAddToList(item: (typeof shopping)[number]) {
    onDismiss();
    history.push('/recipes');
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
      {recipe.products.map(product => (
        <IonItem key={product.id} lines="none">
          <IonCheckbox
            checked={checked.indexOf(product.id) > -1}
            onIonChange={handleChange}
            slot="start"
            value={product.id}
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
          {shopping.map(item => (
            <IonItem button key={item.id} onClick={() => handleAddToList(item)}>
              <IonIcon slot="start" icon={list} />
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </div>
  );
};
