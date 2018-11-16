<template>
  <!-- 催收执行页-行动区模块-电催行动区 -->
  <section class="page telephone-action-area">
    <el-form ref="form" :rules="rules" :model="applyModel" :inline="true" label-width="100px">
      <el-form-item label="行动代码:" prop="followupBack">
        <el-select v-model="applyModel.followupBack" @change="setCheckTime">
          <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行动金额:" prop="followAmount">
        <el-input type="number" v-model="applyModel.followAmount"></el-input>
      </el-form-item>
      <el-form-item label="复核时间:" prop="checkTime">
        <el-date-picker v-model="applyModel.checkTime" type="datetime" placeholder="请选择日期" :value-format="'yyyy-MM-dd HH:mm:ss'">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="行动说明:" prop="followContent">
        <el-input v-model="applyModel.followContent" type="textarea" :rows="5"></el-input>
      </el-form-item>
    </el-form>
    <div class="text-center">
      <el-button @click="reset">重置</el-button>
      <el-button @click="submit" :loading="submitLoading">提交</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service.ts';
import { Prop, Emit } from "vue-property-decorator";
import { CASE_CHANNEL } from "~/config/enum.config"

@Component({
  components: {
    DataBox,
  },
})
export default class TelephoneActionArea extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  /**
   * caseId
   */
  @Prop({ type: String, required: true })



  private caseId: string;
  private applyModel: any = {
    followupBack: '',
    followContent: '',
    checkTime: '',
    followAmount: '',
    followTime: new Date(),
    caseId: '',
  };
  private rules: any = {
    followupBack: [{ required: true, message: '请选择行动代码' }],
    followContent: [{ required: true, message: '请输入行动说明' }],
    checkTime: [{ required: true, message: '请选择复核时间' }],
    followAmount: [{ required: true, message: '请输入行动金额' }],
    followTime: [{ required: true, message: '请选择行动日期' }],
  };
  private submitLoading: boolean = false;

  @Emit("success")
  private emitSuccess() {
    this.submitLoading = false;
    this.$message.success('操作成功');
    this.reset();
  }

  private reset() {
    const form: any = this.$refs['form'];
    form.resetFields();
  }

  private submit() {
    const form: any = this.$refs['form'];
    form.validate((result) => {
      if (!result) return;
      this.applyModel.caseId = this.caseId;
      this.submitLoading = true;
      this.caseOperatorPageService
        .addCaseFollowupRecord(CASE_CHANNEL.tel, this.applyModel)
        .subscribe(this.emitSuccess);
    });
  }

  private setCheckTime() {
    if (!this.applyModel.followupBack) {
      this.applyModel.checkTime = '';
    }
    if (
      this.applyModel.followupBack === 'PTP' ||
      this.applyModel.followupBack === 'CAPT'
    ) {
      const currentTime: any = new Date();
      this.applyModel.checkTime = this.$filter.dateTimeFormat(
        new Date((currentTime / 1000 + 86400 * 3) * 1000),
      );
    } else {
      const currentTime: any = new Date();
      this.applyModel.checkTime = this.$filter.dateTimeFormat(
        new Date((currentTime / 1000 + 86400) * 1000),
      );
    }
  }
}
</script>

<style lang="less" scoped>
</style>
