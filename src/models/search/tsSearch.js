import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getProduct,
  postListInit,
  getArea,
  getShif,
  getDepartement,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/search/tsSearch';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'tsSearch'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    productList: {},
    areaList: {},
    shifList: {},
    departmentList:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {

        if (location.pathname == `/search/${TableName}`) {
          dispatch({
            type: 'getProduct',
            payload: {}
          })

          dispatch({
            type: 'getArea',
            payload: {}
          })

          dispatch({
            type: 'getShif',
            payload: {}
          })

          dispatch({
            type: 'getDepartement',
            payload: {}
          })

        }
      })
    },
  },
  effects: {
    /**
     *
     * @param {getProduct} 查询初始化
     * @param {query} 查询
     */

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
        return message.success(data.message);
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
      return message.success(data.message);
    }
  },


    * query({
      payload,
    }, { call, put, select }) {
      debugger
      const data = yield call(postListInit, payload)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        debugger
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
      if (payload.type === 'getProduct') {
        return {
          ...state, ...payload,
          productList: payload.data
        }
      }
      else if (payload.type === "getArea") {

        return {
          ...state, ...payload,
          areaList: payload.data
        }
      }
      else if (payload.type === "getShif") {
        return {
          ...state, ...payload,
          shifList: payload.data
        }
      }
      if (payload.type === 'getDepartement') {
        return {
          ...state, ...payload,
          departmentList: payload.data
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
