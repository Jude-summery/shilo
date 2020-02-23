import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/user/get');
}
export async function queryPosts(params) {
  return request('/api/posts', {
    params,
  });
}
export async function userUpdate(params) {
  return request('/api/user/update', {
    method: 'POST',
    data: params,
  });
}
