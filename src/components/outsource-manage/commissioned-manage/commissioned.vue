<template>
  <!-- 编辑-->
  <div class="page">
    <el-form :model="form" ref="add-form" label-width="100px" align="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="受托方名称" prop="name">
            <span>{{form.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构类型" prop="organizationType">
            <span>{{$filter.dictConvert(form.organizationType,'OutSourceType')  }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <span>{{$filter.dictConvert(form.status,'CommonState') }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省份/城市/区" prop="areaIds">
            <!-- <el-cascader v-model="areaIds" :options="$city.getCityData()" change-on-select clearable></el-cascader> -->
            <span>{{form.areaName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="详细地址" prop="address">
            <span>{{form.address}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构">
            <span>{{form.deptName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="linkMan">
            <span>{{form.linkMan}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="linkPhone">
            <span>{{form.linkPhone}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="age">
            <span>{{form.email}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="可催收区域" v-show="form.selectedCitysList">
            <el-tag v-for="tag in form.selectedCitysList" :key="tag.value">{{tag.label}}</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注" prop="remark">
            <span>{{form.remark}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { State, Mutation, Getter, namespace } from 'vuex-class';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import clone from 'clone';
import AreaSelection from '~/components/common/area-selection.vue';
import { CityService } from '~/utils/city.service';
import { OutsourceCommissionedService } from '~/services/domain-service/outsource-commissioned-manage.service';

@Component({
  components: {
    AreaSelection,
  },
})
export default class CommissionedDialog extends Vue {
  @Dependencies(OutsourceCommissionedService)
  private outsourceCommissionedService: OutsourceCommissionedService;

  @Prop({ required: true })
  private caseRow: any;
  private form: any = {
    name: '',
    proinviceCode: '',
    cityCode: '',
    companyType: '',
    status: '',
    address: '',
    organizationType: '',
    linkMan: '',
    linkPhone: '',
    email: '',
    collectionAddress: '',
    remark: '',
    selectedCitysList: [],
    areaId: '',
    areaName: '',
    deptName: '',
  };
  private areaIds = [];

  //验证
  // private rules: any = {
  //   name: [{ required: true, message: '请填写受托方' ,trigger: 'blur'}],
  //   organizationType: [{ required: true, message: '请选择机构类型', trigger: 'blur' }],
  //   status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
  //   areaIds: [{ required: true, message: '请选择地区', trigger: 'blur' }],
  //   address: [{ required: true, message: '请填写具体地址', trigger: 'blur' }],
  //   linkPhone: [{ required: true, message: '请填写联系人手机号码', trigger: 'blur' }],
  //   linkMan: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
  //   selectedCitysList: [{ required: true, message: '请选择催收区域', trigger: 'blur' }],
  // };

  private mounted() {
    this.formData();
  }

  @Watch('caseRow')
  private onCaseRowChange() {
    this.formData();
  }

  //数据回显
  private formData() {
    this.form = {};

    this.form.name = this.caseRow.outsName;
    this.form.organizationType = this.caseRow.outSourceType;
    this.form.status = this.caseRow.outsourceStatus;
    this.form.companyCode = this.caseRow.companyCode;
    this.form.proinviceCode = this.caseRow.areaId;
    this.form.cityCode = this.caseRow.areaId;
    this.form.address = this.caseRow.outsAddress;
    this.form.deptName = this.caseRow.deptName;
    this.form.linkMan = this.caseRow.outsContacts;
    this.form.linkPhone = this.caseRow.outsPhone;
    this.form.remark = this.caseRow.outsRemark;
    this.form.email = this.caseRow.email;
    const arr = this.$city.getCityParent(Number(this.caseRow.areaId));
    arr.push(this.caseRow.areaId);
    this.form.areaName = this.$city.getCityName(...arr);
    //需要去掉,
    if (this.caseRow.areaCodeIds) {
      const temp = this.caseRow.areaCodeIds.split(',').filter((item) => {
        return item;
      });
      const Ids = temp.map((val) => Number(val));
      this.form.selectedCitysList = Ids.map((val) => {
        return {
          value: val,
          label: this.$city.getCityNameById(val),
        };
      });
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
<style lang='less' >
#app .page .el-form .el-form-item .el-select.address .el-input {
  width: 100%;
}
</style>
