import request from '@/utils/request';

export async function signin(params) {
  return request('/api/signin', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
