<template>
  <section class="component work-newmessage">
    <div v-for="item of messageList" :key="item.id" class="reminderItem" @click="dialog.messageDetail = true,$nextTick(()=>currentMessage=item)" style="height:70px;position:relative;cursor:pointer;">
      <div class="text-left" style="padding-top:10px;">
        <div :style="getReminderStyle(item.state)" style="float:left;margin-left:-5px;padding-right:5px;">【{{item.type|enumConvert('reminderType')}}】</div>
        <div style="color:#28313E">{{item.title}}</div>
      </div>
      <div class="text-right" style="position:absolute;bottom:3px;right:5px;color:#8C8C8C">{{item.createTime | dateFormat}}</div>
    </div>
    <div class="bottom text-right">
      <span style="cursor:pointer" @click="commit('updateMessageBoxVisible', true)">更多...</span>
    </div>
    <el-dialog title="消息详情" :visible.sync="dialog.messageDetail" append-to-body>
      <message-detail :message="currentMessage" @readChange="refreshData"></message-detail>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from '~/store';
import { createNamespacedHelpers } from 'vuex';
import MessageBox from "~/components/workspace/message/message-box.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";
import { ReminderMessageService } from "~/services/reminder-service/reminder-message.service";
import MessageDetail from "~/components/workspace/message/message-detail.vue";

@Component({
  components: {
    SvgIcon,
    MessageDetail
  }
})
export default class WorkNewMessage extends Vue {

}
</script>

<style lang="less" scoped>
.component.work-newmessage{
  width:280px;
}
</style>
