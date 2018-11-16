<template>
  <section class="component modify-company">
    <data-form :model="costModel" @onSearch="refresh" :page="pageService">
      <template slot="default-input">
        <el-form-item label="费用类别" prop="costType">
          <el-select v-model="costModel.costType" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CostType')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用项" prop="costEvent">
          <el-select v-model="costModel.costEvent" placeholder="请选择" clearable>
            <el-option v-for="{index,name,code} in $dict.getDictData('CostEvent')" :key="index" :label="name" :value="code"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot="default-button">
        <el-button @click="dialog.addCost = true">新增</el-button>
      </template>
    </data-form>
    <data-box @onPageChange="refresh" :data="queryCompanyDataSet" :page="pageService">
      <template slot="columns">
        <el-table-column prop="costType" label="费用类别" :formatter="(row) => $filter.dictConvert(row.costType,'CostType')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="costEvent" label="费用项" :formatter="(row) => $filter.dictConvert(row.costEvent,'CostEvent')" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="momey" label="费用金额(元)" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="payTime" label="缴费时间" :formatter="(row) => $filter.dateFormat(row.payTime)" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column prop="payEvi" label="付款凭证" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <el-table-column prop="payEvi" label="付款凭证" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<p>{{scope.row.fileList}}</p>-->
            <a :href="item.url" target="_blank" v-for="(item, index) in scope.row.fileList" :key="index">
              <el-button type="text">{{item.originalName}}</el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" :min-width="$helper.getColumnWidth(4)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button @click="editCost(scope.row)" type="text">编辑</el-button>
            <el-button @click="delCost(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
    <el-dialog title="新增收费记录" append-to-body :center="true" :visible.sync="dialog.addCost" :show-close="false">
      <add-cost ref="add-cost" :costMel="costMel" @close="dialog.addCost = false" @refreshList="refresh"></add-cost>
    </el-dialog>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { PageService } from "~/utils/page.service";
import DataBox from "~/components/common/data-box.vue";
import DataForm from "~/components/common/data-form.vue";
import addCost from "~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/add-cost.vue";

import { FileUploadService } from "~/services/file-service/file-upload.service";
import { constants } from "zlib";
import { Emit, Prop, Watch } from "vue-property-decorator";
import { watchFile } from "fs";

@Component({
  components: {
    DataBox,
    DataForm,
    addCost
  }
})
export default class ModifyLawsuit extends Vue {
  @Dependencies(OutsourceLawsuitService)
  private outsourceLawsuitService: OutsourceLawsuitService;
  @Dependencies(FileUploadService)
  private FileUpload: FileUploadService;
  @Dependencies(PageService)
  private pageService: PageService;

  @Prop() private lawsuitObj: any;

  private costModel: any = {
    costEvent: "",
    costType: "",
    assistId: "",
  };
  private costMel: any = {
    assistId:'',
  }
  private dialog: any = {
    addCost: false
  };
  private queryCompanyDataSet = [{ 'payEvi': '', 'fileList': [{}] }];
  /**
   * 页面激活
   */
  private mounted() {
    this.costModel.assistId = this.lawsuitObj.id;
    this.costMel.assistId = this.lawsuitObj.id;
    console.log('id +++++ ',this.lawsuitObj.id);
    this.refresh()
  }

  @Watch('lawsuitObj')
  private onLawsuitObjChange(){
    this.costModel.assistId = this.lawsuitObj.id;
    this.costMel.assistId = this.lawsuitObj.id;
    console.log('id +++++ ',this.costModel.assistId);
    this.refresh()
  }

  /**
   * 查询
   */
  private refresh() {
    console.log('costModel =====> ',this.costModel.assistId);
    this.outsourceLawsuitService.getCostRecord(this.costModel, this.pageService)
      .subscribe(data => {
        this.queryCompanyDataSet = data
        this.queryCompanyDataSet.map(val => {
          this.$set(val, 'fileList', [])
          val['payEvi'].split(',').map(value => {
            if (value) {
              this.FileUpload.getUploadFile(value).subscribe(data => {
                const temp = { ...data }
                temp.name = data.originalName
                temp.response = {}
                temp.response.id = data.id
                val['fileList'].push(temp)
              })
            }
          })
        })
      });
  }
  private editCost(val) {
    this.dialog.addCost = true
    this.$nextTick(() => {
      const addCost: any = this.$refs['add-cost']
      addCost.setForm(val)
    })
  }
  private delCost(val) {
    console.log('sddf', val)
    this.outsourceLawsuitService.deleteCostRecord({ id: val.id }).subscribe(
      data => {
        this.$message.success("删除成功!");
        this.refresh()
      })
  }
}
</script>
