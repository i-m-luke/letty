<script lang="ts">
   import { enhance } from "$app/forms";
   import styles from "$styles";

   export let form: {
      answer: string;
      question: string;
   };

   $: answer = form?.answer ?? "...";
   $: question = form?.question ?? "...";
</script>

<div class="flex flex-col space-y-4 w-full">
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
