import classNames from 'classnames';
import React, { FC } from 'react';
import { Header, SlimButton } from '../base-components';
import { makeStyles } from '../theme/makeStyles';
import { useNavigation } from '../router/useNavigation';
import { Page, PageBody, PageFooter } from '../components/Page';

const useStyles = makeStyles(theme => ({
    body: {
        justifyContent: 'space-evenly'
    },
    padded: {
        margin: '10px 0'
    },
    quote: {
        fontStyle: 'italic',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.colors.grey400
    }
}));

const RESEARCH_GROUP_URL = 'https://www.windesheim.nl/onderzoek/lectoraten/energietransitie';
const PRIVACY_URL = 'https://energiebeveiliging.nl/assendorp2021/privacy.html';

export const Welcome: FC = () => {
    const classes = useStyles();
    const navigation = useNavigation();

    return (
        <Page>
            <PageBody className={classes.body} >
                <Header>WarmteWachter</Header>

                <div className={classNames(classes.quote, classes.padded)} >App voor het onderzoek van het Lectoraat Energietransitie van hogeschool Windesheim in samenwerking met 50 Tinten Groen Assendorp</div>

                <div className={classes.padded} >
                    U kunt deze app alleen gebruiken na ontvangst van een uitnodiging voor het meetonderzoek van WarmteWachter met een persoonlijke activatielink voor de app.
                </div>

                <div>
                    <SlimButton onClick={() => { window.open(RESEARCH_GROUP_URL, '_system', 'location=yes') }} label="Lectoraat Energietransitie" className={classes.padded} />
                    <SlimButton onClick={() => { window.open(PRIVACY_URL, '_system', 'location=yes') }} label="Privacyverklaring" className={classes.padded} />
                </div>
            </PageBody>

            <PageFooter>
                <SlimButton onClick={() => { navigation.toRoute('Invite') }} label="Ik heb al een uitnodiging" className={classes.padded} />
            </PageFooter>
        </Page>
    );
};
