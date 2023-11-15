<script lang="ts">
   import styles from "$styles";
   export let name: string;
   export let borderIsVisible: boolean;

   const borderStyle = styles.build(`${borderIsVisible ? "" : "invisible"} border-[rgba(200,200,200,0.5)]`);
</script>

<div class="mt-2 grid grid-flow-row grid-cols-5 grid-rows-3">
   <!-- row #1 -->
   <div />
   <div class={styles.build(borderStyle, `col-span-3 border-l-thin border-r-mid border-t-mid rounded-bl-lg rounded-t-sm`)} />
   <div />
   <!-- row #2 -->
   <div class="grid place-items-center col-span-2">
      <span>{name}</span>
   </div>
   <div class="">
      <slot />
   </div>
   <div class={styles.build(borderStyle, "border-r-mid")} />
   <div />
   <!-- row #3 -->
   <div />
   <div class={styles.build(borderStyle, "col-span-3 border-l-thin border-r-mid border-b-mid rounded-tl-lg rounded-b-sm")} />
   <div />
</div>
