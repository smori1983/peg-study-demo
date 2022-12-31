<template>
  <div>
    <div class="top">
      <div class="box">
        <div class="label">Code</div>
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
            <svg class="ast-graph" ref="format2-ast"></svg>
            <pre>{{ format2Json }}</pre>
          </div>
          <div class="right">
            <svg class="ast-graph" ref="format3-ast"></svg>
            <pre>{{ format3Json }}</pre>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component';
import * as format2Parser from 'peg/src/method/format2';
import * as format3Parser from 'peg/src/method/format3';
import * as d3Ast from './d3-ast';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      input: 'data.data1.foo("abc", 123, 0.9, true).bar(input.trim(10, config.trimText.type1))',
      format2Json: '',
      format3Json: '',
      tabsOptions: {
        useUrlFragment: false,
        defaultTabHash: '',
      },
    };
  },

  watch: {
    input() {
      this.drawFormat2();
      this.drawFormat3();
    },
  },

  methods: {
    tabChanged(selectedTab) {
      if (selectedTab.tab.name === 'AST') {
        this.$nextTick(() => {
          this.drawFormat2();
          this.drawFormat3();
        });
      }
    },

    drawFormat2() {
      try {
        const ast = format2Parser.parse(this.input.trim());

        this.format2Json = JSON.stringify(ast, null, 2);

        d3Ast.clear(this.$refs['format2-ast']);
        d3Ast.run(this.$refs['format2-ast'], ast);
      } catch (e) {
        console.log(e.message);

        this.format2Json = '';

        d3Ast.clear(this.$refs['format2-ast']);
      }
    },

    drawFormat3() {
      try {
        const ast = format3Parser.parse(this.input.trim());

        this.format3Json = JSON.stringify(ast, null, 2);

        d3Ast.clear(this.$refs['format3-ast']);
        d3Ast.run(this.$refs['format3-ast'], ast);
      } catch (e) {
        console.log(e.message);

        this.format3Json = '';

        d3Ast.clear(this.$refs['format3-ast']);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "style/common.styl"
</style>
