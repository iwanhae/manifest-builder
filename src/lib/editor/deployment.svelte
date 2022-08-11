<script lang="ts">
    import { DefaultDeploymentSpec, type Deployment } from "./types";
    import Metadata from "./metadata.svelte";
    import DeploymentSpec from "./deployment_spec.svelte";

    export let manifest: Deployment = {
        kind: "Deployment",
        apiVersion: "apps/v1",
        metadata: {
            name: "example",
            namespace: "default",
            labels: {},
            annotations: {},
        },
        spec: DefaultDeploymentSpec,
    };

    function CompleteManifest(manifest: Deployment): Deployment {
        let show: Deployment = JSON.parse(JSON.stringify(manifest));
        show.metadata.labels = Object.assign(show.metadata.labels, {
            "app.kubernetes.io/name": show.metadata.name,
        });
        show.spec.selector.matchLabels = {
            "app.kubernetes.io/name": show.metadata.name,
        };
        show.spec.template.metadata.labels = {
            "app.kubernetes.io/name": show.metadata.name,
        };
        if (manifest.spec.strategy.type == "Recreate") {
            delete show.spec.strategy.rollingUpdate;
        }
        return show;
    }

    $: manifest = CompleteManifest(manifest);
</script>

<div class="grid justify-items-center gap-5">
    <h3 class="text-2xl">Metadata</h3>
    <Metadata bind:manifest={manifest.metadata} />

    <h3 class="text-2xl">Spec</h3>
    <DeploymentSpec bind:manifest={manifest.spec} />
</div>
