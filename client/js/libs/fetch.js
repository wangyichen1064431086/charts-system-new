
async function fetchMoreInfoOfOneStory(storyId) {
  //const url = `http://10.99.10.12/index.php/jsapi/get_story_more_info/${storyId}`;
  const url = `https://api001.ftmailbox.com/index.php/jsapi/get_story_more_info/${storyId}`;
  return await fetch(url, {
    mode: 'cors'
  }).then(res => res.json());
}

function fetchOneStory(storyId) {
  const url = `https://api001.ftmailbox.com/index.php/jsapi/get_story_more_info/${storyId}`;
  return fetch(url, {
    mode: 'cors'
  }).then(res => res.json());
}
async function fetchMoreInfoOfStorys(storyIdArr,cbFunc) {
 return await Promise.all(
    storyIdArr.map(oneId => fetchOneStory(oneId))
  ).then(resArr => {
    if(cbFunc) {
      return resArr.map(item => cbFunc(item))
    }
    return resArr;
  });
}

export {fetchMoreInfoOfOneStory, fetchMoreInfoOfStorys};

//调用方式:const testFetch = await fetchMoreInfoOfOneStory('001077916');
/** test
 * 在https://api001.ftmailbox.com上测试:
 async function myfetch() {
    return await fetch('https://api001.ftmailbox.com/index.php/jsapi/get_story_more_info/001077916',{
      mode: 'cors'
    }).then(res=> res.json());
  }  
 await myfetch() //可以

* 在backyard.com上测试，可以：
 async function myfetch() {
    return await fetch('https://api001.ftmailbox.com/index.php/jsapi/get_story_more_info/001077916',{
      mode: 'cors'
    }).then(res=> res.json());
  }  
 
  * 在http://www.ftchinese.com/上测试：
  async function myfetch() {
    return await fetch('http://10.99.10.12/index.php/jsapi/get_story_more_info/001077916',{
      mode: 'cors'
    }).then(res=> res.json());
  }  
  await myfetch() //可以

  async function myfetch() {
    return await fetch('https://api001.ftmailbox.com/index.php/jsapi/get_test').then(res=> res.json());
  }  
 */