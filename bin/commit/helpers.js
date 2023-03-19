const shell = require("shelljs");
const msgForBranch = () => {
  const pwd = process.cwd();
  shell.cd(pwd);
  const currentBranch = shell.exec("git rev-parse --abbrev-ref HEAD");
  return `Updated build numbers for ${translateBranch(currentBranch.stdout)}`;
};

const translateBranch = (branch) => {
  if (branch === "HEAD") {
    return "main";
  } else if (branch.match(/release\/*/)) {
    return "production";
  } else return branch;
};

module.exports = {
  msgGenerator: (options) => {
    return options.message || msgForBranch();
  },
};
