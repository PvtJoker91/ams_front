<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="60" height="60" />

    <div class="wrapper">
      <Menu msg="AMS" />

      <nav>
        <RouterLink to="/">Home</RouterLink><br>
        <RouterLink to="/search">Search</RouterLink><br>
        <RouterLink to="/registration">Registration</RouterLink><br>
        <RouterLink to="/logistic">Logistic</RouterLink><br>
        <RouterLink to="/requests">Requests</RouterLink><br>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: left;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 512px) {
  header {
    display: list-item;
    place-items: right;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: 1rem;
    font-size: 2rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
