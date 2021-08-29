import React, { VFC } from 'react';
import { Icon, IconProps } from './Icon';

export const MinusIcon: VFC<IconProps> = ({ color = '#333333' }) => {
    return (
        <Icon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                    
                <path
                    fill={ color }
                    d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                />
            </svg>
        </Icon>
    );
};
