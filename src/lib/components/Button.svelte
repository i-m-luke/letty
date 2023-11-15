<script lang="ts">
   import styles from "$styles";
   export let text = "";
   // TODO: Pozadí bude gradient
   const style = styles.build(styles.color.primary(0.5), "border-2 border-black rounded");
</script>

<button class={style} on:click>
   {text}
</button>
