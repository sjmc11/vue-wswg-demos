<template>
   <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div
         v-if="heading || description"
         class="mb-5 md:mb-9 max-w-prose"
         :class="{
            'text-left': textAlign === 'left',
            'text-center mx-auto': textAlign === 'center',
            'text-right ml-auto': textAlign === 'right',
         }"
      >
         <h2 v-if="heading" class="text-xl md:text-3xl font-bold text-gray-900">
            {{ heading }}
         </h2>

         <p v-if="description" class="mt-3 text-lg text-pretty text-gray-700">
            {{ description }}
         </p>
      </div>

      <p v-if="articlesLoading" class="text-center text-gray-500">Loading articles...</p>
      <p v-if="articlesError" class="text-center text-red-500">Error loading articles: {{ articlesError.message }}</p>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
         <div v-for="article in articles" :key="article.id">
            <article class="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
               <img :alt="article.title" :src="article.image" class="h-56 w-full object-cover" />

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

      <div
         v-if="showViewAllLink && !articlesLoading && !articlesError"
         class="mt-4 md:mt-9"
         :class="{
            'text-center': textAlign === 'center',
            'text-left': textAlign === 'left',
            'text-right': textAlign === 'right',
         }"
      >
         <a
            href="#"
            class="py-2 px-4 bg-zinc-900 text-white rounded-md mx-auto inline-block hover:bg-zinc-800 transition-colors"
            >View all articles</a
         >
      </div>
   </div>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions, ref, onMounted, watch } from "vue";
import { createField } from "vue-wswg-editor";

defineOptions({
   label: "Articles feed",
   emoji: "🗞️",
   fields: {
      textAlign: createField.select(
         [
            { label: "Left", value: "left", id: "text-align-left" },
            { label: "Center", value: "center", id: "text-align-center" },
            { label: "Right", value: "right", id: "text-align-right" },
         ],
         {
            label: "Text align",
            group: "content",
         }
      ),
      heading: createField.text({
         maxLength: 50,
         placeholder: "Section heading",
         label: "Heading",
         group: "content",
      }),
      description: createField.text({
         maxLength: 50,
         placeholder: "Section description",
         label: "Description",
         group: "content",
      }),
      showViewAllLink: createField.boolean({
         label: "Show view all link",
         description: "Show a link to view all articles",
         group: "content",
         default: true,
      }),
      limit: createField.radio(
         [
            { label: "3 articles", value: 3, id: "limit-3" },
            { label: "6 articles", value: 6, id: "limit-6" },
            { label: "9 articles", value: 9, id: "limit-9" },
         ],
         {
            label: "Limit",
            description: "The number of articles to fetch",
            group: "content",
         }
      ),
      // info: createField.info({
      //   label: 'How this block works',
      //   description: 'This block fetches articles from the database and displays them in a grid.',
      //   group: 'content',
      // }),
      margin: createField.margin({ group: "appearance" }),
   },
});

const props = withDefaults(
   defineProps<{
      textAlign?: "left" | "center" | "right";
      heading?: string;
      description?: string;
      showViewAllLink?: boolean;
      limit?: number;
   }>(),
   {
      textAlign: "left",
      heading: "Latest articles",
      description:
         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe maiores exercitationem id soluta eaque harum eligendi distinctio sapiente esse ad! Sit expedita eos quam numquam ea, assumenda officiis minus ut.",
      showViewAllLink: true,
      limit: 6,
   }
);

interface Article {
   id: number;
   title: string;
   limit: number;
   createdAt: string;
   excerpt: string;
   image: string;
}

const articlesLoading = ref(false);
const articlesError = ref<Error | null>(null);
const articles = ref<Article[]>([]);

async function fetchArticles() {
   articlesLoading.value = true;
   articlesError.value = null;
   articles.value = [];
   try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=7&_limit=${props.limit}`);
      const data = await response.json();
      articles.value = data.map((article: any) => ({
         id: article.id,
         title: article.title.length > 28 ? `${article.title.substring(0, 28)}...` : article.title, // trim to 7 words
         createdAt: article.created_at,
         excerpt: `${article.body.substring(0, 100)}...`,
         image: `https://picsum.photos/200/300?random=${article.id}`,
      }));
   } catch (error) {
      articlesError.value = error as Error;
   } finally {
      articlesLoading.value = false;
   }
}

// Watch the limit field value and validate it
watch(
   () => props.limit,
   async () => {
      fetchArticles();
   }
);

onMounted(() => {
   fetchArticles();
});
</script>
