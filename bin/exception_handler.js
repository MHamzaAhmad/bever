const shell = require("shelljs");
const fs = require("fs");
const { androidPath, iosPath } = require("./constants");
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

const handleExceptions = () => {
  showError(shell.which("git"), "Git is not installed");
  showError(shell.which("node"), "Node is not installed");
  checkGitRepo();
  showError(fs.existsSync(androidPath()), "Android project not found");
  showError(fs.existsSync(iosPath()), "iOS project not found");
};

module.exports = handleExceptions;
