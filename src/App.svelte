<script lang="ts">
  import YAML from "yaml";

  import DeploymentEditor from "./lib/editor/deployment.svelte";
  let deploymentYaml = "";
</script>

<main class="grid grid-cols-2 max-h-screen">
  <div class="overflow-y-scroll max-h-screen">
    <h1 class="text-3xl pt-3">Deployment</h1>
    <DeploymentEditor
      onChanged={(yaml) => {
        deploymentYaml = YAML.stringify(yaml);
      }}
    />
  </div>
  <div class="overflow-y-scroll max-h-screen">
    <p class="whitespace-pre-wrap p-3">{deploymentYaml}</p>
  </div>
</main>
