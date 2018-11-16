<template>
  <section class="page client-manage">
    <data-form :model="clientModel" @onSearch="refreshData" :page="pageService">
      <template slot="default-input">
        <el-form-item label="委托方名称" prop="principalName">
          <el-input v-model="clientModel.principalName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="principalPhone">
          <el-input v-model="clientModel.principalPhone" :maxlength="13"></el-input>
        </el-form-item>
      </template>
      <template slot="collapse-input">
      </template>
      <template slot="default-button">
        <el-button @click="clientObj={};dialog.modify = true;">新增委托方</el-button>
      </template>
    </data-form>
    <data-box :data="clientDataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column label="操作" :min-width="$helper.getOperateWidth(1)">
          <template slot-scope="scope">
            <el-button @click="dialog.modify=true,clientObj=scope.row" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="委托方" :min-width="$helper.getColumnWidth(5)" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="省份" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{$city.getCityName($city.getCityParent(Number(scope.row.areaId))[0])}}</span>
          </template>
        </el-table-column>
        <el-table-column label="城市" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{$city.getCityName($city.getCityParent(Number(scope.row.areaId))[1])}}</span>
          </template>
        </el-table-column>
        <el-table-column label="区/县" :min-width="$helper.getColumnWidth(3)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{$city.getCityName(Number(scope.row.areaId))}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="详细地址" :min-width="$helper.getColumnWidth(6)">
        </el-table-column>
        <el-table-column prop="phone" label="电话" :min-width="$helper.getColumnWidth(4)">
        </el-table-column>
      </template>
    </data-box>

    <!--新增/修改委托方-->
    <el-dialog :title="clientObj.id?'修改委托方':'新增委托方'" :center="true" :visible.sync="dialog.modify" width="800px" @open="$nextTick(()=>$refs['modify-client'].update(clientObj))" @close="$refs['modify-client'].reset()">
      <modify-client ref="modify-client" @close="dialog.modify = false" @refreshList="refreshData"></modify-client>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { State, Getter, Action } from 'vuex-class';
import DataForm from '~/components/common/data-form.vue';
import DataBox from '~/components/common/data-box.vue';
import { PageService } from '~/utils/page.service';
import { PrincipalService } from '~/services/domain-service/principal.service';
import ModifyClient from '~/components/case-import/client-manage/modify-client.vue';

// @Auth(391)
@Layout('workspace')
@Component({
  components: {
    ModifyClient,
    DataBox,
    DataForm,
  },
})
export default class ClientManage extends Vue {
  @State
  public principalList: any;
  @Getter
  public isSupperAdmin: boolean;
  @Action
  public getPrincipalList;
  @Action
  private getCompanyList;
  @Dependencies(PageService)
  private pageService: PageService;
  @Dependencies(PrincipalService)
  private principalService: PrincipalService;

  private clientModel: any = {
    principalName: '',
    principalPhone: '',
  };
  private clientDataSet = null;
  private dialog: any = {
    modify: false,
  };
  private clientObj: any = {};

  /**
   * 查询委托方
   */
  public refreshData() {
    this.principalService
      .getPrincipalList(this.clientModel, this.pageService)
      .subscribe(
        (data) => {
          this.clientDataSet = data;
        },
        ({ msg }) => {},
      );
  }
  private mounted() {
    this.refreshData();
    this.getCompanyList();
  }
}
</script>

<style lang="less">
</style>
