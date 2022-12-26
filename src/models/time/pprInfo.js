import { stringify } from 'querystring';
import { history } from 'umi';
import {
  postListInit,
  GetproductnoText
} from '@/services/time/pprInfo';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';
import Item from 'antd/lib/list/Item';

const TableName = 'pprInfo'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    ProductNoList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {

        if (location.pathname == `/time/${TableName}`) {
         
          dispatch({
            type: "GetproductnoText",
            payload: {},
          });

        }
      })
    },
  },
  effects: {

       //获取产品编号
    *GetproductnoText({ payload }, { call, put, select }) {
      const data = yield call(GetproductnoText);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "GetproductnoText",
            data: data.list,
          },
        });
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
       if (payload.type === "GetproductnoText") {
        return {
          ...state, ...payload,
          ProductNoList: payload.data
        }
      } else if (payload.type === 'postListInit') {
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
