/** External Dependencies */
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { ComponentProps, FC, ReactNode } from "react";
import {
  InlineWidget,
  PopupModal,
  useCalendlyEventListener,
} from "react-calendly";
import { CalendlyEventHandlers } from "react-calendly/typings/components/hooks/useCalendlyEventListener";

type RequiredCalendlyEventHandler = Required<
  Pick<CalendlyEventHandlers, "onEventScheduled">
>;
type OptionalCalendlyEventHandler = Omit<
  CalendlyEventHandlers,
  "onEventScheduled"
>;
type CalendlyEventHandlerProps = RequiredCalendlyEventHandler &
  OptionalCalendlyEventHandler;

type InlineCalandlyProps = Omit<ComponentProps<typeof InlineWidget>, ""> &
  CalendlyEventHandlerProps & { className?: ClassValue };

/**
 * Component to display Calandly form inline i.e. on the web page instead of popup, url and onEventScheduled are the only required props
 */
export const InlineCalandlyComponent: FC<InlineCalandlyProps> = ({
  className = "",
  styles,
  onProfilePageViewed = undefined,
  onPageHeightResize = undefined,
  onEventTypeViewed = undefined,
  onDateAndTimeSelected = undefined,
  onEventScheduled,
  ...calandlyProps
}) => {
  useCalendlyEventListener({
    ...(onProfilePageViewed ? { onProfilePageViewed } : {}),
    ...(onDateAndTimeSelected ? { onDateAndTimeSelected } : {}),
    ...(onEventTypeViewed ? { onEventTypeViewed } : {}),
    onEventScheduled,
    ...(onPageHeightResize ? { onPageHeightResize } : {}),
  });

  return (
    <div className={cn(className)}>
      <InlineWidget
        {...calandlyProps}
        styles={{
          ...(styles ?? {}),
          minWidth: styles?.minWidth ?? "100%",
          height: styles?.height ?? "100%",
        }}
      />
    </div>
  );
};

type PopupCalandlyProps = Omit<
  ComponentProps<typeof PopupModal>,
  "styles" | "rootElement" | "open" | "onModalClose"
> &
  CalendlyEventHandlerProps & {
    divClass?: ClassValue;
    className?: ClassValue;
    buttonTitle: ReactNode;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
  };

/**
 * Component to displayu Calandly form as a popup on button click, url, onEventScheduled and Buttontitle are the only required props, when can customize the button with tailwind classes using classname prop
 */
export const PopupCalandlyComponent: FC<PopupCalandlyProps> = ({
  setShowModal,
  showModal,
  //  className,
  onProfilePageViewed = undefined,
  onPageHeightResize = undefined,
  onEventTypeViewed = undefined,
  onDateAndTimeSelected = undefined,
  onEventScheduled,
  ...calandlyProps
}) => {
  useCalendlyEventListener({
    ...(onProfilePageViewed ? { onProfilePageViewed } : {}),
    ...(onDateAndTimeSelected ? { onDateAndTimeSelected } : {}),
    ...(onEventTypeViewed ? { onEventTypeViewed } : {}),
    onEventScheduled,
    ...(onPageHeightResize ? { onPageHeightResize } : {}),
  });

  return (
    <PopupModal
      {...calandlyProps}
      rootElement={document.getElementById("root") as HTMLElement}
      open={showModal}
      onModalClose={() => setShowModal(false)}
    />
  );
};

export default PopupCalandlyComponent;
