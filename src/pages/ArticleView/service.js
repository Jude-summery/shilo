import request from '@/utils/request';

export async function getPostById(params) {
  return request('/api/posts/getOne', {
    params: params
  });
}
