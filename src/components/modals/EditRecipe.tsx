import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, checkmark, trash } from 'ionicons/icons';
import React from 'react';

import { Doc, Id } from '../../../convex/_generated/dataModel';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Doc<'recipes'>;
  onDismiss: (
    data: { _id: Id<'recipes'>; name: string; unit: number } | void
  ) => void;
}

export const ModalEditRecipe: React.FC<Props> = ({ item, onDismiss }) => {
  const [recipe, setRecipe] = React.useState<Doc<'recipes'>>(item);

  function save() {
    onDismiss(recipe);
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

  function handleDelete() {
    onDismiss();
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
          value={recipe.name}
        />
        <IonInput
          className="ion-margin-bottom"
          fill="outline"
          label="Nombre de personne"
          labelPlacement="stacked"
          min={1}
          name="unit"
          onIonChange={handleChange}
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
