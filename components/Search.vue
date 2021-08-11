<template>
  <div class="search-cont inline-flex gap-2 bg-white p-2 rounded-lg shadow-lg">
    <ais-instant-search index-name="articles" :search-client="searchClient">
      <ais-configure
        :attributesToSnippet="['bodyPlainText']"
        :hits-per-page.camel="5"
        snippetEllipsisText="…"
      >
        <ais-autocomplete>
          <div slot-scope="{ currentRefinement, indices, refine }">
            <input
              class="p-2"
              type="search"
              :value="currentRefinement"
              placeholder="Search for an article"
              @input="refine($event.currentTarget.value)"
            />
            <ais-stats />
            <template v-if="currentRefinement">
              <ul v-for="index in indices" :key="index.indexId">
                <li>
                  <h3>{{ index.indexName }}</h3>
                  <ul>
                    <li v-for="hit in index.hits" :key="hit.objectID">
                      <h1>
                        <ais-highlight attribute="title" :hit="hit" />
                      </h1>
                      <h2>
                        <ais-highlight attribute="description" :hit="hit" />
                      </h2>
                      <p>
                        <ais-snippet attribute="bodyPlainText" :hit="hit" />
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
            <ais-pagination />
          </div>
        </ais-autocomplete>
      </ais-configure>
    </ais-instant-search>

    <!-- <input class="px-2 outline-none" type="search" name="search" id="search" />
    <button class="bg-blue-600 text-white px-2 rounded-md" type="submit">
      Search
    </button> -->
  </div>
</template>

<script>
// import 'vue-instantsearch';

import algoliaSearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'

const searchClient = algoliaSearch(
  '34IIDW6KKR',
  '3f8d80be6c42bb030d27a7f108eb75f8'
)
export default {
  data() {
    return {
      searchClient,
    }
  },
}
</script>