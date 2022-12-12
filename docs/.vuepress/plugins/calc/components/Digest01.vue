<template>
  <div>
    <div class="input-area">
      <div class="box1">
        <textarea class="input" v-model="input1"></textarea>
        <textarea class="input" v-model="input2"></textarea>
      </div>
      <div class="box2">
        <span>Evaluation result: </span><span class="result">{{ result }}</span>
      </div>
    </div>

    <tabs
      :cache-lifetime="-1"
      :options="tabsOptions"
      @changed="tabChanged"
    >
      <tab name="Pretty">
        <div class="output-pretty">
          <div class="left">
            <pre>{{ input1Pretty }}</pre>
          </div>
          <div class="right">
            <pre>{{ input2Pretty }}</pre>
          </div>
        </div>
      </tab>
      <tab name="Compact">
        <div class="output-compact">
          <pre>{{ input1Compact }}</pre>
          <pre>{{ input2Compact }}</pre>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component';
import * as parser from 'peg/src/calc/calc1';
import * as digest from 'peg/src/calc/helper/digest';

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
    },

    draw1() {
      try {
        const input1Ast = parser.parse(this.input1.trim());
        const input1Digest = digest.get(input1Ast);

        this.input1Pretty = JSON.stringify(input1Digest, null, 4);
        this.input1Compact = JSON.stringify(input1Digest);
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
.input-area {
  margin-bottom 20px

  .box1 {
    margin-bottom 10px

    .input {
      min-width 100%
      max-width 100%
      min-height 3rem
    }
  }

  .box2 {
    .result {
      font-weight bold
    }
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
.output-pretty {
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
</style>
