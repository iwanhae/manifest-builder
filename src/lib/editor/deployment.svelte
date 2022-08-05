<script lang="ts">
    export let onChanged: (manifest: Deployment) => void;
    import type { Deployment } from "./types";

    import Metadata from "./metadata.svelte";

    import NumberInput from "../NumberInput.svelte";
    import SelectInput from "../SelectInput.svelte";
    import NumberOrPortionInput from "../NumberOrPortionInput.svelte";
    import Toggle from "../Toggle.svelte";

    export let manifest: Deployment = {
        kind: "Deployment",
        apiVersion: "apps/v1",
        metadata: {
            name: "example",
            namespace: "default",
            labels: {},
            annotations: {},
        },
        spec: {
            replicas: 1,
            selector: {
                matchLabels: {},
            },
            template: {
                metadata: {
                    labels: {},
                },
                spec: {},
            },
            strategy: {
                type: "RollingUpdate",
                rollingUpdate: {
                    MaxSurge: "25%",
                    MaxUnavailable: "25%",
                },
            },
            minReadySeconds: 0,
            revisionHistoryLimit: 10,
            progressDeadlineSeconds: 600,
            paused: false,
        },
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

    $: onChanged(CompleteManifest(manifest));
</script>

<div class="grid justify-items-center gap-5">
    <h3 class="text-2xl">Metadata</h3>
    <Metadata bind:manifest={manifest.metadata} />

    <h3 class="text-2xl">Spec</h3>
    <h3 class="text-l">General</h3>
    <NumberInput Label="Replicas" bind:Value={manifest.spec.replicas} min={0} />
    <NumberInput
        Label="Minimal Ready Seconds"
        bind:Value={manifest.spec.minReadySeconds}
        min={0}
    />
    <NumberInput
        Label="Progress Deadline Seconds"
        bind:Value={manifest.spec.progressDeadlineSeconds}
        min={0}
    />
    <NumberInput
        Label="Revision History Limits"
        bind:Value={manifest.spec.revisionHistoryLimit}
        min={0}
    />
    <Toggle Label="Should Paused" bind:Value={manifest.spec.paused} />

    <h3 class="text-l">Strategy</h3>
    <SelectInput
        Label="StrategyType"
        bind:Value={manifest.spec.strategy.type}
        Options={["Recreate", "RollingUpdate"]}
    />
    {#if manifest.spec.strategy.type == "RollingUpdate"}
        <NumberOrPortionInput
            Label="MaxUnavailable"
            bind:Value={manifest.spec.strategy.rollingUpdate.MaxUnavailable}
        />
        <NumberOrPortionInput
            Label="MaxSurge"
            bind:Value={manifest.spec.strategy.rollingUpdate.MaxSurge}
        />
    {/if}
</div>
