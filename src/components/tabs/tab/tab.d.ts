import * as React from "react";
import { PaddingProps } from "styled-system";

export interface TabContextProps {
  setError?: (childId: string, error?: boolean | string) => void;
  setWarning?: (childId: string, warning?: boolean | string) => void;
  setInfo?: (childId: string, info?: boolean | string) => void;
}

export interface TabProps extends PaddingProps {
  title?: string;
  /** A unique ID to identify this specific tab. */
  tabId: string;
  className?: string;
  /** The child elements of Tab component. */
  children?: React.ReactNode;
  /** @ignore @private Boolean indicating selected state of Tab. */
  isTabSelected?: boolean;
  /** The position of the Tab. */
  position?: "top" | "left";
  /** Message displayed when Tab has error */
  errorMessage?: string;
  /** Message displayed when Tab has warning */
  warningMessage?: string;
  /** Message displayed when Tab has warning */
  infoMessage?: string;
  /** Additional content to display with title */
  siblings?: React.ReactNode[];
  /** Position title before or after siblings */
  titlePosition?: "before" | "after";
  /** Allows Tab to be a link */
  href?: string;
  /** Overrides default layout with a one defined in this prop */
  customLayout?: React.ReactNode;
  /** Additional props to be passed to the Tab's corresponding title. */
  titleProps?: {
    /** Identifier used for testing purposes */
    "data-role"?: string;
  };
}

export interface TabAllProps {
  role?: string;
  ariaLabelledby?: string;
  updateErrors?: (id: string, hasError: boolean) => void;
  updateWarnings?: (id: string, hasWarning: boolean) => void;
  updateInfos?: (id: string, hasInfo: boolean) => void;
}

declare const TabContext: React.Context<TabContextProps>;
declare function Tab(props: TabProps): JSX.Element;

export { TabContext };
export default Tab;
