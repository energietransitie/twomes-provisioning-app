import classNames from 'classnames';
import React, { ChangeEvent, FC, useState } from 'react';
import { makeStyles } from '../../theme/makeStyles';
import { Header } from '../Header';
import { BaseProps } from '../IBaseProps';

const useStyles = makeStyles<'container'|'input'|'label'|'fieldIcon', InputProps>(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
    },
    input: {
        padding: 12,
        backgroundColor: ({ disabled }) => disabled ? theme.colors.grey300 : theme.colors.white,
        border: `2px solid ${theme.colors.grey300}`,
        borderRadius: 3,
        fontSize: 16,
        width: '100%',

        '&:focus': {
            border: `2px solid ${theme.colors.grey400}`,
            outline: 'none'
        }
    },
    label: {
        marginBottom: 5
    }, 
    fieldIcon: {
        position: 'absolute',
        top: 0,
        height: '100%',
        right: 12.5,
        display: 'flex',
        alignItems: 'center'
    }
}));

interface InputProps extends BaseProps {
    onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    label?: string;
    placeholder?: string;
    password?: boolean;
    value?: string;
    disabled?: boolean;
}

export const Input: FC<InputProps> = (props) => {
    const { className, onChange, onFocus, label, placeholder, value, disabled = false, password = false, ...restProps } = props;
    const classes = useStyles(props);

    const [isPassword, setIsPassword] = useState(password);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event);
    };

    const toggleVisible = () => {
        setIsPassword(!isPassword);
    }

    const inputType = isPassword ? 'password' : 'text';

    return (
        <div
            className={classNames(classes.container, className)}
            {...restProps} >

            {label && <Header h3 className={classes.label} >{label}</Header>}
            
            <div style={{position: 'relative'}}>
                <input
                    disabled = {disabled}
                    type={inputType}
                    className={classes.input}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={onFocus} />
                
                <span className={classNames(classes.fieldIcon)} onClick={toggleVisible}>{isPassword ? '★' : '©'}</span>
            </div>
        </div>
    );
};
