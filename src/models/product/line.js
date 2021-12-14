import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getProduct,
  getArea,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/product/line';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'line'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    productList: {},
    areaList: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/product/${TableName}`) {

          dispatch({
            type: 'getProduct',
            payload: {}
          })
          
          dispatch({
            type: 'getArea',
            payload: {}
          })
        }
      })
    },
  },
  effects: {
    /**
     *
     * @param {getArea} 查询初始化
     * @param {query} 查询
     */


    //工厂

    * getProduct({
      payload,
    }, { call, put, select }) {
      const data = yield call(getProduct, payload)
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



    //区域
    * getArea({
      payload,
    }, { call, put, select }) {
      const data = yield call(getArea, payload)
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
        return message.success(data.message);
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
      if (payload.type === 'getArea') {
        return {
          ...state, ...payload,
          areaList: payload.data,
        }
      } else if (payload.type === "getProduct") {
        return {
          ...state, ...payload,
          productList: payload.data
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
