<template>
  <!-- 催收执行页-通讯录模块-电话簿 -->
  <section class="component telephone-book">
    <!-- 按钮区域 -->
    <el-row type="flex" justify="space-between">
      <el-col :span="18" style="padding-left:10px;">
        <el-button type="primary" @click="stopSMSClick" plain>停催短信</el-button>
        <el-button type="primary" @click="stopTelClick" plain>停催电话</el-button>
        <el-button type="primary" @click="dialog.contact = true" plain>新增电话</el-button>
        <el-button type="primary" plain @click="dialog.telWater=true">电话流水</el-button>
      </el-col>
      <el-col :span="6" style="min-width:360px;">
        <div style="float:right;padding-left:10px;padding-right:10px;">
          <el-button>拨号</el-button>
          <el-button @click="addCaseTelRecord">总结</el-button>
        </div>
        <el-input v-model="phoneData.phone" placeholder="请输入电话号码" style="width:120px;float:right;"></el-input>
      </el-col>
    </el-row>
    <!-- 数据区域 -->
    <data-box :height="340" :data="dataSet" :selectionRow="selectionRow" @update:selectionRow="onSelectedRowChange">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getColumnWidth(7)">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="'停催到期时间: ' + $filter.dateTimeFormat(scope.row.pausePhoneDueDate)" :disabled="scope.row.pausePhone !== 'YES'">
              <div class="tip">
                <el-button type="text" :disabled="scope.row.pausePhone === 'YES'">拨号</el-button>
              </div>
            </el-tooltip>
            <el-tooltip effect="dark" :content="'停催到期时间: ' + $filter.dateTimeFormat(scope.row.pauseSmsDueDate)" :disabled="scope.row.pauseSms !== 'YES'">
              <div class="tip">
                <el-button type="text" :disabled="scope.row.pauseSms === 'YES'">短信</el-button>
              </div>
            </el-tooltip>
            <el-button type="text">邮件</el-button>
            <el-button type="text" @click="addCaseTelRecord(scope.row)">总结</el-button>
            <el-button type="text" @click="deleteClick(scope.row)" v-if="scope.row.dataSource !== 'IMPORT'">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="dataSource" label="来源" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.dataSource,'DataSource')">
        </el-table-column>
        <el-table-column prop="relation" label="关系" :min-width="$helper.getColumnWidth(2)" :formatter="(row) => $filter.dictConvert(row.relation,'Relationship')">
        </el-table-column>
        <el-table-column prop="contName" label="姓名" :min-width="$helper.getColumnWidth(3)">
        </el-table-column>
        <el-table-column prop="phoneType" label="电话类型" :min-width="$helper.getColumnWidth(3)" :formatter="(row) => $filter.dictConvert(row.phoneType,'PhoneType')">
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column prop="contEmail" label="邮箱" :min-width="$helper.getColumnWidth(5)">
        </el-table-column>
        <el-table-column label="接通/拨打次数" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span>{{scope.row.connectTimes}}/{{scope.row.callTimes}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="latelyContactDate" label="最近联系日期" :min-width="$helper.getColumnWidth(4)" :formatter="(row) => $filter.dateTimeFormat(row.latelyContactDate)">
        </el-table-column>
      </template>
    </data-box>
    <!-- 弹出窗口 -->
    <el-dialog title="增加催收总结" width="600px" :visible.sync="dialog.addCaseTelRecord" :close-on-press-escape="false" :close-on-click-modal="false" :append-to-body="true">
      <add-case-tel-record :phoneData="phoneData" :caseId="caseId" @close="dialog.addCaseTelRecord=false" ref="add-case-tel-record"></add-case-tel-record>
    </el-dialog>
    <el-dialog title="电话流水" width="1030px" :visible.sync="dialog.telWater" :close-on-press-escape="false" :close-on-click-modal="false" :append-to-body="true" @open="$nextTick(()=>$refs['tel-water'].refreshData())">
      <tel-water :phoneData="phoneData" :caseId="caseId" @close="dialog.telWater=false" ref="tel-water"></tel-water>
    </el-dialog>
    <el-dialog :title="`${applyType.name}申请`" width="800px" :visible.sync="dialog.apply" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <apply :caseIds="[caseId]" :fromChannel="caseChannel" :otherData="otherModel" :applyType="applyType.value" @close="dialog.apply = false;refreshData();" ref="apply-circulation"></apply>
    </el-dialog>
    <el-dialog title="添加联系人" width="800px" :visible.sync="dialog.contact" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body>
      <add-contact :caseId="caseId" @close="dialog.contact = false;refreshData();"></add-contact>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { State } from 'vuex-class';
import { Dependencies } from '~/core/decorator';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import AddCaseTelRecord from '~/components/collection-execution/operate-components/add-case-tel-record.vue';
import { Prop } from "vue-property-decorator";
import TelWater from '~/components/collection-execution/operate-components/tel-water.vue';
import Apply from '~/components/visit-case/apply.vue';
import { ApplyType, CASE_CHANNEL, CASE_HALT_CATEGORY } from '~/config/enum.config';
import AddContact from "~/components/collection-execution/operate-components/add-contact.vue"

@Component({
  components: {
    DataBox,
    AddCaseTelRecord,
    TelWater,
    Apply,
    AddContact
  },
})
export default class TelephoneBook extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;

  /**
   * caseId
   */
  @Prop({ type: String, required: true })
  private caseId: string;

  /**
   * caseChannel
   */
  @Prop({ type: String, required: true })
  private caseChannel: string;

  private personalId: string = ""
  private dataSet: any[] = [];
  private dialog: any = {
    addCaseTelRecord: false,
    telWater: false,
    apply: false,
    contact: false
  };
  private applyTypeChild: any = {};
  private phoneData: any = {
    phone: ''
  };

  private caseHaltCategory: string = '';
  private applyType = ApplyType.pause;
  private selectionRow: any = null;

  private otherModel = {
    caseHaltCategory: '',
    personalContractId: '',
  };


  private onSelectedRowChange(row) {
    this.selectionRow = row;
  }

  private refreshData() {
    this.selectionRow = null;
    // 获取联系人信息
    this.caseOperatorPageService
      .personalContacts(this.caseId)
      .subscribe((data) => {
        this.dataSet = data;
      });
  }
  /**
   * 增加催收总结
   */
  private addCaseTelRecord(rowData) {
    if (rowData.phone) this.phoneData = rowData;
    if (!this.phoneData.phone) {
      this.$message('请输入电话号码');
      return;
    }
    this.dialog.addCaseTelRecord = true;
  }

  private stopSMSClick() {
    if (!this.checkSelectedRow) return;
    if (this.selectionRow.pauseSms === 'YES') {
      this.$message('短信已停催，无需重复申请');
      return;
    }
    this.otherModel.caseHaltCategory = CASE_HALT_CATEGORY.MESSAGE_HALT;
    this.dialog.apply = true;
  }
  private stopTelClick() {
    if (!this.checkSelectedRow) return;
    if (this.selectionRow.pausePhone === 'YES') {
      this.$message('电话已停催，无需重复申请');
      return;
    }
    this.otherModel.caseHaltCategory = CASE_HALT_CATEGORY.TEL_HALT;
    this.dialog.apply = true;
  }

  /**
   * 检测是否选中
   */
  private get checkSelectedRow(): boolean {
    if (!this.selectionRow) {
      this.$message('请选择要操作的数据行');
      return false;
    }
    this.otherModel.personalContractId = this.selectionRow.id;
    return true;
  }

  private deleteClick(row:any){
    this.caseOperatorPageService.deletePersonalContact(row.id).subscribe(
      data => {
        this.$message.success("操作成功")
        this.refreshData()
      }
    )
  }

  private activated() {
    this.refreshData();
  }
}
</script>

<style lang="less" scoped>
.tip {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 4px;
}
</style>
