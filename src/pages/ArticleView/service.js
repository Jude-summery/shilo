import request from '@/utils/request';

export async function getPostById(params) {
  return request('/api/posts/getOne', {
    params: params
  });
}

export async function addComment(params) {
  return request('/api/comments/add', {
    method: 'POST',
    data: params,
  });
}

export async function deleteComment(params) {
  return request('/api/comments/delete', {
    method: 'POST',
    data: params,
  });
}

export async function deletePost(params) {
  return request('/api/posts/remove', {
    method: 'post',
    data: params
  })
}
