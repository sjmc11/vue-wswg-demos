<template>
  <section id="hero-section">
    <section
      class="lg:grid lg:place-content-center"
      :class="isDarkMode ? 'bg-gray-900' : 'bg-white'"
    >
      <div
        class="mx-auto w-full flex items-center max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-24"
      >
        <div
          class="mx-auto max-w-prose"
          :class="{
            'text-left': textAlign === 'left',
            'text-center': textAlign === 'center',
            'text-right': textAlign === 'right',
          }"
        >
          <p
            v-if="kicker"
            class="mb-3 block text-xs font-medium text-gray-500 uppercase tracking-widest"
            :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
          >
            {{ kicker }}
          </p>
          <h1
            v-if="heading"
            class="text-xl font-bold sm:text-2xl"
            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            {{ heading }}
          </h1>

          <p
            v-if="description"
            class="mt-4 text-base text-pretty"
            :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'"
          >
            {{ description }}
          </p>

          <div
            v-if="ctas.length"
            class="mt-6 flex gap-4 sm:mt-8"
            :class="{
              'justify-start': textAlign === 'left',
              'justify-center': textAlign === 'center',
              'justify-end': textAlign === 'right',
            }"
          >
            <a
              v-for="(cta, ctaIndex) in ctas"
              class="inline-block rounded border px-5 py-3 font-medium shadow-sm transition-colors"
              :class="
                cta.style === 'solid'
                  ? 'border-red-600 bg-indigo-600 text-white hover:bg-indigo-700'
                  : isDarkMode
                  ? 'border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-gray-200'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              "
              :href="cta.url"
            >
              {{ cta.text }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, defineOptions } from 'vue';

defineOptions({
  label: 'Text Hero',
});

const props = withDefaults(
  defineProps<{
    kicker?: string;
    heading?: string;
    description?: string;
    ctas?: {
      text: string;
      url: string;
    }[];
    textAlign?: 'left' | 'center' | 'right';
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    image?: object;
    isDarkMode?: boolean;
  }>(),
  {
    textAlign: 'center',
    heading: 'Understand user flow and increase conversions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident accusamus impedit minima harum corporis iusto.',
    ctas: [
      {
        text: 'Get Started',
        url: '#',
        style: 'solid',
      },
      {
        text: 'Learn more',
        url: '#',
        style: 'outline',
      },
    ],
    isDarkMode: true,
  }
);
</script>
