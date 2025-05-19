import React, { JSX } from 'react';

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';
    children: React.ReactNode;
    className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, className = '' }) => {
    const baseStyle = '';
    const variantStyles: { [key in TypographyProps['variant']]: string } = {
        h1: 'text-5xl font-mono',
        h2: 'text-4xl font-mono font-normal',
        h3: 'text-2xl md:text-3xl font-mono',
        h4: 'text-lg md:text-2xl font-mono',
        h5: 'text-xl',
        p: 'text-base',
        span: 'text-base',
    };

    const Component = variant as keyof JSX.IntrinsicElements;

    return React.createElement(
        Component,
        { className: `${baseStyle} ${variantStyles[variant]} ${className}` },
        children
    );
};

export default Typography;
