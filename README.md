# meet-app
![meet-300](https://github.com/priya-km/meet/assets/118628757/bccb21dd-1d4c-450c-9549-d4e7d7fc6f77 "Meet Logo")
**[Click here for the LIVE VIEW of Meet]([https://myflixpkm.netlify.app/](https://priya-km.github.io/meet/) "meet live view link")**

<h3>What is Meet?</h3>
Meet is built to be a place where web developers from all around the world connect to one another through events in different cities near them. They can use the Meet App to search for events within their city.

![homepg](https://github.com/priya-km/meet/assets/118628757/4f302c0d-14b6-4da1-b7b7-1b83a4ddffeb "Meet Main Page")


<h3>Project Objective</h3>
To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events. 

<h3>More About Meet</h3>

This app uses serverless to authorize users. As only authorizred users can gain access to view events and their data via the Google Calendar API. To have such access, users must possess a token, which is generated by the authorization server. That authorizatiion server is where the serverless functions used for delivering authorization tokens to users will be hosted (on AWS Lambda).


Meet welcome screen for users without a token:
![welcomescreen](https://github.com/priya-km/meet/assets/118628757/3668b1aa-3127-4ba6-b973-da80ba07ed17 "Meet Welcome Screen")


Meet Oauth login screen:
![oauth](https://github.com/priya-km/meet/assets/118628757/530e5ef2-6893-460e-9062-7fd0f84f71ef "Meet Oauth Login Screen")

<h1>Features, User Stories, & Gherkin Scenarios</h1>

<h2> FEATURE 1: FILTER EVENTS BY CITY </h2>

<h3>User story</h3>
As a user I should be able to filter events by city so that I can see the list of events that take place in a specific city.

<h3>Scenarios</h3>

**Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities. <br>
**Given** user hasn’t searched for any city **When** the user opens the app **Then** the user should see a list of all upcoming events.

![events](https://github.com/priya-km/meet/assets/118628757/219b9d77-bc3b-42e2-b722-aa4435e7fb10 "Showing all upcoming events from all cities")


**Scenario 2:** User should see a list of suggestions when they search for a city. <br>
**Given** the main page is open **When** user starts typing in the city textbox **Then** the user should see a list of cities (suggestions) that match what they’ve typed.

![typing](https://github.com/priya-km/meet/assets/118628757/104f2b14-02a8-4085-aec0-b07eb4de7016 "User seeing suggestions when typing 'To'")


**Scenario 3:** User can select a city from the suggested list. <br>
**Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing **When** the user selects a city (e.g., “Berlin, Germany”) from the list **Then** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city.

![search-result](https://github.com/priya-km/meet/assets/118628757/31db3e50-d269-4c2c-98dd-47c5233855bb "Berlin, Germany search result")

**Bonus:** User gets an error when their input does not match any city names.

![error_alert](https://github.com/priya-km/meet/assets/118628757/611ef9c6-9b48-45c4-bfa6-d99faf1607c8)


<h2>FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS</h2>

<h3>User Story</h3>
As a user, I should be able to expand and collapse event details so that I can see all of an event’s details if I am interested in it.

<h3>Scenarios</h3>

**Scenario 1:** An event element is collapsed by default <br>
**Given** the user has  selected a city that they wanted to browse for events in **When** the user receives the list of events in that city **Then** all event elements should be collapsed by default.

**Scenario 2:** User can expand an event to see its details <br>
**Given** a user has found an event that they are interested in **When** the user clicks on the event element **Then** the event element expands and the user can see all of its details.

![event-details](https://github.com/priya-km/meet/assets/118628757/b2906331-ab1a-4888-ad0e-6bbbec85dd3f "Expanded event details")


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

![noe](https://github.com/priya-km/meet/assets/118628757/7336bccb-94d1-4d98-8ba3-7635c77b9abf "Number of events changed to 2 screenshot")

**Bonus:** User gets an error if they don't have a numerical input or it is not within the 1-32 range

![error2](https://github.com/priya-km/meet/assets/118628757/d69d4849-01ba-4ea8-b873-bd6f73f34661 "Number of events error")



<h2>FEATURE 4: USE THE APP WHEN OFFLINE</h2>

<h3>User story</h3>
As a user, I should be able to use the app when it’s offline so that I can still access important event information when I have no internet connection.

<h3>Scenarios</h3>

**Scenario 1:** Show cached data when there’s no internet connection <br>
**Given** a user has no internet connection **When** the user still wants to use the app **Then** the cached data will be available.

![offline](https://github.com/priya-km/meet/assets/118628757/8e3ecb30-d68f-4e9a-bcfd-2fe1673d1be2 "Offline warning message")


**Scenario 2:** Show error when user changes the settings (city, time range) <br>
**Given** a user changes their settings **When** the user exits settings or opens the app again **Then** they will see an error message notifying them that their settings have been changed.

<h2>FEATURE 5: DATA VISUALIZATION</h2>

<h3>User Story</h3>
As a user, I should be able to see  a chart with the number of upcoming events in each city so that I can see all of the different options.

<h3>Scenarios</h3>

![charts](https://github.com/priya-km/meet/assets/118628757/4443fb39-3989-4da5-9228-bf81e438a4b0 "Event charts")

**Scenario 1:** Show a chart with the number of upcoming events in each city <br>
**Given** the user has not selected a city **When** the user wants to compare events between cities **Then** they should be able to access a chart with the number of upcoming events in each city

<h1>Languages, Libraries, Frameworks, etc.</h1>
● Javascript <br>
● CSS <br>
● HTML <br>
● React <br>
● Gherkin <br>
  
<h1>Technical Requirements</h1>
● Is a React application.
● Built using the TDD technique.
● Uses the Google Calendar API and OAuth2 authentication flow.
● Use serverless functions (AWS lambda) for the authorization server
instead of using a traditional server.
● Works on the latest versions of Chrome, Firefox, Safari, Edge, and Opera, as well
as on IE11.
● Passes Lighthouse’s PWA checklist.
● Works offline or in slow network conditions with the help of a service worker.
● Users can install the app on desktop and add the app to their home screen on
mobile.
● Implements an alert system using an OOP approach to show information to the
user.
● Makes use of data visualization.
● Covered by tests with a coverage rate >= 90%.


<h2>Author</h2>
<h3>Priya K Maharban</h3>

● [GitHub Profile](https://github.com/priya-km "Priya-Maharban GitHub profile link")
<br>
● [Email](mailto:priyakmaharban@gmail.com?subject=Hi% "Hi!")
<br>
● [Portfolio Website](https://priya-km.github.io/portfolio "Priya Maharban Portfolio website")

