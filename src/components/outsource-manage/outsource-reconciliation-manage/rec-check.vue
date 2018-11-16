<template>
  <section class="component add-company">
    <el-form :rules="recCheckRules" :model="recCheckModel" ref="form" label-width="90px" class="addCompany">
      <el-row>
        <el-col :span="18">
          <el-form-item label="调账类型" prop="recType">
            <el-select v-model="recCheckModel.recType" placeholder="请选择" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('AccountAdjustment')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="调账金额" prop="recMoney">
            <el-input type="input" v-model="recCheckModel.recMoney"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="">
            <span>调账金额为需要调整的金额，正数为增加，负数为减少</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="调整原因" prop="recReason">
            <el-input type="textarea" v-model="recCheckModel.recReason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="commitCheck">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { OutsourceReconciliationService } from "~/services/domain-service/outsource-reconciliation-manage.service";

@Component({
  components: {},
})
export default class RecCheck extends Vue {
  @Dependencies(OutsourceReconciliationService)
  private outsourceReconciliationService: OutsourceReconciliationService;


  @Prop()
  private caseRow: any;

  // 公司数据实体
  private recCheckModel: any = {
    recType: '',
    recMoney: '',
    recReason: '',
  };
  private recCheckRules: any = {
    recType: [{ required: true, message: '请选择调账类型', trigger: 'change' }],
    recMoney: [{ required: true, message: '请输入调账金额', trigger: 'blur' }],
    recReason: [{ required: true, message: '请输入调账原因', trigger: 'blur' }],
  };

  @Emit('refreshList')
  private refreshList() { }
  @Emit('close')
  private close() { }

  private commitCheck() {
    const form: any = this.$refs.form;
    form.validate((valid) => {
      if (!valid) {
        return;
      }

      const query = {
        'adjustmentAmount': this.recCheckModel.recMoney,
        'accountAdjustment': this.recCheckModel.recType,
        'applyDescription': this.recCheckModel.recReason,
        'caseIds': [this.caseRow.id],
         confirm: 1, // 确认
      }
      this.outsourceReconciliationService.accountAdjustment(query).subscribe(
        data => {
          this.$message.success('申请成功!');
          this.refreshList();
          this.close();
        }
      );
    });
  }

  @Watch('caseRow')
  private onCaseRowChange() {
    this.refresh();
  }

  private refresh() {
    const form: any = this.$refs.form;
    form.resetFields();
  }
}
</script>

<style lang="less" scoped>
</style>
