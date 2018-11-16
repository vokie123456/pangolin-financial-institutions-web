<template>
  <section class="component add-company">
    <el-form :rules="applyRules" :model="applyModel" ref="form" label-width="90px" class="addCompany">
      <el-row>
        <el-col :span="18">
          <el-form-item label="流转去向" prop="turnGoal">
            <el-select v-model="applyModel.turnGoal" placeholder="请选择" clearable>
              <el-option v-for="(item, index) in $dict.getDictData('TurnGoal').filter(v => v.code.startsWith(fromChannel))" :key="index" :value="item.code" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="申请说明" prop="applyDescription">
            <el-input type="textarea" v-model="applyModel.applyDescription"></el-input>
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
import { CaseApplyRecordService } from '~/services/domain-service/case-apply-record.service';
import { OutsourceRecycleService } from '~/services/domain-service/outsource-recycle-manage.service';

@Component({
  components: {},
})
export default class ApplyFlow extends Vue {
  @Dependencies(OutsourceRecycleService)
  private outsourceRecycleService: OutsourceRecycleService;
  @Dependencies(CaseApplyRecordService)
  private caseApplyRecordService: CaseApplyRecordService;
  @Prop()
  private selectionList: any;

  // apply实体
  private applyModel: any = {
    caseIds: [],
    turnGoal: '', //流转去向
    applyDescription: '', //申请说明
    confirm: 1, // 确认
  };

  @Prop({ type: String })
  private fromChannel;

  private applyRules: any = {
    turnGoal: [
      { required: true, message: '请选择流转去向', trigger: 'change' },
    ],
    applyDescription: [
      { required: true, message: '请输入申请说明', trigger: 'blur' },
    ],
  };

  @Getter
  private isSupperAdmin: boolean;
  @Emit('refreshList')
  private refreshList() { }
  @Emit('close')
  private close() { }
  //将选择的id放到数组
  private getSelectionListArray() {
    if (this.selectionList instanceof Array) {
      this.applyModel.caseIds = [];
      this.selectionList.map((value) => {
        this.applyModel.caseIds.push(value.id);
      });
    }
  }

  private commit() {
    const form: any = this.$refs.form;
    form.validate((valid) => {
      if (!valid) {
        return;
      }
      this.getSelectionListArray();
      //默认加载列表
      this.caseApplyRecordService.applyCirculationCase(this.applyModel).subscribe(
        (data) => {
          this.$message.success('操作成功!');
          this.refreshList();
          this.refresh();
          this.close();
        }
      );
    });
  }
  private refresh() {
    const form: any = this.$refs.form;
    form.resetFields();
  }
}
</script>

<style lang="less" scoped>
</style>
