// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/XIA/newest/lingwa_lds_SSAM/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'D:/XIA/newest/lingwa_lds_SSAM/src/layouts/UserLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "name": "login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/user/login'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'D:/XIA/newest/lingwa_lds_SSAM/src/layouts/SecurityLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'D:/XIA/newest/lingwa_lds_SSAM/src/layouts/BasicLayout'), loading: LoadingComponent}),
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/",
            "redirect": "/welcome",
            "exact": true
          },
          {
            "path": "/welcome",
            "name": "welcome",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/Welcome'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/organization",
            "name": "组织架构",
            "icon": "ClusterOutlined",
            "routes": [
              {
                "path": "/organization/department",
                "name": "部门管理",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__organization__department' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/organization/department'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/organization/personnel",
                "name": "员工管理",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__organization__personnel' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/organization/personnel'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/organization/timeMaintain",
                "name": "班次信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__organization__timeMaintain' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/organization/timeMaintain'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/organization/classMaintain",
                "name": "班别信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__organization__classMaintain' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/organization/classMaintain'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/organization/timeInfo",
                "name": "时间信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__organization__timeInfo' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/organization/timeInfo'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/organization/holidayMain",
                "name": "休假选项维护",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__organization__holidayMain' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/organization/holidayMain'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/organization/personnelOk",
                "name": "员工确认",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__organization__personnelOk' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/organization/personnelOk'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/product",
            "name": "生产信息",
            "icon": "BarChartOutlined",
            "routes": [
              {
                "path": "/product/pprType",
                "name": "PPR类型管理",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__pprType' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/pprType'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/product/number",
                "name": "产品信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__number' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/number'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/product/productType",
                "name": "产品类型",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__productType' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/productType'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/product/productAndLine",
                "name": "产品与线体关系",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__productAndLine' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/productAndLine'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/product/productGroup",
                "name": "工厂信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__productGroup' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/productGroup'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/product/region",
                "name": "产品族信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__region' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/region'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/product/line",
                "name": "线体信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__line' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/line'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/product/redInfo",
                "name": "红色项信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__product__redInfo' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/product/redInfo'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/time",
            "name": "时间录入",
            "icon": "ClockCircleOutlined",
            "routes": [
              {
                "path": "/time/yieldInfo",
                "name": "产量信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__yieldInfo' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/yieldInfo'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/dayFrequency",
                "name": "每日排班管理",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__dayFrequency' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/dayFrequency'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/productKpi",
                "name": "产品族KPI管理",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__productKpi' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/productKpi'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/supportInput",
                "name": "支持部门录入",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__supportInput' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/supportInput'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/supportTime",
                "name": "支持时间录入",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__supportTime' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/supportTime'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/supportTarea",
                "name": "支持时间区域录入",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__supportTarea' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/supportTarea'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/unscheduled",
                "name": "已登录未排版人员",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__unscheduled' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/unscheduled'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/operatorlog",
                "name": "员工考勤",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__operatorlog' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/operatorlog'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/classMain",
                "name": "班别班次维护",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__classMain' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/classMain'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/timeT0T3",
                "name": "T0-T3信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__timeT0T3' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/timeT0T3'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/timeT4",
                "name": "T4信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__timeT4' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/timeT4'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/timeT5",
                "name": "T5信息",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__timeT5' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/timeT5'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/time/pprInfo",
                "name": "PPR维护",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__time__pprInfo' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/time/pprInfo'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/search",
            "name": "查询管理",
            "icon": "SearchOutlined",
            "routes": [
              {
                "path": "/search/tsSearch",
                "name": "TS查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__tsSearch' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/tsSearch'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/regionData",
                "name": "产品族KE查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__regionData' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/regionData'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/lineData",
                "name": "线体KE查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__lineData' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/lineData'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/redOption",
                "name": "红色项查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__redOption' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/redOption'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/workHours",
                "name": "工时查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__workHours' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/workHours'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/personnelNum",
                "name": "人员统计查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__personnelNum' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/personnelNum'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/productOee",
                "name": "产品族OEE查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__productOee' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/productOee'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/lineOee",
                "name": "线体OEE查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__lineOee' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/lineOee'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/search/productKe",
                "name": "产品族KE查询",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__search__productKe' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/search/productKe'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/authorityManagement",
            "name": "角色管理",
            "icon": "SettingOutlined",
            "routes": [
              {
                "path": "/authorityManagement/userInfo",
                "name": "用户管理",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__authorityManagement__userInfo' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/authorityManagement/userInfo'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/authorityManagement/roleInfo",
                "name": "角色管理",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__authorityManagement__roleInfo' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/authorityManagement/roleInfo'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/XIA/newest/lingwa_lds_SSAM/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
