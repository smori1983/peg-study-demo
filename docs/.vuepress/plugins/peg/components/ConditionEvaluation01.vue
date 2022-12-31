<template>
  <div>
    <div class="top">
      <div class="box">
        <div class="label">Expression</div>
        <textarea class="input" v-model="input"></textarea>
        <div class="label">Variables (JSON)</div>
        <textarea class="input" v-model="variables"></textarea>
      </div>
      <div class="box">
        <div class="label">Evaluation result</div>
        <div class="result">{{ result }}</div>
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
import * as Scope from 'peg/src/condition/evaluation/scope';
import * as evaluator from 'peg/src/condition/evaluation/evaluator';
import * as d3Ast from './d3-ast';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      input: 'config.min <= data.value && data.value <= config.max',
      variables: '{"data": {"value": 99}, "config": {"min": 10, "max": 20}}',
      astJson: '',
      result: '',
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
    variables() {
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
        const variables = JSON.parse(this.variables);

        this.astJson = JSON.stringify(ast, null, 2);
        this.result = evaluator.run(ast, new Scope(variables));

        d3Ast.clear(this.$refs['ast-01']);
        d3Ast.run(this.$refs['ast-01'], ast);
      } catch (e) {
        console.log(e.message);

        this.astJson = '';
        this.result = '';

        d3Ast.clear(this.$refs['ast-01']);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "style/common.styl"
</style>
