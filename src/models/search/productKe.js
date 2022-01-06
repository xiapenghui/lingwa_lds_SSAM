import { stringify } from 'querystring';
import { history } from 'umi';
import {
  postListInit,
  getProduct,
  getArea,
  getLine,
  getShif,
  GetproductnoText,
  GetProductLineTextIdText,
  getProductTypeTrue,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/search/productKe';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'productKe'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    productList: {},
    areaList: {},
    lineList: {},
    shifList: {},
    lineNoList: {},
    ProductTypeListTrue: {},
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
            type: "GetProductLineTextIdText",
            payload: {},
          });

          dispatch({
            type: "getProductTypeTrue",
            payload: {},
          });

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


     //获取线体编号
     *GetProductLineTextIdText({ payload }, { call, put, select }) {
      const data = yield call(GetProductLineTextIdText);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "GetProductLineTextIdText",
            data: data.list,
          },
        });
        return message.success(data.message);
      }
    },


     //获取产品类型信息
     *getProductTypeTrue({ payload }, { call, put, select }) {
      const data = yield call(getProductTypeTrue);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "getProductTypeTrue",
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
      if (payload.type === 'getProduct') {
        return {
          ...state, ...payload,
          productList: payload.data,
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
      else if (payload.type === "getLine") {

        return {
          ...state, ...payload,
          lineList: payload.data
        }
      }

      else if (payload.type === "GetProductLineTextIdText") {
      
        return {
          ...state, ...payload,
          lineNoList: payload.data
        }
      }

      else if (payload.type === "getProductTypeTrue") {
        return {
          ...state, ...payload,
          ProductTypeListTrue: payload.data
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
