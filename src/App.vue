<template>
  <div id="app">
    <live2d />
    <router-view></router-view>
  </div>
</template>

<script>
import Live2d from '@/components/Live2d/index'
export default {
  components: {
    Live2d
  }
}
</script>

<style></style>
