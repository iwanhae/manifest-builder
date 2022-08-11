<script lang="ts">
    import SelectInput from "../SelectInput.svelte";
    import TextInput from "../TextInput.svelte";
    import { DefaultContainer, type Container } from "./types";

    export let manifest: Container = DefaultContainer;
</script>

<div class="grid justify-items-center gap-5 border-t-2 pt-2">
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
    <SelectInput
        Label="ImagePullPolicy"
        Options={["Always", "Never", "IfNotPresent"]}
        bind:Value={manifest.imagePullPolicy}
    />
</div>
