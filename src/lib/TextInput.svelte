<script lang="ts">
    export let Label: string;
    export let Value: string;
    export let Description: string;
</script>

<div>
    <label for="metadata.name" class="block text-sm font-medium text-gray-700">
        {Label}
    </label>
    <div class="w-80 mt-1 relative rounded-md shadow-sm">
        <input
            id={`input-text-${Label}`}
            type="text"
            bind:value={Value}
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder={Description}
        />
    </div>
</div>
