# Spotification

Application will work with Spotify API to allow creating and sharing playlists which can be updated democratically by the users.

Exploring both browser (React) and desktop UI (Nodegui) application tools.

## Setup

* Register your application with Spotify - follow instructions [here](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/)
* Install git, npm, and yarn
* Clone this repo
* Populate `.env` according to `.env.example`
* Run `yarn install`
* Change directory to `src/ui` and run `yarn install`

## Running

* Start the development server: `yarn start:server`
* Start the development UI: `yarn start:ui`

## Deploying

The plan is to build the development UI as static files then serve alongside the server.

TODO

## References

https://developer.spotify.com/documentation/web-api/quick-start/