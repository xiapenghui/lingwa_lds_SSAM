// @ts-nocheck
import { IRoute } from '@umijs/core';
import { AnyAction } from 'redux';
import React from 'react';
import { EffectsCommandMap, SubscriptionAPI } from 'dva';
import { match } from 'react-router-dom';
import { Location, LocationState, History } from 'history';

export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/authorityManagement/roleInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/authorityManagement/roleInfos';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/authorityManagement/userInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/echarts/echarts';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/global';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/login';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/classMaintain';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/department';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/holidayMain';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/personnel';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/personnelOk';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/timeInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/organization/timeMaintain';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/line';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/number';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/productAndLine';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/productGroup';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/productType';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/redInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/product/region';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/receivavles/amoutInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/receivavles/receivablesInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/receivavles/usequantityInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/route';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/lineData';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/lineOee';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/personnelNum';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/productData';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/productKe';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/productOee';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/redOption';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/regionData';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/tsSearch';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/search/workHours';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/setting';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/classMain';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/dayFrequency';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/operatorlog';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/productKpi';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/supportInput';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/supportTarea';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/supportTime';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/timeT0T3';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/timeT4';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/timeT5';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/unscheduled';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/time/yieldInfo';
export * from 'D:/XIA/newest/lingwa_lds_SSAM/src/models/user';

export interface Action<T = any> {
  type: T
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ImmerReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => void;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap,
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch<P = any, C = (payload: P) => void> = (action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export type Subscription = (api: SubscriptionAPI, done: Function) => void | Function;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    [key: string]: any;
  };
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
  location: Location<S> & { query: T };
  history: History;
  route: IRoute;
}

export type RequiredConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
  > = Required<ConnectProps<P, S, T>>

/**
 * @type T: React props
 * @type U: match props types
 */
export type ConnectRC<
  T = {},
  U = {},
  S = {},
  Q = {}
> = React.ForwardRefRenderFunction<any, T & RequiredConnectProps<U, S, Q>>;

