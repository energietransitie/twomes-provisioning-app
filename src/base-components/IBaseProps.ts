import { CSSProperties } from "react";

export interface BaseProps {
    id?: string;
    className?: string;
    'data-testid'?: string;
    style?: CSSProperties;
}
