import React, { useEffect, useState, VFC } from 'react';
import { BaseProps } from '../../base-components';
import { makeStyles } from '../../theme/makeStyles';
import { AppVersion } from '@ionic-native/app-version';

const useStyles = makeStyles(theme => ({
    paragraph: {
        color: theme.colors.grey600,
        margin: 10,
        fontSize: 14
    }
}));

interface AppInfoData {
    version: string | number;
    build: string | number;
}

export const AppVersionInfo: VFC<BaseProps> = (props) => {
    const { className, ...restProps } = props;
    const classes = useStyles();

    const [appInfo, setAppInfo] = useState<AppInfoData>();

    useEffect(() => {
        const AppVersionAPI = AppVersion;

        Promise.all([
            AppVersionAPI.getVersionCode(),
            AppVersionAPI.getVersionNumber()
        ]).then(([build, version]) => {
            setAppInfo({
                build,
                version
            })
        });
    }, []);

    return (
        <div className={className} {...restProps} >
            
            <p className={classes.paragraph} >
                App versie: {appInfo?.version} | Build: {appInfo?.build}
            </p>

            {/* <p className={classes.paragraph} >
                Gebruiker:
            </p> */}

        </div>
    );
};
