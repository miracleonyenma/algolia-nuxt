<template>
  <main>
    <section class="prose prose-xl p-4 mt-24 m-auto max-w-4xl">
      <header>
        <h1>All posts</h1>

        <div class="search-cont inline-flex gap-2 bg-white p-2 rounded-lg shadow-lg">
          <input class="px-2 outline-none" type="search" name="search" id="search">
          <button class="bg-blue-600 text-white px-2 rounded-md" type="submit">Search</button>
        </div>
      </header>
      <ul>
        <li v-for="article in articles" :key="article.slug">
          <nuxt-link :to="{ name: 'blog-slug', params: { slug: article.slug } }">
            <h2 class="mb-0">{{ article.title }}</h2>
            <p class="mt-0">{{ article.description }}</p>
          </nuxt-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'slug', 'description'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return { articles }
  },
}
</script>

<style>
</style>