# digital-ocean-deploy-action

Schedule an app deployment to the Digital Ocean Apps Platform.

# Setup

1. Manually create the Apps Platform application for the first time.
2. Obtain the App ID (on Digital Ocean, the App ID is in the URL when you navigate to the App, i.e. https://cloud.digitalocean.com/apps/{{ APP ID HERE }}/overview)
3. Create a GitHub Workflow (such as `.github/workflows/release.yaml`) based on the setup below

# Example
> `.github/workflows/release.yaml`
```yaml
name: Schedule Digital Ocean Apps Platform Deployment
on: push
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
jobs:
  deploy:
    name: Containerize
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: inspire-labs-tms-tech/digital-ocean-deploy-action@1.2.2 # or whichever version you prefer
        with:
          app-id: # << App ID from Setup Step 2 Above >>
          api-key: # << A Digital Ocean API Key, reccomended to use a GitHub secret, like  ${{ secrets.DIGITAL_OCEAN_API_KEY }}>>
          force: "false" # (optional, one of: "true" | "false" (default)) whether to force re-build the deployment and clear build cache
```