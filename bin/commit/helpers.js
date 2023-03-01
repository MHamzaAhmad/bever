const shell = require("shelljs");
const msgForBranch = () => {
  const pwd = process.cwd();
  shell.cd(pwd);
  const currentBranch = shell.exec("git rev-parse --abbrev-ref HEAD");
  return `Updated build numbers for ${currentBranch.stdout}`;
};

module.exports = {
  msgGenerator: (options) => {
    const msg = options.message || msgForBranch();
  },
};
