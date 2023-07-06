import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: "",
  };

  componentDidMount() {
    this.mounted = true;
    this.promptOfflineWarning(); // Check offline status when the component mounts

    // Add an event listener to check online/offline status
    window.addEventListener("online", this.promptOfflineWarning);
    window.addEventListener("offline", this.promptOfflineWarning);

    getEvents().then((events) => {
      if (this.mounted) {
        const shownEvents = events.slice(0, this.state.eventCount);
        this.setState({
          events: shownEvents,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    // Remove the event listeners when the component unmounts
    window.removeEventListener("online", this.promptOfflineWarning);
    window.removeEventListener("offline", this.promptOfflineWarning);
  }

  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText: "You are offline, so events may not be up to date.",
      });
    } else {
      this.setState({
        warningText: "", // Clear the warning text if online
      });
    }
  };

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const shownEvents = locationEvents.slice(0, this.state.eventCount);
        this.setState({
          events: shownEvents,
          selectedCity: location,
        });
      });
    } else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else if (this.state.selectedCity === "all") {
      getEvents().then((events) => {
        const locationEvents = events;
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          this.state.locations === "all"
            ? events
            : events.filter(
                (event) => this.state.selectedCity === event.location
              );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    }
  };

  render() {
    const { warningText } = this.state;

    return (
      <div className="App">
        {warningText && warningText.length > 0 && (
          <WarningAlert text={warningText} />
        )}
        <h1 className>Meet App</h1>
        <h5>Search for a city</h5>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <h5>Number of Events</h5>
        <NumberOfEvents
          selectedCity={this.state.selectedCity}
          query={this.state.eventCount}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
