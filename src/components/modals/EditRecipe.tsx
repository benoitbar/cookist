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
  dismiss: () => void;
  item: Doc<'recipes'>;
}

export const ModalEditRecipe: React.FC<Props> = ({ item, dismiss }) => {
  const update = useMutation(api.recipes.update);
  const remove = useMutation(api.recipes.remove);

  const [recipe, setRecipe] = React.useState<Doc<'recipes'>>(item);

  async function save() {
    const { _creationTime, ...data } = recipe;
    await update(data);
    dismiss();
  }

  function handleChange(evt: any) {
    const fieldName = evt.target.name as keyof Doc<'recipes'>;
    const value = evt.target.value;
    const valueAsNumber = parseInt(evt.target.value, 10);
    setRecipe(prev => ({
      ...prev,
      [fieldName]: valueAsNumber ? valueAsNumber : value,
    }));
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
          onIonInput={handleChange}
          onKeyUp={handleKeyUp}
          required
          // `type="url"` is a workaround to force `autocapitalize="none"` to work
          type="url"
          value={recipe.name}
        />
        <IonInput
          className="ion-margin-bottom"
          fill="outline"
          label="Nombre de personne"
          labelPlacement="stacked"
          min={1}
          name="unit"
          onIonInput={handleChange}
          onKeyUp={handleKeyUp}
          required
          type="number"
          value={recipe.unit}
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
