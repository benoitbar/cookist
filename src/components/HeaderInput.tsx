import React from 'react';
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonItem,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';

import { KEYS } from '../utils/keys';

interface Props {
  placeholder: string;
  onAdd: (value: string) => void;
}

export const HeaderInput: React.FC<Props> = ({ placeholder, onAdd }) => {
  const inputRef = React.useRef<any>();

  async function handleAdd() {
    const elt = await inputRef.current.getInputElement();
    onAdd(elt.value);
    elt.value = '';
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      handleAdd();
    }
  }

  function handleClick(evt: React.MouseEvent<HTMLIonButtonElement>) {
    handleAdd();
  }

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="primary" onClick={handleClick}>
          <IonIcon slot="icon-only" icon={add} />
        </IonButton>
      </IonButtons>
      <IonInput
        aria-label="Nom"
        autofocus
        className="ion-padding-end"
        clearInput
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        ref={inputRef}
        required
      />
    </IonToolbar>
  );
};
