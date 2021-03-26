import * as React from "react";
import { Positions } from "../../utils/helpers/options-helper";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";
export interface IconProps extends MarginSpacingProps {
  /** Icon type */
  type: string;
  /** Background size */
  bgSize?: "small" | "medium" | "large" | "extra-large";
  /** Background shape */
  bgShape?: "circle" | "rounded-rect" | "square";
  /** Background color theme */
  bgTheme?: "info" | "error" | "success" | "warning" | "business" | "none";
  /** Icon font size */
  fontSize?: "small" | "medium" | "large" | "extra-large";
  /** Icon color */
  iconColor?:
    | "default"
    | "on-light-background"
    | "on-dark-background"
    | "business-color";
  /** Override iconColor, provide any color from palette or any valid css color value. */
  color?: string;
  /** Override bgTheme, provide any color from palette or any valid css color value. */
  bg?: string;
  /** Sets the icon in the disabled state */
  disabled?: boolean;
  /** Aria label for accessibility purposes */
  ariaLabel?: string;
  /** The message string to be displayed in the tooltip */
  tooltipMessage?: string;
  /** The position to display the tooltip */
  tooltipPosition?: Positions;
  /** Control whether the tooltip is visible */
  tooltipVisible?: boolean;
  /** Override background color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipBgColor?: string;
  /** Override font color of the Tooltip, provide any color from palette or any valid css color value. */
  tooltipFontColor?: string;
  /** Overrides the default flip behaviour of the Tooltip */
  tooltipFlipOverrides?: Positions[];
}

declare function Icon(props: IconProps & React.RefAttributes<HTMLSpanElement>): JSX.Element;

export default Icon;
