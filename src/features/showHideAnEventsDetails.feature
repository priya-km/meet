Feature: Show/hide an events details

Scenario: An event element is collapsed by default
Given the user has selected a city that they wanted to browse for events in
When the user sees the event elements
Then all event elements should be collapsed by default.

Scenario: User can expand an event to see its details
Given a user has found a collapsed event that they are interested in
When the user clicks on the “Show details” button
Then the event element expands, showing all of its details.

Scenario: User can collapse an event to hide its details
Given a user is done reading the details of an expanded event
When the user clicks on the “Hide details” button
Then the event element should collapse and hide its details.