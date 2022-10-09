[![Verification](https://github.com/naasse/spotification/actions/workflows/verification.yml/badge.svg)](https://github.com/naasse/spotification/actions/workflows/verification.yml)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=naasse_spotification&metric=coverage)](https://sonarcloud.io/summary/new_code?id=naasse_spotification)

# Spotification

Application will work with Spotify API to allow creating and sharing playlists which can be updated democratically by the users.

Exploring both browser (React) and desktop UI (Nodegui) application tools.

## Setup

* Register your application with Spotify - follow instructions [here](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/)
* Install git, npm, and yarn
* Clone this repo
* Server:
  * Populate `.env` according to `.env.example`
  * Run `yarn install`
* UI:
  * Run `yarn install`

## Developing

* Start the development server: `yarn start:server`
* Start the development UI: `yarn start:ui`

Edit source files to reflect changes.

## Running

* Build the UI source files and include them in the server with `yarn build`

## References

https://developer.spotify.com/documentation/web-api/quick-start/

## TODO

* Better linting (especially React and JSDoc)
* CI/CD
* Testing
* Nodegui
* Actually functionality lol
* scss
* webpack config for proxy devServer?
* Proper use of yarn workspaces
* Consider migration to yarn zero-install
