import { domainService } from '~/config/server';
import { NetService } from '~/utils/net.service';
import { Inject, Debounce } from '~/core/decorator';
import { Service } from '~/core/service';

export class CaseOperatorPageService extends Service {
  @Inject(NetService)
  private netService: NetService;

  /**
   * 分页查询跟进
   */
  public caseFollowupRecord(data, page, sort) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.caseFollowupRecord,
      data,
      page,
      sort,
    });
  }
  /**
   * 电话录音查询列表
   */
  public caseTelRecord(data, page, sort) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.caseTelRecord,
      data,
      page,
      sort,
    });
  }

  /**
   * 增加催收总结
   */
  public addCaseTelRecord(data) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.addCaseTelRecord,
      data,
    });
  }
  /**
   * 客户开户信息查询
   */
  public personalBankInfo(caseId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.personalBankInfo,
      data: {
        caseId
      },
    });
  }
  /**
   * 客户联系人信息查询
   */
  public personalContacts(caseId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.personalContacts,
      data: {
        caseId
      },
    });
  }
  /**
   * 客户信息查询
   */
  public personalInfo(caseId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.personalInfo,
      data: {
        caseId
      },
    });
  }
  /**
   * 执行页顶部信息
   */
  public topInfo(data) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.topInfo,
      data,
    });
  }

  /**
   * 客户房产信息
   */
  public queryPersonalHouse(caseId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.queryPersonalHouse,
      data: {
        caseId
      },
    });
  }

  /**
   * 客户收支状况查询
   */
  public queryPersonalIncome(caseId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.queryPersonalIncome,
      data: {
        caseId
      },
    });
  }

  /**
   * 产品信息查询
   */
  public queryProduct(caseId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.queryProduct,
      data: {
        caseId
      },
    });
  }

  /**
   * 产品信息查询
   */
  public queryCaseInfo(caseId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.queryCaseInfo,
      data: {
        caseId
      },
    });
  }
  /**
   * 共债信息查询
   */
  public queryDebtCaseInfo(data) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.queryDebtCaseInfo,
      data,
    });
  }

  /**
   * 案件备注分页查询
   */
  public caseRemark(data, page, sort) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.caseRemark,
      data,
      page,
      sort,
    });
  }

  /**
   * 添加案件备注
   */
  public addCaseRemark(data) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.addCaseRemark,
      data,
    });
  }

  /**
   * 客户联系人地址信息查询
   */
  public queryPersonalAddress(data, page, sort) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.queryPersonalAddress,
      data,
      page,
      sort,
    });
  }

  /**
   * 增加催收跟进
   */
  public addCaseFollowupRecord(append, data) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.addCaseFollowupRecord,
      append,
      data,
    });
  }

  /**
   * 查询催收总结
   */
  public findCaseTelRecord(data, page) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.findCaseTelRecord,
      data,
      page,
    });
  }

  /**
   * 申请历史
   */
  public caseApplyHistory(data, page) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.caseApplyHistory,
      data,
      page,
    });
  }
  /**
   * 催收执行页面--通讯录--添加联系人
   * @param data 
   * @param loading 
   */
  @Debounce()
  public addPersonalContact(data: any) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.addPersonalContact,
      data,
      loading: true
    })
  }
  /**
   * 催收执行页面--通讯录--删除联系人
   * @param data 
   */
  @Debounce()
  public deletePersonalContact(personalId: string) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.deletePersonalContact,
      data: {
        id: personalId
      },
      loading: true
    })
  }

  /**
   * 催收执行页面--行动区--流转历史
   * @param data 
   */
  public getAllCaseTurnRecords(data, page) {
    return this.netService.send({
      server: domainService.caseOperatorPageController.getAllCaseTurnRecords,
      data,
      page,
    })
  }
}
