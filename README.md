# meet-app

<h1>Features, User Stories, & Gherkin Scenarios</h1>

<h2> FEATURE 1: FILTER EVENTS BY CITY </h2>

<h3>User story</h3>
As a user I should be able to filter events by city so that I can see the list of events that take place in a specific city.

<h3>Scenarios</h3>

**Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities. <br>
**Given** user hasn’t searched for any city **When** the user opens the app **Then** the user should see a list of all upcoming events.

**Scenario 2:** User should see a list of suggestions when they search for a city. <br>
**Given** the main page is open **When** user starts typing in the city textbox **Then** the user should see a list of cities (suggestions) that match what they’ve typed.

**Scenario 3:** User can select a city from the suggested list. <br>
**Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing **When** the user selects a city (e.g., “New York, New York”) from the list **Then** their city should be changed to that city (i.e., “New York, New York”) and the user should receive a list of upcoming events in that city.

<h2>FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS</h2>

<h3>User Story</h3>
As a user, I should be able to expand and collapse event details so that I can see all of an event’s details if I am interested in it.

<h3>Scenarios</h3>

**Scenario 1:** An event element is collapsed by default <br>
**Given** the user has  selected a city that they wanted to browse for events in **When** the user receives the list of events in that city **Then** all event elements should be collapsed by default.

**Scenario 2:** User can expand an event to see its details <br>
**Given** a user has found an event that they are interested in **When** the user clicks on the event element **Then** the event element expands and the user can see all of its details.

**Scenario 3:** User can collapse an event to hide its details <br>
**Given** a user is done reading the details of an event **When** the user clicks on the event element again **Then** it should collapse and hide its details.

<h2>FEATURE 3: SPECIFY NUMBER OF EVENTS</h2>

<h3>User story</h3>
As a user, I should be able to specify the number of events I want to see so that I can display the number of events that I prefer.

<h3>Scenarios</h3>

**Scenario 1:** When user hasn’t specified a number, 32 is the default number <br>
**Given** a user has not specified a number of events they want to display per city **When** the user chooses a city to see events in **Then** they will by default see 32 events displayed for that city.

**Scenario 2:** User can change the number of events they want to see <br>
**Given** a user has searched for events in a city **When** the user wants to see more or less events in that city **Then** they can change the number of events they see displayed.

<h2>FEATURE 4: USE THE APP WHEN OFFLINE</h2>

<h3>User story</h3>
As a user, I should be able to use the app when it’s offline so that I can still access important event information when I have no internet connection.

<h3>Scenarios</h3>

**Scenario 1:** Show cached data when there’s no internet connection <br>
**Given** a user has no internet connection **When** the user still wants to use the app **Then** the cached data will be available.

**Scenario 2:** Show error when user changes the settings (city, time range) <br>
**Given** a user changes their settings **When** the user exits settings or opens the app again **Then** they will see an error message notifying them that their settings have been changed.

<h2>FEATURE 5: DATA VISUALIZATION</h2>

<h3>User Story</h3>
As a user, I should be able to see  a chart with the number of upcoming events in each city so that I can see all of the different options.

<h3>Scenarios</h3>

**Scenario 1:** Show a chart with the number of upcoming events in each city <br>
**Given** the user has not selected a city **When** the user wants to compare events between cities **Then** they should be able to access a chart with the number of upcoming events in each city

