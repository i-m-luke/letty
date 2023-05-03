<script lang="ts">
   export let value: string | undefined = undefined;
   export let text: string | undefined = undefined;
</script>

<span>{value ?? text ?? "unknown"}</span>
