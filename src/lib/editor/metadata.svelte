<script lang="ts">
    import type { Metadata } from "./types";

    import TextInput from "../TextInput.svelte";

    export let onChanged: (manifest: Metadata) => void = () => {};
    export let manifest: Metadata = {
        name: "example",
        namespace: "default",
        labels: {},
        annotations: {},
    };

    $: if (onChanged != null) onChanged(manifest);
</script>

<div class="grid justify-items-center gap-5">
    <TextInput
        Label="Name"
        bind:Value={manifest.name}
        Description="put your app name here"
    />
    <TextInput
        Label="Namespace"
        bind:Value={manifest.namespace}
        Description="put your app namespace here"
    />
</div>
