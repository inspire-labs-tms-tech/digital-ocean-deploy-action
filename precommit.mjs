import * as util from "util";
import {readFileSync} from "fs";
import {exec as _exec} from "child_process";

const exec = util.promisify(_exec);

const current = JSON.parse(readFileSync("./package.json").toString()).version;

const {stdout} = await exec("git show HEAD:package.json");
const {version: head} = JSON.parse(stdout);

console.log({
  current, head
});

if (current === head) throw new Error("VERSION NOT CHANGED");