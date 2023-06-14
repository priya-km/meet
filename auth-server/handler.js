const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
/**
 * SCOPES allows you to set access levels */
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * Credentials are values required to get access to your calendar. “process.env” means
 * the value is in the “config.json” file. keeps your API secrets hidden.
 */
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://priya-km.github.io/meet"],
  javascript_origins: ["https://priya-km.github.io", "http://localhost:3000"],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/**
 * Generate a URL so users can log in with Google and be authorized to see calendar events data. After logging in, they’ll receive a code
 * as a URL parameter.
 */
module.exports.getAuthURL = async () => {
  /**
   * Scopes array passed to the `scope` option. Any scopes passed must be enabled in the
   * "OAuth consent screen" settings in the project on Google Console. Also, any passed
   *  scopes are the ones users will see when the consent screen is displayed to them.
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “err” and “token.”
     */

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};

module.exports.getCalendarEvents = (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // Decode authorization code extracted from the URL query
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );
  // Gives us the value of access token from previous line
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    // Access calendar data from google (line 3)
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },

      // callback function
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );

    // .then fires when calendar events list (114) info is recieved and sent to the resolve(response) - (line 128), (results) is (response)
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origins": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(err),
      };
    });
};
