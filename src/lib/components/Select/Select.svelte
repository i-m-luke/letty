<script lang="ts">
   import type { ISelectOptionInfo } from "./";

   export let label: string;
   export let options: ISelectOptionInfo[];
   export let value: any = {};
</script>

<div>
   <label>
      {label} :
      <select bind:value>
         {#each options as { text, data }}
            <option value={data}>{text}</option>
         {/each}
      </select>
   </label>
</div>
