import $httpRequest from "../utils/request";

export function list(data){
  return $httpRequest({
    url: '/algorithm/list',
    method: 'post',
    data: data
  })
}

export function del(algorithmId){
  return $httpRequest({
    url: `/algorithm/del/${algorithmId}`,
    method: 'delete'
  })
}

