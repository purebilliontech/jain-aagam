import * as React from "react";

export interface FEButtonProps extends React.ComponentPropsWithoutRef<"button"> { }

const FEButton = React.forwardRef<HTMLButtonElement, FEButtonProps>(
    function FEButton({ className, ...props }, ref) {
        return (
            <button
                ref={ref}
                className={`bg-accent-ui cursor-pointer text-white md:px-10 px-10 md:text-lg md:py-4 py-3 font-semibold tracking-wide rounded-2xl font-montserrat ${className}`}
                {...props}
            />
        );
    }
);

export default FEButton;
