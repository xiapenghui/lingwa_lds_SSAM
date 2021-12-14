import { stringify } from "querystring";
import { history } from "umi";
import {
  getDropDownInit,
  postListInit,
  getLine,
  getProductType,
  deleted,
  getAddDropDownInit,
  addPost
} from "@/services/product/productAndLine";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { message } from "antd";
import { resolve } from "path";

const TableName = "productAndLine";
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    
    isNoList: {},
    lineList: {},
    ProductTypeList: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/product/${TableName}`) {
          dispatch({
            type: "getDropDownInit",
            payload: {},
          });

          dispatch({
            type: "getLine",
            payload: {},
          });

          dispatch({
            type: "getProductType",
            payload: {},
          });

        }
      });
    },
  },
  effects: {
    /**
     *
     * @param {getDropDownInit} 查询初始化
     * @param {query} 查询
     */
    *getDropDownInit({ payload }, { call, put, select }) {
      const data = yield call(getDropDownInit);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "getDropDownInit",
            data: data.data,
          },
        });
        return message.success(data.message);
      }
    },

    // 线体信息
    *getLine({ payload }, { call, put, select }) {
      const data = yield call(getLine);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "getLine",
            data: data.list,
          },
        });
        // return message.success(data.message);
      }
    },

    //获取产品类型信息
    *getProductType({ payload }, { call, put, select }) {
      const data = yield call(getProductType);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "getProductType",
            data: data.list,
          },
        });
        return message.success(data.message);
      }
    },


    *query({ payload }, { call, put, select }) {
      const data = yield call(postListInit, payload);
      if (data.status !== "200") {
        return message.error(data.message);
      } else if (data.status == "200") {
        yield put({
          type: "querySuccessed",
          payload: {
            type: "postListInit",
            data: data.data,
          },
        });
        return message.success(data.message);
      }
    },
  },
  reducers: {
    querySuccessed(state, { payload }) {
      if (payload.type === "getDropDownInit") {
        return {
          ...state,
          ...payload,
          
        };
      }
      else if (payload.type === "getLine") {
        return {
          ...state, ...payload,
          lineList: payload.data
        }
      } 
      else if (payload.type === "getProductType") {
        return {
          ...state, ...payload,
          ProductTypeList: payload.data
        }
      }
       
      else if (payload.type === "postListInit") {
        return {
          ...state,
          TableList: new Promise((resolve) => {
            resolve({
              data: payload.data.list,
              current: payload.data.pageNum,
              pageSize: payload.data.pageSize,
              success: true,
              total: payload.data.total,
            });
          }),
        };
      }
    },
  },
};
export default Model;
