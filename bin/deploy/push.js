const shell = require("shelljs");
const cli = require("cli-color");
const confirm = require("prompt-confirm");

const push = () => {
  const pwd = process.cwd();
  shell.cd(pwd);
  const prompt = new confirm("Push to remote?");
  prompt.ask((answer) => {
    if (answer) {
      console.log(cli.yellow("Pushing to remote..."));
      shell.exec(`git push`);
    }
  });
};

module.exports = push;
