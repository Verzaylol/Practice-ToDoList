<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/archivepage">Archive</router-link>
    <router-link to="/aboutpage">About</router-link>
  </div>
  <router-view/>
</template>


<script>
    import { useStore } from 'vuex'
    export default {
        beforeCreate() {
            // Get our store
            const store = useStore()
            // use store.commit to run any mutation. Below we are running the loadStore mutation
            store.commit('loadStore');
        }
    }
</script>


<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 2rem;
}
h1 {
    font-weight: 900;
    font-size: 2rem;
    margin: 3rem 0 2rem 0;
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 1rem 0 0;
    background: #eee;
    border-radius: 14px;
    text-decoration: none;
    padding: 0.25rem 0.75rem;
}
#nav a.router-link-exact-active {
    color: #0428ff;
}
input[type="submit"] {
    background: #0028ff;
    color: white;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    border: none;
    box-shadow: 0 5px 10px #0428ff7a;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.25s ease-out;
    cursor: pointer;
}
input[type="checkbox"] {
    width: auto;
    margin: 0 0.5rem 0 0;
}
input[type="submit"]:hover {
    background: #3600ff;
    box-shadow: 0 3px 7px #0428ff7a;
}
input {
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    font-size: 1rem;
    width: 100%;
    padding: 0.5rem 1rem;
}
</style>
