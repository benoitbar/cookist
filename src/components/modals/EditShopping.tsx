import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonToolbar,
} from '@ionic/react';
import { useMutation } from 'convex/react';
import { arrowBack, checkmark, trash } from 'ionicons/icons';
import React from 'react';

import { api } from '../../../convex/_generated/api';
import { Doc } from '../../../convex/_generated/dataModel';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Doc<'shopping'>;
  dismiss: () => void;
}

export const ModalEditShopping: React.FC<Props> = ({ dismiss, item }) => {
  const update = useMutation(api.shopping.update);
  const remove = useMutation(api.shopping.remove);

  const [shopping, setShopping] = React.useState<Doc<'shopping'>>(item);

  async function save() {
    const { _creationTime, ...data } = shopping;
    await update(data);
    dismiss();
  }

  function handleChange(evt: any) {
    const fieldName = evt.target.name as keyof Doc<'shopping'>;
    const value = evt.target.value;
    setShopping(prev => ({ ...prev, [fieldName]: value }));
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      save();
    }
  }

  function handleUpdate() {
    save();
  }

  async function handleDelete() {
    await remove({ _id: item._id });
    dismiss();
  }

  return (
    <div className="mid-block">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleUpdate}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonInput
          autocapitalize="none"
          className="ion-margin-bottom"
          fill="outline"
          label="Nom"
          labelPlacement="stacked"
          name="name"
          onIonChange={handleChange}
          onKeyUp={handleKeyUp}
          required
          // `type="url"` is a workaround to force `autocapitalize="none"` to work
          type="url"
          value={shopping.name}
        />
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="danger" onClick={handleDelete}>
              Supprimer
              <IonIcon icon={trash} slot="end"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="success" onClick={handleUpdate}>
              Valider
              <IonIcon icon={checkmark} slot="end"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </div>
  );
};
