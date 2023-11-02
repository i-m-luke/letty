<!-- TOTO PŮJDE POUŽÍT PRO DYNAMICKÉ SESTAVOVÁNÍ DIALOGU PODLE PŘEDANÝCH DAT -->
<script lang="ts">
   import ComponentA from "./ComponentA.svelte";
   import ComponentB from "./ComponentB.svelte";

   enum ComponentType {
      A,
      B,
   }

   let type: ComponentType;

   const getComponent = (type: ComponentType) => {
      switch (type) {
         case ComponentType.A:
            return ComponentA;
         case ComponentType.B:
            return ComponentB;
      }
   };
</script>

<button on:click={() => (type = ComponentType.A)}>A</button>
<button on:click={() => (type = ComponentType.B)}>B</button>
<svelte:component this={getComponent(type)}>SOME DATA</svelte:component>
