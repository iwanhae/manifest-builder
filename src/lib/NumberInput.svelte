<script lang="ts">
    export let Label: string;
    export let Value: number;
    export let min: number | null = null;
</script>

<div>
    <label for="metadata.name" class="block text-sm font-medium text-gray-700">
        {Label}
    </label>
    <div class="w-80 mt-1 relative rounded-md shadow-sm">
        <input
            id={`input-text-${Label}`}
            type="number"
            bind:value={Value}
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            {min}
        />
    </div>
</div>
