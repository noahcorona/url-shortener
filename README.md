# URL shortener at [smlr.org](https://smlr.org/)

A full-stack URL shortening application with a free API for developers to shorten URLs in their projects.


## Frontend

### React JS
The frontend is a single-page React web app that allows users to shorten urls. It's mobile-friendly, free of advertisements, and offers information on how to use the API.

## Backend

### Node JS + Express
The backend consists of a Node server running Express, which responds to the necessary API calls. The Node server connects to a Mongo database to access stored URL information in each of the two routes.

**Server routes** - hosted on https://api.smlr.org
| Route | HTTP Verb | Expected Body Type | Usage | Description |
| :---:  |  :----: |  :---: | :---: | :---: |
| /create | POST | JSON | URL Creation | Returns a JSON object with shortened URL information. |
| /:ext | GET | Plaintext | Redirect | Smlr.org uses a reverse proxy to serve requests from smlr.org/somelink to api.smlr.org/somelink, which redirects the user | |

### Mongo DB

This application accesses a Mongo database, on which all shortened URLs are stored. The connection script for the Node server is located at `/backend/db.js`.

To run your own instance of this full-stack app, you will need to configure the MongoDB credentials for your existing MongoDB server. The connection parameters can be set up in `/backend/secrets/mongoCredentials.js`.

**URL Database Schema** (`/backend/models/URL.js`)
| Name | Type | Description |
| :---: | :---: | :---: |
| destination | String | Destination of the shortened link |
| shortened | String | Shortened version of the destination link |
| ext | String | Extension (id) of the shortened link |
| date | String | Date the URL was created |
| redirects | Number | Number of redirects via short link |
