<template>
  <section class="component modify-client">
    <el-form :model="modifyModel" :rules="rules" ref="modify-form" label-width="90px" class="tableInput">
      <el-form-item label="委托方名称" prop="name">
        <el-input v-model="modifyModel.name"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" v-show="isSupperAdmin">
        <el-select size="small" v-model="modifyModel.companyCode">
          <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份/城市/区" prop="areaIds">
        <el-cascader v-model="areaIds" :options="$city.getCityData()" change-on-select clearable></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="modifyModel.address" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="modifyModel.phone" :maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="contents">
        <el-input type="textarea" v-model="modifyModel.contents" :maxlength="500"></el-input>
      </el-form-item>
    </el-form>
    <div class="operate-buttons">
      <el-button @click="close">取消</el-button>
      <el-button @click="commit">确定</el-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { State, Action, Getter } from "vuex-class";
import { PrincipalService } from "~/services/domain-service/principal.service";
import { Emit, Prop, Watch } from "vue-property-decorator";
import { Form } from "element-ui";

@Component({
  components: {}
})
export default class ModifyClient extends Vue {
  @State
  public companyList: any;
  @Action
  public getPrincipalList;
  @Getter
  public isSupperAdmin: boolean;
  @Dependencies(PrincipalService)
  private principalService: PrincipalService;
  private areaIds = [];

  //委托方数据实体
  private modifyModel: any = {
    name: "",
    address: "",
    contents: "",
    phone: "",
    areaId: "",
    companyCode: "",
    id: ""
  };
  //数据校验
  private rules: any = {
    name: [{ required: true, message: "请输入委托方", trigger: "blur" }],
    phone: [
      {
        message: "请输入正确的手机号",
        trigger: "blur",
        pattern: /^1(3|4|5|7|8)\d{9}$/
      }
    ]
  };
  @Emit("refreshList")
  public refreshList() { }
  @Emit("close")
  public close() {
    this.reset();
  }

  //重置方法
  private reset() {
    const modifyForm: any = this.$refs["modify-form"];
    modifyForm.resetFields();
    this.areaIds = [];
    this.modifyModel.id = ''
  }

  /**
   * 反显数据
   */
  private update(data: any) {
    if (!data.id) return;
    this.modifyModel.name = data.name;
    this.modifyModel.address = data.address;
    this.modifyModel.contents = data.contents;
    this.modifyModel.phone = data.phone;
    this.modifyModel.companyCode = data.companyCode;
    this.modifyModel.id = data.id;
    const arr = this.$city.getCityParent(Number(data.areaId));
    this.areaIds = arr ? arr.concat([Number(data.areaId)]) : [];
  }

  /**
   * 提交验证并并与数据库交互
   */
  private commit() {
    const modifyForm: any = this.$refs["modify-form"];
    modifyForm.validate(valid => {
      if (!valid) return false;
      const [prinPrid, prinCityid, prinCtyid] = this.areaIds;
      this.modifyModel.areaId = prinCtyid || prinCityid || prinPrid;
      //根据是否有数据传入决定执行新增还是修改
      this.modifyModel.id ? this.updateClient() : this.addClient();
      this.close();
    });
  }

  /**
   * 新增委托方信息
   */
  private addClient() {
    this.principalService.addPrincipal(this.modifyModel).subscribe(
      data => {
        this.$message.success("新增成功!");
        // 刷新列表
        this.refreshList();
        // 刷新委托方列表
        this.getPrincipalList();
        // 关闭
        this.close();
      },
      ({ msg }) => {}
    );
  }

  /**
   * 修改委托方信息
   */
  private updateClient() {
    this.principalService.updatePrincipal(this.modifyModel).subscribe(
      data => {
        this.$message.success("修改成功!");
        // 刷新列表
        this.refreshList();
        // 更新委托方缓存
        this.getPrincipalList();
        //关闭
        this.close();
      },
      ({ msg }) => {}
    );
  }
}
</script>

<style lang="less" scoped>
</style>
