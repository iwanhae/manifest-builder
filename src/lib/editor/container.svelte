<script lang="ts">
    import TextInput from "../TextInput.svelte";
    import { DefaultContainer, type Container } from "./types";
    export let onChanged: (manifest: Container) => void = () => {};
    export let manifest: Container = DefaultContainer;
    $: onChanged(manifest);
</script>

<div class="grid justify-items-center gap-5">
    <TextInput
        Label="name"
        Description="put your container name here"
        bind:Value={manifest.name}
    />
    <TextInput
        Label="image"
        Description="put your image here"
        bind:Value={manifest.image}
    />
</div>
