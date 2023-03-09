const fs = require("fs");
const cli = require("cli-color");
const { androidPath } = require("../constants");
const { incrementSelector, logVersions } = require("./helpers");

const checkIfPubspecVersions = async () => {
  fs.readFile(androidPath(), "utf8", async (err, data) => {
    if (err) {
      throw err;
    }
    const versionCodeCheck = data.match(/versionCode\s+flutterVersionCode.*/);
    const versionNameCheck = data.match(/versionName\s+flutterVersionName.*/);
    if (versionCodeCheck || versionNameCheck) {
      if (fs.existsSync("pubspec.yaml")) {
        return true;
      }
    }
  });
};

const updatePubspecVersions = async (options) => {
  console.log("Found versions being updated from pubspec.yaml");
  console.log(cli.green("Updating versions from pubspec.yaml..."));
  fs.readFile("pubspec.yaml", "utf8", async (err, data) => {
    if (err) {
      throw err;
    }
    const pubspecVersion = data
      .match(/version:\s+\d+\.\d+\.\d+\+\d+/)[0]
      .split(" ")[1];
    const versionName = pubspecVersion.split("+")[0];
    const versionCode = pubspecVersion.split("+")[1];
    const version = {
      versionName,
      versionCode: parseInt(versionCode, 10),
    };
    const updatedVersion = incrementSelector(version, options);
    const newVersion = `${updatedVersion.versionName}+${updatedVersion.versionCode}`;
    const newData = data.replace(
      /version:\s+\d+\.\d+\.\d+\+\d+/,
      `version: ${newVersion}`
    );
    fs.writeFile("pubspec.yaml", newData, "utf8", (err) => {
      if (err) {
        throw err;
      }
    });
    logVersions(version, updatedVersion, "Pubspec");
  });
};

module.exports = {
  checkIfPubspecVersions,
  updatePubspecVersions,
};
