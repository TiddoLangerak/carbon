import React, { useState } from "react";
import { MultiSelect, Option } from "..";
import partialAction from "../../../__internal__/utils/storybook/partial-action";

export default {
  component: MultiSelect,
  title: "Select/MultiSelect/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = () => {
  const MAX_SELECTIONS_ALLOWED = 2;
  const [selectedPills, setSelectedPills] = useState([] as string[]);
  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_SELECTIONS_ALLOWED) {
      setSelectedPills((event.target.value as unknown) as string[]);
      partialAction("onChange")();
    }
  };
  return (
    <MultiSelect
      name="testing"
      value={selectedPills}
      onChange={handleActivityChange}
      onOpen={partialAction("onOpen")}
      onClick={partialAction("onClick")}
      onFilterChange={partialAction("onFilterChange")}
      onFocus={partialAction("onFocus")}
      onBlur={partialAction("onBlur")}
      onKeyDown={partialAction("onKeyDown")}
      disablePortal
      openOnFocus
      label="Test"
      placeholder=" "
    >
      <Option value="1" text="One" />
      <Option value="2" text="Two" />
      <Option value="3" text="Three" />
      <Option value="4" text="Four" />
      <Option value="5" text="Five" />
      <Option value="6" text="Six" />
      <Option value="7" text="Seven" />
      <Option value="8" text="Eight" />
      <Option value="9" text="Nine" />
      <Option value="10" text="Ten" />
    </MultiSelect>
  );
};

Default.storyName = "default";
