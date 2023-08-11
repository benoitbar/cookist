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
  Recipe,
  useRecipeRemove,
  useRecipeUpdate,
} from '../../modules/resources/recipes';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Recipe;
  onDismiss: any;
}

export const ModalEditRecipe: React.FC<Props> = ({ item, onDismiss }) => {
  const { update } = useRecipeUpdate();
  const { remove } = useRecipeRemove();

  const [name, setName] = React.useState(item.name);
  const [unit, setUnit] = React.useState(item.unit);

  async function save() {
    await update(item.id, { name, unit });
    onDismiss();
  }

  function handleChangeName(evt: any) {
    setName(evt.target.value);
  }

  function handleChangeUnit(evt: any) {
    setUnit(Number(evt.target.value));
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      save();
    }
  }

  function handleClick() {
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
          onIonChange={handleChangeName}
          onKeyUp={handleKeyUp}
          required
          value={name}
        />
        <IonInput
          className="ion-margin-bottom"
          fill="outline"
          label="Nombre de personne"
          labelPlacement="stacked"
          min={1}
          onIonChange={handleChangeUnit}
          onKeyUp={handleKeyUp}
          required
          type="number"
          value={unit}
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
