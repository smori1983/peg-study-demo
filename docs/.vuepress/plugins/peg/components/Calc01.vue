<template>
  <div>
    <div class="top">
      <div class="box">
        <textarea class="input" v-model="input"></textarea>
      </div>
      <div class="box">
        <div class="label">Final expression</div>
        <div class="result">{{ infixNotation }}</div>
      </div>
    </div>

    <tabs
      :cache-lifetime="-1"
      :options="tabsOptions"
      @changed="tabChanged"
    >
      <tab name="Graph">
        <div class="side-by-side">
          <div class="left">
            <div class="label">Original</div>
            <svg class="ast-graph" ref="ast-01"></svg>
          </div>
          <div class="right">
            <div class="label">Term rewriting</div>
            <svg class="ast-graph" ref="ast-02"></svg>
          </div>
        </div>
      </tab>
      <tab name="AST">
        <div class="ast">
          <pre>{{ ast }}</pre>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component';
import * as parser from 'peg/src/calc/calc1';
import * as tdFactorize from 'peg/src/calc/visitor/td-factorize';
import * as buAdd0 from 'peg/src/calc/visitor/bu-add-0';
import * as buMulti0 from 'peg/src/calc/visitor/bu-multi-0';
import * as buMulti1 from 'peg/src/calc/visitor/bu-multi-1';
import * as infixNotation from 'peg/src/calc/helper/infix-notation';
import * as d3Ast from './d3-ast';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      input: '(1 + 2) * (7 + 9) + (3 + 4) * (7 + 9)',
      infixNotation: '',
      ast: '',
      tabsOptions: {
        useUrlFragment: false,
        defaultTabHash: 'editor-tab-graph',
      },
    };
  },

  mounted() {
    this.draw();
  },

  watch: {
    input() {
      this.draw();
    }
  },

  methods: {
    tabChanged(selectedTab) {
      if (selectedTab.tab.name === 'Graph') {
        this.$nextTick(() => {
          this.draw();
        });
      }
    },

    draw() {
      try {
        const ast1 = parser.parse(this.input.trim());
        const ast2 = parser.parse(this.input.trim());

        this.ast = JSON.stringify(ast1, null, 4);

        tdFactorize.visit(ast2);
        buMulti0.visit(ast2);
        buMulti1.visit(ast2);
        buAdd0.visit(ast2);

        this.infixNotation = infixNotation.get(ast2);

        d3Ast.prepare(ast1);
        d3Ast.prepare(ast2);

        d3Ast.clear(this.$refs['ast-01']);
        d3Ast.clear(this.$refs['ast-02']);

        d3Ast.run(this.$refs['ast-01'], ast1);
        d3Ast.run(this.$refs['ast-02'], ast2);
      } catch (e) {
        this.infixNotation = '';

        console.log(e.message);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "style/common.styl"
</style>
