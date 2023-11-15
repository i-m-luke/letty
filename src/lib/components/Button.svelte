<script lang="ts">
   import styles from "$styles";
   export let text = "";
   // TODO: Pozadí bude gradient
   const style = "bg-[rgba(255,255,255,0.3)] border-thin border-[rgba(255,255,255,1)] rounded-md px-3";
</script>

<button class={style} on:click>
   {text}
</button>
