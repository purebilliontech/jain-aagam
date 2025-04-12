import * as React from "react";

export interface FEButtonProps extends React.ComponentProps<"button"> { }

const FEButton = React.forwardRef<HTMLButtonElement, FEButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`bg-accent text-white px-12 text-xl py-5 font-semibold tracking-wide rounded-3xl font-montserrat ${className}`}
                {...props}
            />
        );
    }
);

export default FEButton;


