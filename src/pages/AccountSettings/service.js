import request from '@/utils/request';

export async function signupUpdate(params) {
  return request('/api/user/update', {
    method: 'POST',
    data: params,
  });
}
