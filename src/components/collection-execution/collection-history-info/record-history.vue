<template>
  <!-- 催收执行页-历史信息模块-录音历史 -->
  <section class="component record-history">
    <!-- 搜索区域 -->
    <data-form :model="searchModel" ref="form" @handleResetForm="handleResetForm" @onSearch="refreshData">
      <template slot="default-input">
        <el-form-item label="通话时间:" prop="recordTime">
          <el-date-picker type="daterange" :editable="false" v-model="searchModel.recordTime" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="通话时长:" prop="callDuration">
          <number-range v-model="searchModel.callDuration" :isInteger="true"></number-range>
        </el-form-item>
        <el-form-item label="客户姓名:" prop="personalName">
          <el-input v-model="searchModel.personalName" placeholder="客户姓名" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="targetName">
          <el-input v-model="searchModel.targetName" placeholder="联系人" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="targetPhone">
          <el-input v-model="searchModel.targetPhone" placeholder="联系电话" clearable>
          </el-input>
        </el-form-item>
      </template>
    </data-form>
    <!-- 数据列区域 -->
    <data-box @onPageChange="refreshData" :data="dataSet" :page="pageService" :height="200">
      <template slot="columns">
        <el-table-column prop="liushui" label="行动流水" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="recordStartTime" label="通话时间" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="callType" label="呼叫类型" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.callType, 'CallType')">
        </el-table-column>
        <el-table-column prop="targetPhone" label="联系电话" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="callDuration" label="通话时长(秒)" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
        <el-table-column prop="phoneStatus" label="电话状态" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dictConvert(row.phoneStatus, 'PhoneStatus')">
        </el-table-column>
        <el-table-column prop="remark" label="备注" :min-width="$helper.getColumnWidth(10)">
        </el-table-column>
        <el-table-column label="录音" :min-width="$helper.getColumnWidth(6)">
          <template slot-scope="scope">
            <el-button type="text">试听</el-button>
            <el-button type="text">下载</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Prop } from "vue-property-decorator";
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import DataBox from '~/components/common/data-box.vue';
import DataForm from '~/components/common/data-form.vue';
import { PageService } from '~/utils/page.service';
import { SortService } from '~/utils/sort.service';
import NumberRange from '~/components/common/number-range.vue';

@Component({
  components: {
    DataBox,
    DataForm,
    NumberRange,
  },
})
export default class RecordHistory extends Vue {
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(SortService)
  private sortService: SortService;
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;

  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  private searchModel: any = {
    recordTime: [],
    callDuration: {
      max: '',
      min: '',
    },
    personalName: '',
    targetName: '',
    targetPhone: '',
  };
  private dataSet: any[] = [];
  
  /**
   * 范围组件数据重置
   */
  private handleResetForm() {
    this.searchModel.callDuration = {min: '', max: ''}
  }

  //获取录音历史
  private refreshData() {
    this.searchModel.caseId = this.caseId;
    this.caseOperatorPageService
      .caseTelRecord(this.searchModel, this.pageService, this.sortService)
      .subscribe((data) => {
        this.dataSet = data;
      });
  }

  private activated(){
     this.refreshData()
  }
}
</script>

<style lang="less">
.component.record-history {
  .component.number-range {
    .el-input {
      width: 60px !important;
      .el-input--inner {
        width: 40px !important;
      }
    }
  }
}
</style>
