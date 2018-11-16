<template>
  <!-- 新增模板-选择映射字段 -->
  <section class="component relation-name">
    <div class="model">
      <div>
        <div class="circle"></div>
        <span class="circle-title">逾期信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in caseInfoList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
      <div style="padding-top:10px">
        <div class="circle"></div>
        <span class="circle-title">合同信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in contractList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
      <div style="padding-top:10px">
        <div class="circle"></div>
        <span class="circle-title">客户信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in personalList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
      <div style="padding-top:10px">
        <div class="circle"></div>
        <span class="circle-title">客户联系人信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in personalContactList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
      <div style="padding-top:10px">
        <div class="circle"></div>
        <span class="circle-title">客户工作信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in personalJobList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
      <div style="padding-top:10px">
        <div class="circle"></div>
        <span class="circle-title">客户收入信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in personalIncomeList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
      <div style="padding-top:10px">
        <div class="circle"></div>
        <span class="circle-title">产品信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in productList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
      <div style="padding-top:10px">
        <div class="circle"></div>
        <span class="circle-title">产品系列信息</span>
      </div>
      <div class="select">
        <el-radio-group v-model="selectRelate">
          <el-radio class="radio-item" v-for="(item,index) in productSeriesList" :key="index" :label="item" :disabled="!!disStr(item)" v-bind:class="{requiredStr:item.flag===0}">{{item.cellName}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div style="text-align:center">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="saveClick">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Getter, Action, namespace } from 'vuex-class';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { ImportExcelConfigService } from '~/services/dataimp-service/import-excel-config.service';

@Component({})
export default class RelationName extends Vue {
  @Prop()
  private rowData: any;
  @Prop()
  private disabledStr: any;
  @Dependencies(ImportExcelConfigService)
  private importExcelConfigService: ImportExcelConfigService;

  private caseInfoList: any[] = [];
  private contractList: any[] = [];
  private personalContactList: any[] = [];
  private personalJobList: any[] = [];
  private personalList: any[] = [];
  private productList: any[] = [];
  private productSeriesList: any[] = [];
  private personalIncomeList: any[] = [];

  private selectRelate: any = {};
  @Emit('close')
  public close() { }
  @Emit('save')
  public save(relate, row, index) { }
  @Watch('rowData', { immediate: true })
  private rowDataChange(value) {
    this.selectRelate = value.row.relationName;
  }
  private disStr(v) {
    return this.disabledStr.find((val) => val === v.cellName);
  }
  private mounted() {
    this.importExcelConfigService.getExcelList().subscribe((data) => {
      this.caseInfoList = data.caseInfoList;
      this.contractList = data.contractList;
      this.personalContactList = data.personalContactList;
      this.personalJobList = data.personalJobList;
      this.personalList = data.personalList;
      this.productSeriesList = data.productSeriesList;
      this.productList = data.productList;
      this.personalIncomeList = data.personalIncomeList;
    });
  }
  private cancel() {
    this.selectRelate = '';
    this.close();
  }
  private saveClick() {
    this.save(this.selectRelate, this.rowData.row, this.rowData.$index);
    this.selectRelate = '';
    this.close();
  }
}
</script>

<style scoped lang="less">
.model {
  margin-bottom: 20px;
  overflow: auto;
}

.radio-item {
  width: 20%;
}

.select {
  border: 1px solid #eff2f7;
  margin-top: 10px;
  max-height: 650px;
  padding: 10px;
  text-align: left;
  label:first-child {
    margin-left: 30px;
  }
}

.requiredStr {
  color: red;
}

.circle {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-left: 15px;
  margin-right: 5px;
  background-color: #28313e;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  vertical-align: middle;
}

.circle-title {
  font-size: 14px;
  line-height: 13px;
  color: #28313e;
}
</style>
