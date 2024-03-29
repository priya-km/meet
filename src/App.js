import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations, getAccessToken, checkToken } from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import logo from "./meet-300.png";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: "",
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    this.promptOfflineWarning(); // Check offline status when the component mounts

    window.addEventListener("online", this.promptOfflineWarning);
    window.addEventListener("offline", this.promptOfflineWarning);

    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events,
            locations: extractLocations(events),
          });
        }
      });
    }
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
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const name = location.split(/, | - /)[0];
      return { name, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    const { warningText } = this.state;

    return (
      <div>
        <nav className="navbar">
          <div className="navbar-logo">
            <a href="https://priya-km.github.io/meet/">
              <img src={logo} alt="meet-app-logo" width="100" height="100" />
            </a>
          </div>
          <div className="navbar-search">
            <div className="search">
              <h5>Search for a city</h5>
            </div>
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />
          </div>
        </nav>
        <div className="content">
          {warningText && warningText.length > 0 && (
            <WarningAlert text={warningText} />
          )}
          <div className="noe">
            <h5>Number of Events</h5>
          </div>
          <NumberOfEvents
            selectedCity={this.state.selectedCity}
            query={this.state.eventCount}
            updateEvents={this.updateEvents}
          />
          <div className="data-vis-wrapper">
            <EventGenre events={this.state.events} />
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 50, left: 0 }}
              >
                <CartesianGrid />
                <XAxis
                  type="category"
                  dataKey="name"
                  name="City"
                  angle="35"
                  minTickGap="2"
                  tick={{ textAnchor: "start" }}
                />
                <YAxis
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="Number of Events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="event-list">
            <div className="ev-center">
              <EventList events={this.state.events} />
            </div>
          </div>
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
