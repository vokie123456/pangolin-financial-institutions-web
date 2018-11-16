<template>
  <!-- 编辑-->
  <div class="page">
    <el-form :rules="rules" :model="form" ref="add-form" label-width="100px" align="left">
      <el-row>
        <el-col :span="12">
          <el-form-item label="受托方名称" prop="name">
            <el-input v-model="form.name" size="small" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="机构类型" prop="organizationType">
            <el-select v-model="form.organizationType" placeholder="请选择" clearable>
              <el-option v-for="{index,name,code} in $dict.getDictData('OutSourceType')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="机构类型" prop="organizationType">
          <el-select placeholder="请选择" v-model="form.organizationType">
            <el-option v-for="{index,name,code} in $dict.getDictData('OutSourceType')" :key="index" :label="name" :value="code">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select size="small" v-model="form.status" placeholder="请选择状态">
              <el-option v-for="{index,name,code} in $dict.getDictData('CommonState')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省份/城市/区" prop="areaIds">
            <el-cascader v-model="areaIds" :options="$city.getCityData()" change-on-select clearable></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="form.address" size="small" :maxlength="13"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构" prop="deptName">
            <el-select v-model="form.deptName" placeholder="请选择" clearable :disabled="true">
              <el-option v-for="{index,name,code} in $dict.getDictData('DepartmentType')" :key="index" :label="name" :value="code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="linkMan">
            <el-input v-model="form.linkMan" size="small" :maxlength="10"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="linkPhone">
            <el-input v-model="form.linkPhone" size="small" :maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="age">
            <el-input v-model="form.email" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="可催收区域" prop="selectedCitysList">
            <el-button type="primary" size="small" @click="dialog.area=true">选择区域</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <span class="my-tag" v-for="(tag, index) in selectedCitysList" :key="index">{{tag.label}}</span>
      <!--<el-row v-if="selectedCitysList">-->
        <!--<el-form-item>-->
      <!--<el-tag v-for="(tag, index) in selectedCitysList" :key="index" :disable-transitions="true">{{tag.label}}</el-tag>-->
        <!--</el-form-item>-->
      <!--</el-row>-->
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" :autosize="{ minRows:2, maxRows:4}" :maxlength="500"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item scope="scope" label-width="0px" align="center">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="commit">确定</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="选择区域" :center="true" :visible.sync="dialog.area" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body >
      <area-selection ref="area"></area-selection>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="closeArea">关 闭</el-button>
        <el-button type="primary" size="small" @click="saveArea">保 存</el-button>
      </span>
    </el-dialog>
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
  @Prop() private caseRow: any;
  private form: any = {
    name: '',
    proinviceCode: '',
    cityCode: '',
    companyType: '',
    status: '',
    address: '',
    organizationType:'',
    linkMan: '',
    linkPhone: '',
    email: '',
    collectionAddress: '',
    remark: '',
    areaId: '',
    deptName: '',
    id:'',
  };
  private clearSelectedCitysList: boolean = false;
  private dialog: any = {
    area: false,
  };
  private areaIds = [];

  private proinviceList: any[] = []; // 省
  private cityList: any[] = []; //市
  private areaCodeIds: string = ''; //催收区域id
  private selectedCitysList: any[] = [];

  //验证
  private rules: any = {
    name: [{ required: true, message: '请填写受托方' ,trigger: 'blur'}],
    organizationType: [{ required: true, message: '请选择机构类型', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    // areaIds: [{ required: true, message: '请选择地区', trigger: 'blur' }],
    address: [{ required: true, message: '请填写具体地址', trigger: 'blur' }],
    linkPhone: [{ required: true, message: '请填写联系人手机号码', trigger: 'blur' }],
    linkMan: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
    // selectedCitysList: [{ required: true, message: '请选择催收区域', trigger: 'blur' }],
  };

  private mounted() {
    this.formData();
  }

  @Watch('caseRow')
  private onCaseRowChange() {
    this.formData();
  }

  //数据回显
  private formData() {
    this.initProperty();
    this.getProvinces();
    //   重置form表单xr
    const addForm: any = this.$refs['add-form'];
    addForm.resetFields();
    this.form = this.caseRow
    this.selectedCitysList = []
    

    const arr = this.$city.getCityParent(Number(this.form.areaId));
    this.areaIds = arr ? arr.concat([Number(this.form.areaId)]) : [];
    //需要去掉,
    if (this.form.areaCodeIds) {
      const temp = this.form.areaCodeIds.split(',').filter((item) => {
        return item;
      });
      const Ids = temp.map((val) => Number(val));
      this.selectedCitysList = Ids.map((val) => {
        return {
          value: val,
          label: this.$city.getCityNameById(val),
        };
      });
    }
  }

  //获取省数据
  private getProvinces() {
    this.proinviceList = CityService.getCityData({ level: 1 });
  }

  //获取市
  private getCitys(provinceId) {
    this.cityList = this.$city.getCityData({ level: 1, id: provinceId }); // 城市列表
  }

  private selectedCitysClose() {
    this.selectedCitysList = (this.$refs
      .area as AreaSelection).getCheckedCitys();
  }

  private refresh(dept) {}

  /**
   * 确认
   */
  private commit() {
    const addForm: any = this.$refs['add-form'];
    if (this.selectedCitysList) {
      this.selectedCitysList.map((v) => {
        this.areaCodeIds += v.value + ',';
      });
    }

    const [prinPrid, prinCityid, prinCtyid] = this.areaIds;
    this.form.areaId = prinCtyid || prinCityid || prinPrid;

    const param = {
      areaCodeIds: this.areaCodeIds,
      areaId: this.form.areaId,
      deptId: this.form.companyType,
      outSourceType: this.form.organizationType,
      outsAddress: this.form.address,
      outsContacts: this.form.linkMan,
      outsName: this.form.name,
      outsPhone: this.form.linkPhone,
      outsRemark: this.form.remark,
      outsourceStatus: this.form.status,
      email: this.form.email,
      id: this.caseRow.id,
    };
    addForm.validate((valid) => {
      if (!valid) return false;
      this.outsourceCommissionedService.modifyCutsource(param).subscribe(
        (data) => {
          //   重置form表单xr
          const addForm: any = this.$refs['add-form'];
          addForm.resetFields();
          this.form = {};
          this.areaCodeIds = '';
          //   关闭dialog
          this.$emit('close');
          this.$message.success("保持成功!");
          //   刷新databox
          this.$emit('refreshData');
        },
        ({ msg }) => {
          this.$message(msg);
        },
      );
    });
  }
  /**
   * 取消
   */
  private cancel() {
    // //   重置form表单
    const addForm: any = this.$refs['add-form'];
    addForm.resetFields();
    this.formData();
    // this.areaCodeIds = '';
    this.caseRow = {};
    // this.initProperty();
    //   关闭dialog
    this.$emit('close');
  }
  /**
   * 初始化参数
   */
  private initProperty(){
      this.form = {
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
        deptName: '',
        idL:'',
    };
  }

  private closeArea(){
    this.dialog.area = false;
  }
  private saveArea(){
    this.dialog.area = false;
    this.selectedCitysClose();
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
<style lang='less' scoped>
#app .page .el-form .el-form-item .el-select.address .el-input {
  width: 100%;
}
  .my-tag{
    display: inline-block;
    background-color: rgba(64,158,255,.1);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409EFF;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
  }
</style>
