<script lang="ts">
   import { enhance } from "$app/forms";
   import { writable, type Writable } from "svelte/store";
   import styles from "$styles";
   import type { Message } from "./Message";
   import type { PageLoadData } from "./PageLoadData";

   export let data: PageLoadData;

   export let form: {
      answer: string;
      question: string;
   };

   const messages: Writable<Message[]> = writable(data.messages);

   $: {
      if (form) {
         messages.update((current) => [...current, { question: form?.question, answer: form?.answer }]);
      }
   }
</script>

<!-- TODO: Přepracovat z formactions na HTTP metody (formactions jsou v tomto případě nevhodné) -->

<div class="flex flex-col space-y-4 w-full">
   {#each $messages as { question, answer }}
      <div class="flex flex-col flex-grow">
         <div class="flex-grow">
            <span class="float-left p-4 bg-white rounded-3xl">
               {question}
            </span>
         </div>
         <div class="flex-grow">
            <span class="float-right p-4 bg-white rounded-3xl">
               {answer}
            </span>
         </div>
      </div>
   {/each}

   <div class="flex-grow border border-t-5 border-white" />
   <form method="POST" class="flex space-x-4 flex-row w-full" use:enhance>
      <textarea
         name="message"
         class="flex-grow p-4 bg-transparent border border-5 border-white rounded-lg focus:outline-none"
         placeholder="message..."
      />
      <button
         formaction="?/send-message"
         class={styles.build("fa-solid fa-comment-dots bg-clip-text", styles.class.iconButton)}
         style="font-size: 2rem"
      />
   </form>
</div>
