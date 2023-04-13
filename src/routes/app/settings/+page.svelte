<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import SelectOptionInfo from '$lib/components/SelectOptionInfo';

	let selectedValue: OptionData;
	$: selectedValueText = selectedValue
		? `ID: ${selectedValue.id}, TEXT: ${selectedValue.text}`
		: 'NONE';

	type OptionData = {
		id: number;
		text: string;
	};

	const selectOptions: SelectOptionInfo<OptionData>[] = [
		new SelectOptionInfo<OptionData>('Timed', { id: 1, text: 'TIMED OPTION' }),
		new SelectOptionInfo<OptionData>('After every change', { id: 101, text: 'TIMED OPTION' })
	];
</script>

<Select bind:value={selectedValue} label="Synchronize type" options={selectOptions} />
<span>Selected synchronize option: </span>
<span>{selectedValueText}</span>
