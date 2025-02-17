import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  assertStyleMatch,
  mockMatchMedia,
} from "../../__spec_helper__/test-utils";
import { RadioButton, RadioButtonGroup } from ".";
import RadioButtonGroupStyle from "./radio-button-group.style";
import Fieldset from "../../__internal__/fieldset";
import Label from "../../__internal__/label";
import Tooltip from "../tooltip";
import { RadioButtonGroupProps } from "./radio-button-group.component";

const buttonValues = ["test-1", "test-2"];

function renderRadioButtonGroup({
  name = "test-group",
  ...props
}: Partial<RadioButtonGroupProps>) {
  const children = buttonValues.map((value, index) => (
    <RadioButton
      id={`rId-${index}`}
      key={`radio-key-${value}`}
      onChange={jest.fn()}
      value={value}
    />
  ));

  return mount(
    <RadioButtonGroup
      name={name}
      legend="Test RadioButtonGroup Legend"
      onBlur={jest.fn()}
      onChange={jest.fn()}
      {...props}
    >
      {children}
    </RadioButtonGroup>
  );
}

describe("RadioButtonGroup", () => {
  describe("with an inline legend", () => {
    describe("when adaptiveLegendBreakpoint prop is set", () => {
      describe("when screen bigger than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(true);
        });

        it("should pass legendInline to Fieldset", () => {
          const wrapper = renderRadioButtonGroup({
            legend: "Legend",
            legendInline: true,
            adaptiveLegendBreakpoint: 1000,
          });

          expect(wrapper.find(Fieldset).props().inline).toEqual(true);
        });
      });

      describe("when screen smaller than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(false);
        });

        it("should pass legendInline to Fieldset", () => {
          const wrapper = renderRadioButtonGroup({
            legend: "Legend",
            legendInline: true,
            adaptiveLegendBreakpoint: 1000,
          });

          expect(wrapper.find(Fieldset).props().inline).toEqual(false);
        });
      });
    });
  });

  describe("with a left margin (ml prop)", () => {
    describe("when adaptiveSpacingBreakpoint prop is set", () => {
      describe("when screen bigger than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(true);
        });

        it("should pass the correct margin to Fieldset", () => {
          const wrapper = renderRadioButtonGroup({
            legend: "Legend",
            legendInline: true,
            adaptiveSpacingBreakpoint: 1000,
            ml: "10%",
          });

          expect(wrapper.find(Fieldset).props().ml).toEqual("10%");
        });
      });

      describe("when screen smaller than breakpoint", () => {
        beforeEach(() => {
          mockMatchMedia(false);
        });

        it('should pass "0" to Fieldset', () => {
          const wrapper = renderRadioButtonGroup({
            legend: "Legend",
            legendInline: true,
            adaptiveSpacingBreakpoint: 1000,
            ml: "10%",
          });

          expect(wrapper.find(Fieldset).props().ml).toEqual(undefined);
        });
      });
    });
  });

  describe("styles", () => {
    it("applies the correct Legend Container styles", () => {
      assertStyleMatch(
        {
          display: "flex",
        },
        mount(<RadioButtonGroupStyle inline />)
      );
    });
  });

  describe("validations", () => {
    it.each([
      ["error", "string"],
      ["error", true],
      ["warning", "string"],
      ["warning", true],
      ["info", "string"],
      ["info", true],
    ])(
      "when %s is passed as %s it is passed as boolean to RadioButton",
      (type, value) => {
        const wrapper = renderRadioButtonGroup({ [type]: true });
        wrapper
          .find(RadioButton)
          .forEach((node) =>
            expect(node.props()[type as "error" | "warning" | "info"]).toBe(
              true
            )
          );
      }
    );

    it("blocks the group behaviour if no validation set on group", () => {
      const wrapper = renderRadioButtonGroup({});
      expect(wrapper.find(Fieldset).props().blockGroupBehaviour).toEqual(true);
    });
  });

  describe("required", () => {
    let wrapper: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(
        <RadioButtonGroup name="radio" legend="Group Label" required>
          <RadioButton label="off" value="test" />
          <RadioButton label="on" value="test" />
        </RadioButtonGroup>
      );
    });

    it("the required prop is passed to the inputs", () => {
      const inputs = wrapper.find("input");
      inputs.forEach((input) => {
        expect(input.prop("required")).toBe(true);
      });
    });

    it("the isRequired prop is not passed to the labels", () => {
      const labels = wrapper.find(Label);
      labels.forEach((label) => {
        expect(label.prop("isRequired")).toBe(undefined);
      });
    });

    it("the isRequired prop is passed to the fieldset", () => {
      const fieldset = wrapper.find(Fieldset);
      expect(fieldset.prop("isRequired")).toBe(true);
    });
  });

  describe("tooltipPosition", () => {
    it("overrides the default position when value is passed", () => {
      const { position } = renderRadioButtonGroup({
        error: "message",
        tooltipPosition: "bottom",
      })
        .find(Tooltip)
        .props();

      expect(position).toEqual("bottom");
    });
  });

  describe("when children are passed in an array", () => {
    it("should render the list correctly", () => {
      const radioGroup = mount(
        <RadioButtonGroup
          name="foo"
          legend="Test RadioButtonGroup Legend"
          onBlur={jest.fn()}
          onChange={jest.fn()}
        >
          {[
            <RadioButton key="radio1" defaultChecked name="foo" value="foo" />,
            null,
            undefined,
            "foo",
            <RadioButton key="radio2" name="bar" value="bar" />,
          ]}
        </RadioButtonGroup>
      );

      expect(radioGroup.find(RadioButton).at(0).props().checked).toBe(true);
      expect(radioGroup.find(RadioButton).at(1).props().checked).toBe(false);
    });
  });
});
