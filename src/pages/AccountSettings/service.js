import request from '@/utils/request';

export async function signupUpdate(params) {
  return request('/api/signup/update', {
    method: 'POST',
    data: params,
  });
}
