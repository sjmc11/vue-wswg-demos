import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface PageData {
  blocks?: any[]
  settings?: any
  [key: string]: any
  updatedAt: string
}

export const editorApiStore = defineStore('editorApi', () => {
  // State
  const pageData = ref<PageData>({} as PageData)
  const originalPageData = ref<PageData | null>(null)
  const isLoading = ref(false)
  const isSaving = ref(false)
  const error = ref<string | null>(null)
  const pageId = ref<string | null>(null)

  // Computed
  const hasUnsavedChanges = computed(() => {
    if (!pageData.value || !originalPageData.value) return false
    return JSON.stringify(pageData.value) !== JSON.stringify(originalPageData.value)
  })

  // Helper function to simulate API delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // Fake API: Fetch page data
  async function fetchPage(pageIdParam?: string): Promise<PageData> {
    isLoading.value = true
    error.value = null

    try {
      // Simulate network delay
      await delay(500)

      // If we already have page data, return it (simulating cached data)
      if (pageData.value && !pageIdParam) {
        isLoading.value = false
        return pageData.value
      }

      // Generate or return mock page data
      const mockData: PageData = {
        blocks: [],
        settings: {
          layout: 'default',
          title: 'Untitled Page',
          slug: 'untitled-page',
          meta: {
            description: '',
            keywords: []
          }
        },
        id: pageIdParam || `page-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      pageData.value = mockData
      originalPageData.value = JSON.parse(JSON.stringify(mockData))
      pageId.value = mockData.id as string
      isLoading.value = false

      return mockData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      isLoading.value = false
      throw err
    }
  }

  // Fake API: Save page changes
  async function saveChanges(data?: PageData): Promise<PageData> {
    isSaving.value = true
    error.value = null

    try {
      // Simulate network delay
      await delay(1000)

      const dataToSave = data || pageData.value
      if (!dataToSave) {
        throw new Error('No data to save')
      }

      // Update page data
      const savedData: PageData = {
        ...dataToSave,
        updatedAt: new Date().toISOString()
      }

      pageData.value = savedData
      originalPageData.value = JSON.parse(JSON.stringify(savedData))

      isSaving.value = false
      return savedData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      isSaving.value = false
      throw err
    }
  }

  // Revert to original data
  function revertChanges() {
    if (originalPageData.value) {
      pageData.value = JSON.parse(JSON.stringify(originalPageData.value))
    }
  }

  // Reset store
  function reset() {
    pageData.value = {} as PageData
    originalPageData.value = null
    error.value = null
    pageId.value = null
  }

  return {
    // State
    pageData,
    originalPageData,
    isLoading,
    isSaving,
    error,
    pageId,
    // Computed
    hasUnsavedChanges,
    // Actions
    fetchPage,
    saveChanges,
    revertChanges,
    reset,
  }
}, {
  persist: {
    omit: ['isLoading', 'isSaving', 'error'],
  }
})