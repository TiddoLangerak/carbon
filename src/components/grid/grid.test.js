import React from "react";
import GridContainer from "./grid-container/grid-container.component";
import GridItem from "./grid-item/grid-item.component";
import { gridItem, gridContainer } from "../../../cypress/locators/grid";
import Pod from "../pod";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const viewportSize = (sizeOfViewport) => {
  switch (sizeOfViewport) {
    case "default":
      cy.viewport(1958, 900);
      break;
    case "extra small":
      cy.viewport(599, 900);
      break;
    case "small":
      cy.viewport(959, 900);
      break;
    case "medium":
      cy.viewport(1259, 900);
      break;
    case "large":
      cy.viewport(1920, 900);
      break;
    case "extra large":
      cy.viewport(1922, 900);
      break;
    default:
      throw new Error(
        `${sizeOfViewport} is not defined in a scope. We want to resize to only for types of viewport`
      );
  }
};

const SimpleGridExample = ({ ...itemProps }) => {
  return (
    <GridContainer>
      <GridItem alignSelf="stretch" justifySelf="stretch" {...itemProps}>
        <Pod>Item 1</Pod>
      </GridItem>
    </GridContainer>
  );
};

const GridLayoutExample = () => {
  return (
    <GridContainer>
      <GridItem alignSelf="stretch" justifySelf="stretch">
        <Pod>Item 1</Pod>
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="1 / 6"
        gridRow="2 / 3"
      >
        <Pod>Item 2</Pod>
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 13"
        gridRow="4 / 5"
      >
        <Pod>Item 3</Pod>
      </GridItem>
    </GridContainer>
  );
};

context("Testing Grid component", () => {
  describe("should render Grid component", () => {
    it.each([
      [1, "auto / auto", "1 / 13", 1877],
      [2, "2 / 3", "1 / 6", 759],
      [3, "4 / 5", "7 / 13", 918],
    ])(
      "when viewport size is default, grid item %s should have correct grid-row, grid-column and width",
      (itemNumber, row, col, expectedWidth) => {
        CypressMountWithProviders(<GridLayoutExample />);

        viewportSize("default");
        gridItem(itemNumber - 1)
          .should("have.css", "grid-row", row)
          .should("have.css", "grid-column", col)
          .then(($element) =>
            useJQueryCssValueAndAssert($element, "width", expectedWidth)
          );
      }
    );

    it.each([
      [1, "auto / auto", "1 / 13", 566],
      [2, "2 / 3", "1 / 6", 227],
      [3, "4 / 5", "7 / 13", 274],
    ])(
      "when viewport size is extra small, grid item %s should have correct grid-row, grid-column and width",
      (itemNumber, row, col, expectedWidth) => {
        CypressMountWithProviders(<GridLayoutExample />);

        viewportSize("extra small");
        gridItem(itemNumber - 1)
          .should("have.css", "grid-row", row)
          .should("have.css", "grid-column", col)
          .then(($element) => {
            useJQueryCssValueAndAssert($element, "width", expectedWidth);
          });
      }
    );

    it.each([
      [1, "auto / auto", "1 / 13", 910],
      [2, "2 / 3", "1 / 6", 370],
      [3, "4 / 5", "7 / 13", 447],
    ])(
      "when viewport size is small, grid item %s should have correct grid-row, grid-column and width",
      (itemNumber, row, col, expectedWidth) => {
        CypressMountWithProviders(<GridLayoutExample />);

        viewportSize("small");
        gridItem(itemNumber - 1)
          .should("have.css", "grid-row", row)
          .should("have.css", "grid-column", col)
          .then(($element) => {
            useJQueryCssValueAndAssert($element, "width", expectedWidth);
          });
      }
    );

    it.each([
      [1, "auto / auto", "1 / 13", 1194],
      [2, "2 / 3", "1 / 6", 483],
      [3, "4 / 5", "7 / 13", 585],
    ])(
      "when viewport size is medium, grid item %s should have correct grid-row, grid-column and width",
      (itemNumber, row, col, expectedWidth) => {
        CypressMountWithProviders(<GridLayoutExample />);

        viewportSize("medium");
        gridItem(itemNumber - 1)
          .should("have.css", "grid-row", row)
          .should("have.css", "grid-column", col)
          .then(($element) => {
            useJQueryCssValueAndAssert($element, "width", expectedWidth);
          });
      }
    );

    it.each([
      [1, "auto / auto", "1 / 13", 1840],
      [2, "2 / 3", "1 / 6", 752],
      [3, "4 / 5", "7 / 13", 908],
    ])(
      "when viewport size is large, grid item %s should have correct grid-row, grid-column and width",
      (itemNumber, row, col, expectedWidth) => {
        CypressMountWithProviders(<GridLayoutExample />);

        viewportSize("large");
        gridItem(itemNumber - 1)
          .should("have.css", "grid-row", row)
          .should("have.css", "grid-column", col)
          .then(($element) => {
            useJQueryCssValueAndAssert($element, "width", expectedWidth);
          });
      }
    );

    it.each([
      [1, "auto / auto", "1 / 13", 1842],
      [2, "2 / 3", "1 / 6", 744],
      [3, "4 / 5", "7 / 13", 901],
    ])(
      "when viewport size is extra large, grid item %s should have correct grid-row, grid-column and width",
      (itemNumber, row, col, expectedWidth) => {
        CypressMountWithProviders(<GridLayoutExample />);

        viewportSize("extra large");
        gridItem(itemNumber - 1)
          .should("have.css", "grid-row", row)
          .should("have.css", "grid-column", col)
          .then(($element) => {
            useJQueryCssValueAndAssert($element, "width", expectedWidth);
          });
      }
    );

    it.each([
      ["extra small", 16, 16],
      ["small", 24, 16],
      ["medium", 32, 24],
      ["large", 40, 24],
      ["extra large", 40, 40],
    ])(
      "when viewport size is %s, grid container has correct padding and row gap size",
      (size, padding, gridGap) => {
        CypressMountWithProviders(<SimpleGridExample />);

        viewportSize(size);

        gridContainer().then(($element) => {
          useJQueryCssValueAndAssert($element, "padding-left", padding);
          useJQueryCssValueAndAssert($element, "row-gap", gridGap);
        });
      }
    );

    it.each(["start", "end", "center", "stretch"])(
      "grid item correctly has alignment set to %",
      (alignment) => {
        CypressMountWithProviders(<SimpleGridExample alignSelf={alignment} />);

        gridItem(0).should("have.css", "align-self", alignment);
      }
    );

    it.each(["start", "end", "center", "stretch"])(
      "grid item correctly has justification set to %s",
      (justification) => {
        CypressMountWithProviders(
          <SimpleGridExample justifySelf={justification} />
        );

        gridItem(0).should("have.css", "justify-self", justification);
      }
    );

    it("grid item has correct start and end columns when gridColumn prop is passed", () => {
      CypressMountWithProviders(<SimpleGridExample gridColumn="4 / 10" />);

      gridItem(0)
        .should("have.css", "grid-column-start", "4")
        .and("have.css", "grid-column-end", "10");
    });

    it("grid item has correct start and end rows when gridRow prop is passed", () => {
      CypressMountWithProviders(<SimpleGridExample gridRow="4 / 11" />);

      gridItem(0)
        .should("have.css", "grid-row-start", "4")
        .and("have.css", "grid-row-end", "11");
    });

    it("grid item has correct start and end columns and rows when gridArea prop is passed", () => {
      CypressMountWithProviders(
        <SimpleGridExample gridArea="3 / 4 / 11 / 10" />
      );

      gridItem(0)
        .should("have.css", "grid-column", "4 / 10")
        .and("have.css", "grid-row", "3 / 11");
    });

    it("correctly renders grid items when each have responsive settings passed", () => {
      CypressMountWithProviders(
        <GridContainer>
          <GridItem
            responsiveSettings={[
              {
                maxWidth: "1500px",
                gridColumn: "1 / 7",
                gridRow: "1 / 1",
                alignSelf: "stretch",
                justifySelf: "stretch",
              },
              {
                maxWidth: "1300px",
                gridColumn: "1 / 13",
                gridRow: "1 / 1",
                alignSelf: "stretch",
                justifySelf: "stretch",
              },
              {
                maxWidth: "900px",
                gridColumn: "1 / 9",
                gridRow: "2 / 2",
                alignSelf: "stretch",
                justifySelf: "stretch",
              },
            ]}
          >
            <Pod>Item 1</Pod>
          </GridItem>
          <GridItem
            responsiveSettings={[
              {
                maxWidth: "1500px",
                gridColumn: "6 / 13",
                gridRow: "1 / 1",
                alignSelf: "end",
                justifySelf: "end",
              },
              {
                maxWidth: "1300px",
                gridColumn: "1 / 13",
                gridRow: "2 / 2",
                alignSelf: "end",
                justifySelf: "end",
              },
              {
                maxWidth: "900px",
                gridColumn: "1 / 9",
                gridRow: "3 / 3",
                alignSelf: "end",
                justifySelf: "end",
              },
            ]}
          >
            <Pod>Item 2</Pod>
          </GridItem>
          <GridItem
            responsiveSettings={[
              {
                maxWidth: "1500px",
                gridColumn: "1 / 13",
                gridRow: "3 / 3",
                alignSelf: "start",
                justifySelf: "stretch",
              },
              {
                maxWidth: "1300px",
                gridColumn: "1 / 13",
                gridRow: "2 / 2",
                alignSelf: "start",
                justifySelf: "stretch",
              },
              {
                maxWidth: "900px",
                gridColumn: "1 / 9",
                gridRow: "3 / 3",
                alignSelf: "start",
                justifySelf: "stretch",
              },
            ]}
          >
            <Pod>Item 3</Pod>
          </GridItem>
        </GridContainer>
      );

      gridItem(0)
        .should("have.css", "grid-column", "1 / 7")
        .and("have.css", "grid-row", "1 / 1")
        .and("have.css", "align-self", "stretch")
        .and("have.css", "justify-self", "stretch")
        .then(($element) =>
          expect(parseFloat($element.css("width"))).to.be.within(630, 632)
        );
      gridItem(1)
        .should("have.css", "grid-column", "6 / 13")
        .and("have.css", "grid-row", "1 / 1")
        .and("have.css", "align-self", "end")
        .and("have.css", "justify-self", "end")
        .then(($element) =>
          expect(parseFloat($element.css("width"))).to.be.within(72, 74)
        );
      gridItem(2)
        .should("have.css", "grid-column", "1 / 13")
        .and("have.css", "grid-row", "3 / 3")
        .and("have.css", "align-self", "start")
        .and("have.css", "justify-self", "stretch")
        .then(($element) =>
          expect(parseFloat($element.css("width"))).to.be.within(1285, 1288)
        );
    });
  });
});
