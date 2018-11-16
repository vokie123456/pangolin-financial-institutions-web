<template>
  <section class="component manual-distrubute">
    <el-form :model="manualModel" ref="form" label-width="90px" class="tableInput">
      <el-form-item>
        <span style="color:#20a0ff;">当前已选择{{selectionList.length}}个案件，案件总金额￥{{overdueAmount | toThousands}}</span>
      </el-form-item>
      <el-form-item prop="distributeType">
        <el-radio-group v-model="manualModel.distributeType">
          <el-radio label="TEL">分配到电催案件池</el-radio>
          <el-radio label="VISIT">分配到外访案件池</el-radio>
          <el-radio label="OUTER">分配到委外案件池</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="close">取消</el-button>
      <el-button @click="submit" :loading="submitLoading">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { State } from 'vuex-class';
import { Emit, Prop } from 'vue-property-decorator';
import { PageService } from '~/utils/page.service';
import DataBox from '~/components/common/data-box.vue';
import { CaseInfoService } from '../../services/domain-service/case-info.service';

@Component({
  components: {
    DataBox,
  },
})
export default class ManualDistrubute extends Vue {
  @Prop()
  public selectionList: any;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(CaseInfoService)
  private CaseInfoService: CaseInfoService;
  private caseList: any = []; // 案件数组
  private manualModel: any = {
    caseIds: '',
    distributeType: 'TEL',
  };
  private submitLoading: boolean = false;
  @Emit('refreshList')
  public refreshList() { }
  @Emit('close')
  public close() { }

  get overdueAmount() {
    const sum = this.selectionList
      .map((v) => v.overdueAmount)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);
    return sum;
  }
  /**
   * 刷新
   */
  public refresh(caseList) {
    this.caseList = caseList;
  }
  /**
   * 确定
   */
  private submit() {
    const caseId: any = this.selectionList.map((v) => v.id);
    const paramData: any = {
      caseIds: caseId,
      distributeType: this.manualModel.distributeType,
    };
    this.submitLoading = true;
    this.CaseInfoService.distributeCaseInfo(paramData).subscribe(
      (data) => {
        this.submitLoading = false;
        this.$message.success('分配成功');
        this.refreshList();
        this.close();
      },
      ({ msg }) => {
        this.submitLoading = false;
      },
    );
  }
}
</script>

<style lang="less" scoped>
</style>
