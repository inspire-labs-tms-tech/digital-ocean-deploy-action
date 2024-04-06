const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
    try {
        const apiKey = core.getInput('api-key');
        const appID = core.getInput('app-id');
        const _force = core.getInput('force');
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

        if(!apiKey) throw new Error(`'api-key' is falsy but required (is it defined?)`);
        if(!appID) throw new Error(`'app-id' is falsy but required (is it defined?)`);

        const endpoint = `https://api.digitalocean.com/v2/apps/${appID}/deployments`;
        const response = await axios.post(endpoint, {
            force_build: force
        }, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        const deploymentID = response?.data?.deployment?.id;
        if(!deploymentID) throw new Error("failed to retrieve deployment ID");
        core.setOutput("deployment-id", time);
    } catch (e) {
        core.setFailed(e.message);
    }
}
  
module.exports = {
    run
}