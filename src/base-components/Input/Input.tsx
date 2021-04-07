import classNames from 'classnames';
import React, { ChangeEvent, FC } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { Header } from '../Header';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
    },
    input: {
        padding: 12,
        backgroundColor: theme.colors.white,
        border: `2px solid ${theme.colors.grey300}`,
        borderRadius: 3,
        fontSize: 16,

        '&:focus': {
            border: `2px solid ${theme.colors.grey400}`,
            outline: 'none'
        }
    },
    label: {
        marginBottom: 5
    }
}));

interface InputProps extends BaseProps {
    onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    password?: boolean;
}

export const Input: FC<InputProps> = (props) => {
    const { className, onChange, label, placeholder, password = false, ...restProps } = props;
    const classes = useStyles();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event);
    };

    const inputType = password ? 'password' : 'text';

    return (
        <div
            className={classNames(classes.container, className)}
            {...restProps} >

            {label && <Header h3 className={classes.label} >{label}</Header>}
            <input
                type={inputType}
                className={classes.input}
                placeholder={placeholder}
                onChange={handleChange} />
        </div>
    );
};
