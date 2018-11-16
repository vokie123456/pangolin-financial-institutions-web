<template>
  <!--批量设置催收员等级-->
  <div class="page">
    <el-form :model="batchParams" ref="level-form" label-width="100px" align="left">
      <el-row>
        <el-col :span="24">
          <el-form-item label="催收员等级" prop="userLevel">
            <el-select v-model="batchParams.userLevel" placeholder="请选择" size="small">
              <el-option v-for="{code,name,index} in $dict.getDictData('UserLevel')" :key="index" :label="name" :value="code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item scope="scope" label-width="0px" align="center">
        <el-button @click="close">取消</el-button>
        <el-button @click="Commit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { State, Mutation, Getter, namespace } from 'vuex-class';
import { UserService } from '~/services/management-service/user.service';
import { Emit, Prop } from 'vue-property-decorator';

const systemManageModule = namespace('system-manage');

@Component({
  components: {},
})
export default class BatchCollectorLevel extends Vue {
  @Dependencies(UserService)
  private userService: UserService;
  @Prop()
  private userList: any;

  private batchParams: any = {
    userLevel: '',
    caseSwitch: '',
    userIds: [],
  };
  @Emit('refreshList')
  public refreshList() {}
  @Emit('close')
  public close() {}

  public refresh() {
    this.batchParams.userLevel = '';
  }

  private Commit() {
    this.batchParams.userIds = this.userList.map((v) => v.id);
    this.batchParams.caseSwitch = this.userList[0].caseSwitch;
    this.userService.batchUpdateUserLevel(this.batchParams).subscribe(
      (data) => {
        this.$message.success('分配成功');
        this.close();
        this.refreshList();
      }
    );
  }
}
</script>

<style lang="less" scoped>
.data-grid {
  margin-bottom: 10px;
}

.header {
  border: solid 1px #dee1e5;
  border-bottom: 0px;
  height: 40px;
  line-height: 40px;
}
</style>
