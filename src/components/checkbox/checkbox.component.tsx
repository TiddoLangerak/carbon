import React, { useContext } from "react";
import { MarginProps } from "styled-system";
import CheckboxStyle from "./checkbox.style";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input/checkable-input.component";
import CheckboxSvg from "./checkbox-svg.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import { CheckboxGroupContext } from "./checkbox-group.component";
import Logger from "../../__internal__/utils/logger";

export interface CheckboxProps extends CommonCheckableInputProps, MarginProps {
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** When true label is inline */
  labelInline?: boolean;
  /** Accepts a callback function which is triggered on click event */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** The value of the checkbox, passed on form submit */
  value?: string;
  /** A callback to retrieve the input reference (deprecated) */
  inputRef?: React.Ref<HTMLInputElement>;
}

let deprecateInputRefWarnTriggered = false;

export const Checkbox = React.forwardRef(
  (
    {
      id,
      label,
      onChange,
      name,
      /* FIXME: FE-4102 */
      onClick,
      onBlur,
      onFocus,
      value,
      fieldHelp,
      autoFocus,
      labelHelp,
      labelSpacing = 1,
      labelWidth,
      adaptiveSpacingBreakpoint,
      required,
      error,
      warning,
      info,
      fieldHelpInline,
      reverse = false,
      checked,
      disabled,
      inputWidth,
      size,
      tooltipPosition,
      "data-component": dataComponent = "checkbox",
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      inputRef,
      ...props
    }: CheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const largeScreen = useIsAboveBreakpoint(adaptiveSpacingBreakpoint);
    const adaptiveSpacingSmallScreen = !!(
      adaptiveSpacingBreakpoint && !largeScreen
    );
    const {
      error: contextError,
      warning: contextWarning,
      info: contextInfo,
    } = useContext(CheckboxGroupContext);

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Checkbox` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const inputProps = {
      onClick,
      onChange,
      onBlur,
      onFocus,
      labelInline: true,
      id,
      label,
      value,
      type: "checkbox",
      name,
      reverse: !reverse,
      fieldHelp,
      autoFocus,
      labelHelp,
      labelSpacing,
      required,
      error: contextError || error,
      warning: contextWarning || warning,
      info: contextInfo || info,
      fieldHelpInline,
      checked,
      disabled,
      inputWidth,
      labelWidth,
      tooltipPosition,
      ref: ref || inputRef,
      ...props,
    };

    return (
      <TooltipProvider
        helpAriaLabel={helpAriaLabel}
        tooltipPosition={tooltipPosition}
      >
        <CheckboxStyle
          data-component={dataComponent}
          data-role={dataRole}
          data-element={dataElement}
          disabled={disabled}
          labelSpacing={labelSpacing}
          inputWidth={inputWidth}
          adaptiveSpacingSmallScreen={adaptiveSpacingSmallScreen}
          error={contextError || error}
          warning={contextWarning || warning}
          info={contextInfo || info}
          fieldHelpInline={fieldHelpInline}
          reverse={reverse}
          size={size}
          {...filterStyledSystemMarginProps(props)}
        >
          <CheckableInput {...inputProps}>
            <CheckboxSvg />
          </CheckableInput>
        </CheckboxStyle>
      </TooltipProvider>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
