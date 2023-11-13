<script lang="ts">
   import styles from "$styles";
   export let text = "";
   const style = styles.build(styles.colors.primary, "border-2 border-black rounded");
</script>

<button class={style} on:click>
   {text}
</button>
