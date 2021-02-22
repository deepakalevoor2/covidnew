import React from 'react';
interface PropTypes {
    /**
     * Component to be wrapped.
     */
    children?: React.ReactNode;
    /**
     * Breakpoint at which the wrapper should remove horizontal margin to bleed to the edge of the
     * viewport. Defaults to `undefined`, in which case it never does this.
     */
    bleedBelow?: 'small' | 'medium' | 'large';
    /**
     * A selector hook into the React component for use in automated testing environments.
     */
    dataTest?: string;
}
export default function Wrap({ children, bleedBelow, dataTest }: PropTypes): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map