<template>
  <header class="fixed top-0 w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-md">
    <div class="wrapper flex items-center justify-between p-4 m-auto max-w-5xl">
      <nuxt-link to="/"><Logo /> </nuxt-link>

      <nav class="site-nav">
        <ul class="links">
          <li>
            <nuxt-link to="/blog">Blog</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>