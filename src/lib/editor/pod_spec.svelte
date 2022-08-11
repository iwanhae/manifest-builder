<script lang="ts">
    import { DefaultPodSpec, type PodSpec } from "./types";

    import TextInput from "../TextInput.svelte";
    import ContainerList from "./container_list.svelte";
    import SelectInput from "../SelectInput.svelte";
    import NumberInput from "../NumberInput.svelte";

    export let manifest: PodSpec = DefaultPodSpec;
</script>

<div class="grid justify-items-center gap-5">
    <h3 class="text-l">General</h3>
    <SelectInput
        Label="Restart Policy"
        Options={["Always", "OnFailure", "Never"]}
        bind:Value={manifest.restartPolicy}
    />
    <SelectInput
        Label="DNS Policy"
        Options={["ClusterFirst", "ClusterFirstWithHostNet", "Default", "None"]}
        bind:Value={manifest.dnsPolicy}
    />
    <NumberInput
        Label="TerminationGracePeriodSeconds"
        min={0}
        bind:Value={manifest.terminationGracePeriodSeconds}
    />
    <h3 class="text-l">Container Spec</h3>
    <ContainerList
        title="InitContainers"
        bind:manifest={manifest.initContainers}
    />
    <ContainerList title="Containers" bind:manifest={manifest.containers} />
    <h3 class="text-l">Volumes</h3>
</div>
