import {
  IonButton,
  IonButtons,
  IonIcon,
  IonInput,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React from 'react';

import { KEYS } from '../utils/keys';

interface Props {
  placeholder: string;
  onAdd: (value: string) => void;
}

export const HeaderInput: React.FC<Props> = ({ placeholder, onAdd }) => {
  const inputRef = React.useRef<any>();

  async function handleAdd() {
    const elt: HTMLInputElement = await inputRef.current.getInputElement();
    const value = elt.value;
    if (value) {
      onAdd(elt.value);
      elt.value = '';
    }
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      handleAdd();
    }
  }

  function handleClick() {
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
        autocapitalize="none"
        className="ion-padding-end"
        clearInput
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        ref={inputRef}
        required
        // `type="url"` is a workaround to force `autocapitalize="none"` to work
        type="url"
      />
    </IonToolbar>
  );
};
