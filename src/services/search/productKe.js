import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`
/**
 * 查询条件初始化
 */
 
//工厂名称接口
export async function getProduct() {
  return request(`${ip}/WebAPI/api/Common/GetProductFamilyIdText`, {
    method: 'POST',
  });
}
 


// 区域接口
export async function getArea(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductAreaIdText`, {
    method: 'POST',
    data: { ...params }
  });
}
 

// 线体接口
export async function getLine(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductLineTextIdText`, {
    method: 'POST',
    data: { ...params }
  });
}

//班次接口
export async function getShif() { 
  return request(`${ip}/WebAPI/api/Common/GetShiftinfoIdTextAll`, {
    method: 'POST',
  });
}
 
 
 
//获取线体编号
export async function GetProductLineTextIdText(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductLine_noText`, {
    method: 'POST',
    data: { ...params },
  });
}
 


//获取产品类型
export async function getProductTypeTrue(params) {
  return request(`${ip}/WebAPI/api/Common/GetproducttypeidText`, {
    method: 'POST',
    data: { ...params },
  });
}
 
 
 

/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/WebAPI/api/KpiproductKE/List`, {
    method: 'POST',
    data: { ...params },
  });
}




 




