<template>
  <section class="component add-company">
    <el-form :rules="creatBillRules" :model="creatBillModel" ref="form" label-width="90px" class="addCompany">
      <el-row>
        <el-col :span="18">
          <el-form-item label="受托方" prop="outsName">
            <el-select v-model="creatBillModel.outsName" placeholder="请选择" clearable @change="getNumbers">
              <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="批次号" prop="number">
            <el-select v-model="creatBillModel.number" placeholder="请选择" clearable @change="getTotals">
              <el-option v-for="item in numberList" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="">
            <span>{{title}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="">
            <span>{{subTitle}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="commit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CompanyService } from '~/services/management-service/company.service';
import { Emit, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { OutsourceReconciliationService } from '~/services/domain-service/outsource-reconciliation-manage.service';
import { OutsourceSettleService } from '~/services/domain-service/outsource-settle-manage.service';

@Component({
  components: {},
})
export default class CreatBill extends Vue {
  @Dependencies(OutsourceReconciliationService)
  private outsourceReconciliationService: OutsourceReconciliationService;
  @Dependencies(OutsourceSettleService)
  private outsourceSettleService: OutsourceSettleService;
  private creatBillModel: any = {
    number: '',
    outsName: '',
  };
  private creatBillRules: any = {
    outsName: [{ required: true, message: '请选择受托方', trigger: 'change' }],
    number: [{ required: true, message: '请选择批次号', trigger: 'change' }],
  };
  private numberList: any[] = [];
  private outsNames: any[] = []; //受托方列表
  private principalId: string = '';
  private batchNumber: string = '';
  private title: string = ''; //标题
  private subTitle: string = ''; //子标题

  @Emit('refreshList')
  private refreshList() { }
  @Emit('close')
  private close() {
    this.title = '';
    this.subTitle = '';
  }
  @Watch('creatBillModel.customer')
  @Watch('creatBillModel.number')
  private onCreatBillModelChanged() {
    this.caseStatistics();
    this.getOutName(); //受托方下拉列表
  }

  private mounted() {
    this.getOutName(); //受托方下拉列表
  }

  /**
   * 委托方列表
   */
  private getOutName() {
    this.outsourceSettleService.getOutSourceList().subscribe(
      (data) => {
        this.outsNames = data;
      }
    );
  }
  /**
   * 获取批次号
   */
  private getNumbers(id) {
    const param = {
      principalId: id,
    };
    this.outsourceReconciliationService.selectBatchNumberList(param).subscribe(
      (data) => {
        this.numberList = data;
        this.principalId = id;
      }
    );
  }

  /**
   * 获取受托方总条数
   */
  private getTotals(id) {
    this.batchNumber = id;
    const param = {
      batchNumber: id,
      principalId: this.principalId,
    };
    this.outsourceReconciliationService.caseStatistics(param).subscribe(
      (data) => {
        const outname = this.outName(this.creatBillModel.outsName);
        this.title =
          this.outName(this.creatBillModel.outsName) +
          ',' +
          '总案件数' +
          data.distributeNumber;
        this.subTitle =
          '对账成功' +
          data.successNumber +
          '条,' +
          '对账失败' +
          data.failureNumber +
          '条,' +
          '未对账' +
          data.unCheckNumber +
          '条。';
      }
    );
  }

  /**
   * 根据id 获取受托方的名字
   */
  private outName(id) {
    let outName = '';
    this.outsNames.map((v) => {
      if (v.id === id) {
        outName = v.outsName;
      }
    });
    return outName;
  }
  private commit() {
    const form: any = this.$refs.form;
    form.validate((valid) => {
      if (!valid) {
        return;
      }
      const param = {
        batchNumber: this.batchNumber,
        outId: this.principalId,
      };
      this.outsourceReconciliationService.generatingBill(param).subscribe(
        (data) => {
          this.$message.success('生成账单成功');
          this.close();
          this.refreshList();
          this.title = '';
          this.subTitle = '';
          window.open(data.url);
        }
      );
    });
  }
  private refresh() {
    const form: any = this.$refs.form;
    form.resetFields();
  }
  private caseStatistics() {
    if (!this.creatBillModel.number || !this.creatBillModel.customer) {
      return;
    }
    const query = {
      batchNumber: this.creatBillModel.number,
      outId: this.creatBillModel.customer,
    };
    this.outsourceReconciliationService.caseStatistics(query).subscribe();
  }
}
</script>

<style lang="less" scoped>
</style>
