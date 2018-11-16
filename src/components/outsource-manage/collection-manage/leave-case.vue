<template>
  <section class="component leave-case">
    <el-form :model="leaveCaseModel" ref="form" label-width="260px" class="addleaveCase">
      <el-row>
        <el-col :span="18">
          <el-form-item label="留案到期时间" prop="leaveDate">
            <el-date-picker v-model="leaveCaseModel.leaveDate" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="留案说明" prop="leaveCaseFlagExplain">
            <el-input type="textarea" v-model="leaveCaseModel.leaveCaseFlagExplain"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="0px" align="center">
        <el-button @click="commit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { OutsourceCollectionService } from "~/services/domain-service/outsource-collection-manage.service";

@Component({
  components: {},
})
export default class LeaveCase extends Vue {
  @Dependencies(OutsourceCollectionService)
  private outsourceCollectionService: OutsourceCollectionService;
  /**
   * 案件ID
   */
  @Prop() private selectionList: any;

  private leaveCaseModel: any = {
    leaveDate: '',
    leaveCaseFlagExplain: '', //留案说明
    caseIds: []
  };
  //表单
  private form: any = {
  };

  public refresh() {
    //   重置form表单xr
    const addForm: any = this.$refs['form'];
    addForm.resetFields();
    this.leaveCaseModel = {};
  }
  @Emit('refreshList')
  private refreshList() { }
  @Emit('close')
  private close() {
    this.refresh();
  }

  private mounted() {

  }

  private commit() {
    this.form = this.$refs['form'];
    this.form.validate((valid) => {
      if (!valid) {
        return;
      }
      this.leaveCaseModel.caseIds = []
      this.selectionList.forEach(element => {
        this.leaveCaseModel.caseIds.push(element.id)
      });
      this.outsourceCollectionService.caseStay(this.leaveCaseModel).subscribe(
        data => {
          this.$message.success("留案成功!");
          this.refreshList();
          this.close();
          this.refresh();
        }
      );
    });
  }

}
</script>

<style lang="less" scoped>
</style>
