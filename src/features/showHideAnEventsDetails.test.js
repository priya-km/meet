import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import App from "../App";
import { mount } from "enzyme";
import { mockData } from "../mock-data";
import renderer from "react-test-renderer";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  // First test

  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppWrapper;
    given(
      "the user has selected a city that they wanted to browse for events in",
      async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
      }
    );

    when("the user sees the event elements", () => {
      expect(AppWrapper.find(".event")).toHaveLength(0);
    });

    then("all event elements should be collapsed by default.", () => {
      expect(AppWrapper.find(".event .details")).toHaveLength(0);
    });
  });

  // Second test

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given(
      "a user has found a collapsed event that they are interested in",
      async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
        expect(AppWrapper.find(".event")).toHaveLength(0);
        expect(AppWrapper.find(".event .details")).toHaveLength(0);
      }
    );

    when("the user clicks on the “Show details” button", () => {
      const eventIndex = 0; // Index of the event you want to expand
      const eventComponent = renderer.create(
        AppWrapper.find(".event").at(eventIndex).get(0)
      );
      const eventInstance = eventComponent.getInstance();
      eventInstance.toggleDetails();
      AppWrapper.update();
    });

    then("the event element expands, showing all of its details.", () => {
      expect(AppWrapper.find(".event .details")).toHaveLength(1);
    });
  });

  // Third test

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given(
      "a user is done reading the details of an expanded event",
      async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
        const eventIndex = 0; // Index of the event you want to collapse
        const eventComponent = renderer.create(
          AppWrapper.find(".event").at(eventIndex).get(0)
        );
        const eventInstance = eventComponent.getInstance();
        eventInstance.toggleDetails();
        AppWrapper.update();
      }
    );

    when("the user clicks on the “Hide details” button", () => {
      const eventIndex = 0; // Index of the event you want to collapse
      const eventComponent = renderer.create(
        AppWrapper.find(".event").at(eventIndex).get(0)
      );
      const eventInstance = eventComponent.getInstance();
      eventInstance.toggleDetails();
      AppWrapper.update();
    });

    then("the event element should collapse and hide its details.", () => {
      expect(AppWrapper.find(".event .details")).toHaveLength(0);
    });
  });
});
