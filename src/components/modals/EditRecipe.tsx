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

import { Recipe } from '../../modules/resources/recipes';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Recipe;
  onDismiss: any;
}

export const ModalEditRecipe: React.FC<Props> = ({ item, onDismiss }) => {
  const [recipe, setRecipe] = React.useState<Recipe>(item);

  function save() {
    onDismiss(recipe);
  }

  function handleChange(evt: any) {
    const fieldName = evt.target.name as keyof Recipe;
    const value = evt.target.value;
    setRecipe(prev => ({ ...prev, [fieldName]: value }));
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      save();
    }
  }

  function handleClick() {
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
          name="name"
          onIonChange={handleChange}
          onKeyUp={handleKeyUp}
          required
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
