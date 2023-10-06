import { IonSpinner } from '@ionic/react';
import React from 'react';

export const Spinner: React.FC<{}> = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <IonSpinner color="primary" name="crescent" />
    </div>
  );
};
