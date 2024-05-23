<!-- GLOBAL STYLES -->
<!-- main function of this layout is to propagate: fontawesome icons, fonts -->
<script>
   import "../app.css";
   import "@fortawesome/fontawesome-free/css/all.min.css";
</script>

<slot />

<style>
   :global(.big-text) {
      font-family: "Nunito";
      font-weight: 600;
      font-size: 4rem;
   }

   :global(.small-text) {
      font-family: "Nunito";
      font-weight: 600;
      font-size: 1.5rem;
   }
</style>
