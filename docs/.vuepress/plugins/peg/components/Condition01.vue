<template>
  <div>
    <div class="top">
      <div class="box">
        <div class="label">Expression</div>
        <textarea class="input" v-model="input"></textarea>
      </div>
    </div>

    <tabs
      :cache-lifetime="-1"
      :options="tabsOptions"
      @changed="tabChanged"
    >
      <tab name="AST">
        <div class="side-by-side">
          <div class="left">
            <svg class="ast-graph" ref="ast-01"></svg>
          </div>
          <div class="right">
            <pre>{{ astJson }}</pre>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component';
import * as parser from 'peg/src/condition/format1';
import * as d3Ast from './d3-ast';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      input: 'a.b > 0 || c && d == 100',
      astJson: '',
      tabsOptions: {
        useUrlFragment: false,
        defaultTabHash: '',
      },
    };
  },

  watch: {
    input() {
      this.draw();
    },
  },

  methods: {
    tabChanged(selectedTab) {
      if (selectedTab.tab.name === 'AST') {
        this.$nextTick(() => {
          this.draw();
        });
      }
    },

    draw() {
      try {
        const ast = parser.parse(this.input.trim());

        this.astJson = JSON.stringify(ast, null, 2);

        d3Ast.clear(this.$refs['ast-01']);
        d3Ast.run(this.$refs['ast-01'], ast);
      } catch (e) {
        console.log(e.message);

        this.astJson = '';

        d3Ast.clear(this.$refs['ast-01']);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "style/common.styl"
</style>
