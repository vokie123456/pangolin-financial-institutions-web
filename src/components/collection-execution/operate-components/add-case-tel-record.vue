<template>
  <!--执行页-电话簿-增加催收总结 -->
  <section class="component add-case-tel-record">
    <el-form ref='form' :rules="rules" label-width="90px" :model="applyModel">
      <el-row>
        <el-col :span="12">
          <el-form-item label="催收对象" prop="relationship">
            <el-select placeholder="请选择" v-model="applyModel.relationship">
              <el-option v-for="{index,name,code} in $dict.getDictData('Relationship')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="targetName">
            <el-input v-model="applyModel.targetName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话码" prop="phoneStatus">
            <el-select placeholder="请选择" v-model="applyModel.phoneStatus">
              <el-option v-for="{index,name,code} in $dict.getDictData('PhoneStatus')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="targetPhone">
            <el-input v-model="applyModel.targetPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="承诺还款金额" prop="promiseAmt">
        <el-input type="number" v-model="applyModel.promiseAmt" :min="0"></el-input>
      </el-form-item>
      <el-form-item label="行动备注" prop="remark">
        <el-input type="textarea" v-model="applyModel.remark"></el-input>
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
import { Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';

@Component({})
export default class AddCaseTelRecord extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  @Prop({ required: true })
  private phoneData: any;
  @Prop({ required: true })
  private caseId: string;
  private rules: any = {
    relationship: [{ required: true, message: '请选择催收对象' }],
    targetName: [{ required: true, message: '请输入姓名' }],
    phoneStatus: [{ required: true, message: '请选择电话码' }],
    targetPhone: [{ required: true, message: '请输入联系电话' }],
  };
  private submitLoading: boolean = false;
  private applyModel: any = {
    remark: '',
    promiseAmt: '',
    targetPhone: '',
    targetName: '',
    relationship: '',
    caseId: '',
  };
  @Watch('phoneData', { immediate: true })
  private phoneDataChange(value) {
    this.applyModel.targetPhone = value.phone;
    this.applyModel.targetName = value.contName;
    this.applyModel.relationship = value.relation;
  }
  @Emit('close')
  private close() {
    const form: any = this.$refs['form'];
    form.resetFields();
  }
  private commit() {
    const form: any = this.$refs['form'];
    form.validate((result) => {
      if (!result) return;
      this.submitLoading = true;
      this.applyModel.caseId = this.caseId
      this.caseOperatorPageService.addCaseTelRecord(this.applyModel).subscribe(
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
