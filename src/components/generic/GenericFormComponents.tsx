// React and React Hook Form imports
import {
  ChangeEvent,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useState,
} from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

// Utility imports
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
// import { handlePhoneNumberChange, isValidPhoneNumber } from "@/utils/form";

// Icon imports
import { Eye, EyeOff, Info, CalendarIcon } from "lucide-react";

// UI Component imports
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import DocumentUpload from "../ui/document-upload";
import { Calendar } from "../ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";

// Type definitions
type hookFormField<T extends FieldValues, B extends FieldPath<T>> = {
  field: ControllerRenderProps<T, B>;
};

export interface GenericFormFieldCBArg<
  T extends FieldValues,
  B extends FieldPath<T>,
> extends hookFormField<T, B> {
  inputEle?: ReactElement;
  disabled?: boolean;
  canNegative?: boolean;
  radioButtonLabels?: string[];
}
export type GenericSelectCloseureOptions = { value: string; display: string };

interface GenericSelectCloseureProps {
  options: GenericSelectCloseureOptions[];
  onChange?: (val: string) => void;
  triggerClass?: string;
  className?: string;
  itemClass?: string;
  contentClass?: string;
  align?: "start" | "center" | "end";
  placeholder?: string;
  containerClass?: string;
}

export interface GenericFormFieldArg<
  T extends FieldValues,
  B extends FieldPath<T>,
> extends GenericFormFieldCBArg<T, B> {
  cb:
  | FC<GenericFormFieldCBArg<T, B>>
  | ((arg: GenericFormFieldCBArg<T, B>) => ReactElement | null);

  formLabel: string | ReactNode;
  info?: string | ReactNode;
  formDescription?: string | ReactNode;

  labelClass?: ClassValue;
  itemClass?: ClassValue;
  divClass?: ClassValue;
  descClass?: ClassValue;
  msgClass?: ClassValue;
  ctrlClass?: ClassValue;
}

type GenericFormField<T extends FieldValues, B extends FieldPath<T>> = (
  arg: GenericFormFieldArg<T, B>,
) => ReactElement | null;

// Generic Form Field Component
export function GenericFormField<
  T extends FieldValues,
  B extends FieldPath<T>,
>({
  cb,
  field,
  disabled = false,
  inputEle = undefined,
  formLabel,
  info = undefined,
  formDescription = undefined,
  itemClass = "",
  divClass = "",
  labelClass = "",
  descClass = "",
  msgClass = "",
  ctrlClass = "",
  radioButtonLabels,
}: GenericFormFieldArg<T, B>) {
  const ctrl = cb({ field, inputEle, disabled, radioButtonLabels });

  if (ctrl instanceof Promise) {
    console.error("cb function returned a Promise, which is not supported.");
    return null;
  }
  return (
    <TooltipProvider>
      <FormItem className={cn(itemClass)}>
        <div className={cn(divClass)}>
          <FormLabel className={cn("pb-2", labelClass)}>
            {formLabel}
            {info && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={12}
                    className="ml-1 inline cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {info}
                </TooltipContent>
              </Tooltip>
            )}
          </FormLabel>
          <FormControl className={cn(ctrlClass)}>{ctrl}</FormControl>
        </div>
        {formDescription && (
          <FormDescription className={cn(descClass)}>
            {formDescription}
          </FormDescription>
        )}
        <FormMessage className={cn(msgClass)} />
      </FormItem>
    </TooltipProvider>
  );
}

// Generic Form Input Component
export function GenericFormInput<
  T extends FieldValues,
  B extends FieldPath<T>,
>({ field, inputEle, disabled }: GenericFormFieldCBArg<T, B>): ReactElement {
  if (!inputEle) {
    inputEle = <Input type="text" />;
  }

  // Create props object with any type to avoid TypeScript errors
  const inputProps: any = {
    ...field,
    disabled,
  };

  return cloneElement(inputEle, inputProps);
}

// Generic form for number input
export function GenericFormNumericInput<
  T extends FieldValues,
  B extends FieldPath<T>,
>({ field, inputEle, disabled }: GenericFormFieldCBArg<T, B>): ReactElement {
  if (!inputEle) {
    inputEle = <Input type="number" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.valueAsNumber;

    // Call the original onChange if it exists
    if (inputEle.props && typeof inputEle.props.onChange === 'function') {
      inputEle.props.onChange(e);
    }

    field.onChange(isNaN(number) ? 0 : number);
  };

  // Create props object with any type
  const inputProps: any = {
    ...field,
    disabled,
    // Ensure value is not undefined before converting to number
    value: field && field.value !== undefined ? Number(field.value).toString() : "0",
    onChange: handleChange,
  };

  return cloneElement(inputEle, inputProps);
}

// Generic Form Password Component
export function GenericFormPassword<
  T extends FieldValues,
  B extends FieldPath<T>,
>({ field, inputEle, disabled }: GenericFormFieldCBArg<T, B>): ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  if (!inputEle) {
    inputEle = <Input type="password" />;
  }
  const inputProps: any = {
    ...field,
    disabled,
    type: showPassword ? "text" : "password",
    className: cn(inputEle.props?.className || "", "pr-14"),
  };

  const inputElement = cloneElement(inputEle, inputProps);
  const eyeButton = (
    <Button
      variant="ghost"
      onClick={() => setShowPassword((s) => !s)}
      type="button"
      className="absolute right-0 top-0 transform"
    >
      {!showPassword ? <EyeOff /> : <Eye />}
    </Button>
  );
  const divEle = (
    <div className="relative transition-all duration-1000 ease-in-out">
      {inputElement}
      {eyeButton}
    </div>
  );
  return divEle;
}

// Generic Select Form Component
export function GenericSelectClosure({
  options = [],
  onChange = undefined,
  itemClass = "",
  className = "",
  triggerClass = "",
  contentClass = "",
  align = "center",
  placeholder = "",
}: GenericSelectCloseureProps) {
  return function GenericSelectComponent<
    T extends FieldValues,
    B extends FieldPath<T>,
  >({ field }: GenericFormFieldCBArg<T, B>): ReactElement {
    return (
      <Select
        value={field.value}
        onValueChange={(val) => {
          if (onChange) {
            onChange(val);
          }
          field.onChange(val);
        }}
        defaultValue={field.value}
      >
        <SelectTrigger className={cn("w-full", triggerClass)}>
          <SelectValue
            className={cn("w-full", className)}
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent align={align} className={contentClass}>
          <SelectGroup>
            {options.map((val, index) => (
              <SelectItem className={itemClass} value={val.value} key={index}>
                {val.display}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };
}

// Generic Form Number Input Component
// export function GenericFormNumberInput<
//   T extends FieldValues,
//   B extends FieldPath<T>,
// >({
//   field,
//   inputEle,
//   disabled,
// }: GenericFormFieldCBArg<T, B>): ReactElement {
//   // Create our custom handlers for phone number input
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     handlePhoneNumberChange(e, field.onChange);
//   };

//   const handleBlur = () => {
//     const value = field.value;
//     if (!isValidPhoneNumber(value)) {
//       console.error("Invalid phone number format");
//     }
//   };

//   if (!inputEle) {
//     inputEle = <Input />;
//   }

//   // We need to properly type the props for cloneElement
//   const inputProps: any = {
//     ...field,
//     disabled,
//     onChange: handleInputChange,
//     onBlur: handleBlur,
//   };

//   return cloneElement(inputEle, inputProps);
// }

export function GenericCheckBoxClosure({
  checkValue,
  handleCheckboxChange,
}: {
  checkValue: string;
  handleCheckboxChange: (val: boolean, checkValue: string) => void;
}) {
  return function GenericCheckBox<
    T extends FieldValues,
    B extends FieldPath<T>,
  >({ field }: GenericFormFieldCBArg<T, B>): ReactElement {
    return (
      <>
        <Checkbox
          checked={field.value?.includes(checkValue)}
          className={cn(
            "data-[state=checked]:border-0 data-[state=checked]:bg-buttonBlue",
          )}
          onCheckedChange={(checked: boolean) =>
            handleCheckboxChange(checked, checkValue)
          }
        />
      </>
    );
  };
}

export function GenericCheckListClosure({
  options,
  handleCheckboxChange,
  containerClassName,
  checkBoxClassName,
}: {
  options: string[];
  handleCheckboxChange: (val: boolean, checkValue: string) => void;
  containerClassName?: string;
  checkBoxClassName?: string;
}) {
  return function GenericCheckList<
    T extends FieldValues,
    B extends FieldPath<T>,
  >({ field }: GenericFormFieldCBArg<T, B>): ReactElement {
    return (
      <>
        <div className={containerClassName}>
          {options.map((option) => (
            <div
              className={`my-3 flex gap-5 ${checkBoxClassName}`}
              key={option}
            >
              <Checkbox
                checked={field.value?.includes(option)}
                className={cn(
                  "data-[state=checked]:border-0 data-[state=checked]:bg-primary-blue",
                )}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange(checked, option)
                }
                id={`checkbox_${option}`}
              />
              <Label
                className="cursor-pointer text-primary-blue"
                htmlFor={`checkbox_${option}`}
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </>
    );
  };
}

export function GenericRadioGroup<
  T extends FieldValues,
  B extends FieldPath<T>,
>({
  field,
  radioButtonLabels,
  canNegative,
}: GenericFormFieldCBArg<T, B> & {
  radioButtonLabels?: string[];
  canNegative?: boolean;
}): ReactElement {
  return (
    <RadioGroup
      value={field?.value ? "true" : "false"}
      onValueChange={(val) => field.onChange(val === "true" ? true : false)}
      className={`flex ${canNegative ? "!flex-col" : "flex-row"}`}
    >
      <FormItem className="flex flex-row items-end gap-2">
        <FormControl>
          <RadioGroupItem value={"true"} className="mb-1" />
        </FormControl>
        <FormLabel className="text-md">
          {radioButtonLabels?.[0] ?? "Active"}
        </FormLabel>
      </FormItem>
      <FormItem className="flex flex-row items-end gap-2">
        <FormControl>
          <RadioGroupItem value={"false"} className="mb-1" />
        </FormControl>
        <FormLabel className="text-md">
          {radioButtonLabels?.[1] ?? "Inactive"}
        </FormLabel>
      </FormItem>
    </RadioGroup>
  );
}

interface GenericFileUploadOptions {
  formLabel: string;
  containerClassName?: string;
  buttonClassName?: string;
  fileListClassName?: string;
  fileItemClassName?: string;
  multiple?: boolean;
  accept?: string;
}

// GenericFileUpload
// export function GenericFileUpload({
//   formLabel,
//   containerClassName = "",
//   buttonClassName = "",
//   fileListClassName = "",
//   fileItemClassName = "",
//   multiple = true,
//   accept = "image/*,.pdf,.doc,.docx",
// }: GenericFileUploadOptions) {
//   return function FileUploadComponent<
//     T extends FieldValues,
//     B extends FieldPath<T>,
//   >({ field, disabled }: GenericFormFieldCBArg<T, B>): ReactElement {
//     return (
//       <div>
//         <DocumentUpload
//           name={field.name}
//           label={formLabel}
//           multiple={multiple}
//           initialFiles={field.value}
//           onChange={(files) => field.onChange(files)}
//           containerClassName={containerClassName}
//           buttonClassName={buttonClassName}
//           fileListClassName={fileListClassName}
//           fileItemClassName={fileItemClassName}
//           disabled={disabled}
//           accept={accept}
//         />
//       </div>
//     );
//   };
// }

// Generic Date Picker
// export function GenericDatePicker<
//   T extends FieldValues,
//   B extends FieldPath<T>,
// >({ field, disabled }: GenericFormFieldCBArg<T, B>): ReactElement {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           className={cn(
//             "w-full justify-start text-left font-normal",
//             !field.value && "text-muted-foreground"
//           )}
//           disabled={disabled}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {field.value ? format(new Date(field.value), "PPP") : <span>Select date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={field.value ? new Date(field.value) : undefined}
//           onSelect={(date) => field.onChange(date)}
//           initialFocus
//           disabled={disabled}
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface GenericMultiSelectClosureProps {
  options: MultiSelectOption[];
  placeholder?: string;
  maxCount?: number;
  defaultValue?: string[];
} 