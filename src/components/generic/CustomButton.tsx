/** External Dependencies */
import { forwardRef, type ComponentProps, type FC } from "react";

/** Components created by shadcn */
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const PrimaryButton: FC<ComponentProps<typeof Button>> = forwardRef(
  ({ variant = "default", children, className, ...extProps }, ref) => {
    PrimaryButton.displayName = "PrimaryButton";

    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn("bg-primary", className)}
        {...extProps}
      >
        {children}
      </Button>
    );
  },
);
export const SecondaryButton: FC<ComponentProps<typeof Button>> = forwardRef(
  ({ variant = "secondary", children, className, ...extProps }, ref) => {
    SecondaryButton.displayName = "SecondaryButton";

    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "border border-buttonBlue bg-white text-buttonBlue",
          className,
        )}
        {...extProps}
      >
        {children}
      </Button>
    );
  },
);

export const AddButton: FC<ComponentProps<typeof Button>> = forwardRef(
  ({ variant = "secondary", children, className, ...extProps }, ref) => {
    AddButton.displayName = "AddButton";

    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "border border-buttonGreen text-buttonGreen hover:bg-buttonGreen hover:text-white",
          className,
        )}
        {...extProps}
      >
        {children}
      </Button>
    );
  },
);

export const RemoveButton: FC<ComponentProps<typeof Button>> = forwardRef(
  ({ variant = "secondary", children, className, ...extProps }, ref) => {
    RemoveButton.displayName = "RemoveButton";

    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
          className,
        )}
        {...extProps}
      >
        {children}
      </Button>
    );
  },
);
