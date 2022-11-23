<template>
  <div>
    <svg class="demo" ref="demo"></svg>
  </div>
</template>

<script>
import * as main from './Demo01-main';

export default {
  mounted() {
    main.run(this.$refs.demo);
  }
};
</script>

<style lang="stylus" scoped>
.demo {
  width 100%
  height 300px
  border 1px solid black

  >>>.link {
    stroke gray
    stroke-width 0.5px
  }
}
</style>
