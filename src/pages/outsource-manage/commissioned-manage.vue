<template>
  <!--受托方管理-->
  <section class="page system-parameter-manage">
    <data-form :model="queryModel" @onSearch="refreshData" autoSearch @handleResetForm="follFeedback">
      <!--输入区域-->
      <template slot="default-input">
        <el-form-item label="受托方名称" prop="outsName">
          <el-input v-model="queryModel.outsName"></el-input>
        </el-form-item>
        <el-form-item label="机构类型" prop="outSourceType">
          <el-select v-model="queryModel.outSourceType" placeholder="请选择" clearable >
            <el-option v-for="{index,name,code} in $dict.getDictData('OutSourceType')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织机构" prop="deptId">
          <el-select v-model="queryModel.deptId" placeholder="请选择" clearable>
            <el-option v-for="{index,deptName,id} in departmentList" :key="index" :label="deptName" :value="id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="outsourceStatus">
          <el-select v-model="queryModel.outsourceStatus" placeholder="请选择" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="provinceCode">
          <el-col :span="12">
            <el-select size="small" v-model="queryModel.provinceCode" class='address' @change="getCitys">
              <el-option v-for="item in proinviceList" :label="item.label" :value="item.value" :key="item.value" ref="proinviceList"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select size="small" v-model="queryModel.areaCodeIds" class='address'>
              <el-option v-for="item in cityList" :label="item.label" :value="item.value" :key="item.value" ref="cityList"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </template>
    </data-form>

    <data-box @onPageChange="refreshData" :data="dataList" :page="pageService">
      <template slot="columns">
        <!--数据列区域-->
          <el-table-column label="操作" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope)" >查看</el-button>
            <el-button type="text" @click="editDetail(scope)" >编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="outsName" label="受托方名称" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="outSourceType" label="机构类型" :formatter="(row) => $filter.dictConvert(row.outSourceType,'OutSourceType')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="deptName" label="组织结构" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operatorRealName" label="创建人" :min-width="$helper.getColumnWidth(2)">
        </el-table-column>
        <el-table-column prop="modifyRealName" label="编辑人" :min-width="$helper.getColumnWidth(2)">
        </el-table-column>
        <el-table-column prop="modifyTime" label="编辑时间" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{scope.row.modifyTime | dateTimeFormat}}</span>
          </template>
        </el-table-column>
      </template>
    </data-box>

    <el-dialog  title="编辑受托方" :visible.sync="dialog.commissionedDialog"  :close-on-click-modal="false" :close-on-press-escape="false" :center="true" >
      <commissioned-dialog ref="refresh" @close="dialog.commissionedDialog=false" @refreshData="refreshData" :caseRow.sync="caseRow" ></commissioned-dialog>
    </el-dialog>
     <el-dialog  title="查看受托方" :visible.sync="dialog.commissioned"  :close-on-press-escape="false" :center="true" >
      <commissioned ref="refresh" @close="dialog.commissioned=false"  :caseRow.sync="caseRow" ></commissioned>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Auth, Layout, Dependencies } from "~/core/decorator";
import DataForm from "~/components/common/data-form.vue";
import DataBox from "~/components/common/data-box.vue";
import { State, Getter } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { SortService } from '~/utils/sort.service';

import { OutsourceCommissionedService } from "~/services/domain-service/outsource-commissioned-manage.service";
import CommissionedDialog from "~/components/outsource-manage/commissioned-manage/commissioned-dialog.vue";
import Commissioned from "~/components/outsource-manage/commissioned-manage/commissioned.vue";
import { CityService } from "~/utils/city.service";
import { DepartmentService } from "~/services/management-service/department.service";

// @Auth(1001)
@Layout("workspace")
@Component({
  components: {
    DataForm,
    DataBox,
    CommissionedDialog,
    Commissioned
  }
})
export default class CommissionedManagesIndex extends Vue {
  @Dependencies(OutsourceCommissionedService)
  private outsourceCommissionedService: OutsourceCommissionedService;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService) 
  private sortService: SortService;
  @Dependencies(DepartmentService)
  private departmentService: DepartmentService;

  private proinviceList: any[] = []; // 省
  private cityList: any[] = []; //市
  private departmentList: any[] = []; //组织机构
  private caseRow: any = {}; //查看或编辑某一条row

  private queryModel: any = {
    outsName:'',
    outSourceType:'',
    areaCodeIds:'',
    deptId:'',
    deptName:'',
    provinceCode:'',
    outsourceStatus:'',
  };

  private dataList: any[] = [];
  private dialog: any = {
    commissionedDialog: false,
    commissioned: false
  };
  private formData: any = {}; //弹框列表数据
  private refresh: any = {};

  private mounted() {
    this.getDepartments();
    this.refreshData();
    this.getProvinces();
  }
  //获取省数据
  private getProvinces(){
    this.proinviceList = CityService.getCityData({ level: 1 });
  }

  //获取市
  private getCitys(provinceId){
    this.cityList = this.$city.getCityData({ level: 1, id: provinceId }); // 城市列表
  }

  //获取组织机构
  private getDepartments(){
    this.departmentList = this.departmentService.querySubDepartment().subscribe(
      data => {
        console.log(data)
        this.departmentList = data;
      }
    );
  }

  private refreshData() {
    this.outsourceCommissionedService.searchCutsourceList(this.queryModel,this.pageService,this.sortService).subscribe(
      data => {
        this.dataList = data;

      }
    );
  }
  /**
   * 修改
   */
  private editDetail(scope){
      this.dialog.commissionedDialog = true;
      this.caseRow = {
        name: scope.row.outsName,
        organizationType: scope.row.outSourceType,
        status: scope.row.outsourceStatus,
        companyCode: scope.row.companyCode,
        deptName: scope.row.deptName,
        proinviceCode: scope.row.areaId,
        cityCode: scope.row.areaId,
        address: scope.row.outsAddress,
        linkMan: scope.row.outsContacts,
        linkPhone: scope.row.outsPhone,
        remark: scope.row.outsRemark,
        email: scope.row.email,
        areaId: scope.row.areaId,
        areaCodeIds: scope.row.areaCodeIds,
        id:scope.row.id,
      }
      // this.caseRow = scope.row;
  }

  /**
   * 查看
   */
  private checkDetail(scope){
      this.dialog.commissioned = true;
      this.caseRow = scope.row;
  }

  /**
   * 修改open事件 ，获取要修改的当前行数据
   */
  // private getFormData() {
  //   this.$nextTick(() => {
  //     this.refresh = this.$refs["refresh"];
  //     this.refresh.refresh(this.formData);
  //   });
  // }

  /**
   * 重置numberRange
   */
  private follFeedback() {
    this.queryModel.proinviceCode = '';
    this.queryModel.areaCodeIds = '';
  }
}
</script>

<style lang="less">

</style>
