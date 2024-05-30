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

import { RecipeDetail } from './pages/RecipeDetail';
import { RecipeList } from './pages/RecipeList';
import { ShoppingDetail } from './pages/ShoppingDetail';
import { ShoppingList } from './pages/ShoppingList';

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
        <IonRouterOutlet
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Route exact path="/shopping" component={ShoppingList} />
          <Route exact path="/shopping/:id" component={ShoppingDetail} />
          <Route exact path="/recipes" component={RecipeList} />
          <Route exact path="/recipes/:id" component={RecipeDetail} />
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
