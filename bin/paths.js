const path = require("path");
const fs = require("fs");

const ANDROID_PATH = "android/app/build.gradle";
const ANDROID_NATIVE_PATH = "build.gradle";
const IOS_PATH = "ios/Runner.xcodeproj/project.pbxproj";
const IOS_NATIVE_PATH = () => {
  const pwd = process.cwd();
  const proj = path.basename(pwd);
  return `${proj}.xcodeproj/project.pbxproj`;
};

const androidPath = () => {
  const pwd = process.cwd();
  return `${pwd}/${ANDROID_PATH}`;
};

const iosPath = () => {
  const pwd = process.cwd();
  return `${pwd}/${IOS_PATH}`;
};

const androidNativePath = () => {
  const pwd = process.cwd();
  return `${pwd}/${ANDROID_NATIVE_PATH}`;
};

const iosNativePath = () => {
  const pwd = process.cwd();
  return `${pwd}/${IOS_NATIVE_PATH()}`;
};

const iosReactNativePath = () => {
  const pwd = process.cwd();
  return `${pwd}/ios/${IOS_NATIVE_PATH()}`;
};

module.exports = {
  androidPath,
  iosPath,
  androidNativePath,
  iosNativePath,
  iosReactNativePath,
  getAndroidPath: () => {
    if (fs.existsSync(androidPath())) return androidPath();
    if (fs.existsSync(androidNativePath())) return androidNativePath();
  },
  getIosPath: () => {
    if (fs.existsSync(iosPath())) return iosPath();
    if (fs.existsSync(iosNativePath())) return iosNativePath();
    if (fs.existsSync(iosReactNativePath())) return iosReactNativePath();
  },
};
