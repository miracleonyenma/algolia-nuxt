<template>
  <main>
    <section class="p-4 mt-24 m-auto max-w-4xl">
      <header>
        <h1 class="font-black text-5xl">All posts</h1>

        <search />
      </header>
      <ul class="prose prose-xl">
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

    let env = process.env.ALGOLIA_APP_ID;

    return { articles, env }
  },
}
</script>