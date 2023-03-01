const shell = require("shelljs");
const push = () => {
  const pwd = process.cwd();
  shell.cd(pwd);
  console.log("Pushing to remote...");
  //   shell.exec(`git push`);
};

module.exports = push;
