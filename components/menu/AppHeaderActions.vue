<script setup lang="ts">
import { ref, watch, Ref } from 'vue'
import { useDebounceFn, useGeolocation } from '@vueuse/core'
import { useRoomStore } from '../../store/rooms'
import { fetchSpaceProvider } from '../../utils/query'
import FilterModal from './FilterModal.vue'

const roomStore = useRoomStore()

// Search bar stuff
const searchActive = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)
const searchText = ref('')

// Filter Button stuff
const filterActive = ref(false)

const focusSearchField = () => {
  if (!searchActive.value) return
  queueMicrotask(() => searchInput.value?.focus())
}

watch(searchActive, focusSearchField)

const callAPIWithSearchQuery = async () => {
  const data = await fetchSpaceProvider(searchText.value, 1, 10)// Assuming fetchSpaceProvider now requires additional pagination parameters
  roomStore.storePage(data)
}

const updateSearch = useDebounceFn(callAPIWithSearchQuery, 2000)

watch(searchText, updateSearch)
</script>

<template>
  <div class="flex justify-between h-8">
    <!-- Search Bar -->
    <div
      :class="[
        'bg-white text-black rounded-full flex items-center transition-all duration-300 ease-in-out flex items-center',
        searchActive ? 'w-full' : 'w-16'
      ]"
    >
      <button
        @click.stop="searchActive = !searchActive"
        :class="[
          searchActive ? 'px-1' : 'px-5',
          'transition-all duration-300 ease-in-out cursor-pointer'
        ]"
      >
        <mdicon :name="searchActive ? 'chevron-left' : 'magnify'" :size="searchActive ? 28 : 24" />
      </button>

      <input
        v-show="searchActive"
        v-model="searchText"
        ref="searchInput"
        type="text"
        class="w-4/5 outline-transparent"
        placeholder="Search"
      />
    </div>

    <!-- Filter Button -->
    <button
      class="rounded-full w-16 h-8 flex justify-center items-center bg-white text-black"
      :class="[
        !searchActive ? 'delay-100' : 'opacity-0',

        'transition duration-200 ease-in-out absolute right-0'
      ]"
      @click.stop="filterActive = !filterActive"
    >
      <mdicon name="filter" :size="searchActive ? 28 : 24" />
    </button>

    <FilterModal :isVisible="filterActive" @cancel="filterActive = false" />
  </div>
</template>
