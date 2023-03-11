#! /usr/bin/env node
const fs = require("fs");
const { androidPath, iosPath } = require("../constants");
const {
  checkIfPubspecVersions,
  updatePubspecVersions,
} = require("./flutterVersions");
const { incrementSelector, logVersions } = require("./helpers");

const update = (options) => {
  const pubspecCheck = checkIfPubspecVersions();
  console.log(pubspecCheck);
  if (pubspecCheck) {
    updatePubspecVersions(options);
  } else {
    androidVersionUpdater(options);
    iosVersionUpdater(options);
  }
};

const androidVersionUpdater = (options) => {
  const data = fs.readFileSync(androidPath(), "utf8");
  const versionCode = data.match(/versionCode\s+(\d+)/)[1];
  const versionName = data.match(/versionName\s+"(\d+\.\d+\.\d+)"/)[1];
  const oldVersion = {
    versionCode: parseInt(versionCode, 10),
    versionName,
  };
  const updatedVersion = incrementSelector(oldVersion, options);
  const updatedData = data
    .replace(/versionCode\s+\d+/, `versionCode ${updatedVersion.versionCode}`)
    .replace(
      /versionName\s+"\d+\.\d+\.\d+"/,
      `versionName "${updatedVersion.versionName}"`
    );
  fs.writeFileSync(androidPath(), updatedData, "utf8");
  logVersions(oldVersion, updatedVersion, "Android");
};

const iosVersionUpdater = (options) => {
  const data = fs.readFileSync(iosPath(), "utf8");
  const versionCode = data.match(/CURRENT_PROJECT_VERSION = (\d+);/)[1];
  const versionName = data.match(/MARKETING_VERSION = (\d+\.\d+\.\d+);/)[1];
  const oldVersion = {
    versionCode: parseInt(versionCode, 10),
    versionName,
  };
  const updatedVersion = incrementSelector(oldVersion, options);
  const updatedData = data
    .replace(
      /CURRENT_PROJECT_VERSION = \d+;/g,
      `CURRENT_PROJECT_VERSION = ${
        options.build && options.version ? 1 : updatedVersion.versionCode
      };`
    )
    .replace(
      /MARKETING_VERSION = \d+\.\d+\.\d+;/g,
      `MARKETING_VERSION = ${updatedVersion.versionName};`
    );
  fs.writeFileSync(iosPath(), updatedData, "utf8");
  logVersions(oldVersion, updatedVersion, "iOS");
};

module.exports = update;
