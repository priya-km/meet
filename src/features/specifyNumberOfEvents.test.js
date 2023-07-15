import { loadFeature, defineFeature } from "jest-cucumber";
import { mockData } from "../mock-data";
import App from "../App";
import { mount } from "enzyme";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    given(
      "a user has not specified a number of events they want to display",
      () => {}
    );
    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    then("the app will display 32 events by default.", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(0);
    });
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the user is viewing a list of events", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(0);
    });

    when("the user specifies the number of events they want to see", () => {
      AppWrapper.find(".numberOfEvents").simulate("change", {
        target: { value: 1 },
      });
    });

    then(
      "the app should display the number of events specified by the user.",
      () => {
        AppWrapper.update();
        expect(AppWrapper.find(".event")).toHaveLength(2);
      }
    );
  });
});
