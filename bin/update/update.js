#! /usr/bin/env node
const fs = require("fs");
const { getAndroidPath, getIosPath } = require("../paths");
const {
  checkIfPubspecVersions,
  updatePubspecVersions,
} = require("./flutterVersions");
const { incrementSelector, logVersions } = require("./helpers");

//Select the version updater based on the project type
const update = (options) => {
  const pubspecCheck = checkIfPubspecVersions();
  if (pubspecCheck) {
    updatePubspecVersions(options);
  } else {
    androidVersionUpdater(options);
    iosVersionUpdater(options);
  }
};

//Update android versions for cross-platform projects
const androidVersionUpdater = (options) => {
  if (getAndroidPath() === undefined) return;
  const data = fs.readFileSync(getAndroidPath(), "utf8");
  const versionCode = data.match(/versionCode\s+(\d+)/)[1];
  const versionName = data.match(/versionName\s+"(\d+\.\d+(\.\d+)?)"/)[1];
  const oldVersion = {
    versionCode: parseInt(versionCode, 10),
    versionName,
  };
  const updatedVersion = incrementSelector(oldVersion, options);
  const updatedData = data
    .replace(/versionCode\s+\d+/, `versionCode ${updatedVersion.versionCode}`)
    .replace(
      /versionName\s+"\d+\.\d+(\.\d+)?"/,
      `versionName "${updatedVersion.versionName}"`
    );
  fs.writeFileSync(getAndroidPath(), updatedData, "utf8");
  logVersions(oldVersion, updatedVersion, "Android");
};

//Update iOS versions for cross-platform projects
const iosVersionUpdater = (options) => {
  if (getIosPath() === undefined) return;
  const data = fs.readFileSync(getIosPath(), "utf8");
  const versionCode = data.match(/CURRENT_PROJECT_VERSION = (\d+);/)[1];
  const versionName = data.match(/MARKETING_VERSION = (\d+\.\d+(\.\d+)?);/);
  const oldVersion = {
    versionCode: parseInt(versionCode, 10),
    versionName: versionName != null ? versionName[1] : "1.0.0",
  };
  const updatedVersion = incrementSelector(oldVersion, options, true);
  const updatedData = data
    .replace(
      /CURRENT_PROJECT_VERSION = \d+;/g,
      `CURRENT_PROJECT_VERSION = ${updatedVersion.versionCode};`
    )
    .replace(
      /MARKETING_VERSION = \d+\.\d+(\.\d+)?;/g,
      `MARKETING_VERSION = ${updatedVersion.versionName};`
    );
  fs.writeFileSync(getIosPath(), updatedData, "utf8");
  logVersions(oldVersion, updatedVersion, "iOS");
};

module.exports = update;
