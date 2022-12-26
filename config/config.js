// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    // dark: true, 
    // compact: true,
  },
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },

  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [

        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            // {
            //   path: '/echarts',
            //   name: '数据分析',
            //   icon: 'smile',
            //   component: '../pages/echarts',
            // },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },

            {
              path: '/organization',
              name: '组织架构',
              icon: 'ClusterOutlined',
              routes: [
                {
                  path: '/organization/department',
                  name: '部门管理',
                  icon: 'smile',
                  component: '../pages/organization/department',
                },
                {
                  path: '/organization/personnel',
                  name: '员工管理',
                  icon: 'smile',
                  component: '../pages/organization/personnel',
                },
                {
                  path: '/organization/timeMaintain',
                  name: '班次信息',
                  icon: 'smile',
                  component: '../pages/organization/timeMaintain',
                },

                {
                  path: '/organization/classMaintain',
                  name: '班别信息',
                  icon: 'smile',
                  component: '../pages/organization/classMaintain',
                },

                {
                  path: '/organization/timeInfo',
                  name: '时间信息',
                  icon: 'smile',
                  component: '../pages/organization/timeInfo',
                },

                {
                  path: '/organization/holidayMain',
                  name: '休假选项维护',
                  icon: 'smile',
                  component: '../pages/organization/holidayMain',
                },

                {
                  path: '/organization/personnelOk',
                  name: '员工确认',
                  icon: 'smile',
                  component: '../pages/organization/personnelOk',
                },



              ],
            },

            {
              path: '/product',
              name: '生产信息',
              icon: 'BarChartOutlined',
              routes: [

                {
                  path: '/product/pprType',
                  name: 'PPR类型管理',
                  icon: 'smile',
                  component: '../pages/product/pprType',
                },

                {
                  path: '/product/number',
                  name: '产品信息',
                  icon: 'smile',
                  component: '../pages/product/number',
                },

                {
                  path: '/product/productType',
                  name: '产品类型',
                  icon: 'smile',
                  component: '../pages/product/productType',
                },

                {
                  path: '/product/productAndLine',
                  name: '产品与线体关系',
                  icon: 'smile',
                  component: '../pages/product/productAndLine',
                },

                {
                  path: '/product/productGroup',
                  name: '工厂信息',
                  icon: 'smile',
                  component: '../pages/product/productGroup',
                },
                {
                  path: '/product/region',
                  name: '产品族信息',
                  icon: 'smile',
                  component: '../pages/product/region',
                },
                {
                  path: '/product/line',
                  name: '线体信息',
                  icon: 'smile',
                  component: '../pages/product/line',
                },
                {
                  path: '/product/redInfo',
                  name: '红色项信息',
                  icon: 'smile',
                  component: '../pages/product/redInfo',
                },

              ],
            },

            {
              path: '/time',
              name: '时间录入',
              icon: 'ClockCircleOutlined',
              routes: [

                {
                  path: '/time/yieldInfo',
                  name: '产量信息',
                  icon: 'smile',
                  component: '../pages/time/yieldInfo',
                },

                {
                  path: '/time/dayFrequency',
                  name: '每日排班管理',
                  icon: 'smile',
                  component: '../pages/time/dayFrequency',
                },

                {
                  path: '/time/productKpi',
                  name: '产品族KPI管理',
                  icon: 'smile',
                  component: '../pages/time/productKpi',
                },

                {
                  path: '/time/supportInput',
                  name: '支持部门录入',
                  icon: 'smile',
                  component: '../pages/time/supportInput',
                },

                {
                  path: '/time/supportTime',
                  name: '支持时间录入',
                  icon: 'smile',
                  component: '../pages/time/supportTime',
                },

                {
                  path: '/time/supportTarea',
                  name: '支持时间区域录入',
                  icon: 'smile',
                  component: '../pages/time/supportTarea',
                },

                {
                  path: '/time/unscheduled',
                  name: '已登录未排版人员',
                  icon: 'smile',
                  component: '../pages/time/unscheduled',
                },

                {
                  path: '/time/operatorlog',
                  name: '员工考勤',
                  icon: 'smile',
                  component: '../pages/time/operatorlog',
                },

                {
                  path: '/time/classMain',
                  name: '班别班次维护',
                  icon: 'smile',
                  component: '../pages/time/classMain',
                },

                {
                  path: '/time/timeT0T3',
                  name: 'T0-T3信息',
                  icon: 'smile',
                  component: '../pages/time/timeT0T3',
                },
                {
                  path: '/time/timeT4',
                  name: 'T4信息',
                  icon: 'smile',
                  component: '../pages/time/timeT4',
                },
                {
                  path: '/time/timeT5',
                  name: 'T5信息',
                  icon: 'smile',
                  component: '../pages/time/timeT5',
                },

                {
                  path: '/time/pprInfo',
                  name: 'PPR维护',
                  icon: 'smile',
                  component: '../pages/time/pprInfo',
                },
 
              ],
            },


            {
              path: '/search',
              name: '查询管理',
              icon: 'SearchOutlined',
              routes: [
                {
                  path: '/search/tsSearch',
                  name: 'TS查询',
                  icon: 'smile',
                  component: '../pages/search/tsSearch',
                },
                {
                  path: '/search/regionData',
                  name: '产品族KE查询',
                  icon: 'smile',
                  component: '../pages/search/regionData',
                },

                {
                  path: '/search/lineData',
                  name: '线体KE查询',
                  icon: 'smile',
                  component: '../pages/search/lineData',
                },

                {
                  path: '/search/redOption',
                  name: '红色项查询',
                  icon: 'smile',
                  component: '../pages/search/redOption',
                },
                {
                  path: '/search/workHours',
                  name: '工时查询',
                  icon: 'smile',
                  component: '../pages/search/workHours',
                },
                {
                  path: '/search/personnelNum',
                  name: '人员统计查询',
                  icon: 'smile',
                  component: '../pages/search/personnelNum',
                },

                {
                  path: '/search/productOee',
                  name: '产品族OEE查询',
                  icon: 'smile',
                  component: '../pages/search/productOee',
                },

                {
                  path: '/search/lineOee',
                  name: '线体OEE查询',
                  icon: 'smile',
                  component: '../pages/search/lineOee',
                },

                {
                  path: '/search/productKe',
                  name: '产品族KE查询',
                  icon: 'smile',
                  component: '../pages/search/productKe',
                },
              ],
            },

            {
              path: '/authorityManagement',
              name: '角色管理',
              icon: 'SettingOutlined',
              routes: [
                {
                  path: '/authorityManagement/userInfo',
                  name: '用户管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/userInfo',
                },
                {
                  path: '/authorityManagement/roleInfo',
                  name: '角色管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/roleInfo',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },



  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // theme: {
  //   // ...darkTheme,
  //   'primary-color': defaultSettings.primaryColor,
  // },
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'font-size-base': '14px',
    'badge-font-size': '12px',
    'btn-font-size-lg': '@font-size-base',
    'menu-dark-bg': '#00182E',
    'menu-dark-submenu-bg': '#000B14',
    // 'layout-sider-background': '#00182E',
    // 'layout-sider-background': '#008351',
    'layout-sider-background': '#008450',
    'layout-body-background': '#f0f2f5',



  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
