<script>
   import { DialogProxy } from "$lib/components/Dialog";
   import { onMount } from "svelte";
   import CreateDialog from "../../(app)/(AppMainTree)/CreateDialog.svelte";
   import CreateDialogData from "../../(app)/(AppMainTree)/CreateDialogData";
   import Group from "$lib/components/GroupBox.svelte";

   const proxy = new DialogProxy();
   const data = new CreateDialogData();
   onMount(() => proxy.showModalAndWaitTillClosed());
</script>

<div class="fa-solid fa-folder-tree bg-yellow-600" />
<CreateDialog dialogProxy={proxy} {data} />
<Group name="some group">
   <button>BTN</button>
</Group>
