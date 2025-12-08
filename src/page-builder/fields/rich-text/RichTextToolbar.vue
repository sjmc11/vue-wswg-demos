<template>
   <div v-if="editor" class="toolbar">
      <button
         type="button"
         class="toolbar-button"
         :class="{ 'is-active': editor.isActive('bold') }"
         title="Bold"
         @click="editor.chain().focus().toggleBold().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
         </svg>
      </button>
      <button
         type="button"
         class="toolbar-button"
         :class="{ 'is-active': editor.isActive('italic') }"
         title="Italic"
         @click="editor.chain().focus().toggleItalic().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
         </svg>
      </button>
      <div class="toolbar-divider"></div>
      <button
         type="button"
         class="toolbar-button"
         :class="{ 'is-active': editor.isActive('bulletList') }"
         title="Bullet List"
         @click="editor.chain().focus().toggleBulletList().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
         </svg>
      </button>
      <button
         type="button"
         class="toolbar-button"
         :class="{ 'is-active': editor.isActive('orderedList') }"
         title="Numbered List"
         @click="editor.chain().focus().toggleOrderedList().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <line x1="10" y1="6" x2="21" y2="6"></line>
            <line x1="10" y1="12" x2="21" y2="12"></line>
            <line x1="10" y1="18" x2="21" y2="18"></line>
            <path d="M4 6h1v1H4z"></path>
            <path d="M4 12h1v1H4z"></path>
            <path d="M4 18h1v1H4z"></path>
         </svg>
      </button>
      <div class="toolbar-divider"></div>
      <button
         type="button"
         class="toolbar-button"
         :class="{ 'is-active': editor.isActive('blockquote') }"
         title="Blockquote"
         @click="editor.chain().focus().toggleBlockquote().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <path
               d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
            ></path>
            <path
               d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
            ></path>
         </svg>
      </button>
      <button
         type="button"
         class="toolbar-button"
         :class="{ 'is-active': editor.isActive('codeBlock') }"
         title="Code Block"
         @click="editor.chain().focus().toggleCodeBlock().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
         </svg>
      </button>
      <div class="toolbar-divider"></div>
      <button
         type="button"
         class="toolbar-button"
         :disabled="!editor.can().undo()"
         title="Undo"
         @click="editor.chain().focus().undo().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <path d="M3 7v6h6"></path>
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
         </svg>
      </button>
      <button
         type="button"
         class="toolbar-button"
         :disabled="!editor.can().redo()"
         title="Redo"
         @click="editor.chain().focus().redo().run()"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="14"
            height="14"
         >
            <path d="M21 7v6h-6"></path>
            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path>
         </svg>
      </button>
   </div>
</template>

<script setup lang="ts">
import type { Editor } from "@tiptap/core";

defineProps<{
   editor: Editor | null;
}>();
</script>

<style scoped>
.toolbar {
   display: flex;
   align-items: center;
   gap: 0.125rem;
   padding: 0.25rem;
   background-color: #f9fafb;
   border-bottom: 1px solid #e5e7eb;
   flex-wrap: wrap;
}

.toolbar-button {
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 0.25rem;
   background-color: transparent;
   border: 1px solid transparent;
   border-radius: 0.25rem;
   cursor: pointer;
   color: #374151;
   font-size: 0.75rem;
   font-weight: 500;
   transition: all 0.15s ease;
   min-width: 1.75rem;
   height: 1.75rem;
}

.toolbar-button:hover:not(:disabled) {
   background-color: #f3f4f6;
   border-color: #d1d5db;
}

.toolbar-button:disabled {
   opacity: 0.4;
   cursor: not-allowed;
}

.toolbar-button.is-active {
   background-color: #dbeafe;
   border-color: #93c5fd;
   color: #1e40af;
}

.toolbar-divider {
   width: 1px;
   height: 1.25rem;
   background-color: #d1d5db;
   margin: 0 0.125rem;
}
</style>
