<template>
  <!-- 催收执行页-行动区模块-外访行动区 -->
  <section class="page visit-action-area">
    <el-form ref="form" :rules="rules" :model="applyModel" :inline="true" label-width="80px">
      <el-form-item label="催收对象:" prop="target">
        <el-select v-model="applyModel.target">
          <el-option v-for="{index,name,code} in $dict.getDictData('Relationship')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名:" prop="targetName">
        <el-input v-model="applyModel.targetName"></el-input>
      </el-form-item>
      <el-form-item label="地址类型:" prop="addressType">
        <el-select v-model="applyModel.addressType">
          <el-option v-for="{index,name,code} in $dict.getDictData('AddressType')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址:" prop="areaIds">
        <el-cascader v-model="applyModel.areaIds" :options="$city.getCityData()" change-on-select clearable></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址:" prop="addressDetail">
        <el-input v-model="applyModel.addressDetail"></el-input>
      </el-form-item>
      <el-form-item label="地址状态:" prop="addressStatus">
        <el-select v-model="applyModel.addressStatus">
          <el-option v-for="{index,name,code} in $dict.getDictData('AddressStatus')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行动代码:" prop="followupBack">
        <el-select v-model="applyModel.followupBack">
          <el-option v-for="{index,name,code} in $dict.getDictData('FollowupBack')" :key="index" :label="name" :value="code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="还款金额:" prop="repayAmount">
        <el-input type="number" v-model="applyModel.repayAmount"></el-input>
      </el-form-item>
      <el-form-item label="还款日期:" prop="repayDate">
        <el-date-picker v-model="applyModel.repayDate" type="date" placeholder="请选择日期" :value-format="'yyyy-MM-dd'">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="行动说明:" prop="followContent">
        <el-input v-model="applyModel.followContent" type="textarea" :rows="5"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
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
export default class VisitActionArea extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  private rules: any = {
    addressDetail: [{ required: true, message: '请输入详细地址' }],
    addressStatus: [{ required: true, message: '请选择地址状态' }],
    addressType: [{ required: true, message: '请选择地址类型' }],
    followContent: [{ required: true, message: '请输入行动说明' }],
    followupBack: [{ required: true, message: '请选择行动代码' }],
    repayAmount: [{ required: true, message: '请输入还款金额' }],
    repayDate: [{ required: true, message: '请选择还款日期' }],
    target: [{ required: true, message: '请选择催收对象' }],
    targetName: [{ required: true, message: '请输入催收姓名' }],
    areaIds: [{ required: true, message: '请选择地址' }],
  };
  private applyModel: any = {
    addressDetail: '',
    addressStatus: '',
    addressType: '',
    caseId: '',
    followContent: '',
    followupBack: '',
    repayAmount: '',
    repayDate: '',
    target: '',
    targetName: '',
    areaIds: [],
    get areaId(){
      if(this.areaIds.length){
        return this.areaIds[this.areaIds.length - 1]
      }
      return ""
    }
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
        .addCaseFollowupRecord(CASE_CHANNEL.visit, this.applyModel)
        .subscribe(this.emitSuccess)
    });
  }
}
</script>

<style lang="less" scoped>
.page.visit-action-area {
  height: 380px;
  overflow: auto;
}
</style>
