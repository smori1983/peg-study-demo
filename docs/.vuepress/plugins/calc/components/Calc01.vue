<template>
  <div>
    <div>
      <textarea class="input" v-model="input"></textarea>
    </div>

    <div>
      <pre>{{ ast }}</pre>
    </div>

    <div>
      <svg class="ast-graph" ref="ast-01"></svg>
      <svg class="ast-graph" ref="ast-02"></svg>
    </div>
  </div>
</template>

<script>
import * as parser from 'peg/src/calc/calc1';
import * as tdFactorize from 'peg/src/calc/visitor/td-factorize';
import * as d3 from './Calc01-d3';

export default {
  data() {
    return {
      input: '(1 + 2) * (7 + 9) + (3 + 4) * (7 + 9)',
      ast: '',
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
    draw() {
      try {
        const ast1 = parser.parse(this.input.trim());
        const ast2 = parser.parse(this.input.trim());

        tdFactorize.visit(ast2);

        d3.prepare(ast1);
        d3.prepare(ast2);

        d3.clear(this.$refs['ast-01']);
        d3.clear(this.$refs['ast-02']);
        //this.ast = JSON.stringify(ast, null, 2);

        d3.run(this.$refs['ast-01'], ast1);
        d3.run(this.$refs['ast-02'], ast2);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.input {
  width 100%
}
pre {
  background-color lightgray
  font-size 12px
}
.ast-graph {
  width 100%
  height 400px
  border 1px solid black

  >>>.link {
    stroke gray
    stroke-width 0.5px
  }
}
</style>
