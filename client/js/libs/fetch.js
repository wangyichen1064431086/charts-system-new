import {randomNum} from './consts.js';
//const url = `http://10.99.10.12/index.php/jsapi/get_story_more_info/${storyId}`;

function fetchOneFileAsync(url, cbFunc) {
  return fetch(url)
    .then(res => 
      res.json()
    ).then( result => {
      cbFunc(result);
    });
}

function fetchFileAsync(url, resType, cbFunc) {
  return fetch(url)
    .then(res => {
      if (resType === 'json') {
        return res.json();
      } else {
        return res.text();
      }
    }).then( result => {
      cbFunc(result);
    });
}


function fetchOneStoryAsync(storyId, cbFunc) {
  const url = `https://api001.ftmailbox.com/index.php/jsapi/get_story_more_info/${storyId}?${randomNum}`;
  return fetch(url, {
    mode: 'cors'
  }).then(res => 
    res.json() //也返回的是一个promise
  ) .then( result => {
    // cbFunc(result);
    const changeUI = function() {cbFunc(result)};
    window.requestAnimationFrame(changeUI);
  });
}

function fetchMoreInfoOfStorysAsync(storyIdArr,cbFunc) { 
  Promise.all(
    storyIdArr.map(oneId => { //这里不能用forEach，forEach无返回值，那么Promise.all会报错
      return fetchOneStoryAsync(oneId, cbFunc);
    })
  ).then().catch();
}

function fetchMoreInfoOfStorysNew(storyIdArr, cbFunc) {
  const count = storyIdArr.length;
  console.log(`count:${count}`);
  while(storyIdArr.length > 0) {
    const storyIdArr50 = storyIdArr.splice(0, 50);
    //TODO: http，线上地址是https，故会产生Mixed Content错误。
    const requestUrl = 'http://10.99.10.11/index.php/jsapi/storyid2title/' + encodeURIComponent(storyIdArr50.join(','));
    console.log(requestUrl);
    fetch(requestUrl, {
      mode: 'cors'
    }).then(res => 
      res.json()
    ).then(result => {
      window.requestAnimationFrame(cbFunc.bind(this, result))
    });
  }

}
export {fetchOneFileAsync, fetchFileAsync, fetchOneStoryAsync,fetchMoreInfoOfStorysAsync, fetchMoreInfoOfStorysNew};

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