<template>
  <div>
    <div class="top">
      <div class="box">
        <textarea class="input" v-model="input1"></textarea>
        <textarea class="input" v-model="input2"></textarea>
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
      <tab name="Pretty">
        <div class="side-by-side">
          <div class="left">
            <pre>{{ input1Pretty }}</pre>
          </div>
          <div class="right">
            <pre>{{ input2Pretty }}</pre>
          </div>
        </div>
      </tab>
      <tab name="Compact">
        <div class="">
          <pre>{{ input1Compact }}</pre>
          <pre>{{ input2Compact }}</pre>
        </div>
      </tab>
      <tab name="AST">
        <div class="side-by-side">
          <div class="left">
            <svg class="ast-graph" ref="ast-01"></svg>
          </div>
          <div class="right">
            <svg class="ast-graph" ref="ast-02"></svg>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component';
import * as parser from 'peg/src/calc/calc1';
import * as digest from 'peg/src/calc/helper/digest';
import * as d3Ast from './d3-ast';

export default {
  components: {
    Tabs,
    Tab,
  },

  data() {
    return {
      input1: '1 * 2',
      input2: '2 * 1',
      input1Pretty: '',
      input2Pretty: '',
      input1Compact: '',
      input2Compact: '',
      result: '',
      tabsOptions: {
        useUrlFragment: false,
        defaultTabHash: 'editor-tab-graph',
      },
    };
  },

  mounted() {
    this.draw1();
    this.draw2();
    this.drawResult();
  },

  watch: {
    input1() {
      this.draw1();
      this.drawResult();
    },
    input2() {
      this.draw2();
      this.drawResult();
    }
  },

  methods: {
    tabChanged(selectedTab) {
      if (selectedTab.tab.name === 'AST') {
        this.$nextTick(() => {
          this.draw1();
          this.draw2();
        });
      }
    },

    draw1() {
      try {
        const input1Ast = parser.parse(this.input1.trim());
        const input1Digest = digest.get(input1Ast);

        this.input1Pretty = JSON.stringify(input1Digest, null, 4);
        this.input1Compact = JSON.stringify(input1Digest);

        d3Ast.prepare(input1Ast);
        d3Ast.clear(this.$refs['ast-01']);
        d3Ast.run(this.$refs['ast-01'], input1Ast);
      } catch (e) {
        this.input1Pretty = '';
        this.input1Compact = '';
      }
    },

    draw2() {
      try {
        const input2Ast = parser.parse(this.input2.trim());
        const input2Digest = digest.get(input2Ast);

        this.input2Pretty = JSON.stringify(input2Digest, null, 4);
        this.input2Compact = JSON.stringify(input2Digest);

        d3Ast.prepare(input2Ast);
        d3Ast.clear(this.$refs['ast-02']);
        d3Ast.run(this.$refs['ast-02'], input2Ast);
      } catch (e) {
        this.input2Pretty = '';
        this.input2Compact = '';
      }
    },

    drawResult() {
      if (this.input1Compact.length > 0 && this.input2Compact.length > 0) {
        this.result = (this.input1Compact === this.input2Compact) ? 'equal' : 'not equal';
      } else {
        this.result = '';
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
