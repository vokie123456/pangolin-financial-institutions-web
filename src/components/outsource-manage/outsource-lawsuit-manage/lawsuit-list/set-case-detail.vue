<template>
  <div>
    <el-row>
        <el-col :span="24" v-if="followObj.lawsuitFollowType !== 'ENFORCE_RECORD'" >
          <el-steps :space="200" align-center :active="active"  finish-status="success">
            <el-step title="立案" ></el-step>
            <el-step title="庭审" ></el-step>
            <el-step title="执行立案" ></el-step>
            <el-step title="案件执行中"></el-step>
            <!-- <el-step title="执行终结/参与分配" v-if="active=='0'||active=='1'||active=='2'||active=='3'"></el-step> -->
            <el-step title="执行终结" v-if="active=='4'" ></el-step>
            <el-step title="参与分配" v-if="active=='5'"></el-step>
          </el-steps>
        </el-col>
         <el-col :span="24" v-else>
          <el-steps :space="200" align-center :active="active"  finish-status="success">
            <el-step title="立案" ></el-step>
            <!-- <el-step title="庭审" ></el-step> -->
            <el-step title="执行立案" ></el-step>
            <el-step title="案件执行中"></el-step>
            <!-- <el-step title="执行终结/参与分配" v-if="active=='0'||active=='1'||active=='2'||active=='3'"></el-step> -->
            <el-step title="执行终结" v-if="active=='3'"></el-step>
            <el-step title="参与分配" v-if="active=='4'"></el-step>
          </el-steps>
        </el-col>
  </el-row>
  <el-row v-if="followObj.lawsuitFollowType !== 'ENFORCE_RECORD'">
    <first-case @goStep="goStep" v-if="dataForm=='COURT'||dataForm=='LAWSUIT_TPYE'" :type="followObj" ref="firstCase" :isCheck="isCheck"></first-case>
    <two-case @goStep="goStep" v-if="dataForm=='CHECK' || dataForm=='WITHDRAWAL_PROSECUTION'" :type="followObj" ref="twoCase" :isCheck="isCheck"></two-case>
    <three-case @goStep="goStep" v-if="dataForm=='COURT_EXECUTE' || dataForm=='CLOSING_CASE'" :type="followObj" ref="thireeCase" :isCheck="isCheck"></three-case>
    <four-case @goStep="goStep" v-if="dataForm=='EXECUTION'" :type="followObj" ref="fourCase" :isCheck="isCheck"></four-case>
    <five-case @goStep="goStep" v-if="dataForm=='END'" :type="followObj" ref="fiveCase" :isCheck="isCheck"></five-case>
    <six-case @goStep="goStep" v-if="dataForm=='TAKE'" :type="followObj" ref="sixCase" :isCheck="isCheck"></six-case>
  </el-row>
  <el-row v-else>
      <first-case @goStep="goStep" v-if="dataForm=='COURT'||dataForm=='LAWSUIT_TPYE'" :type="followObj" ref="firstCase" :isCheck="isCheck"></first-case>
      <three-case @goStep="goStep" v-if="dataForm=='COURT_EXECUTE'||dataForm=='WITHDRAWAL_PROSECUTION'" :type="followObj" ref="thireeCase" :isCheck="isCheck"></three-case>
      <four-case @goStep="goStep" v-if="dataForm=='EXECUTION'||dataForm=='CLOSING_CASE'" :type="followObj" ref="fourCase" :isCheck="isCheck"></four-case>
      <five-case @goStep="goStep" v-if="dataForm=='END'" :type="followObj" ref="fiveCase" :isCheck="isCheck"></five-case>
      <six-case @goStep="goStep" v-if="dataForm=='TAKE'" :type="followObj" ref="sixCase" :isCheck="isCheck"></six-case>
  </el-row>
  </div>
</template>

 <script lang="ts">
// import Vue from "vue";
// import Component from "vue-class-component";
// import { Dependencies } from "~/core/decorator";
// import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
// import { Emit, Prop } from "vue-property-decorator";

// @Component({
//   components: {}
// })
// export default class AddCost extends Vue {
//   @Dependencies(OutsourceLawsuitService) private outsourceLawsuitService: OutsourceLawsuitService;
//   @Prop() private lawsuitId: any

//   // form表单
//   private caseModel: any = {};
//   private active: any = 1
//   private stepDate:any = [
//     {step:'LAWSUIT_TPYE', active: -1}, //添加诉讼类型
//     {step:'COURT', active: 0}, //立案
//     {step:'CHECK', active: 1}, // 庭审
//     {step:'COURT_EXECUTE', active: 2}, // 执行立案
//     {step:'EXECUTION', active: 3}, // 案件执行中
//     {step:'END', active: 4}, // 执行终结
//     {step:'TAKE', active: 5}, // 参与分配
//   ]
//    private constraintType:any = [
//     {step:'LAWSUIT_TPYE', active: -1}, //添加诉讼类型
//     {step:'COURT', active: 0}, //立案
//     {step:'COURT_EXECUTE', active: 1}, // 执行立案
//     {step:'EXECUTION', active: 2}, // 案件执行中
//     {step:'END', active: 3}, // 执行终结
//     {step:'TAKE', active: 4}, // 参与分配
//   ]


//   @Emit("refreshList")
//   private refreshList() { }
//   @Emit("close")
//   private close() { }

//   private mounted() {
//     this.refrech()
//   }
//   private refrech() {
//     console.log('@==>', this.lawsuitId)
//     this.outsourceLawsuitService.getFollowInfo({ id: this.lawsuitId.id }).subscribe(
//       data => {
//         if (data) {
//           this.caseModel = data
//           this.caseModel.forEach(item => {
//             if (item.step === data) {
//               this.active = item.active
//             }
//           })
//         }
//       }
//     );
//   }
//   private recover() {

//   }
// }
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { Emit, Prop ,Watch} from "vue-property-decorator";
import firstCase from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-model/first-case.vue'
import twoCase from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-model/two-case.vue'
import threeCase from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-model/three-case.vue'
import fourCase from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-model/four-case.vue'
import fiveCase from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-model/five-case.vue'
import sixCase from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/set-case-model/six-case.vue'
@Component({
  components: {
    firstCase,
    twoCase,
    threeCase,
    fourCase,
    fiveCase,
    sixCase
  }
})
export default class SetForce extends Vue {
  @Dependencies(OutsourceLawsuitService)
  private outsourceLawsuitService: OutsourceLawsuitService;

  @Prop() private active: number

  @Prop() private followObj:any
  @Prop({default: false}) private isCheck: any

  private followInfo:any

  private title: string

  private dataForm:any = ''
   private stepDate:any = [
    {step:'LAWSUIT_TPYE', active: -1}, //添加诉讼类型
    {step:'COURT', active: 0}, //立案
    {step:'CHECK', active: 1}, // 庭审
    {step:'COURT_EXECUTE', active: 2}, // 执行立案
    {step:'WITHDRAWAL_PROSECUTION', active: 2}, //撤诉
    {step:'CLOSING_CASE', active: 3}, //结案
    {step:'EXECUTION', active: 3}, // 案件执行中
    {step:'END', active: 4}, // 执行终结
    {step:'TAKE', active: 5}, // 参与分配
  ]
   private constraintType:any = [
    {step:'LAWSUIT_TPYE', active: -1}, //添加诉讼类型
    {step:'COURT', active: 0}, //立案
    {step:'COURT_EXECUTE', active: 1}, // 执行立案
    {step:'WITHDRAWAL_PROSECUTION', active: 1}, //撤诉
    {step:'EXECUTION', active: 2}, // 案件执行中
    {step:'CLOSING_CASE', active: 2}, //结案
    {step:'END', active: 3}, // 执行终结
    {step:'TAKE', active: 4}, // 参与分配
  ]

  @Emit("refreshList")
  private refreshList() { }
  @Emit("close")
  private close() { }

  @Watch('followObj')
  private onFollowObjChange(){
    console.log('followObj=====>',this.followObj);
    this.getStep()
  }

  private mounted() {
    console.log('active ----+++++-===>',this.active);
    this.getStep()
  }

  private goStep(val){

    if(val === 'tag'){
      this.close()
      this.refreshList();
    }else {
      console.log('===========')
      //如果类型是强制立案 类型用constraintType解析
        if(this.followObj.lawsuitFollowType === 'ENFORCE_RECORD'){
          this.constraintType.map((v) =>{
                if(v.step === val){
                  this.active = v.active
                  console.log('强制类型====>',this.active);
              }
            })
        }else {
             this.stepDate.map((v) =>{
                if(v.step === val){
                  this.active = v.active
              }
          })
        }
        this.dataForm = val;
    }

    // this.getStep()
  }

  private getStep(){
    console.log('followObj.lawsuitFollowType ====>',this.followObj.lawsuitFollowType);
     this.outsourceLawsuitService.getCourtInfoStep({'id':this.followObj.id}).subscribe(
      data => {
        this.dataForm = data
        console.log('adfsafsf=>',this.dataForm)
        //如果类型是强制立案 类型用constraintType解析
        if(this.followObj.lawsuitFollowType === 'ENFORCE_RECORD'){
          this.constraintType.map((v) =>{
                if(v.step === data){
                  this.active = v.active
              }
            })
        }else {
             this.stepDate.map((v) =>{
                if(v.step === data){
                  this.active = v.active
                console.log('active ----+++++-===>',this.active);

              }
          })
        }
      }
    );
  }

}


 </script>

<style lang="less" scoped>
.step-case {
  margin-bottom: 20px;
}
</style>

