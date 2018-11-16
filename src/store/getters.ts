import store from '~/store';

export default {
  /**
   * 用户部门数据
   * @param param0
   */
  departmentData(state) {
    const departmentList: any[] = state.departmentList;
    if (!departmentList) {
      return;
    }

    // 生成部门结构数据
    const fun = (node) => {
      // 递归对象子元素
      const children = departmentList
        .filter((x) => node.id === x.parentId)
        .map(fun);

      if (children && children.length) {
        return { ...node, children };
      } else {
        return node;
      }
    };

    // 过滤父节点
    const rootList = departmentList.filter((x) => {
      if (!x.parentId) {
        return true;
      }

      return !departmentList.find((item) => item.id === x.parentId);
    });

    // 生成树形结构
    return rootList.map(fun);
  },
  /**
   * 用户部门数据
   * @param param0
   */
  visitDepartmentData(state) {
    const departmentList: any[] = state.departmentList.filter(
      (x) => x.deptType === 'VISIT' && x.parentId,
    );

    if (!departmentList) {
      return;
    }

    // 生成部门结构数据
    const fun = (node) => {
      // 递归对象子元素
      const children = departmentList
        .filter((x) => node.id === x.parentId)
        .map(fun);

      if (children && children.length) {
        return { ...node, children };
      } else {
        return node;
      }
    };

    // 过滤父节点
    const rootList = departmentList.filter((x) => {
      if (!x.parentId) {
        return true;
      }

      return !departmentList.find((item) => item.id === x.parentId);
    });

    // 生成树形结构
    return rootList.map(fun);
  },

  /**
   * 电话催收部门数据
   * @param param0
   */
  callDepartmentData(state) {
    const departmentList: any[] = state.departmentList.filter(
      (x) => x.deptType === 'TEL' && x.parentId
    );

    if (!departmentList) {
      return;
    }
    // 生成部门结构数据
    const fun = (node) => {
      // 递归对象子元素
      const children = departmentList
        .filter((x) => node.id === x.parentId)
        .map(fun);

      if (children && children.length) {
        return { ...node, children };
      } else {
        return node;
      }
    };

    // 过滤父节点
    const rootList = departmentList.filter((x) => {
      if (!x.parentId) {
        return true;
      }

      return !departmentList.find((item) => item.id === x.parentId);
    });

    // 生成树形结构
    return rootList.map(fun);
  },

  /**
   * 外访部门数据无root
   * @param param0
   */
  visitDepartmentDataNoRoot(state) {
    console.log('外访state ====>',state);
    const departmentList: any[] = state.departmentList.filter(
      (x) => x.deptType === 'VISIT' && x.parentId,
    );

    if (!departmentList) {
      return;
    }
    // 生成部门结构数据
    const fun = (node) => {
      // 递归对象子元素
      const children = departmentList
        .filter((x) => node.id === x.parentId)
        .map(fun);

      if (children && children.length) {
        return { ...node, children };
      } else {
        return node;
      }
    };

    // 过滤父节点
    const rootList = departmentList.filter((x) => {
      if (!x.parentId) {
        return true;
      }

      return !departmentList.find((item) => item.id === x.parentId);
    });

    // 生成树形结构
    return rootList.map(fun);
  },

  /**
   * 返回是否超级管理员
   */
  isSupperAdmin(state) {
    return state.userData.companyCode === null;
  },

  /**
   * 欺诈部门数据无root
   * @param param0
   */
  cheatDepartmentDataNoRoot(state) {
    console.log('state ====>',state);
    const departmentList: any[] = state.departmentList.filter(
      (x) => x.deptType === 'CHEAT' && x.parentId,
    );

    if (!departmentList) {
      return;
    }
    // 生成部门结构数据
    const fun = (node) => {
      // 递归对象子元素
      const children = departmentList
        .filter((x) => node.id === x.parentId)
        .map(fun);
      if (children && children.length) {
        return { ...node, children };
      } else {
        return node;
      }
    };

    // 过滤父节点
    const rootList = departmentList.filter((x) => {
      if (!x.parentId) {
        return true;
      }

      return !departmentList.find((item) => item.id === x.parentId);
    });

    // 生成树形结构
    return rootList.map(fun);
  },

  /**
   * 诉讼部门数据无root
   * @param param0
   */
  lawDepartmentDataNoRoot(state) {
    console.log('state ====>',state);
    const departmentList: any[] = state.departmentList.filter(
      (x) => x.deptType === 'LAW' && x.parentId,
    );

    if (!departmentList) {
      return;
    }
    // 生成部门结构数据
    const fun = (node) => {
      // 递归对象子元素
      const children = departmentList
        .filter((x) => node.id === x.parentId)
        .map(fun);
      if (children && children.length) {
        return { ...node, children };
      } else {
        return node;
      }
    };

    // 过滤父节点
    const rootList = departmentList.filter((x) => {
      if (!x.parentId) {
        return true;
      }

      return !departmentList.find((item) => item.id === x.parentId);
    });

    // 生成树形结构
    return rootList.map(fun);
  },
  /**
   * 外诉部门数据无root
   * @param param0
   */
   OutLawDepartmentDataNoRoot(state) {
    console.log('state ====>',state);
    const departmentList: any[] = state.departmentList.filter(
      (x) => x.deptType === 'OUT_LAW' && x.parentId,
    );

    if (!departmentList) {
      return;
    }
    // 生成部门结构数据
    const fun = (node) => {
      // 递归对象子元素
      const children = departmentList
        .filter((x) => node.id === x.parentId)
        .map(fun);
      if (children && children.length) {
        return { ...node, children };
      } else {
        return node;
      }
    };

    // 过滤父节点
    const rootList = departmentList.filter((x) => {
      if (!x.parentId) {
        return true;
      }

      return !departmentList.find((item) => item.id === x.parentId);
    });

    // 生成树形结构
    return rootList.map(fun);
  }
};
