<script lang="ts">
   import { page } from "$app/stores";
   import QADisplay from "./QADisplay.svelte";
   import type QAItem from "./QAItem";
   import QArea from "./QArea.svelte";

   export let data;

   // TODO: REWORK
   // TODO: Fixnout update UI (data se po kliku na uzel nemění)

   let { name, messages } = data.threadDataCollection.find((data) => data._id === $page.params.id)
      ?.data ?? { name: "unkown name", messages: [] };

   let qaItems: QAItem[] = messages.map((message) => {
      return {
         question: message.q,
         answer: message.a,
      };
   });
</script>

<span>{name}</span>

<div class="container">
   <QADisplay {qaItems} />
   <QArea />
</div>

<style>
   .container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
   }
</style>
