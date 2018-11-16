<template>
  <!--公司管理-->
  <section class="page company-manage">
    <data-form :model="queryModel" @onSearch="refreshData" :page="pageService">
      <template slot="default-input">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="queryModel.companyName"></el-input>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="companyObj = {};dialog.modifyCompany = true;">新增公司</el-button>
      </template>
    </data-form>
    <data-box @onPageChange="refreshData" :data="queryCompanyDataSet" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(1)">
          <template slot-scope="scope">
            <el-button @click="dialog.modifyCompany = true, companyObj = scope.row" type="text">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="公司名称" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="companyStatus" label="状态" :min-width="$helper.getColumnWidth(2)" :formatter="(row) => $filter.dictConvert(row.companyStatus,'CommonState')">
        </el-table-column>
        <el-table-column prop="companyAddress" label="公司地址" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="companyPhone" label="公司电话" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operator" label="操作人" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" :formatter="(row) => $filter.dateTimeFormat(row.createTime)" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>
   <!--新增/修改公司-->
    <el-dialog :title="companyObj.id?'修改公司':'新增公司'" :center="true" width="450px" @open="$nextTick(()=>$refs['modify-company'].update(companyObj))" @close="$refs['modify-company'].reset()" :visible.sync="dialog.modifyCompany">
      <modify-company ref="modify-company" @close="dialog.modifyCompany = false;"  @refreshList="refreshData"></modify-company>
    </el-dialog>
  
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { State, Getter } from 'vuex-class';
import { CompanyService } from '~/services/management-service/company.service';
import { PageService } from '~/utils/page.service';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import AddCompany from '~/components/system-manage/company-manage/add-company.vue';
import ModifyCompany from '~/components/system-manage/company-manage/modify-company.vue';

// @Auth(12)
@Layout('workspace')
@Component({
  components: {
    ModifyCompany,
    DataForm,
    DataBox,
  },
})
export default class CompanyManage extends Vue {
  @Dependencies(CompanyService)
  private companyService: CompanyService;
  @Dependencies(PageService)
  private pageService: PageService;

  private dialog: any = {
    modifyCompany: false,
  };
  // form 查询表单参数
  private queryModel: any = {
    companyName: '',
  };
  private companyObj: any = {};
  private queryCompanyDataSet = null;

  /**
   * 查询公司
   */
  public refreshData() {
    this.companyService.queryAllCompanyPage(this.queryModel,this.pageService).subscribe((data) => {
      this.queryCompanyDataSet = data;
    });
  }

  private mounted() {
    this.refreshData();
  }
}
</script>

<style lang="less">
</style>
