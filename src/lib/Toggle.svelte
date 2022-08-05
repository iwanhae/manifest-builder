<script lang="ts">
    export let Label: string;
    export let Value: boolean;

    let val = `${Value}`;
</script>

<div class="w-80 grid grid-cols-2 justify-items-center">
    <span class="ml-3 text-sm font-medium">
        {Label}
    </span>
    <label
        for={`toggle-${Label}`}
        class="inline-flex relative items-center cursor-pointer"
    >
        <input
            type="checkbox"
            id={`toggle-${Label}`}
            class="sr-only peer"
            bind:checked={Value}
        />
        <div
            class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-500 dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-300 peer-checked:bg-sky-600"
        />
    </label>
</div>
