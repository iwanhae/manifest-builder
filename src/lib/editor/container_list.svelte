<script lang="ts">
    import ContainerSpec from "./container.svelte";
    import { DefaultContainer, type Container } from "./types";
    export let title = "Containers";
    export let manifest: Container[] = [DefaultContainer];
</script>

<div
    class="grid justify-items-center gap-5 border-gray-200 border-2 rounded-md p-3 transition"
>
    <h3 class="text-l">{title}</h3>
    <div class="flex flex-row h-7 rounded-lg bg-transparent">
        <button
            data-action="decrement"
            class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none"
            on:click={() => {
                manifest.splice(-1);
                manifest = [...manifest];
            }}
        >
            <span class="text-xl font-thin">−</span>
        </button>
        <input
            type="number"
            class="text-center w-full bg-gray-300 border-none text-md items-center"
            value={manifest.length}
            disabled
        />
        <button
            data-action="increment"
            class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer"
            on:click={() => {
                manifest = [...manifest, DefaultContainer];
            }}
        >
            <span class="text-xl font-thin">+</span>
        </button>
    </div>
    {#each manifest as container}
        <ContainerSpec bind:manifest={container} />
    {/each}
</div>
