const ANDROID_PATH = "android/app/build.gradle";
const IOS_PATH = "ios/Runner.xcodeproj/project.pbxproj";
module.exports = {
  androidPath: () => {
    const pwd = process.cwd();
    return `${pwd}/${ANDROID_PATH}`;
  },
  iosPath: () => {
    const pwd = process.cwd();
    return `${pwd}/${IOS_PATH}`;
  },
};
