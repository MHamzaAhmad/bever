const cli = require("cli-color");
const incrementBuildAndVersion = (version) => {
  const { versionCode, versionName } = version;
  const [major, minor, patch] = versionName.split(".");
  const newVersion = {
    versionCode: versionCode + 1,
    versionName: `${major}.${minor}.${parseInt(patch, 10) + 1}`,
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
    versionName: `${major}.${minor}.${parseInt(patch, 10) + 1}`,
  };
  return newVersion;
};
module.exports = {
  incrementSelector: (oldVersion, { build, version }) => {
    if (build && version) {
      return incrementBuildAndVersion(oldVersion);
    } else if (build) {
      return incrementVersionCode(oldVersion);
    } else if (version) {
      return incrementVersionName(oldVersion);
    } else {
      return incrementBuildAndVersion(oldVersion);
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
