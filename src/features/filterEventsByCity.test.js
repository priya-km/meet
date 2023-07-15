import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  // First test
  test("When user hasn`t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn`t searched for any city", () => {});

    when("the user opens the app", () => {});

    then("the user should see a list of all upcoming events.", () => {});
  });

  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});

    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });
    then("the user should see a list of all upcoming events.", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event").hostNodes()).toHaveLength(
        mockData.length
      );
    });

    // Second test

    test("User should see a list of suggestions when they search for a city.", ({
      given,
      when,
      then,
    }) => {
      let CitySearchWrapper, locations;

      given("the main page is open", () => {
        locations = extractLocations(mockData);
        CitySearchWrapper = mount(
          <CitySearch updateEvents={() => {}} locations={locations} />
        );
      });

      when("user starts typing in the city textbox", async () => {
        await CitySearchWrapper.find(".city").simulate("change", {
          target: { value: "Berlin" },
        });
      });

      then(
        "the user should see a list of cities (suggestions) that match what they typed.",
        () => {
          expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(2);
        }
      );
    });

    // Third test

    test("User can select a city from the suggested list.", ({
      given,
      when,
      then,
      and,
    }) => {
      let AppWrapper;
      given("the user was typing “Berlin” in the city textbox", async () => {
        AppWrapper = await mount(<App />);
        await AppWrapper.find(".city").simulate("change", {
          target: { value: "Berlin" },
        });
      });
      and("the list of suggested cities is showing", () => {
        AppWrapper.update();
        expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
      });

      when(
        "the user selects a city (e.g., “Berlin, Germany”) from the list",
        () => {
          AppWrapper.find(".suggestions li").at(0).simulate("click");
          AppWrapper.update();
        }
      );

      then(
        "their city should be changed to that city (i.e., “Berlin, Germany”)",
        () => {
          const CitySearchWrapper = AppWrapper.find(CitySearch);
          expect(CitySearchWrapper.state("query")).toBe("Berlin, Germany");
        }
      );
      and(
        "the user should receive a list of upcoming events in that city.",
        () => {
          expect(AppWrapper.find(".event")).toHaveLength(1);
        }
      );
    });
  });
});
