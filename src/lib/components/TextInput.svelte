<script lang="ts">
   enum Type {
      Text = "text",
      Password = "password",
      TextArea = "textarea",
   }

   export let type: Type;
   export let value: string;
</script>

{#if type === Type.TextArea}
   <textarea {value} />
{:else}
   <input {type} {value} />
{/if}
