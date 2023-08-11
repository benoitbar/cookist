import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, trash } from 'ionicons/icons';
import React from 'react';

import {
  Shopping,
  useShoppingRemove,
  useShoppingUpdate,
} from '../../modules/resources/shopping';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Shopping;
  onDismiss: any;
}

export const ModalEditShopping: React.FC<Props> = ({ item, onDismiss }) => {
  const { update } = useShoppingUpdate();
  const { remove } = useShoppingRemove();

  const [name, setName] = React.useState(item.name);

  async function save() {
    await update(item.id, { name });
    onDismiss();
  }

  function handleChange(evt: any) {
    setName(evt.target.value);
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      save();
    }
  }

  function handleClick(evt: React.MouseEvent<HTMLIonButtonElement>) {
    save();
  }

  async function handleDelete(evt: React.MouseEvent<HTMLIonButtonElement>) {
    await remove(item.id);
    onDismiss();
  }

  return (
    <div className="mid-block">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleClick}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonInput
          className="ion-margin-bottom"
          fill="outline"
          label="Nom"
          labelPlacement="stacked"
          onIonChange={handleChange}
          onKeyUp={handleKeyUp}
          required
          value={name}
        />
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="danger" onClick={handleDelete}>
              Supprimer
              <IonIcon icon={trash} slot="end"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </div>
  );
};
