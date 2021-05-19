import classNames from 'classnames';
import React, { FC } from 'react';
import { Button, Header, SlimButton } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { useNavigation } from '../useNavigation';
import { Page, PageBody, PageFooter } from './Page';

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

export const Welcome: FC = () => {
    const classes = useStyles();
    const navigation = useNavigation();

    return (
        <Page>
            <PageBody className={classes.body} >
                <Header>WarmteWachter</Header>

                <div className={classNames(classes.quote, classes.padded)} >"gebouwde omgeving binnen één generatie (vrijwel) CO<sub>2</sub>-neutraal"</div>

                <div className={classes.padded} >
                    Wij doen onderzoek naar de CO<sub>2</sub> emissie per huishouden en mogelijke maatregelen om dit te reduceren. Wij vragen personen met een slimme meter om hieraan deel te nemen.
                </div>

                <div>
                    <SlimButton onClick={() => { /* */ }} label="Meer over het Lectoraat Energietransitie" className={classes.padded} />
                    <SlimButton onClick={() => { /* */ }} label="Ons privacybeleid" className={classes.padded} />
                </div>
            </PageBody>

            <PageFooter>
                <Button onClick={() => { /* */ }} label="Deelname aanvragen" className={classes.padded} />
                <SlimButton onClick={() => { navigation.toRoute('Invite') }} label="Ik heb al een uitnodiging" className={classes.padded} />
            </PageFooter>
        </Page>
    );
};
