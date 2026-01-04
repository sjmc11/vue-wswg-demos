# Vue WSWG Editor Demo

This project demonstrates how to use the `vue-wswg-editor` library in a Vue 3 TypeScript project. It showcases the integration of the WSWG page builder editor, including the required Vite plugin configuration and the necessary project structure.

See the [vue-wswg-editor](https://github.com/sjmc11/vue-wswg-editor) library.

<div align="center">
  <img src="https://raw.githubusercontent.com/sjmc11/vue-wswg-editor/main/docs/assets/wswg-hero.jpg" alt="vue-wswg-editor hero" style="max-width: 100%; height: auto;">
</div>

## Purpose

This demo project serves as a reference implementation for developers looking to integrate the `vue-wswg-editor` library into their Vue 3 applications. It includes:

- **Vite Plugin Configuration**: Demonstrates how to configure the `vueWswgEditorPlugin` to scan for blocks, fields, and layouts
- **Page Builder Structure**: Shows the required `page-builder` directory structure with blocks, layouts, and field definitions
- **Editor Integration**: Example implementation of the `WswgPageBuilder` component with state management
- **Block Examples**: Multiple example blocks demonstrating different use cases

## Tech Stack

- **Vue 3** (`^3.5.25`) - Progressive JavaScript framework
- **TypeScript** (`~5.9.3`) - Typed JavaScript
- **Vite** (`^7.2.4`) - Next-generation frontend tooling
- **Tailwind CSS** (`^4.1.17`) - Utility-first CSS framework
- **Pinia** (`^3.0.4`) - State management for Vue
- **Vue Router** (`^4.6.3`) - Official router for Vue.js
- **ESLint** (`^9.30.0`) - Code linting
- **Prettier** (`^3.6.2`) - Code formatting

## Project Structure

```
vue-wswg-demos/
├── src/
│   ├── page-builder/              # Required directory for vue-wswg-editor
│   │   ├── your-theme/            # Theme directory (main demo theme)
│   │   │   ├── blocks/            # Page builder blocks
│   │   │   │   ├── announcement/
│   │   │   │   ├── articleFeed/
│   │   │   │   ├── callBooking/
│   │   │   │   ├── divider/
│   │   │   │   ├── faqSection/
│   │   │   │   ├── featureGrid/
│   │   │   │   ├── hero/
│   │   │   │   ├── heroImage/
│   │   │   │   ├── ImageText/
│   │   │   │   ├── poll/
│   │   │   │   └── pricing/
│   │   │   ├── fields/            # Custom field components
│   │   │   │   └── rich-text/
│   │   │   ├── layout/            # Page layouts
│   │   │   │   ├── default.vue
│   │   │   │   ├── landingPage.vue
│   │   │   │   └── partials/
│   │   │   ├── theme.config.js    # Theme configuration
│   │   │   └── thumbnail.jpg      # Theme thumbnail
│   │   └── another-theme/         # Additional theme example
│   │       ├── blocks/
│   │       ├── layout/
│   │       ├── theme.config.js
│   │       └── thumbnail.jpg
│   ├── components/                # Shared components
│   ├── views/                     # Page views
│   │   ├── Editor.vue             # Editor view with WswgPageBuilder
│   │   └── Page.vue               # Page renderer view
│   ├── pinia/                     # State management
│   ├── router.ts                  # Vue Router configuration
│   └── main.ts                    # Application entry point
└── vite.config.ts                 # Vite configuration with plugin
```

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Vite Plugin Configuration

The project uses the `vueWswgEditorPlugin` from `vue-wswg-editor` to automatically scan and register blocks, fields, and layouts. The plugin is configured in `vite.config.ts`:

```typescript
import { vueWswgEditorPlugin } from "vue-wswg-editor/vite-plugin";

export default defineConfig({
   plugins: [
      vue(),
      tailwindcss(),
      vueWswgEditorPlugin({
         rootDir: "@page-builder",
      }),
   ],
});
```

The plugin scans the `@page-builder` directory (aliased to `./src/page-builder`) for:

- **Blocks**: Vue components in `blocks/` subdirectories
- **Fields**: TypeScript field definition files (`fields.ts`)
- **Layouts**: Vue components in the `layout/` directory

## Page Builder Directory

The `src/page-builder` directory is required for the library to function. It contains theme directories, each with its own blocks, layouts, fields, and configuration.

### Theme Structure

Each theme directory contains:

```
theme-name/
  ├── blocks/            # Page builder blocks
  │   └── hero/
  │       ├── Hero.vue       # Block component
  │       ├── fields.ts      # Field definitions (optional)
  │       └── thumbnail.png  # Block thumbnail (optional)
  ├── fields/            # Custom field components (optional)
  │   └── rich-text/
  │       └── RichTextField.vue
  ├── layout/            # Page layouts
  │   ├── default.vue
  │   └── partials/      # Reusable layout partials
  ├── theme.config.js    # Theme configuration
  └── thumbnail.jpg      # Theme thumbnail for selection UI
```

### Blocks

Blocks are Vue components located in `blocks/` subdirectories within a theme. Each block can optionally have:

- `fields.ts` - Field definitions for the block editor
- `thumbnail.png` - Preview image for the block browser

### Layouts

Layouts are Vue components in the `layout/` directory that define page templates. Partials can be used for reusable header/footer components.

### Theme Configuration

Each theme has a `theme.config.js` file that defines theme metadata like name, description, and available layouts.

## Usage Example

The `WswgPageBuilder` component is used in `src/views/Editor.vue`:

```vue
<WswgPageBuilder
   v-model="apiStore.pageData"
   blocksKey="blocks"
   settingsKey="settings"
   :url="`/page`"
   :showBrowserBar="true"
   :editable="isEditing"
   defaultBlockMargin="small"
   :loading="apiStore.isLoading"
>
  <template #toolbar>
    <!-- Custom toolbar content -->
  </template>
</WswgPageBuilder>
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run tscheck` - Type check TypeScript files
- `npm run lint` - Lint code
- `npm run lint-fix` - Fix linting issues
- `npm run prettier` - Check code formatting
- `npm run prettier-fix` - Fix code formatting
- `npm run format` - Run all checks (tscheck, prettier, lint)
- `npm run format-fix` - Fix all formatting issues

## Acknowledgments

The example blocks in this demo project are based on components from [HyperUI](https://www.hyperui.dev/), a collection of free, open-source Tailwind CSS components. HyperUI provides ready-to-use UI components that speed up development, and we're grateful for their contribution to the open-source community.

## Learn More

For more information about the `vue-wswg-editor` library, refer to the library's documentation and source code.
