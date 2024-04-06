var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
import core from "@actions/core";
import axios from "axios";
function run() {
  return __async(this, null, function* () {
    var _a;
    try {
      const apiKey = core.getInput("api-key");
      const appID = core.getInput("app-id");
      const _force = core.getInput("force");
      let force;
      switch (_force) {
        case "true":
          force = true;
          break;
        case "false":
          force = false;
          break;
        default:
          throw new Error(`'force' must be (string) "true" or "false" (got '${_force}')`);
      }
      if (!apiKey)
        throw new Error(`'api-key' is falsy but required (is it defined?)`);
      core.info("api-key received");
      if (!appID)
        throw new Error(`'app-id' is falsy but required (is it defined?)`);
      core.info(`attempting to deploy app '${appID}'`);
      const endpoint = `https://api.digitalocean.com/v2/apps/${appID}/deployments`;
      const response = yield axios.post(endpoint, {
        force_build: force
      }, {
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      });
      const deploymentID = (_a = response.data.deployment) == null ? void 0 : _a.id;
      if (!deploymentID)
        throw new Error("failed to retrieve deployment ID");
      core.setOutput("deployment-id", deploymentID);
    } catch (e) {
      core.setFailed(e.message);
    }
  });
}

// src/index.ts
run();
//# sourceMappingURL=index.mjs.map