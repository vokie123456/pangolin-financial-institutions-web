<template>
  <section class="page dashboard user">
    <!--案件完成进度信息-->
    <el-row class="card-container">
      <el-col :span="9">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>周完成进度</span>
          </div>
          <div class="col between-span">
            <div>案件数完成进度</div>
            <el-progress :percentage="caseWeekProcess"></el-progress>
          </div>
          <div>
            <div>回款完成进度</div>
            <el-progress :percentage="caseWeekProcess"></el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="box-card">
          <div slot="header" class="card-header">
            <span>月完成进度</span>
          </div>
          <div>
            <div>案件数完成进度</div>
            <el-progress :percentage="caseWeekProcess"></el-progress>
          </div>
          <div>
            <div>回款完成进度</div>
            <el-progress :percentage="caseWeekProcess"></el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card class="box-card today">
          <div class="col middle-span between-span full">
            <div class="date">{{today.year}}年{{today.month}}月</div>
            <div class="day">{{today.day}}</div>
            <div class="week">{{today.week}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card class="box-card quick col  middle-span end-span " @click.native="getQuickAccessCaseInfo">
          <div class="row-span">
            <svg-icon class="svg-icon" iconName="quick" :iconSize="80"></svg-icon>
          </div>
          <div class="text-center">快速催收</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <follow-count-info></follow-count-info>
      </el-col>
      <el-col :span="12">
        <case-status-info></case-status-info>
      </el-col>
      <el-col :span="12">
        <repay-rank-list></repay-rank-list>
      </el-col>
      <el-col :span="12">
        <follow-rank-list></follow-rank-list>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Auth, Layout, Dependencies } from '~/core/decorator';
import { State, Action, namespace, Getter } from 'vuex-class';
import SvgIcon from '~/components/common/svg-icon.vue';
import CaseStatusInfo from '~/components/dashboard/user/case-status-info.vue';
import FollowCountInfo from '~/components/dashboard/user/follow-count-info.vue';
import FollowRankList from '~/components/dashboard/user/follow-rank-list.vue';
import RepayRankList from '~/components/dashboard/user/repay-rank-list.vue';
import { caseType, weekList } from '~/config/enum.config';

const accManageModule = namespace('acc-manage');

@Auth(-1)
@Layout('workspace')
@Component({
  components: {
    SvgIcon,
    CaseStatusInfo,
    FollowCountInfo,
    FollowRankList,
    RepayRankList,
  },
})
export default class User extends Vue {
  @State
  private userData;
  @accManageModule.Action
  private openAccCenter;
  private today = {};
  private caseCountData: any = {};
  private casetype = caseType;
  private getRatio(value: number, total: number) {
    if (value && total && value !== 0 && total !== 0) {
      return ((value / total) * 100).toFixed(2);
    } else {
      return 0;
    }
  }

  get caseWeekProcess() {
    return this.getRatio(
      this.caseCountData.caseWeekFinishedCount,
      this.caseCountData.caseWeekTotalCount,
    );
  }

  get repayWeekProcess() {
    return this.getRatio(
      this.caseCountData.caseWeekFinishedCount,
      this.caseCountData.caseWeekTotalCount,
    );
  }

  get caseMonthProcess() {
    return this.getRatio(
      this.caseCountData.caseWeekFinishedCount,
      this.caseCountData.caseWeekTotalCount,
    );
  }

  get repayMonthProcess() {
    return this.getRatio(
      this.caseCountData.caseWeekFinishedCount,
      this.caseCountData.caseWeekTotalCount,
    );
  }

  /**
   * 获取催收数据信息
   */
  private getCollectedCount() { }

  get caseType() {
    switch (this.userData.type) {
      case 1:
        return caseType.call;
      case 2:
        return caseType.visit;
      default:
        return '';
    }
  }

  private getQuickAccessCaseInfo() { }

  /**
   * 获取当天日期信息
   */
  private getTodayDate() {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      day: date
        .getDate()
        .toString()
        .padStart(2, '0'),
      week: weekList[date.getDay()],
    };
  }

  private mounted() {
    this.today = this.getTodayDate();
    this.getCollectedCount();
  }
}
</script>

<style lang="less" scoped>
.card-container {
  & > * {
    padding: 10px;
  }
}

.page.dashboard.user {
  .box-card {
    height: 150px;
  }

  .today {
    .day {
      font-size: 40px;
      padding: 18px;
    }
  }

  .quick {
    &:hover {
      background-color: #52b7ea;
      color: #fff;
      .svg-icon {
        color: #fff;
      }
    }
  }
}
</style>

<style lang="less">
.page.dashboard.user {
  .card-container {
    .card-header {
      height: 23px;
      & > *:nth-child(1) {
        font-size: 16px;
      }
      & > *:nth-child(2) {
        font-size: 12px;
      }
    }
  }
  .el-progress-bar {
    padding-right: 60px;
    margin-right: -67px;
  }
  .el-progress__text {
    width: 57px;
    text-align: right;
  }
}
</style>
