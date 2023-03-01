#! /usr/bin/env node
const fs = require("fs");
const { ANDROID_PATH, IOS_PATH } = require("../constants");
const { incrementSelector } = require("./helpers");
const update = (options) => {
  androidVersionUpdater(options);
  iosVersionUpdater(options);
};

const androidVersionUpdater = async (options) => {
  const pwd = process.cwd();
  const androidPath = `${pwd}/${ANDROID_PATH}`;
  await fs.readFile(androidPath, "utf8", async (err, data) => {
    if (err) {
      throw err;
    }
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
    await fs.writeFile(androidPath, updatedData, "utf8", (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

const iosVersionUpdater = async (options) => {
  const pwd = process.cwd();
  const iosPath = `${pwd}/${IOS_PATH}`;
  await fs.readFile(iosPath, "utf8", async (err, data) => {
    if (err) {
      throw err;
    }
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
    await fs.writeFile(iosPath, updatedData, "utf8", (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

module.exports = update;
