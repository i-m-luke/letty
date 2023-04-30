<script lang="ts">
   import { Select, SelectOptionInfo } from "$lib/components/Select";

   type OptionData = {
      id: number;
      text: string;
   };

   let selectedValue: OptionData;
   $: selectedValueText = selectedValue
      ? `ID: ${selectedValue.id}, TEXT: ${selectedValue.text}`
      : "NONE";

   const selectOptions: SelectOptionInfo<OptionData>[] = [
      new SelectOptionInfo<OptionData>("Timed", { id: 1, text: "TIMED OPTION" }),
      new SelectOptionInfo<OptionData>("After every change", {
         id: 101,
         text: "AFTER EVERY CHANGE OPTION",
      }),
   ];
</script>

<Select bind:value={selectedValue} label="Synchronize type" options={selectOptions} />
<span>Selected synchronize option: {selectedValueText}</span>
