import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import StyledTab from "./tab.style";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemPaddingProps } from "../../../style/utils";

const TabContext = React.createContext({});

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

const Tab = ({
  ariaLabelledby,
  className,
  children,
  isTabSelected,
  position = "top",
  role = "tabpanel",
  tabId,
  updateErrors,
  updateWarnings,
  updateInfos,
  href,
  title,
  titleProps,
  ...rest
}) => {
  const [tabErrors, setTabErrors] = useState({});
  const [tabWarnings, setTabWarnings] = useState({});
  const [tabInfos, setTabInfos] = useState({});

  const setError = useCallback((childId, error) => {
    setTabErrors((state) =>
      state[childId] !== error ? { ...state, [childId]: error } : state
    );
  }, []);

  const setWarning = useCallback((childId, warning) => {
    setTabWarnings((state) =>
      state[childId] !== warning ? { ...state, [childId]: warning } : state
    );
  }, []);

  const setInfo = useCallback((childId, info) => {
    setTabInfos((state) =>
      state[childId] !== info ? { ...state, [childId]: info } : state
    );
  }, []);

  useEffect(() => {
    if (updateErrors) {
      updateErrors(tabId, tabErrors);
    }
  }, [tabId, tabErrors, updateErrors]);

  useEffect(() => {
    if (updateWarnings) {
      updateWarnings(tabId, tabWarnings);
    }
  }, [tabId, tabWarnings, updateWarnings]);

  useEffect(() => {
    if (updateInfos) {
      updateInfos(tabId, tabInfos);
    }
  }, [tabId, tabInfos, updateInfos]);

  return (
    <TabContext.Provider value={{ setError, setWarning, setInfo }}>
      <StyledTab
        className={className}
        role={role}
        isTabSelected={isTabSelected}
        aria-labelledby={ariaLabelledby}
        position={position}
        {...tagComponent("tab", rest)}
        {...rest}
      >
        {!href && children}
      </StyledTab>
    </TabContext.Provider>
  );
};

Tab.propTypes = {
  ...paddingPropTypes,
  title: PropTypes.string,
  /** A unique ID to identify this specific tab. */
  tabId: PropTypes.string.isRequired,
  /** @ignore @private */
  className: PropTypes.string,
  /** The child elements of Tab component. */
  children: PropTypes.node,
  /** Overrides Title default layout with a one defined in this prop */
  customLayout: PropTypes.node,
  /** @ignore @private Boolean indicating selected state of Tab. */
  isTabSelected: PropTypes.bool,
  /** The position of the Tab. */
  position: PropTypes.oneOf(["top", "left"]),
  /** @ignore @private */
  role: PropTypes.string,
  /** @ignore @private */
  ariaLabelledby: PropTypes.string,
  /** @ignore @private */
  updateErrors: PropTypes.func,
  /** @ignore @private */
  updateWarnings: PropTypes.func,
  /** @ignore @private */
  updateInfos: PropTypes.func,
  /** Message displayed when Tab has error */
  errorMessage: PropTypes.string,
  /** Message displayed when Tab has warning */
  warningMessage: PropTypes.string,
  /** Message displayed when Tab has warning */
  infoMessage: PropTypes.string,
  /** Additional content to display with title */
  siblings: PropTypes.arrayOf(PropTypes.node),
  /** Position title before or after siblings */
  titlePosition: PropTypes.oneOf(["before", "after"]),
  /** Allows Tab to be a link */
  href: PropTypes.string,
  /** Additional props to be passed to the Tab's corresponding title */
  titleProps: PropTypes.shape({
    /** Identifier used for testing purposes */
    "data-role": PropTypes.string,
  }),
};

export { TabContext };
export default Tab;
