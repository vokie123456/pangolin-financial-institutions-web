<template>
  <section class="component file-upload" :class="{'disable':disableUpload}">
    <el-upload :headers="headers" ref="upload" class="upload" multiple :before-upload="onBeforeUpload" :before-remove="onBeforeRemove" :file-list="fileList" :action="uploadUrl" :limit="fileNumberLimit?fileNumberLimit:null" :show-file-list="true" :on-success="onSucess" :on-progress="onProgress" :on-error="onError" :on-change="onChange" :on-remove="onRemove" :disabled="disabled">
      <el-button @click="clickHandle" :disabled="disabled" style="margin:0 10px 10px 10px;">上传文件</el-button>
    </el-upload>
  </section>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop, Emit } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Dependencies } from '~/core/decorator';
import { NetService } from '~/utils/net.service';
import { commonService } from '~/config/server';
import app from '~/config/app.config';
import { Upload } from 'element-ui';
import { StorageService } from '~/utils/storage.service';
import { FileUploadService } from "~/services/file-service/file-upload.service";

@Component({
  components: {},
})
export default class FileUpload extends Vue {
  @Dependencies(FileUploadService)
  private FileUpload: FileUploadService;
  @State
  private userToken;
  // 是否显示文件列表
  @Prop({ default: true })
  private showFileList;

  //按钮禁用
  @Prop()
  private disabled;
  // 允许的文件后缀类型
  @Prop({
    type: Array,
  })
  private AllowExtension;

  @Prop({
    type: String,
  })
  private recordFildId;

  // 文件数量限制
  @Prop({
    default: false,
    type: [Boolean, Number],
  })
  private fileNumberLimit;

  // 文件带下限制
  @Prop({
    default: 100,
    type: Number,
  })
  private fileSizeLimit;

  // 文件列表
  @Prop({
    default: () => [],
    type: Array,
  })
  private fileList;
  // 上传成功回调事件
  @Emit('onUploadSuccess')
  private onUploadSucess(id, data) {}

  // 上传进度回调事件
  @Emit('onUploadProgress')
  private onUploadProgress(id, percent) {}

  // 上传异常回调事件
  @Emit('onUploadError')
  private onUploadError(id, error) {}

  // 更新文件列表
  @Emit('update:fileList')
  private updateFileList(fileList) {}

  //删除成功的回调事件
  @Emit('onUploadRemove')
  private onUploadRemove() {}

  // 上传文件回显
  @Watch('recordFildId')
  private recordFildIdChange(val) {
    const fileList: any = []
    if (val) {
      val.split(',').map(val => {
        if (val) {
          this.FileUpload.getUploadFile(val).subscribe(data => {
            const temp: any = { ...data }
            temp.name = data.originalName
            temp.response = {}
            temp.response.id = data.id
            fileList.push(temp)
          })
        }
      })
    }
    this.updateFileList(fileList)
  }

  // 获取上传文件头部信息
  private get headers() {
    const token = StorageService.getItem('userToken') || '';
    return {
      'X-UserToken': token,
    };
    // return {
    //   "X-UserToken": this.userToken
    // };
  }

  /**
   * 是否禁止上传
   */
  private get disableUpload() {
    return this.fileNumberLimit
      ? this.fileList.length >= this.fileNumberLimit
      : false;
  }

  /**
   * 上传路径
   */
  private get uploadUrl() {
    return [
      app.url.server,
      NetService.generateRequestUrl(commonService.uploadFileController.upload),
    ].join('/');
  }

  private clickHandle(event) {
    if (this.disableUpload) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /**
   * 上传成功回调
   */
  private onSucess(data, { uid }) {
    this.onUploadSucess(uid, data);
  }

  /**
   * 上传进度回调
   */
  private onProgress({ percent }, { uid }) {}

  /**
   * 错误信息回调
   */
  private onError(err, file) {
    this.onUploadError(err, file);
  }

  /**
   * 文件上传状态改变回调
   */
  private onChange(file, uploadFileList) {
    switch (file.status) {
      case 'ready': {
        this.fileList.push({
          uid: file.uid,
          name: file.name,
          percentage: file.percentage,
          status: file.status,
        });
        break;
      }
    }

    this.updateFileList(this.fileList);
  }

  /**
   * 删除处理
   */
  private onRemove(file, fileList) {
    this.onUploadRemove();
    this.updateFileList(fileList);
  }

  /**
   * 删除预处理
   */
  private onBeforeRemove(file, fileList) {
    if (file.percentage === 0) {
      const list = fileList.filter((x) => x.uid !== file.uid);
      this.updateFileList(list);
      return false;
    }
    return this.$confirm('是否确定删除该文件?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    });
  }

  /**
   * 上传文件预处理
   * 上传文件大小限制
   */
  private onBeforeUpload({ name, size, uid }) {
    if (this.AllowExtension && this.AllowExtension.length) {
      // 文件名异常
      if (name.toString().split('.') < 2) {
        this.$message(`文件格式错误`);
        return false;
      }

      const [extension] = name.split('.').slice(-1);
      if (!this.AllowExtension.includes(extension)) {
        this.$message(`文件格式不符合要求`);
        return false;
      }
    }
    // 限制上传文件大小
    if (this.fileSizeLimit * 1024 * 1024 < size) {
      this.$message(`文件${name}超过上传文件大小限制${this.fileSizeLimit}MB`);
      return false;
    }
  }

  private reset() {
    const upload = this.$refs['upload'] as any;
    upload.clearFiles();
    this.updateFileList([]);
  }
}
</script>

<style lang="less">
.component.file-upload {
  .el-upload.el-upload--text {
    height: 25px !important;
  }
}
</style>
