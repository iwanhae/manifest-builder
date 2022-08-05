<script lang="ts">
    export let Label: string;
    export let Value: number | string = "25%";
    let min: number = 0;
    let max: number = 100;
    let step: number = 1;

    let type: "%" | "count" =
        typeof Value == "number"
            ? "count"
            : Value.includes("%")
            ? "%"
            : "count";
    let val: number = typeof Value == "number" ? Value : parseInt(Value);

    if (type == "count") max = null;
    const updateValue = () => {
        if (type == "%") {
            Value = `${val}%`;
        } else {
            Value = val;
        }
    };
</script>

<div>
    <label for="metadata.name" class="block text-sm font-medium text-gray-700">
        {Label}
    </label>
    <div class="w-80 mt-1 relative rounded-md shadow-sm">
        <input
            id={`input-text-${Label}`}
            type="number"
            bind:value={val}
            on:change={updateValue}
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-32 sm:text-sm border-gray-300 rounded-md"
            {min}
            {max}
            {step}
        />
        <div class="absolute inset-y-0 right-0 flex items-center">
            <select
                bind:value={type}
                on:change={updateValue}
                class="focus:ring-indigo-500 focus:border-indigo-500 h-full w-32 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
                <option>count</option>
                <option>%</option>
            </select>
        </div>
    </div>
</div>
