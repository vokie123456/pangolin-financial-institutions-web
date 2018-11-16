<template>
  <!--执行页-电话簿-停催申请 -->
  <section class="component stop-apply">
    <el-form ref='form' :rules="rules" label-width="100px" :model="applyModel">
      <el-form-item label="停催时间" prop="pauseDueTime">
        <el-date-picker v-model="applyModel.pauseDueTime" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请原因" prop="applyDescription">
        <el-input type="textarea" v-model="applyModel.applyDescription"></el-input>
      </el-form-item>
    </el-form>
    <div class="confirm-button">
      <el-button @click="close">取消</el-button>
      <el-button @click="commit" :loading="submitLoading">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Form } from 'element-ui';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { CaseApplyRecordService } from '~/services/domain-service/case-apply-record.service';

@Component({})
export default class StopApply extends Vue {
  @Dependencies(CaseApplyRecordService)
  private caseApplyRecordService: CaseApplyRecordService;
  @Prop({})
  private selecetedCase: any[];
  private rules: any = {
    pauseDueTime: [{ required: true, message: '请选择停催时间' }],
    applyDescription: [{ required: true, message: '请输入申请原因' }],
  };
  private submitLoading: boolean = false;
  private applyModel: any = {
    applyDescription: '',
    pauseDueTime: '',
    caseIds: [],
  };
  @Emit('close')
  private close() {
    const form: any = this.$refs['form'];
    form.resetFields();
  }
  @Watch('selecetedCase', { immediate: true })
  private selecetedCaseChange(value) {
    if (!value) {
      this.applyModel.caseIds[0] = this.$route.params.caseId;
      return;
    }
    this.applyModel.caseIds = value.map((v) => v.id);
  }
  private commit() {
    const form: any = this.$refs['form'];
    form.validate((result) => {
      if (!result) return;
      this.submitLoading = true;
      this.caseApplyRecordService.applyPauseCase(this.applyModel).subscribe(
        (data) => {
          this.submitLoading = false;
          this.$message.success('申请成功');
          this.close();
        },
        (err) => {
          this.submitLoading = false;
        },
      );
    });
  }
}
</script>

<style scoped lang="less">
</style>
