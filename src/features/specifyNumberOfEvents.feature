Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number
Given a user has not specified a number of events they want to display
When the user opens the app
Then the app will display 32 events by default.

Scenario: User can change the number of events they want to see
Given the user is viewing a list of events
When the user specifies the number of events they want to see
Then the app should display the number of events specified by the user.