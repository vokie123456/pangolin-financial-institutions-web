<template>
  <!--执行页-案件备注-添加备注-组件 -->
  <section class="component add-case-remark">
    <el-form ref='form' :rules="rules" label-width="100px" :model="applyModel">
      <el-form-item label="备注内容" prop="content">
        <el-input type="textarea" v-model="applyModel.content"></el-input>
      </el-form-item>
    </el-form>
    <div class="confirm-button">
      <el-button @click="close">取消</el-button>
      <el-button @click="commit" :loading="submitLoading">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Form } from 'element-ui';
import { Dependencies } from '~/core/decorator';
import { Emit, Prop } from 'vue-property-decorator';
import { State, Getter, Action, namespace } from 'vuex-class';
import { CaseOperatorPageService } from '~/services/domain-service/case-operator-page.service';
import FileUpload from '~/components/common/file-upload.vue';

@Component({
  components: {
    FileUpload,
  }
})
export default class AddCaseRemark extends Vue {
  @Dependencies(CaseOperatorPageService)
  private caseOperatorPageService: CaseOperatorPageService;
  private rules: any = {
    content: [{ required: true, message: '请输入备注内容' }],
  };
  private submitLoading: boolean = false;
  private applyModel: any = {
    content: '',
    caseId: '',
  };

  @Prop({ type: String, required: true })
  private caseId: string;

  @Emit('close')
  private close() {
    const form: any = this.$refs['form'];
    form.resetFields();
  }
  private created() {
    this.applyModel.caseId = this.caseId;
  }
  private commit() {
    const form: any = this.$refs['form'];
    form.validate((result) => {
      if (!result) return;
      this.submitLoading = true;
      this.caseOperatorPageService.addCaseRemark(this.applyModel).subscribe(
        (data) => {
          this.submitLoading = false;
          this.$message.success('添加备注成功');
          this.close();
        },
        (err) => {
          this.submitLoading = false;
        },
      );
    });
  }
}
</script>

<style scoped lang="less">
</style>
