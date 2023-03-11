const fs = require("fs");
const cli = require("cli-color");
const { androidPath } = require("../constants");
const { incrementSelector, logVersions } = require("./helpers");

const checkIfPubspecVersions = () => {
  const data = fs.readFileSync(androidPath(), "utf8");
  const versionCodeCheck = data.match(/versionCode\s+flutterVersionCode.*/);
  const versionNameCheck = data.match(/versionName\s+flutterVersionName.*/);
  if (versionCodeCheck || versionNameCheck) {
    if (fs.existsSync("pubspec.yaml")) {
      return true;
    } else {
      return false;
    }
  }
};

const updatePubspecVersions = (options) => {
  console.log("Found versions being updated from pubspec.yaml");
  console.log(cli.green("Updating versions from pubspec.yaml..."));
  const data = fs.readFileSync("pubspec.yaml", "utf8");
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
  fs.writeFileSync("pubspec.yaml", newData, "utf8");
  logVersions(version, updatedVersion, "Pubspec");
};

module.exports = {
  checkIfPubspecVersions,
  updatePubspecVersions,
};
