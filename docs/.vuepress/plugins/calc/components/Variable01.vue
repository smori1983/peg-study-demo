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
      <tab name="Graph">
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
import * as parser from 'peg/src/calc/calc2';
import * as evaluator from 'peg/src/calc/evaluation/evaluator';
import * as d3Ast from './d3-ast';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      input: 'price * (100 + tax) / 100',
      variables: '{"price": 100, "tax": 10}',
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
      if (selectedTab.tab.name === 'Graph') {
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
        this.result = evaluator.run(ast, variables);

        d3Ast.prepare(ast);
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
.top {
  .box {
    margin-bottom 1rem
  }
  .label {
    margin-bottom 0.5rem
    font-weight bold
  }
  .input {
    min-width 100%
    max-width 100%
    min-height 3rem
  }
  .result {
    min-height 2rem
  }
}
.tabs-component {
  margin 0
  width 100%
  >>> .tabs-component-tabs {
    margin 0 0 1rem
    padding 0
    align-items stretch
    display flex
    justify-content flex-start
    .tabs-component-tab {
      margin 0
      padding 0
      color #999
      font-size 14px
      font-weight 600
      list-style none
      .tabs-component-tab-a {
        margin 0
        padding 0 2rem 0 0
        line-height 2.5rem
        align-items center
        color inherit
        display flex
        text-decoration none
      }
    }
    .tabs-component-tab:hover {
      color #666
    }
    .tabs-component-tab.is-active {
      color #000
    }
  }
  >>> .tabs-component-panels {
    margin 0
    padding 0
  }
}
.side-by-side {
  display flex

  .left {
    width 50%
    pre {
      margin 0 2px 0 0
    }
  }
  .right {
    width 50%
    pre {
      margin 0 0 0 2px
    }
  }
}
pre {
  border-radius unset
  background-color lightgray
  color black
}
.ast-graph {
  margin 0 1px
  width calc(100% - 4px)
  height 400px
  border 1px solid black

  >>> .link {
    stroke gray
    stroke-width 0.5px
  }
}
</style>
