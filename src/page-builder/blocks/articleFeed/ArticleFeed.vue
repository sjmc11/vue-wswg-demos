<template>
    <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div v-if="heading || description" class="mb-3 max-w-prose">
        <h2 v-if="heading" class="text-3xl font-bold text-gray-900">
          {{ heading }}
        </h2>
  
        <p v-if="description" class="mt-3 text-lg text-pretty text-gray-700">
          {{ description }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div v-for="article in articles" :key="article.id">
            <article class="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
                <img alt="" src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&amp;fit=crop&amp;q=80&amp;w=1160" class="h-56 w-full object-cover">

                <div class="bg-white p-4 sm:p-6">
                    <time datetime="2022-10-10" class="block text-xs text-gray-500"> {{ article.createdAt }} </time>

                    <a href="#">
                    <h3 class="mt-0.5 text-lg text-gray-900">
                        {{ article.title }}
                    </h3>
                    </a>

                    <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {{ article.excerpt }}
                    </p>
                </div>
            </article>
        </div>
      </div>
  
      <p v-if="showViewAllLink" class="mt-4 text-sm text-gray-700">
        <span>View all articles</span>
      </p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineOptions, ref } from 'vue';
  import { createField } from 'vue-wswg-editor';
  
  defineOptions({
    label: 'Articles feed',
    fields: {
      heading: createField.text({
        maxLength: 50,
        placeholder: 'Section heading',
        label: 'Heading',
        group: 'content',
      }),
      description: createField.text({
        maxLength: 50,
        placeholder: 'Section description',
        label: 'Description',
        group: 'content',
      }),
      showViewAllLink: createField.boolean({
        label: 'Show view all link',
        description: 'Show a link to view all articles',
        group: 'content',
        default: true,
      }),
      margin: createField.margin({ group: 'appearance' }),
    },
  });
  
  withDefaults(
    defineProps<{
      heading?: string;
      description?: string;
      showViewAllLink?: boolean;
    }>(),
    {
      heading: 'Where shall we go for lunch?',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe maiores exercitationem id soluta eaque harum eligendi distinctio sapiente esse ad! Sit expedita eos quam numquam ea, assumenda officiis minus ut.',
      showViewAllLink: true,
    }
  );

  interface Article {
    id: number;
    title: string;
    createdAt: string;
    excerpt: string;
  }

  const articles = ref<Article[]>([
    {
      id: 1,
      title: 'How to position your furniture for positivity',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis voluptatem?',
      createdAt: '2022-10-10',
    },
  ]);
  </script>
  