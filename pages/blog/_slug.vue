<template>
  <article class="prose prose-lg lg:prose-xl p-4 mt-24 m-auto max-w-4xl">
    <header>
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
    </header>
    <!-- this is where we will render the article contents -->
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    //here, we will fetch the article from the articles/ folder using the name provided in the `params.slug`
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
}
</script>