<script lang="ts">
  import YAML from "yaml";
  import { DefaultDeployment, type Deployment } from "./lib/editor/types";

  import DeploymentEditor from "./lib/editor/deployment.svelte";
  let deployment: Deployment = DefaultDeployment;
</script>

<main class="grid grid-cols-2 max-h-screen">
  <div class="overflow-y-scroll max-h-screen">
    <h1 class="text-3xl pt-3">Deployment</h1>
    <DeploymentEditor bind:manifest={deployment} />
  </div>
  <div class="overflow-y-scroll max-h-screen">
    <p class="whitespace-pre-wrap p-3">{YAML.stringify(deployment)}</p>
  </div>
</main>
