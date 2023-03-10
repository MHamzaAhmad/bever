# Bever

### Updates build version Fast and Easy

Bever is simply your best buddy to take the hassel of updating the build versions super fast and super east

## Features

- Updates build numbers and version names with option to select between updating either
- Commits the updates to current branch and pushes them to remote if given the permission
- Flutter pubspec versions are also supported

## Installation

Bever requires [Node.js](https://nodejs.org/) v10+ to run.

Install bever as global dependency.

```sh
npm i -g bever
```

## Usage

For updating the version code and version name, just use

```sh
bever update
```

You can pass -b flag for only updating the version codes

For updating the build numbers, committing them and then pushing them to remote, use

```sh
bever deploy
```

For more info on usage

```sh
bever --help
```

## Contribution

Any PRs and feature requests are appreciated.
Report any issues on the github repo

## Creator

This package is created by [Hamza](https://github.com/MHamzaAhmad/MHamzaAhmad), to ease the life of fellow devs.
