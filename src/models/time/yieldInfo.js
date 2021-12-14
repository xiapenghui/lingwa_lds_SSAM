import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDepartement,
  postListInit,
  getProduct,
  getPerson,
  getTimeaxis,
  getShif,
  getArea,
  getLine,
  getRed,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/time/yieldInfo';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';
import Item from 'antd/lib/list/Item';

const TableName = 'yieldInfo'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    departmentList: {},
    personList: {},
    productList: {},
    shifList: {},
    areaList: {},
    lineList: {},
    redList: {},
    timeaxisList: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {

        if (location.pathname == `/time/${TableName}`) {

          dispatch({
            type: 'getDepartement',
            payload: {}
          })

          dispatch({
            type: 'getProduct',
            payload: {}
          })

          dispatch({
            type: 'getPerson',
            payload: {
              departmentid: 0
            }
          })

          dispatch({
            type: 'getShif',
            payload: {}
          })


          dispatch({
            type: 'getArea',
            payload: {}
          })

          dispatch({
            type: 'getLine',
            payload: {}
          })

          dispatch({
            type: 'getTimeaxis',
            payload: {}
          })

          dispatch({
            type: 'getRed',
            payload: {
              "type": "T4"
            }
          })


        }
      })
    },
  },
  effects: {
    /**
     *
     * @param {getDepartement} 查询初始化
     * @param {query} 查询
     */

    // 部门
    * getDepartement({
      payload,
    }, { call, put, select }) {

      const data = yield call(getDepartement)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {

        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getDepartement',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },


    // 员工
    * getPerson({
      payload,
    }, { call, put, select }) {

      const data = yield call(getPerson, payload)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {

        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getPerson',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },


    // 班次
    * getShif({
      payload,
    }, { call, put, select }) {

      const data = yield call(getShif)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {

        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getShif',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },




    // 查询工厂名称信息
    * getProduct({
      payload,
    }, { call, put, select }) {
      const data = yield call(getProduct)
      if (data.status !== '200') {

        return message.error(data.message);
      } else if (data.status == '200') {

        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getProduct',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },

    // 区域信息
    * getArea({
      payload,
    }, { call, put, select }) {
      const data = yield call(getArea)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getArea',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },


    // 线体信息
    * getLine({
      payload,
    }, { call, put, select }) {
      const data = yield call(getLine)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getLine',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },


    // 红色项信息
    * getRed({
      payload,
    }, { call, put, select }) {
      const data = yield call(getRed, payload)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getRed',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },



    // 时间段信息
    * getTimeaxis({
      payload,
    }, { call, put, select }) {
      const data = yield call(getTimeaxis, payload)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getTimeaxis',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },




    * query({
      payload,
    }, { call, put, select }) {
      const data = yield call(postListInit, payload)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'postListInit',
            data: data.list
          }
        })
        return message.success(data.message);
      }
    },
  },
  reducers: {
    querySuccessed(state, { payload }) {
      if (payload.type === 'getDepartement') {

        return {
          ...state, ...payload,
          departmentList: payload.data,
        }

      } else if (payload.type === "getPerson") {

        return {
          ...state, ...payload,
          personList: payload.data
        }
      }

      else if (payload.type === "getProduct") {

        return {
          ...state, ...payload,
          productList: payload.data
        }
      }

      else if (payload.type === "getShif") {

        return {
          ...state, ...payload,
          shifList: payload.data
        }
      }

      else if (payload.type === "getArea") {

        return {
          ...state, ...payload,
          areaList: payload.data
        }
      }
      else if (payload.type === "getLine") {

        return {
          ...state, ...payload,
          lineList: payload.data
        }
      }

      else if (payload.type === "getRed") {
        return {
          ...state, ...payload,
          redList: payload.data
        }
      }

      else if (payload.type === "getTimeaxis") {
        return {
          ...state, ...payload,
          timeaxisList: payload.data
        }
      }




      else if (payload.type === 'postListInit') {
        return {
          ...state,
          TableList: new Promise(resolve => {
            resolve({
              data: payload.data.list,
              current: payload.data.pageNum,
              pageSize: payload.data.pageSize,
              success: true,
              total: payload.data.total
            })
          })
        };
      }

    },
  },
};
export default Model;
