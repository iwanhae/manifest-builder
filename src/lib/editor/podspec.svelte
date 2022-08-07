<script lang="ts">
    import { DefaultPodSpec, type Metadata, type PodSpec } from "./types";

    import TextInput from "../TextInput.svelte";
    import Container from "./container.svelte";
    import SelectInput from "../SelectInput.svelte";
    import NumberInput from "../NumberInput.svelte";

    export let onChanged: (manifest: PodSpec) => void = () => {};
    export let manifest: PodSpec = DefaultPodSpec;

    $: onChanged(manifest);
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
    <h3 class="text-l">InitContainers</h3>
    <Container />
    <h3 class="text-l">Containers</h3>
    <Container />
    <h3 class="text-l">Volumes</h3>
</div>
