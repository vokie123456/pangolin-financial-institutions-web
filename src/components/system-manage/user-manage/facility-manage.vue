<template>
  <!-- 设备锁 -->
  <section class="component facility-manage">
    <el-col>
      <div class="facility-title">当前用户名:{{userObj.userName}}</div>
    </el-col>
    <data-box :data="dataSet">
      <template slot="columns">
        <!--数据列区域-->
        <el-table-column prop="deviceType" label="类型" align="center" :min-width="$helper.getColumnWidth(3)">
          <template slot-scope="scope">
            <span v-if="scope.row.deviceType == 'PC'">PC端</span>
            <span v-if="scope.row.deviceType == 'MOBILE'">移动端</span>
          </template>
        </el-table-column>
        <el-table-column prop="deviceStatus" label="是否禁用" align="center" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span v-if="scope.row.deviceStatus == 'ENABLED'">否</span>
            <span v-if="scope.row.deviceStatus == 'DISABLED'">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="deviceValidate" label="设备锁状态" align="center" :min-width="$helper.getColumnWidth(4)">
          <template slot-scope="scope">
            <span v-if="scope.row.deviceValidate == 'DISABLED'">停用</span>
            <span v-if="scope.row.deviceValidate == 'ENABLED'">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" :min-width="$helper.getColumnWidth(5)">
          <template slot-scope="scope">
            <el-button v-if="scope.row.deviceStatus=='DISABLED'" @click="hangleFacility(scope,'ENABLED')" type="text" size="small">启用设备</el-button>
            <el-button v-else @click="hangleFacility(scope,'DISABLED')" type="text" size="small">禁用设备</el-button>
            <el-button v-if="scope.row.deviceValidate=='DISABLED'" @click="hangleLock(scope,'ENABLED')" type="text" size="small">启用设备锁</el-button>
            <el-button v-else @click="hangleLock(scope,'DISABLED')" type="text" size="small">停用设备锁</el-button>
            <el-button @click="resetfacility(scope)" type="text" size="small">重置设备</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataBox from '~/components/common/data-box.vue';
import { Dependencies } from '~/core/decorator';
import { UserDeviceService } from '~/services/management-service/user-device.service';

@Component({
  components: {
    DataBox,
  },
})
export default class FacilityManage extends Vue {
  @Dependencies(UserDeviceService)
  private userDeviceService: UserDeviceService;
  private userObj: any = {};
  private dataSet: any = [];

  public refresh(obj) {
    const deviceModel: any = {
      userIds: [obj.id]
    };
    this.userDeviceService.getAllDevices(deviceModel).subscribe((data) => {
      this.dataSet = data;
      this.userObj = obj;
    });

    this.dataSet = obj.userDevices;
  }
  /**
   * 启用禁用设备
   */
  private hangleFacility(scope, handle) {
    this.$confirm(
      `您确定要对用户${this.userObj.realName}执行该操作吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    ).then(() => {
      const hangleFacility: any = {
        userIds: [this.userObj.id],
        deviceType: scope.row.deviceType,
        deviceStatus: handle,
      };
      this.userDeviceService.disableDevice(hangleFacility).subscribe(
        (data) => {
          scope.row.deviceStatus = handle;
          // 更新数据信息
          this.$message.success('操作成功');
        }
      );
    });
  }
  /**
   * 启用停用设备锁
   */
  private hangleLock(scope, handle) {
    this.$confirm(
      `您确定要对用户${this.userObj.realName}执行该操作吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    ).then(() => {
      const hangleLock: any = {
        userIds: [this.userObj.id],
        deviceType: scope.row.deviceType,
        deviceValidate: handle,
      };
      this.userDeviceService.enableDeviceKey(hangleLock).subscribe(
        (data) => {
          scope.row.deviceValidate = handle;
          // 更新数据信息
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        }
      );
    });
  }
  /**
   * 重置设备
   */
  private resetfacility(scope) {
    this.$confirm(
      `您确定要对用户${this.userObj.realName}执行该操作吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    ).then(() => {
      this.userDeviceService
        .resetDevice({
          userIds: [this.userObj.id],
          deviceType: scope.row.deviceType,
          deviceValidate: 'DISABLED',
          deviceStatus: 'DISABLED',
        })
        .subscribe(
          (data) => {
            scope.row.code = '';
            // 更新数据信息
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          }
        );
    });
  }
}
</script>

<style lang="less" scoped>
.facility-title {
  margin: 10px 0;
  font-size: 0.875rem;
  color: rgb(31, 45, 61);
  text-align: left;
}
</style>
