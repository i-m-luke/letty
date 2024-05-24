<script lang="ts">
</script>

<div class="flex flex-col space-y-4 w-full">
   <div class="flex flex-col flex-grow">
      <div class="flex-grow">
         <span class="float-left p-4 bg-white rounded-3xl">
            {"question..."}
         </span>
      </div>
      <div class="flex-grow">
         <span class="float-right p-4 bg-white rounded-3xl">
            {"answer..."}
         </span>
      </div>
   </div>

   <div class="flex-grow border border-t-5 border-white" />
   <form method="POST" class="flex space-x-4 flex-row w-full">
      <textarea
         name="message"
         class="flex-grow p-4 bg-transparent border border-5 border-white rounded-lg"
         placeholder="message..."
      />
      <button class="fa-solid fa-comment-dots" style="font-size: 2rem" formaction="?/send-message" />
   </form>
</div>
