<template>
  <section class="image-text">
    <div class="max-w-5xl px-5 mx-auto">
      <div class="bg-gray-100 rounded-xl overflow-hidden grid grid-cols-2">
        <div class="p-8 md:p-12 lg:px-16 lg:py-24">
          <div
            class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
          >
            <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit
            </h2>

            <p class="hidden text-gray-500 md:mt-4 md:block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>

            <div class="mt-4 md:mt-8">
              <a
                href="#"
                class="inline-block rounded-sm bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-2 focus:ring-yellow-400 focus:outline-hidden"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?auto=format&amp;fit=crop&amp;q=80&amp;w=1160"
          class="h-56 w-full object-cover sm:h-full"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions, ref } from 'vue';
import { createField } from 'vue-wswg-editor';

defineOptions({
  label: 'Image & Text',
  fields: {
    textAlign: createField.select(
      [
        { label: 'Left', value: 'left', id: 'align-left' },
        { label: 'Center', value: 'center', id: 'align-center' },
        { label: 'Right', value: 'right', id: 'align-right' },
      ],
      {
        default: 'center',
        label: 'Text align',
      }
    ),
    text: createField.text({
      maxLength: 50,
      placeholder: 'Enter announcement text...',
      label: 'Text',
    }),
    margin: createField.margin({ group: undefined }),
    isDarkMode: createField.boolean({
      label: 'Dark mode',
    }),
    isDismissable: createField.boolean({
      label: 'Dismissable',
    }),
  },
});

const props = withDefaults(
  defineProps<{
    text?: string;
    textAlign?: 'left' | 'center' | 'right';
    isDismissable?: boolean;
    isDarkMode?: boolean;
  }>(),
  {
    textAlign: 'center',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    isDismissable: false,
    isDarkMode: false,
  }
);
</script>
