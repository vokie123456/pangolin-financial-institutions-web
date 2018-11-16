<template>
  <section class="component add-company">
    <el-form :model="companyModel"  label-width="120px" class="addCompany" :rules="rules" ref="ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="佣金比例名称" prop="strategyName">
            <el-input type="input" v-model="companyModel.strategyName" :disabled="state === 'edit' || state === 'check'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" prop="commonState">
            <el-select v-model="companyModel.commonState" placeholder="请选择" clearable :disabled="state === 'edit' || state === 'check'">
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="佣金类型" prop="commissionStrategyType">
            <el-select v-model="companyModel.commissionStrategyType" placeholder="请选择" :disabled="state === 'edit' || state === 'check'">
              <el-option v-for="{index,name,code} in $dict.getDictData('CommissionStrategyType')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="产品类型">-->
            <!--<el-select v-model="Distinguish" placeholder="请选择">-->
              <!--<el-option v-for="(item, index) in productTypeList" :key="index" :label="item.label" :value="item.value"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row>
        <el-col :span="24">
          <el-form-item label="佣金范围">
            <!--数据列区域-->
              <data-box :data="companyModel.list" :hiddenIndex="true" :model="companyModel" ref="dynamicValidateForm2" >
                    <template slot="columns">
                        <el-table-column prop="type" label="产品类型" v-if="Distinguish === 'yes'">
                          <template slot-scope="scope">
                            <span class="middle-select">
                              <el-select v-model="scope.row.productType" placeholder="请选择产品类型" :disabled="state === 'check'">
                                <el-option v-for="(item, index) in commissionType" :key="index" :label="item" :value="item"></el-option>
                              </el-select>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="逾期阶段起" :min-width="$helper.getColumnWidth(6)">
                            <template slot-scope="scope">
                                <div class="list-item">
                                  <div>M</div>
                                  <el-form-item
                                    :prop="'list.' + scope.$index + '.overduePeriodStart'"
                                    :rules="{required: true, message: '请输入逾期阶段起', trigger: 'blur'}">
                                    <el-input type="input" v-model="scope.row.overduePeriodStart" :disabled="state === 'check'"></el-input>
                                    </el-form-item>
                                  <div>阶段</div>
                                  <!--<el-input type="input" v-model="scope.row.overduePeriodStart"></el-input>-->
                                  <!--阶段-->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="逾期阶段止" :min-width="$helper.getColumnWidth(6)">
                            <template slot-scope="scope">
                                <div class="list-item">
                                  <div>M</div>
                                  <el-form-item
                                  :prop="'list.' + scope.$index + '.overduePeriodEnd'"
                                  :rules="{required: true, message: '请输入逾期阶段止', trigger: 'blur'}">
                                  <el-input type="input" v-model="scope.row.overduePeriodEnd" :disabled="state === 'check'"></el-input>
                                </el-form-item>
                                  <div>阶段</div>
                                  <!--<el-input type="input" v-model="scope.row.overduePeriodEnd"></el-input>-->
                                  <!--阶段-->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="recovery" label="回收率" :min-width="$helper.getColumnWidth(10)">
                            <template slot-scope="scope">
                                <div>
                                    <span>
                                      <span v-for="(item, index) in scope.row.rangeDetail.scope" :key="index">
                                        <span v-if="item.range === '>'">大于</span>
                                        <span v-if="item.range === '='">等于</span>
                                        <span v-if="item.range === '<'">小于</span>
                                        <span v-if="item.amount">{{item.amount}}%</span>
                                      </span>
                                        <template v-if="companyModel.commissionStrategyType === 'RETURN_RATE'">佣金比例{{scope.row.rangeDetail.proportion}}%</template>
                                        <template v-else>佣金{{scope.row.rangeDetail.proportion}}</template>
                                    </span>
                                    <el-button type="text" @click="setRule(scope.row, scope.$index)" :disabled="state === 'check'">设置</el-button>
                                    <el-button type="text" @click="deleteRule(scope.row, scope.$index)" :disabled="state === 'check'">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operateTime" label="操作" :min-width="$helper.getColumnWidth(4)">
                            <template slot-scope="scope">
                              <el-button type="text" @click="addOverdueStage" :disabled="state === 'check'">增加逾期阶段</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </data-box>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="close">取消</el-button>
        <el-button @click="commitOutDialog">确定</el-button>
      </el-form-item>
    </el-form>
    <!--弹框-->
    <el-dialog
      width="30%"
      title="回收率"
      :visible.sync="dialog.addSettle"
      append-to-body>
      <span id="innerDialog">
        <el-form :model="rangeDetail" ref="dynamicValidateForm">
          <div v-for="(item, index) in rangeDetail.scope" :key="index" class="container">
            <el-form-item :prop="'scope.' + index + '.range'" :rules="{required: true, message: '请选择范围', trigger: 'change'}">
              <el-select v-model="item.range" placeholder="请选择">
                  <el-option v-for="(item, index) in rangeOption" :key="index" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :prop="'scope.' + index + '.amount'" :rules="{required: true, message: '请输入指定值', trigger: 'blur'}">
                <el-input type="input" v-model="item.amount" @keyup.native="proving2(index)"></el-input>
            </el-form-item>
            <el-button @click="addRange()" type="text">增加</el-button>
            <el-button @click="deleteRange(index)" type="text" v-if="rangeDetail.scope.length > 1">删除</el-button>
        </div>
          <el-form-item prop="proportion" :rules="{required: true, message: companyModel.commissionStrategyType === 'RETURN_RATE'?'请输入佣金比例':'请输入佣金金额', trigger: 'blur'}">
            <el-input type="input" v-model="rangeDetail.proportion"
                      @keyup.native="proving1"
                      :placeholder="companyModel.commissionStrategyType === 'RETURN_RATE'?'请输入佣金比例':'请输入佣金金额'"></el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
           <el-button @click="cancelInnerDialog">取消</el-button>
           <el-button @click="commitInnerDialog">确定</el-button>
        </div>
      </span>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CompanyService } from '~/services/management-service/company.service';
import { Emit, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import DataBox from "~/components/common/data-box.vue";
import { OutsourceCommissionService } from "~/services/management-service/outsource-commission.service";

@Component({
  components: {
      DataBox
  },
})
export default class AddSettle extends Vue {
  @Dependencies(CompanyService)
  private companyService: CompanyService;
  @Dependencies(OutsourceCommissionService) private OutsourceCommissionService: OutsourceCommissionService;

  @Prop()
  private state: any = ''
  private commissionExpress: any = ''
  private productTypeList: any = [{'label': '区分产品类型', 'value': 'yes'},{'label': '不区分产品类型', 'value': 'no'}]
  private Distinguish: any = 'yes'
  private companyModel: any = {
    strategyName: '',
    commonState: '',
    commissionStrategyType: '',
    list: [
      {rangeDetail:{
          proportion: '',
          scope: [{}]
        }
      }
    ]
  }; //列表数据
  // 选中的列表数据
  private chosedData: any = {}
  private temQuery: any = {}
  private commissionStrategyType: any = 'NUMBER'
  //设置弹框
  private dialog:any= {
      addSettle: false
  }
  //佣金类型
  private commissionType: any[] = []
    // 范围
  private rangeOption: any[] = [
    {name: '大于',  value: '>'},
    {name: '小于',  value: '<'},
    {name: '等于',  value: '='},
  ]
  // 模态框
  private rangeDetail: any = {
      scope: [{range: '', amount:''}],
      proportion: ''
  }
  // 选中数据的索引
  private chosedIndex: any = ''
  private rules: any = {
    strategyName: [
      { required: true, message: '该项不能为空', trigger: 'blur' },
    ],
    commonState: [
      { required: true, message: '该项不能为空', trigger: 'change' },
    ],
    commissionStrategyType: [
      { required: true, message: '该项不能为空', trigger: 'change' },
    ],
    productType: [
      { required: true, message: '该项不能为空', trigger: 'change' },
    ],
  };

  @Emit('refreshList')
  private refreshList() {}
  @Emit('close')
  private close() {
  }

  // 新增初始化
  private initModalState() {
    this.initResetForm()
    this.companyModel = {
      strategyName: '',
      commonState: '',
      commissionStrategyType: '',
      list: [
        {rangeDetail:{
            proportion: '',
            scope: [{}]
          }
        }
      ]
    }; //列表数据
  }
  private  resetForm(formName) {
    this.$nextTick(() => {
      const form: any = this.$refs[formName]
      form.resetFields();
    })
  }
  // 初始化表单校验
  private  initResetForm() {
    this.resetForm('ruleForm')
  }

  private proving1(){
    this.rangeDetail.proportion=this.rangeDetail.proportion.replace(/[^\.\d]/g,'');
  }
  private proving2(index){
    this.rangeDetail.scope[index].amount = this.rangeDetail.scope[index].amount.replace(/[^\.\d]/g,'');
  }
  // 解析commissionExpress
  private  parseString (str: any) {
    if (!str) {
      return [{}]
    }
    let tempArray = []
    str.split('||').map(value => {
      if (value) {
        tempArray = tempArray.concat(this.stringToObj(value))
      }
    })
    return tempArray
  }
  private  stringToObj (str: any) {
    const tempObj: any = []
    const tempArray = str.split('&&')
    tempArray.map(value => {
      if (value) {
        tempObj.push({
            'range': value.substring(4, 5),
            'amount': value.substring(5, value.length - 1)
          })
      }
    })
    return tempObj
  }
  //  end

  private refresh() {
    const form: any = this.$refs.form;
    form.resetFields();
  }

 private setRule(row, index) {
   this.dialog.addSettle = true
   this.$nextTick(() => {
     this.resetForm('dynamicValidateForm')
     this.chosedIndex = index
     const temp = row.rangeDetail? row.rangeDetail : {
       scope: [{range: '', amount:''}],
       proportion: ''
     }
     console.log(temp, row)
     this.rangeDetail = JSON.parse(JSON.stringify(temp))
     this.chosedData = row
   })
 }
  // 取消并关闭二级弹框
  private cancelInnerDialog(){
    this.dialog.addSettle = false
  }
  // 提交并关闭二级弹框
  private commitInnerDialog() {
    const form: any = this.$refs['dynamicValidateForm'];
    form.validate((valid) => {
      if (valid) {
        let temp = ''
        this.rangeDetail.scope.map((val, index) => {
          temp = temp + 'rate' + val.range + val.amount + '%&&'
        })
        temp = temp.slice(0, this.commissionExpress.length - 2);
        this.$set(this.companyModel.list[this.chosedIndex], 'rangeDetail', JSON.parse(JSON.stringify(this.rangeDetail)))
        this.$set(this.companyModel.list[this.chosedIndex], 'commissionExpress', temp)
        this.cancelInnerDialog();
      } else {
        console.log('error submit!!');
        return false;
      }
    })
  }

  // 提交并关闭一级级弹框
  private commitOutDialog(){
    if (this.state === 'check') {
      this.close()
      return
    }
    const form: any = this.$refs['ruleForm']
    form.validate((valid) => {
      if (valid) {
        const commissionStrategySaveRequestList = this.companyModel.list.map(val => {
          return {
            id: val.id,
            strategyName: this.companyModel.strategyName,
            commonState: this.companyModel.commonState,
            commissionStrategyType: this.companyModel.commissionStrategyType,
            productType: val.productType,
            overduePeriodStart: val.overduePeriodStart,
            overduePeriodEnd: val.overduePeriodEnd,
            commissionAmount: this.companyModel.commissionStrategyType === 'NUMBER' ? val.rangeDetail.proportion : '',
            commissionRate: this.companyModel.commissionStrategyType === 'RETURN_RATE' ? val.rangeDetail.proportion : '',
            commissionExpress: val.commissionExpress
          }
        })
        console.log({commissionStrategySaveRequestList})
        if (this.state === 'add') {
          this.OutsourceCommissionService.insertCommissionStrategy({commissionStrategySaveRequestList}).subscribe(
            (data) => {
              this.$message.success(this.chosedData.id?'编辑成功': '新增成功!');
              this.cancelInnerDialog()
              this.refreshList();
              this.close();
            }
          );
        } else if (this.state === 'edit') {
          this.OutsourceCommissionService.editCommissionStrategy({commissionStrategySaveRequestList}).subscribe(
            (data) => {
              this.$message.success(this.chosedData.id?'编辑成功': '新增成功!');
              this.cancelInnerDialog()
              this.refreshList();
              this.close();
            }
          );
        }
      }
      })
  }
  // 增加回收率范围
  private addRange (){
    this.rangeDetail.scope.push({range: '', amount:''})
  }
  // 增加回收率范围
  private deleteRange (index: number){
    this.rangeDetail.scope.splice(index, 1)
  }

 private addOverdueStage(){
   this.companyModel.list.push({
     rangeDetail:{
       proportion: '',
       scope: [{}]
     }
   })
 }
 // 删除佣金策略
 private deleteRule(row, index){
   this.$confirm('是否删除该数据?', '提示', {
     confirmButtonText: '确定',
     cancelButtonText: '取消',
     type: 'warning'
   }).then(() => {
     if (row.id) {
       const query = {
         id: row.id
       }
       this.OutsourceCommissionService.delCommissionStrategy(query).subscribe(
         data => {
           this.$message.success('删除成功')
           this.delCommissionStrategy(this.temQuery)
         }
       );
     } else {
       this.companyModel.list.splice(index, 1)
     }
   }).catch(() => {
   });




 }

  // 委外佣金策略详情
  private delCommissionStrategy(query) {
    this.initResetForm()
    this.temQuery = query
    this.OutsourceCommissionService.getCommissionStrategyDetail(query).subscribe(
      data => {
        const Data = data.map(val => {
          val.rangeDetail = {}
          val.rangeDetail.scope = this.parseString(val.commissionExpress)
          val.rangeDetail.proportion = val.commissionStrategyType === 'NUMBER'? val.commissionAmount : val.commissionRate
          return val
        })
        this.companyModel = {...Data[0]}
        this.$set(this.companyModel, 'list', [...Data])
      }
    );
  }

  private mounted() {
    this.selectProductList();
  }

  private selectProductList() {
    // 委外产品下拉列表
    this.OutsourceCommissionService.selectProductList().subscribe(
      data => {
        this.commissionType = data
      }
    );
  }

  private commit() {
    const form: any = this.$refs.form;
    form.validate((valid) => {
      if (!valid) {
        return;
      }
    });
  }
}
</script>

<style lang="less" scoped>
  .middle-select{
    /deep/ .el-input{
      width: 80% !important;
      margin: 0 auto;
    }
  }
.cell{
    .el-input{
        width: 50% !important;
    }
}
.list-item{
  display: flex;
  .el-form-item{
    width: 100px;
    /deep/.el-input__inner{
      padding: 0;
      text-align: center;
    }
  }
}
#innerDialog{
  .el-select {
    height: 26px;
    display: inline-block;
    position: relative;
  }
  /deep/ .el-input__icon{
    line-height: 24px;
  }
  /deep/ .el-input .el-input__inner{
    line-height: 26px;
    height: 26px;
    font-size: 12px;
  }
  /deep/ button{
    line-height: 26px;
    height: 26px;
    font-size: 12px;
    padding: 0 5px;
  }
    .container{
        display: flex;
      align-items: center;
      &>.el-form-item:first-child{
        width: 30%;
        margin-right: 10px;
      }
      button{
        margin-bottom: 20px;
      }
      .el-select+.el-input{
        margin-left: 10px;
      }
    }
  .footer{
    display: flex;
    justify-content: center;
    padding: 30px 0 0;
    button{
      line-height: 26px;
      padding: 0 20px;
      min-width: 100px;
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>
