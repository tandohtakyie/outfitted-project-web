<template>
<div class="header">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class="outfitted-logo" src="@/assets/outfitted_logo.jpeg" size="20">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">

          <router-link to="/"  class="nav-link" href="#">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/employees" class="nav-link" href="#">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" href="#">Products</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</div>
</template>

<script>
export default {
name: "Navigationbar"
}
</script>

<style scoped>

</style>