const shell = require("shelljs");

const clear = () => {
  const pwd = process.cwd();
  shell.cd(pwd);
  shell.exec(`git checkout .`);
};

module.exports = clear;
