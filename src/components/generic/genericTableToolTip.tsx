import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "../../lib/utils";

interface TableToolTipProps {
  displayArray: string[];
  displayLimit?: number;
  className?: string;
}

export const TableToolTip: React.FC<TableToolTipProps> = ({
  displayArray,
  displayLimit = 2,
  className,
}) => {
  if (!displayArray || displayArray.length === 0) return null;

  const displayedItems = displayArray.slice(0, displayLimit).join(", ");
  const allItems = displayArray.join(", ");

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex max-w-full cursor-pointer flex-wrap",
              className,
            )}
          >
            <span>
              {displayedItems}
              {displayArray.length > displayLimit ? ", ..." : ""}
            </span>
          </div>
        </TooltipTrigger>
        {displayArray.length > displayLimit && (
          <TooltipContent side="top">
            <span>{allItems}</span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
