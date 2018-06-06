
async function fetchMoreInfoOfOneStory(storyId) {
  const url = `http://10.99.10.12/index.php/jsapi/get_story_more_info/${storyId}`;
  return await fetch(url, {
    mode: 'cors' //即使这样设置了跨域也不行，因为被请求的资源为设置Access-Control-Allow-Origin：* 或 Access-Control-Allow-Origin:<your domain>

  }).then(res => res.json());
}


export {fetchMoreInfoOfOneStory};

//调用方式:const testFetch = await fetchMoreInfoOfOneStory('001077916');
