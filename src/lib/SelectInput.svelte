<script lang="ts">
    export let Label: string;
    export let Value: string;
    export let Options: string[];
</script>

<div>
    <label for="metadata.name" class="block text-sm font-medium text-gray-700">
        {Label}
    </label>
    <div class="w-80 mt-1 relative rounded-md shadow-sm">
        <select
            bind:value={Value}
            class="focus:ring-indigo-500 focus:border-indigo-500 h-full w-full border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
        >
            {#each Options as opt}
                <option>{opt}</option>
            {/each}
        </select>
    </div>
</div>
