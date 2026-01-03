<template>
   <div class="rich-text-field">
      <div v-if="editable" class="rich-text-editor">
         <RichTextToolbar :editor="editor ?? null" />
         <editor-content :editor="editor" />
      </div>
      <div v-else class="rich-text-display" v-html="content"></div>
   </div>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import RichTextToolbar from "./RichTextToolbar.vue";

const props = defineProps<{
   editable: boolean;
   label?: string;
   description?: string;
}>();

// Use defineModel for v-model binding
const content = defineModel<string>({ default: "" });

// Initialize Tiptap editor
const editor = useEditor({
   content: content.value || "",
   extensions: [StarterKit],
   editorProps: {
      attributes: {
         class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] p-4",
      },
   },
   onUpdate: ({ editor }) => {
      // Update v-model when editor content changes
      content.value = editor.getHTML();
   },
});

// Watch for external changes to content (when v-model changes from outside)
watch(
   () => content.value,
   (newContent) => {
      if (editor.value && editor.value.getHTML() !== newContent) {
         editor.value.commands.setContent(newContent || "");
      }
   }
);

// Watch for editable prop changes
watch(
   () => props.editable,
   (isEditable) => {
      if (editor.value) {
         editor.value.setEditable(isEditable);
      }
   },
   { immediate: true }
);

// Cleanup editor on unmount
onBeforeUnmount(() => {
   if (editor.value) {
      editor.value.destroy();
   }
});
</script>

<style scoped>
.rich-text-field {
   width: 100%;
}

.rich-text-editor {
   width: 100%;
   border: 1px solid #e5e7eb;
   border-radius: 0.375rem;
   overflow: hidden;
}

.rich-text-display {
   width: 100%;
   min-height: 100px;
   padding: 1rem;
   border: 1px solid #e5e7eb;
   border-radius: 0.375rem;
   background-color: #f9fafb;
}

/* Tiptap editor styles */
:deep(.ProseMirror) {
   outline: none;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
   color: #9ca3af;
   content: attr(data-placeholder);
   float: left;
   height: 0;
   pointer-events: none;
}

:deep(.ProseMirror h1) {
   font-size: 2em;
   font-weight: bold;
   margin-top: 0.67em;
   margin-bottom: 0.67em;
}

:deep(.ProseMirror h2) {
   font-size: 1.5em;
   font-weight: bold;
   margin-top: 0.83em;
   margin-bottom: 0.83em;
}

:deep(.ProseMirror h3) {
   font-size: 1.17em;
   font-weight: bold;
   margin-top: 1em;
   margin-bottom: 1em;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
   padding-left: 2em;
   margin: 1em 0;
}

:deep(.ProseMirror ul) {
   list-style-type: disc;
}

:deep(.ProseMirror ol) {
   list-style-type: decimal;
}

:deep(.ProseMirror li) {
   margin: 0.5em 0;
}

:deep(.ProseMirror blockquote) {
   border-left: 4px solid #d1d5db;
   padding-left: 1em;
   margin: 1em 0;
   color: #6b7280;
   font-style: italic;
}

:deep(.ProseMirror code) {
   background-color: #f3f4f6;
   padding: 0.2em 0.4em;
   border-radius: 0.25rem;
   font-family: monospace;
   font-size: 0.9em;
}

:deep(.ProseMirror pre) {
   background-color: #1f2937;
   color: #f9fafb;
   padding: 1em;
   border-radius: 0.375rem;
   overflow-x: auto;
   margin: 1em 0;
}

:deep(.ProseMirror pre code) {
   background-color: transparent;
   padding: 0;
   color: inherit;
}

:deep(.ProseMirror strong) {
   font-weight: bold;
}

:deep(.ProseMirror em) {
   font-style: italic;
}

:deep(.ProseMirror a) {
   color: #2563eb;
   text-decoration: underline;
}

:deep(.ProseMirror hr) {
   border: none;
   border-top: 2px solid #e5e7eb;
   margin: 2em 0;
}
</style>
