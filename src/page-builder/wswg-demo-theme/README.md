# Vue WSWG Editor Demo Theme

This directory contains a demo theme and reference implementation for building pages with the `vue-wswg-editor` library. It includes example blocks, custom fields, and layouts that you can use as a foundation for your own page builder implementation.

## Overview

This theme is extracted from the core blocks, custom fields, and basic layout examples used in the vue-wswg-editor demos project. It serves as a reference implementation and starting point for developers building pages using the vue-wswg-editor library in their projects.

The UI components in this theme are based on [HyperUI](https://www.hyperui.dev/), a collection of free, open-source Tailwind CSS components. HyperUI provides ready-to-use components that require no installation or configuration, making it perfect for rapid development.

## Structure

```
wswg-demo-theme/
├── theme.config.js      # Theme configuration and metadata
├── thumbnail.jpg        # Theme preview thumbnail
├── blocks/              # Block components
│   ├── announcement/
│   ├── articleFeed/
│   ├── callBooking/
│   ├── divider/
│   ├── faqSection/
│   ├── featureGrid/
│   ├── hero/
│   ├── heroImage/
│   ├── ImageText/
│   ├── poll/
│   └── pricing/
├── fields/              # Custom field components
│   └── rich-text/       # Rich text editor field using TipTap
└── layout/              # Layout components
    ├── default.vue
    ├── landingPage.vue
    └── partials/        # Reusable layout partials
        ├── AppFooter.vue
        └── appHeader/
            └── AppHeader.vue
```

## Installation

This theme does not include a `package.json` file. All dependencies should be installed in your parent project. Use the following command to install all required packages:

```bash
npm install vue@^3.5.25 vue-wswg-editor @tiptap/vue-3@^3.12.1 @tiptap/starter-kit@^3.12.1 @tiptap/pm@^3.12.1 @tiptap/core@^3.12.1 @heroicons/vue@^2.2.0 @vueuse/head@^2.0.0
```

## Required Packages

The following packages are used in this theme:

### Core Dependencies

- **vue** (`^3.5.25`) - Vue 3 framework
- **vue-wswg-editor** - The main page builder library

### Rich Text Editor (TipTap)

- **@tiptap/vue-3** (`^3.12.1`) - Vue 3 integration for TipTap
- **@tiptap/starter-kit** (`^3.12.1`) - TipTap starter kit with common extensions
- **@tiptap/pm** (`^3.12.1`) - ProseMirror core for TipTap
- **@tiptap/core** (`^3.12.1`) - TipTap core functionality

### UI Components

- **@heroicons/vue** (`^2.2.0`) - Heroicons icon library for Vue

### Utilities

- **@vueuse/head** (`^2.0.0`) - Head management for Vue (used in layouts)

## Blocks Included

This theme includes the following blocks:

- **Announcement** - Banner-style announcement block
- **Article Feed** - Display a feed of articles
- **Call Booking** - Section for scheduling calls or appointments
- **Divider** - Visual divider with customizable styling
- **FAQ Section** - Frequently asked questions with expandable items
- **Feature Grid** - Grid layout for displaying features with icons
- **Hero** - Hero section with heading and description
- **Hero Image** - Hero section with background image
- **Image Text** - Image and text content block with rich text support
- **Poll** - Interactive poll/voting block
- **Pricing** - Pricing table section for plans and subscriptions

## Custom Fields

### Rich Text Field

A custom rich text editor field component using TipTap:

- **Location**: `fields/rich-text/RichTextField.vue`
- **Toolbar**: `fields/rich-text/RichTextToolbar.vue`
- **Features**: Full WYSIWYG editing with formatting toolbar

## Layouts Included

- **default.vue** - Standard page layout with header and footer
- **landingPage.vue** - Landing page layout with SEO head management

## Usage

1. Copy this `wswg-demo-theme` directory to your project's page-builder themes directory
2. Install the required packages using the command above
3. Configure your Vite plugin to point to this directory (see vue-wswg-editor documentation)
4. Customize blocks, fields, and layouts to match your project's needs

## Configuration

The `theme.config.js` file contains theme metadata:

- **title** - Theme display name
- **description** - Theme description
- **version** - Theme version number
- **author** - Theme author name
- **authorWebsite** - Author's website URL
- **tags** - Tags for categorization
- **license** - License information

This theme does not include:

- `package.json` - Dependencies should be managed in your parent project
- TypeScript configuration - Should be configured in your parent project
- Linting/formatting configuration - Should be configured in your parent project

All TypeScript checks, linting, and formatting should be configured in your parent project and will run against the blocks, fields, and layouts in this directory.

## Customization

Feel free to:

- Modify existing blocks to match your design system
- Add new blocks following the same patterns
- Create additional custom fields as needed
- Customize layouts for your specific use case
- Remove blocks you don't need

## Documentation

For more information on using vue-wswg-editor, see:

- [Vue WSWG Editor Documentation](https://vue-wswg-editor.com)
- [Blocks Guide](/guide/blocks)
- [Fields Guide](/guide/fields)
- [Custom Fields Guide](/guide/custom-fields)
- [Layouts Guide](/guide/layouts)

## Credits

- [HyperUI](https://www.hyperui.dev/)

## License

This theme follows the same license as the vue-wswg-editor library.
