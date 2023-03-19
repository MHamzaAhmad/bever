const shell = require("shelljs");
const fs = require("fs");
const {
  androidPath,
  iosPath,
  androidNativePath,
  iosNativePath,
  iosReactNativePath,
} = require("./paths");
const cli = require("cli-color");

const showError = (check, msg) => {
  if (!check) {
    console.log(cli.red(msg));
    process.exit(1);
  }
};

const checkGitRepo = () => {
  const gitBranch = shell.exec("git rev-parse --abbrev-ref HEAD", {
    silent: true,
  }).stdout;
  if (gitBranch === "") {
    console.log(cli.red("Not a git repository"));
    process.exit(1);
  }
};

const checkIfMobileProject = () => {
  if (fs.existsSync(androidPath()) && fs.existsSync(iosPath())) {
    return true;
  } else if (
    fs.existsSync(androidNativePath()) ||
    fs.existsSync(iosNativePath())
  ) {
    return true;
  } else if (fs.existsSync(iosReactNativePath())) {
    return true;
  } else {
    return false;
  }
};

const handleExceptions = () => {
  showError(shell.which("git"), "Git is not installed");
  showError(shell.which("node"), "Node is not installed");
  checkGitRepo();
  showError(
    checkIfMobileProject(),
    "Couldn't find any versions to update, please check if you are in a right project"
  );
};

module.exports = { handleExceptions, checkIfMobileProject };
