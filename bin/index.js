#! /usr/bin/env node

const yargs = require("yargs");
const clear = require("./clear/clear.js");
const commit = require("./commit/commit.js");
const push = require("./deploy/push.js");
const handleExceptions = require("./exception_handler.js");
const update = require("./update/update.js");

const usage = `Usage: bever <command> [options]`;

yargs
  .usage(usage)
  .command("update", "Update version and build number", (yargs) => {
    return yargs
      .option("b", {
        alias: "only-build",
        describe: "Only update build number",
      })
      .option("v", {
        alias: "only-version",
        describe: "Only update version number",
      });
  })
  .command("commit", "Commit changes in current branch", (yargs) => {
    return yargs.option("m", {
      alias: "message",
      describe: "Provide a commit message",
    });
  })
  .command(
    "deploy",
    "Update, commit and push the changes in current branch",
    (yargs) => {
      return yargs
        .option("b", {
          alias: "only-build",
          describe: "Only update build number",
        })
        .option("v", {
          alias: "only-version",
          describe: "Only update version number",
        })
        .option("m", {
          alias: "message",
          describe: "Provide a commit message",
        })
        .option("nc", {
          alias: "no-commit",
          describe: "Do not commit and push the changes",
        })
        .option("np", {
          alias: "no-push",
          describe: "Push the changes to remote also",
        });
    }
  )
  .command(
    "clear",
    "Clear the un committed changes in current branch",
    (yargs) => {
      return yargs;
    }
  )
  .version(false)
  .help(true).argv;

handleExceptions();

const argv = yargs(process.argv.slice(2)).argv;
const argvLength = argv._.length;

const isUpdate = argv._[0] === "update";
const isCommit = argv._[0] === "commit";
const isDeploy = argv._[0] === "deploy";
const isClear = argv._[0] === "clear";

const onlyBuild =
  ((argv.b || argv.build) && !(argv.v || argv.version)) || false;
const onlyVersion =
  ((argv.v || argv.version) && !(argv.b || argv.build)) || false;
const noCommit = argv.nc || argv.noCommit || false;
const shouldPush = argv.np || argv.noPush || false;

const udpateBuildNumbers = () => {
  if (onlyBuild) {
    update({ build: true, version: false });
  } else if (onlyVersion) {
    update({ build: false, version: true });
  } else {
    update({ build: true, version: true });
  }
};

if ((!isUpdate && !isCommit && !isDeploy && !isClear) || argvLength < 1) {
  yargs.usage();
  process.exit(0);
}

if (isClear) {
  clear();
  process.exit(0);
}

if (isUpdate) {
  udpateBuildNumbers();
} else if (isCommit) {
  commit({ message: argv.m || argv.message });
} else if (isDeploy) {
  udpateBuildNumbers();
  if (!noCommit) {
    commit({ message: argv.m || argv.message });
    if (!shouldPush) {
      push();
    }
  }
}
