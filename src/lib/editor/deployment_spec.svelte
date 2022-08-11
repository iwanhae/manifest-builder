<script lang="ts">
    import { DefaultDeploymentSpec, type DeploymentSpec } from "./types";

    import NumberInput from "../NumberInput.svelte";
    import SelectInput from "../SelectInput.svelte";
    import NumberOrPortionInput from "../NumberOrPortionInput.svelte";
    import Toggle from "../Toggle.svelte";
    import Podspec from "./pod_spec.svelte";

    export let manifest: DeploymentSpec = DefaultDeploymentSpec;
</script>

<div class="grid justify-items-center gap-5">
    <h3 class="text-l">General</h3>
    <NumberInput Label="Replicas" bind:Value={manifest.replicas} min={0} />
    <NumberInput
        Label="Minimal Ready Seconds"
        bind:Value={manifest.minReadySeconds}
        min={0}
    />
    <NumberInput
        Label="Progress Deadline Seconds"
        bind:Value={manifest.progressDeadlineSeconds}
        min={0}
    />
    <NumberInput
        Label="Revision History Limits"
        bind:Value={manifest.revisionHistoryLimit}
        min={0}
    />
    <Toggle Label="Should Paused" bind:Value={manifest.paused} />

    <h3 class="text-l">Strategy</h3>
    <SelectInput
        Label="StrategyType"
        bind:Value={manifest.strategy.type}
        Options={["Recreate", "RollingUpdate"]}
    />
    {#if manifest.strategy.type == "RollingUpdate"}
        <NumberOrPortionInput
            Label="MaxUnavailable"
            bind:Value={manifest.strategy.rollingUpdate.MaxUnavailable}
        />
        <NumberOrPortionInput
            Label="MaxSurge"
            bind:Value={manifest.strategy.rollingUpdate.MaxSurge}
        />
    {/if}

    <h3 class="text-2xl">PodTemplate</h3>
    <Podspec bind:manifest={manifest.template.spec} />
</div>
