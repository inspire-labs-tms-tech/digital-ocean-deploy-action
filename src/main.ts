import core from "@actions/core";
import axios from "axios";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
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

    if (!apiKey) throw new Error(`'api-key' is falsy but required (is it defined?)`);
    core.info("api-key received");

    if (!appID) throw new Error(`'app-id' is falsy but required (is it defined?)`);
    core.info(`attempting to deploy app '${appID}'`);

    const endpoint = `https://api.digitalocean.com/v2/apps/${appID}/deployments`;
    const response = await axios.post(endpoint, {
      force_build: force
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
    });
    const deploymentID = response.data.deployment?.id;
    if (!deploymentID) throw new Error("failed to retrieve deployment ID");
    core.setOutput("deployment-id", deploymentID);
  } catch (e: any) {
    core.setFailed(e.message);
  }
}