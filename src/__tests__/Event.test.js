import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe("<Event /> component", () => {
  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test("render event component", () => {
    expect(EventWrapper).toBeDefined();
  });

  test("render event name and summary", () => {
    const summary = EventWrapper.find("h2.summary");
    expect(summary).toHaveLength(1);
    expect(summary.text()).toBe(event.summary);
  });

  test("render event date and start time", () => {
    const eventStart = EventWrapper.find("p.event-start");
    expect(eventStart).toHaveLength(1);
    expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
  });

  test("render event name and location", () => {
    const eventLocation = EventWrapper.find("p.event-location");
    expect(eventLocation).toHaveLength(1);
    expect(eventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
  });

  test("collapse details by default", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  test("collapsed details renders correctly", () => {
    expect(EventWrapper.find("h3.about")).toHaveLength(0);
    expect(EventWrapper.find("a.link")).toHaveLength(0);
    expect(EventWrapper.find("p.description")).toHaveLength(0);
  });

  test("click on show details button", () => {
    const detailsButton = EventWrapper.find("button.details-btn");
    expect(detailsButton.text()).toBe("show details");
    detailsButton.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
  });

  test("event details is expanded and rendered correctly", () => {
    expect(EventWrapper.find("h3.about")).toHaveLength(1);
    expect(EventWrapper.find("a.link")).toHaveLength(1);
    expect(EventWrapper.find("p.description")).toHaveLength(1);
  });

  test("user hides details by clicking on button", () => {
    const detailsButton = EventWrapper.find("button.details-btn");
    expect(detailsButton.text()).toBe("hide details");
    detailsButton.simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(true);
  });
});
