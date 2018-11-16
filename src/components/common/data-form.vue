<template>
  <section class="component data-form">
    <el-form ref="data-form" :inline="true" :rules="rules" label-position="left" :model="model">
      <div class="row nowrap">
        <div class="row middle-span col-span">
          <slot name="default-input"></slot>
          <slot name="collapse-input" v-if="showCollapseContext"></slot>
          <el-button v-if="!hiddenSearch" @click="submitForm" class="search-button">搜索</el-button>
          <el-button v-if="showResetButton" @click="resetForm" class="reset-button">重置</el-button>
          <div :style="{width:buttonWrap?'100%':'10px'}"></div>

          <slot name="collapse-button" v-if="showCollapseContext">
            <span></span>
          </slot>
          <div class="col-span" v-show="showAppendContext">
          </div>
        </div>
      </div>
      <div class="row middle-span center-span collapse-icon more-container" @click="changeCollapseHandle" v-if="showCollapseIcon">
        <div class="more-content">
          <span class="more-button">{{`${showCollapseContext ? '收起' :'更多'}搜索`}}</span>
          <svg-icon :class="[showCollapseContext ? 'arrow-up':'arrow-down']" class="more-button" iconName="xiala"></svg-icon>
        </div>
      </div>
      <div class="append-container">
        <div class="append-content-left">
          <slot name="default-button"></slot>
        </div>
        <slot name="append">
        </slot>
      </div>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop, Emit } from 'vue-property-decorator';
import { Form } from 'element-ui';
import { PageService } from '~/utils/page.service';
import SvgIcon from '~/components/common/svg-icon.vue';
@Component({
  components: {
    SvgIcon,
  },
})
export default class DataForm extends Vue {
  // 验证规则
  @Prop()
  private rules: any;
  // 数据模型
  @Prop()
  private model: any;
  // 数据模型
  @Prop()
  private page: PageService;

  //隐藏搜索按钮
  @Prop({
    type: Boolean,
    default: false,
  })
  private buttonWrap: boolean;

  //隐藏搜索按钮
  @Prop({
    type: Boolean,
    default: false,
  })
  private hiddenSearch: boolean;

  // 隐藏重置按钮
  @Prop({
    type: Boolean,
    default: false,
  })
  private hiddenReset: boolean;

  private showCollapseIcon: boolean = false;
  private showResetButton: boolean = false;
  private showCollapseContext: boolean = false;
  private showAppendContext: boolean = false;
  @Watch('rules')
  private onRulesChange(val) {}
  @Emit('onSearch')
  private onSearch() {}

  @Emit('handleResetForm') // 手动清空输入框
  private handleResetForm() {}

  /**
   * 初始化
   */
  private mounted() {
    if (this.$slots['collapse-input'] || this.$slots['collapse-button']) {
      this.showCollapseIcon = true;
    }
    if (this.$slots['collapse-input'] || this.$slots['default-input']) {
      this.showResetButton = !this.hiddenReset && true;
    }
    if (this.$slots['append']) {
      this.showAppendContext = true;
    }
  }

  /**
   * 提交输入表单
   */
  private submitForm() {
    const dataForm = this.$refs['data-form'] as Form;
    dataForm.validate((success) => {
      if (!success) {
        return;
      }

      if (this.page) {
        this.page.reset();
      }

      this.onSearch();
    });
  }

  /**
   * 重置输入表单
   */
  private resetForm() {
    const dataForm = this.$refs['data-form'] as Form;
    dataForm.resetFields();
    this.handleResetForm();
  }

  /**
   * 折叠状态改变
   */
  private changeCollapseHandle() {
    if (this.showCollapseIcon) {
      this.showCollapseContext = !this.showCollapseContext;
    }
  }
}
</script>

<style lang="less" scoped>
.component.data-form {
  padding: 0 10px;
  .arrow-down {
    transform: rotate(0deg);
    transition: transform ease-in 0.2s;
  }

  .arrow-up {
    transform: rotate(180deg);
    transition: transform ease-in 0.2s;
  }

  .collapse-icon {
    height: 30px;
  }
  .append-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 20px 0 0;
  }
  .more-button {
    font-size: 14px;
    margin-right: 5px;
  }
  .more-container {
    border-top: solid 1px #dee1e5;
    :hover {
      cursor: pointer;
    }
  }
  .more-content {
    border: solid 1px #dee1e5;
    padding: 2px 10px;
    border-top-color: white;
    margin-top: -5px;
  }
}
</style>
<style lang="less">
.component.data-form {
  .el-form-item {
    margin: 10px 20px 10px 0;
  }
  .el-radio-group {
    padding-left: 10px;
  }
  .append-content-left {
    .el-button.el-button--default {
      margin-bottom: 0 !important;
    }
  }
}
</style>
