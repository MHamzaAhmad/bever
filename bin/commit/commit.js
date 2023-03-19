const shell = require("shelljs");
const { msgGenerator } = require("./helpers");

//Commits the changes
const commit = (options) => {
  const pwd = process.cwd();
  shell.cd(pwd);
  const message = msgGenerator(options);
  shell.exec(`git add .`);
  shell.exec(`git commit -m "${message}"`);
};

module.exports = commit;
