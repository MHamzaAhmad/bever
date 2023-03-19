# Bever

Bever is simply your best buddy to take the hassel of updating the build versions and do it super fast and super easy!

## Features

- Updates build numbers and version names with option to select between updating either
- Commits the updates to current branch and pushes them to remote if given the permission

## Supports

- Flutter
- React Native
- Android Native
- Ios Native

## Installation

Bever requires [Node.js](https://nodejs.org/) to run.

Install bever as global dependency.

```sh
npm i -g bever
```

## Usage

For updating the build numbers, committing them and then pushing them to remote, use

```sh
bever deploy
```

For only updating the version code and version name, just use

```sh
bever update
```
You can pass `-b` flag for only updating the version codes

For commiting the changes to current branch with customized message of format `Updated build numbers for [current branch]`

```sh
bever commit
```
You can also specify your message for the commit by passing `-m` flag.
For more info on usage

```sh
bever --help
```

## Contribution

Any feature requests and PRs for features to bug fixes are much appreciated.
Report any issues on the [bever's Github Repo](https://github.com/MHamzaAhmad/bever/issues)

## Creator

This package is created by [Hamza](https://github.com/MHamzaAhmad/MHamzaAhmad), to ease the life of fellow devs.
