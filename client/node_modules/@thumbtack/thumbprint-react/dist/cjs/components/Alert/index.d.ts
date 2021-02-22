import React from 'react';
interface BannerPropTypes {
    /**
     * Text within the alert
     */
    children?: React.ReactNode;
    /**
     * Defines the style of the alert
     */
    theme?: 'good' | 'bad' | 'warning' | 'info';
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}
export declare function BannerAlert({ children, theme, dataTest, }: BannerPropTypes): JSX.Element;
interface InPagePropTypes {
    /**
     * Text within the alert
     */
    children?: React.ReactNode;
    /**
     * Defines the style of the alert
     */
    theme?: 'good' | 'bad' | 'warning' | 'info';
    /**
     * A selector to hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}
export declare function InPageAlert({ children, theme, dataTest, }: InPagePropTypes): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map