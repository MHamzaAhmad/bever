const cli = require("cli-color");
const incrementBuildAndVersion = (oldVersion, both) => {
  const { versionCode, versionName } = oldVersion;
  const [major, minor, patch] = versionName.split(".");
  const newVersion = {
    versionCode: both ? 1 : versionCode + 1,
    versionName: `${major}.${minor}.${parseInt(patch || 0, 10) + 1}`,
  };
  return newVersion;
};

const incrementVersionCode = (version) => {
  const { versionCode, versionName } = version;
  const newVersion = {
    versionCode: versionCode + 1,
    versionName,
  };
  return newVersion;
};

const incrementVersionName = (version) => {
  const { versionCode, versionName } = version;
  const [major, minor, patch] = versionName.split(".");
  const newVersion = {
    versionCode,
    versionName: `${major}.${minor}.${parseInt(patch || 0, 10) + 1}`,
  };
  return newVersion;
};
module.exports = {
  incrementSelector: (oldVersion, { build, version }, both) => {
    if (build && version) {
      return incrementBuildAndVersion(oldVersion, both);
    } else if (build) {
      return incrementVersionCode(oldVersion);
    } else if (version) {
      return incrementVersionName(oldVersion);
    } else {
      return incrementBuildAndVersion(oldVersion, both);
    }
  },
  logVersions: (oldVersion, newVersion, platform) => {
    console.log(
      cli.yellow(
        `${platform} versions: {old: ${oldVersion.versionName} (${oldVersion.versionCode}), new: ${newVersion.versionName} (${newVersion.versionCode})}`
      )
    );
  },
};
