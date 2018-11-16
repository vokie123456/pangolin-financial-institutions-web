<template>
  <section class="component add-company">
    <el-form :rules="companyRules" :model="companyModel" ref="form" label-width="90px" class="addCompany" :center="true">
      <el-row>
        <el-col :span="12" :offset="5" >
          <el-form-item label="策略名称" prop="strategyName">
            <el-input type="input" v-model="companyModel.strategyName" :disabled="state === 'check'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="5">
          <el-form-item label="受托方" prop="outsourceId">
            <el-select v-model="companyModel.outsourceId" placeholder="请选择" clearable :disabled="state === 'check'">
              <el-option v-for="item in outsNames" :key="item.id" :label="item.outsName" :value="item.id" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="5" >
          <el-form-item label="佣金策略" prop="commissionName">
            <el-select v-model="companyModel['commissionName']" placeholder="请选择" clearable :disabled="state === 'check'">
              <el-option v-for="item in commissionName" :key="item" :label="item" :value="item" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="5" >
          <el-form-item label="状态" prop="commonState">
            <el-select v-model="companyModel.commonState" placeholder="请选择" clearable :disabled="state === 'check'">
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="close">取消</el-button>
        <el-button @click="commit">确定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CompanyService } from '~/services/management-service/company.service';
import { Emit, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { OutsourceSettleService } from "~/services/domain-service/outsource-settle-manage.service";
import { OutsourceCommissionService } from "~/services/management-service/outsource-commission.service";
import { OutsourceService } from "~/services/management-service/outsource-settle.service";

@Component({
  components: {},
})
export default class AddSettle extends Vue {
  @Dependencies(CompanyService)
  private companyService: CompanyService;
  @Dependencies(OutsourceSettleService)
  private OutsourceSettleService: OutsourceSettleService;
  @Dependencies(OutsourceService)
  private OutsourceService: OutsourceService;
  @Dependencies(OutsourceCommissionService) private OutsourceCommissionService: OutsourceCommissionService;
  @Prop()
  private state: any;
  private outsNames: any[] = [];//受托方列表
  private commissionName: any[] = []; //佣金策略列表
  // 公司数据实体
  private companyModel: any = {
    outsourceId: '',
    strategyName: '',
    commonState: '',
    commissionName: ''
  };
  private companyRules: any = {
    outsourceId: [
      { required: true, message: '该项不能为空', trigger: 'blur' },
    ],
    strategyName: [
      { required: true, message: '该项不能为空', trigger: 'blur' },
    ],
    commonState: [
      { required: true, message: '该项不能为空', trigger: 'blur' },
    ],
    commissionName: [
    { required: true, message: '该项不能为空', trigger: 'blur' },
    ],
    strategyId: [
      { required: true, message: '该项不能为空', trigger: 'change' },
    ],
  };

  @Emit('refreshList')
  public refreshList() {}

  public close() {
    this.companyModel = {}
    this.refresh()
    this.$emit('close');
  }

  private mounted() {
    this.getOutName();
    this.getCommissionName()
  }

  private refresh() {
    const form: any = this.$refs.form;
    form.resetFields();
  }

  private commit() {
    if (this.state === 'check') {
      this.close();
    } else if(this.state === 'add') {
      const form: any = this.$refs.form;
      form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.OutsourceService.addSettlementStrategy(this.companyModel).subscribe(
          (data) => {
            this.$message.success('新增成功!');
            this.refreshList();
            this.refresh()
            this.close();
          }
        );
      });
    } else if (this.state === 'edit') {
      const form: any = this.$refs.form;
      form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.OutsourceService.updateSettlementStrategy(this.companyModel).subscribe(
          (data) => {
            this.$message.success('修改成功!');
            this.refreshList();
            this.refresh()
            this.close();
          }
        );
      });
    }

  }

  private getOutName(){
    this.OutsourceSettleService.
    getOutSourceList()
      .subscribe( data => {
          this.outsNames = data;
        }
      )
  }
// 获取佣金列表
  private getCommissionName(){
    this.OutsourceCommissionService.
    selectCommissionStrategyList()
      .subscribe( data => {
        this.commissionName = data
        }
      )
  }
  // 根据id获取策略详情
  private getSettlementStrategyById(id) {
    return new Promise((resole, reject) => {
      const params = {
        'id' : id
      }
      this.OutsourceService.getSettlementStrategyById(params).subscribe(
        (data) => {
          this.companyModel = {...data}
          this.$set(this.companyModel, 'commissionName', data.commissionStrategies[0].strategyName)
          resole()
        },
        ({ msg }) => {
          reject()
        },
      );
    })
  }


}
</script>

<style lang="less" scoped>
</style>
