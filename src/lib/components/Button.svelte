<script lang="ts">
   import styles from "$styles";
   export let text = "";
   // TODO: Pozadí bude gradient
   const style = "bg-[rgba(255,255,255,0.3)] border-mid border-[rgba(200,200,200,0.5)] rounded-sm px-3";
</script>

<button class={style} on:click>
   {text}
</button>
