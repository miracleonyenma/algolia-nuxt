<template>
  <div class="search-cont relative inline-flex mt-6 bg-gray-100 border-2 rounded-lg focus-within:border-purple-600">
    <ais-instant-search-ssr index-name="articles" :search-client="searchClient">
      <ais-configure :attributesToSnippet="['bodyPlainText']" :hits-per-page.camel="5">
        <ais-autocomplete class="wrapper relative">
          <template v-slot="{ currentRefinement, indices, refine }">
            <input class="p-2 bg-white bg-opacity-0 outline-none" type="search" :value="currentRefinement" placeholder="Search for an article" @input="refine($event.currentTarget.value)" />
            <div class="results-cont relative">
              <div
                class=" absolute max-h-96 overflow-y-auto w-96 top-2 left-0 bg-white border-2 rounded-md shadow-lg" v-if="currentRefinement">
                <ais-stats class="p-2" />
                <ul v-for="index in indices" :key="index.indexId">
                  <template v-if="index.hits.length > 0">
                    <li>
                      <h2 class="font-bold text-2xl p-2">
                        {{ index.indexName }}
                      </h2>
                      <ul>
                        <li
                          class="border-gray-300 border-t p-2 hover:bg-gray-100" v-for="hit in index.hits" :key="hit.objectID" >
                          <nuxt-link
                            :to="{
                              name: 'blog-slug',
                              params: { slug: hit.objectID },
                            }"
                          >
                            <h3 class="font-extrabold text-xl">
                              <ais-highlight
                                :class-names="{
                                  'ais-Highlight-highlighted':
                                    'customHighlighted',
                                }"
                                attribute="title"
                                :hit="hit"
                              />
                            </h3>
                            <p class="font-bold">
                              <ais-highlight
                                :class-names="{
                                  'ais-Highlight-highlighted':
                                    'customHighlighted',
                                }"
                                attribute="description"
                                :hit="hit"
                              />
                            </p>
                            <p class="text-gray-500">
                              <ais-snippet
                                :class-names="{
                                  'ais-Snippet-highlighted':
                                    'customHighlighted',
                                }"
                                attribute="bodyPlainText"
                                :hit="hit"
                              />
                            </p>
                          </nuxt-link>
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
                <!-- <ais-pagination /> -->
              </div>
            </div>
          </template>
        </ais-autocomplete>
      </ais-configure>
    </ais-instant-search-ssr>

    <!-- <input class="px-2 outline-none" type="search" name="search" id="search" />
    <button class="bg-blue-600 text-white px-2 rounded-md" type="submit">
      Search
    </button> -->
  </div>
</template>

<script>
// import 'vue-instantsearch';
import { createServerRootMixin } from 'vue-instantsearch'

import algoliaSearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'

const searchClient = algoliaSearch(
  'S7YDOGRA5L',
  '430bcab1197ebb218374f1636144644f'
)

export default {
  data() {
    return {
      searchClient,
    }
  },

  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: 'articles',
    }),
  ],

  serverPrefetch() {
    return this.instantsearch.findResultsState(this).then((algoliaState) => {
      this.$ssrContext.nuxt.algoliaState = algoliaState
    })
  },

  beforeMount() {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState

    this.instantsearch.hydrate(results)

    // Remove the SSR state so it can't be applied again by mistake
    delete this.$nuxt.context.nuxtState.algoliaState
    delete window.__NUXT__.algoliaState
  },
}
</script>

<style>
.customHighlighted {
  @apply text-purple-600 bg-purple-100 rounded p-1;
}
</style>
