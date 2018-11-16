<template>
  <section class="component add-company">
    <el-form  :model="stepType" ref="form" label-width="90px" class="addCompany">
      <el-row>
        <el-col :span="12">
          <el-form-item label="诉讼类型" prop="companyName">
             <el-radio-group v-model="stepType.lawsuitFollowType">
                <el-radio v-for="{index,name,code} in $dict.getDictData('LawsuitFollowType')" :key="index" :label="code" >{{name}}</el-radio>
              </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="close">取消</el-button>
        <el-button :disabled="!stepType.lawsuitFollowType" @click="nextStep">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="诉讼跟进" append-to-body :center="true"  :visible.sync="dialog.setUpForce" >
      <set-upForce @refreshList="refreshList" ref="setUpForce" :followObj="followType" @close="dialog.setUpForce = false" ></set-upForce>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { OutsourceLawsuitService } from "~/services/domain-service/outsource-lawsuit-manage-index.service";
import { Emit, Prop ,Watch} from "vue-property-decorator";
import { Getter } from "vuex-class";
import setUpForce from '~/components/outsource-manage/outsource-lawsuit-manage/lawsuit-list/setUpForce-modal.vue'

@Component({
  components: {
    setUpForce
  }
})
export default class LitigationFollow extends Vue {
  @Dependencies(OutsourceLawsuitService) private outsourceLawsuitService: OutsourceLawsuitService;

  @Prop() private lawsuitObj:any

  private stepType: any = {};
  private lawsuitFollowType: string = '';
  private followType: any={}
  private dataForm: any
  private dialog: any = {
    setUpCase: false,
    setUpForce: false,
    setUpArbitration: false
  };
  @Emit("refreshList")
  private refreshList() {
    console.log('第一次调用弹框 刷新数据')
  }
  @Emit("close")
  private close() {}

  private mounted(){
    this.refrech()
  }
  private refrech(){
    console.log('init==>',this.lawsuitObj)
      this.outsourceLawsuitService.getFollowInfo({id:this.lawsuitObj.id}).subscribe(
        data => {
          if(data){
            this.dialog.setUpForce = true
            this.followType = this.lawsuitObj;
            this.followType.lawsuitFollowType = data.lawsuitFollowType
            this.close()
          }
        },
        ({ msg }) => {
          // this.$message.error(msg);
        }
      );
  }
  private nextStep(){
    console.log('lawsuitFollowType ====>',this.stepType.lawsuitFollowType)
    this.outsourceLawsuitService.saveCourtInfo({caseAssistId:this.lawsuitObj.id,lawsuitFollowType:this.stepType.lawsuitFollowType,lawerStatus:'1'}).subscribe(
      data => {
        this.followType = this.lawsuitObj;
        this.followType.lawsuitFollowType = this.stepType.lawsuitFollowType;
      },
      ({ msg }) => {
        this.$message.error(msg);
      }
    );
    this.dialog.setUpForce=true
    this.close()
  }
}
</script>

<style lang="less" scoped>

</style>
