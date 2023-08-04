import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, restaurant, square } from 'ionicons/icons';

import { Products } from './pages/Products';
import { Recipe } from './pages/Recipe';
import { Recipes } from './pages/Recipes';
import { Shopping } from './pages/Shopping';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/shopping" component={Shopping} />
          <Route exact path="/shopping/:id" component={Products} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/:id" component={Recipe} />
          <Route exact path="/">
            <Redirect to="/shopping" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="shopping" href="/shopping">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>Mes listes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="recipes" href="/recipes">
            <IonIcon aria-hidden="true" icon={restaurant} />
            <IonLabel>Mes recettes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
