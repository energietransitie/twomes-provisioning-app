import { StyleRules, makeStyles as muiMakeStyles } from '@material-ui/styles';

import { theme } from './theme';

type ThemeType = typeof theme;
type StylesFunc<ClassKey extends string, Props extends {}> = (theme: ThemeType) => StyleRules<Props, ClassKey>

export const makeStyles = <ClassKey extends string, Props extends {}>(styles: StylesFunc<ClassKey, Props> | StyleRules<Props, ClassKey>) => {

    if (typeof styles === 'function') {
        return muiMakeStyles(styles(theme));
    }
    return muiMakeStyles(styles);
};
