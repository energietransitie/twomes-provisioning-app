import React from 'react';
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard, IonCardContent,
    IonContent,
    IonHeader,
    IonIcon, IonItem, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Dashboard.scss';
import {checkmarkCircleOutline, settingsOutline} from "ionicons/icons";

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="gradientBackgroundColor">
          <IonTitle>Dashboard</IonTitle>
            <IonButtons slot="end">
                <IonButton href="/settings">
                    <IonIcon icon={settingsOutline} color="dark"/>
                </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>  <IonCard className="card">
          <IonCardContent>
              <IonItem  lines="none" className="carditem">
                  <IonLabel>ChartJS</IonLabel>
              </IonItem>

          </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
