// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'D:/XIA/newest/lingwa_lds_SSAM/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelRoleInfo0 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/authorityManagement/roleInfo.js';
import ModelRoleInfos1 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/authorityManagement/roleInfos.js';
import ModelUserInfo2 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/authorityManagement/userInfo.js';
import ModelEcharts3 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/echarts/echarts.js';
import ModelGlobal4 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/global.js';
import ModelLogin5 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/login.js';
import ModelClassMaintain6 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/classMaintain.js';
import ModelDepartment7 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/department.js';
import ModelHolidayMain8 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/holidayMain.js';
import ModelPersonnel9 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/personnel.js';
import ModelPersonnelOk10 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/personnelOk.js';
import ModelTimeInfo11 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/timeInfo.js';
import ModelTimeMaintain12 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/timeMaintain.js';
import ModelLine13 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/line.js';
import ModelNumber14 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/number.js';
import ModelPprType15 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/pprType.js';
import ModelProductAndLine16 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/productAndLine.js';
import ModelProductGroup17 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/productGroup.js';
import ModelProductType18 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/productType.js';
import ModelRedInfo19 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/redInfo.js';
import ModelRegion20 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/region.js';
import ModelAmoutInfo21 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/receivavles/amoutInfo.js';
import ModelReceivablesInfo22 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/receivavles/receivablesInfo.js';
import ModelUsequantityInfo23 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/receivavles/usequantityInfo.js';
import ModelRoute24 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/route.js';
import ModelLineData25 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/lineData.js';
import ModelLineOee26 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/lineOee.js';
import ModelPersonnelNum27 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/personnelNum.js';
import ModelProductData28 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/productData.js';
import ModelProductKe29 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/productKe.js';
import ModelProductOee30 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/productOee.js';
import ModelRedOption31 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/redOption.js';
import ModelRegionData32 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/regionData.js';
import ModelTsSearch33 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/tsSearch.js';
import ModelWorkHours34 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/workHours.js';
import ModelSetting35 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/setting.js';
import ModelClassMain36 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/classMain.js';
import ModelDayFrequency37 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/dayFrequency.js';
import ModelOperatorlog38 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/operatorlog.js';
import ModelPprInfo39 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/pprInfo.js';
import ModelProductKpi40 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/productKpi.js';
import ModelSupportInput41 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/supportInput.js';
import ModelSupportTarea42 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/supportTarea.js';
import ModelSupportTime43 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/supportTime.js';
import ModelTimeT0T344 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/timeT0T3.js';
import ModelTimeT445 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/timeT4.js';
import ModelTimeT546 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/timeT5.js';
import ModelUnscheduled47 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/unscheduled.js';
import ModelYieldInfo48 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/yieldInfo.js';
import ModelUser49 from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/user.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'roleInfo', ...ModelRoleInfo0 });
app.model({ namespace: 'roleInfos', ...ModelRoleInfos1 });
app.model({ namespace: 'userInfo', ...ModelUserInfo2 });
app.model({ namespace: 'echarts', ...ModelEcharts3 });
app.model({ namespace: 'global', ...ModelGlobal4 });
app.model({ namespace: 'login', ...ModelLogin5 });
app.model({ namespace: 'classMaintain', ...ModelClassMaintain6 });
app.model({ namespace: 'department', ...ModelDepartment7 });
app.model({ namespace: 'holidayMain', ...ModelHolidayMain8 });
app.model({ namespace: 'personnel', ...ModelPersonnel9 });
app.model({ namespace: 'personnelOk', ...ModelPersonnelOk10 });
app.model({ namespace: 'timeInfo', ...ModelTimeInfo11 });
app.model({ namespace: 'timeMaintain', ...ModelTimeMaintain12 });
app.model({ namespace: 'line', ...ModelLine13 });
app.model({ namespace: 'number', ...ModelNumber14 });
app.model({ namespace: 'pprType', ...ModelPprType15 });
app.model({ namespace: 'productAndLine', ...ModelProductAndLine16 });
app.model({ namespace: 'productGroup', ...ModelProductGroup17 });
app.model({ namespace: 'productType', ...ModelProductType18 });
app.model({ namespace: 'redInfo', ...ModelRedInfo19 });
app.model({ namespace: 'region', ...ModelRegion20 });
app.model({ namespace: 'amoutInfo', ...ModelAmoutInfo21 });
app.model({ namespace: 'receivablesInfo', ...ModelReceivablesInfo22 });
app.model({ namespace: 'usequantityInfo', ...ModelUsequantityInfo23 });
app.model({ namespace: 'route', ...ModelRoute24 });
app.model({ namespace: 'lineData', ...ModelLineData25 });
app.model({ namespace: 'lineOee', ...ModelLineOee26 });
app.model({ namespace: 'personnelNum', ...ModelPersonnelNum27 });
app.model({ namespace: 'productData', ...ModelProductData28 });
app.model({ namespace: 'productKe', ...ModelProductKe29 });
app.model({ namespace: 'productOee', ...ModelProductOee30 });
app.model({ namespace: 'redOption', ...ModelRedOption31 });
app.model({ namespace: 'regionData', ...ModelRegionData32 });
app.model({ namespace: 'tsSearch', ...ModelTsSearch33 });
app.model({ namespace: 'workHours', ...ModelWorkHours34 });
app.model({ namespace: 'setting', ...ModelSetting35 });
app.model({ namespace: 'classMain', ...ModelClassMain36 });
app.model({ namespace: 'dayFrequency', ...ModelDayFrequency37 });
app.model({ namespace: 'operatorlog', ...ModelOperatorlog38 });
app.model({ namespace: 'pprInfo', ...ModelPprInfo39 });
app.model({ namespace: 'productKpi', ...ModelProductKpi40 });
app.model({ namespace: 'supportInput', ...ModelSupportInput41 });
app.model({ namespace: 'supportTarea', ...ModelSupportTarea42 });
app.model({ namespace: 'supportTime', ...ModelSupportTime43 });
app.model({ namespace: 'timeT0T3', ...ModelTimeT0T344 });
app.model({ namespace: 'timeT4', ...ModelTimeT445 });
app.model({ namespace: 'timeT5', ...ModelTimeT546 });
app.model({ namespace: 'unscheduled', ...ModelUnscheduled47 });
app.model({ namespace: 'yieldInfo', ...ModelYieldInfo48 });
app.model({ namespace: 'user', ...ModelUser49 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
