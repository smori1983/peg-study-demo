<template>
  <div>
    <div>
      <textarea class="input" v-model="input"></textarea>
    </div>

    <tabs
      :cache-lifetime="-1"
      :options="tabsOptions"
      @changed="tabChanged"
    >
      <tab name="Graph">
        <div class="svg">
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
import * as d3 from './Calc01-d3';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      input: '(1 + 2) * (7 + 9) + (3 + 4) * (7 + 9)',
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

        d3.prepare(ast1);
        d3.prepare(ast2);

        d3.clear(this.$refs['ast-01']);
        d3.clear(this.$refs['ast-02']);

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
.svg {
  display flex
  .left {
    width 50%
  }
  .right {
    width 50%
  }
  .label {
    margin-bottom 10px
    font-weight bold
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
}
.ast {
  pre {
    background-color lightgray
    font-size 12px
  }
}
</style>
