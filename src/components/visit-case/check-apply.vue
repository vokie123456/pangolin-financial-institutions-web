<template>
  <!--各种申请操作-->
  <section class="component check-apply">
    <div class="content">
      <p>您当前所选择的案件，因以下原因需确认是否继续申请案件{{applyTypeName}}</p>
      <div v-for="(item,index) of dataSet" :key="index" class="content-item">
        <p>{{`${index+1}.${item.message}`}}</p>
        <div class="detail-content">
          <span>案件数量：</span><span style="color:red">{{item.caseList.length}}</span>
          <a class="view-detail" @click="item.show = !item.show">
            查看详情 <svg-icon iconName="xiala" :class="{'detail-show':item.show}"></svg-icon>
          </a>
          <el-input type="textarea" v-show="item.show" :value="item.caseList.join(',')"></el-input>
        </div>
      </div>
      <p>确定是否要继续操作？</p>
    </div>
    <div class="check-buttons">
      <el-button @click="emitClose">取消</el-button>
      <el-button @click="emitSuccess" :disabled="status === 0">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CaseApplyRecordService } from '~/services/domain-service/case-apply-record.service';
import { Prop, Emit, Watch } from "vue-property-decorator"
import SvgIcon from "~/components/common/svg-icon.vue"
import { ApplyType } from "~/config/enum.config"

@Component({
  components: {
    SvgIcon
  },
})
export default class CheckApply extends Vue {
  @Dependencies(CaseApplyRecordService)
  private caseApplyRecordService: CaseApplyRecordService;

  @Prop({ required: true, type: String })
  private applyType: string

  @Prop({ required: true, type: Object })
  private messageData

  private dataSet: any[] = []

  private status: any = null

  @Emit("success")
  private emitSuccess() { }

  @Emit("close")
  private emitClose() { }

  /**
   * 获取申请名称类型
   */
  private get applyTypeName() {
    let result = ""
    const apply = Object.values(ApplyType).find(v => v.value === this.applyType)
    if (apply) result = apply.name
    return result
  }

  @Watch('messageData', { immediate: true })
  private onMessageDataChange(val) {
    if(!val) this.dataSet = []
    this.dataSet = val.messageModels.map(v => ({...v,show:false}))
    this.status = val.status
    // this.dataSet = [
    //   {
    //     message: "当前所选择的案件XXXXXXXX",
    //     show: false,
    //     caseList: ['12020231231', '4564564564', '23423423432', '23423423']
    //   },
    //   {
    //     message: "当前所选择的案件XXXXXXXX",
    //     show: false,
    //     caseList: ['12020231231', '4564564564', '23423423432', '23423423', '4564564564', '23423423432', '23423423']
    //   },
    //   {
    //     message: "当前所选择的案件XXXXXXXX",
    //     show: false,
    //     caseList: ['12020231231', '4564564564', '23423423432', '23423423', '4564564564', '23423423432', '23423423', '4564564564', '23423423432', '23423423']
    //   }
    // ]
  }

  // private dataSet() {
  //   // if(this.messageData) return []
  //   // return this.messageData.map(v => ({...v,show:false}))

  //   return [
  //     {
  //       message: "当前所选择的案件XXXXXXXX",
  //       show: true,
  //       caseList: ['12020231231', '4564564564', '23423423432', '23423423']
  //     },
  //     {
  //       message: "当前所选择的案件XXXXXXXX",
  //       show: true,
  //       caseList: ['12020231231', '4564564564', '23423423432', '23423423', '4564564564', '23423423432', '23423423']
  //     },
  //     {
  //       message: "当前所选择的案件XXXXXXXX",
  //       show: true,
  //       caseList: ['12020231231', '4564564564', '23423423432', '23423423', '4564564564', '23423423432', '23423423', '4564564564', '23423423432', '23423423']
  //     }
  //   ]
  // }
}
</script>

<style lang="less" scoped>
.component.check-apply {
  .view-detail {
    margin-left: 20px;
  }
  .detail-show {
    transform: rotate(180deg);
  }
  .check-buttons {
    margin: 20px 0;
    text-align: right;
    padding-right: 40px;
  }
  .content {
    .content-item {
      margin: 20px;
    }
    .detail-content {
      padding-left: 10px;
    }
  }
}
</style>
