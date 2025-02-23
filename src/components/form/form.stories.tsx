import React, { useState } from "react";
import Form from ".";
import Button from "../button";
import { Tab, Tabs } from "../tabs";
import Box from "../box";
import Textbox from "../textbox";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Textarea from "../textarea";
import Dialog from "../dialog";
import DateInput from "../date";
import { Select, MultiSelect, Option } from "../select";
import DialogFullScreen from "../dialog-full-screen";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import { Checkbox } from "../checkbox";
import Hr from "../../components/hr";
import Switch from "../switch";
import InlineInputs from "../inline-inputs";
import isChromatic from "../../../.storybook/isChromatic";

const isOpenForChromatic = isChromatic();

export const DefaultWithStickyFooter = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
  >
    <Tabs mb={2}>
      <Tab
        pl="3px"
        customLayout={
          <Box mx="16px" my="10px">
            Tab1
          </Box>
        }
        tabId="tab1"
      />
    </Tabs>
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
  </Form>
);

DefaultWithStickyFooter.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithFullWidthButtons = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form
      fullWidthButtons
      onSubmit={() => console.log("submit")}
      stickyFooter
      leftSideButtons={
        <Button mb={3} onClick={() => console.log("cancel")} fullWidth>
          Cancel
        </Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit" fullWidth>
          Save
        </Button>
      }
      errorCount={3}
      warningCount={2}
    >
      <Tabs mb={2}>
        <Tab
          pl="3px"
          customLayout={
            <Box mx="16px" my="10px">
              Tab1
            </Box>
          }
          tabId="tab1"
        />
      </Tabs>
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
    </Form>
  </CarbonProvider>
);

WithFullWidthButtons.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithDifferentSpacing = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    fieldSpacing={5}
  >
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textarea label="Textarea with Character Limit" characterLimit={50} />
  </Form>
);

export const OverrideFieldSpacing = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" mb={7} />
    <Textbox label="Textbox" />
  </Form>
);

export const WithErrorsSummary = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithWarningsSummary = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    warningCount={1}
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithBothErrorsAndWarningsSummary = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={2}
    warningCount={2}
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithAdditionalButtons = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <>
        <Button onClick={() => console.log("cancel")}>Other</Button>
        <Button onClick={() => console.log("cancel")} ml={2}>
          Cancel
        </Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button onClick={() => console.log("cancel")}>Reset</Button>
        <Button onClick={() => console.log("cancel")} ml={2}>
          Other
        </Button>
      </>
    }
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithButtonsAlignedToTheLeft = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <>
        <Button onClick={() => console.log("cancel")}>Other</Button>
        <Button onClick={() => console.log("cancel")} ml={2}>
          Cancel
        </Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button onClick={() => console.log("cancel")}>Reset</Button>
        <Button onClick={() => console.log("cancel")} ml={2}>
          Other
        </Button>
      </>
    }
    buttonAlignment="left"
  >
    <Textbox label="Textbox" />
  </Form>
);

export const InDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" onClick={() => console.log("save")}>
              Submit
            </Button>
          }
        >
          <Textbox label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};

InDialog.parameters = { chromatic: { disableSnapshot: true } };

export const InDialogWithStickyFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" onClick={() => console.log("save")}>
              Submit
            </Button>
          }
          stickyFooter
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox key={index} label="Textbox" />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev) => setDate(ev.target.value.formattedValue)}
            disablePortal
          />
          <Select
            name="simple-disabled-portal"
            id="simple-disabled-portal"
            label="Simple Select - disabled portal"
            disablePortal
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect
            name="multi-disabled-portal"
            id="multi-disabled-portal"
            label="Multi Select - disabled portal"
            disablePortal
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          <Select name="simple" id="simple" label="Simple Select">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect name="multi" id="multi" label="Multi Select">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox key={index} label="Textbox" />
          ))}
        </Form>
      </Dialog>
    </>
  );
};

InDialogWithStickyFooter.parameters = { chromatic: { disableSnapshot: true } };

export const InDialogFullScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Box p="0px 40px">
          <Form
            leftSideButtons={
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            }
            saveButton={
              <Button buttonType="primary" onClick={() => console.log("save")}>
                Submit
              </Button>
            }
          >
            <Textbox label="Textbox" />
          </Form>
        </Box>
      </DialogFullScreen>
    </>
  );
};

InDialogFullScreen.parameters = { chromatic: { disableSnapshot: true } };

export const InDialogFullScreenWithStickyFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" onClick={() => console.log("save")}>
              Submit
            </Button>
          }
          stickyFooter
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox key={index} label="Textbox" />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev) => setDate(ev.target.value.formattedValue)}
          />
          <Select name="simple" id="simple" label="label">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox key={index} label="Textbox" />
          ))}
        </Form>
      </DialogFullScreen>
    </>
  );
};

InDialogFullScreenWithStickyFooter.parameters = {
  chromatic: { disableSnapshot: true },
};

export const FormAlignmentExample = () => {
  const [date, setDate] = useState("04/04/2019");
  return (
    <Form
      onSubmit={() => console.log("submit")}
      leftSideButtons={
        <Button onClick={() => console.log("cancel")}>Cancel</Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={4}
    >
      <Textbox
        key="input-one"
        label="Field 1"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        fieldHelp="This is some help text"
        isOptional={false}
      />
      <Textbox
        key="input-two"
        label="Field 2"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        labelSpacing={2}
      />
      <RadioButtonGroup
        name="legend"
        onChange={() => console.log("RADIO CHANGE")}
        legend="Legend"
        legendInline
        legendWidth={10}
        legendSpacing={2}
        mb={2}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <DateInput
        name="date"
        label="Date picker"
        labelInline
        labelWidth={10}
        value={date}
        onChange={(ev) => setDate(ev.target.value.formattedValue)}
      />
      <RadioButtonGroup
        name="nolegend"
        onChange={() => console.log("RADIO CHANGE")}
        legend="Legend above"
        ml="10%"
        mb={2}
      >
        <RadioButton
          id="group-2-input-1"
          value="group-2-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <Textarea
        key="input-three"
        label="Field 3"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
      <Checkbox
        name="checkbox1"
        onChange={() => console.log("CHECKBOX 1")}
        label="Checkbox 1"
        ml="10%"
      />
      <Checkbox
        name="checkbox2"
        onChange={() => console.log("CHECKBOX 2")}
        label="Checkbox 2"
        ml="10%"
      />
      <Hr ml="10%" mr="60%" mb={7} />
      <Button buttonType="tertiary" ml="calc(10% - 24px)">
        Tertiary
      </Button>
      <Textbox
        key="input-four"
        label="Field 4"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
      <Switch
        name="switch"
        label="Switch"
        labelInline
        onChange={() => console.log("SWITCH")}
        labelWidth={10}
        labelSpacing={2}
        mb={4}
      />
      <Textbox
        key="input-five"
        label="Field 5"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
    </Form>
  );
};

export const WithLabelsInline = () => (
  <Form
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox label="Textbox" labelInline labelWidth={30} />
    <InlineInputs label="Inline Inputs" gutter="none" labelWidth={30}>
      <Textbox />
      <Textbox />
      <Select>
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="1" />
        <Option value="3" text="option 3" key="1" />
      </Select>
    </InlineInputs>
    <InlineInputs
      label="Inline Inputs with a gutter"
      gutter="large"
      labelWidth={30}
    >
      <Textbox />
      <Textbox />
      <Select>
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="1" />
        <Option value="3" text="option 3" key="1" />
      </Select>
    </InlineInputs>
  </Form>
);

export const WithCustomFooterPadding = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="With custom footer padding"
      >
        <Form
          onSubmit={() => console.log("submit")}
          leftSideButtons={
            <Button onClick={() => console.log("cancel")}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
          footerPadding={{ px: 8 }}
        >
          <Textbox label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};
