import {VIEW_ID_All, VIEW_ID_iPhoneApp, startDate, endDate, periodForOneWeek} from './consts.js';

/// paidstory related data
const requestDataForiPhoneAppStory = [//以文章id划分的数据:premium线
  {
      'viewId': VIEW_ID_iPhoneApp,
      'dateRanges': [
      {
          'startDate': startDate,
          'endDate': endDate
      }
      ],
      'metrics': [
          {
              'expression': 'ga:totalEvents'
          }
      ],
      'dimensions': [
          {
              'name': 'ga:eventLabel'
          }
      ],
      'dimensionFilterClauses': [
          {
              'operator': 'AND',
              'filters': [
                  {
                      'dimensionName': 'ga:eventCategory',
                      'operator': 'EXACT',
                      'expressions': [
                      'Privileges'
                      ],
                      'caseSensitive': true
                  },
                  {
                      'dimensionName': 'ga:eventAction',
                      'operator': 'EXACT',
                      'expressions': [
                      'Display'
                      ],
                      'caseSensitive': true
                  },
                  {
                      'dimensionName': 'ga:eventLabel',
                      'operator': 'REGEXP',
                      'expressions': [
                          '^ExclusiveContent/premium/[0-9]{9}$'
                      ],
                      'caseSensitive': true
                      }
              ]
          }
      ]
  },
  {
      'viewId': VIEW_ID_iPhoneApp,
      'dateRanges': [
      {
          'startDate': startDate,
          'endDate': endDate
      }
      ],
      'metrics': [
          {
              'expression': 'ga:totalEvents'
          }
      ],
      'dimensions': [
          {
              'name': 'ga:eventLabel'
          }
      ],
      'dimensionFilterClauses': [
          {
              'operator': 'AND',
              'filters': [
                  {
                      'dimensionName': 'ga:eventCategory',
                      'operator': 'EXACT',
                      'expressions': [
                      'Privileges'
                      ],
                      'caseSensitive': true
                  },
                  {
                      'dimensionName': 'ga:eventAction',
                      'operator': 'EXACT',
                      'expressions': [
                          'Tap Subscription'
                      ],
                      'caseSensitive': true
                  },
                  {
                      'dimensionName': 'ga:eventLabel',
                      'operator': 'REGEXP',
                      'expressions': [
                          '^ExclusiveContent/premium/[0-9]{9}$'
                      ],
                      'caseSensitive': true
                  }
              ]
          }
      ]
  },
  {
    'viewId': VIEW_ID_iPhoneApp,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventLabel'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'EXACT',
            'expressions': [
              'Privileges'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'buy success: com.ft.ftchinese.mobile.subscription.member'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventLabel',
            'operator': 'REGEXP',
            'expressions': [
              '^ExclusiveContent/premium/[0-9]{9}$'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  },
  {
    'viewId': VIEW_ID_iPhoneApp,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventLabel'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'EXACT',
            'expressions': [
              'Privileges'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'buy success: com.ft.ftchinese.mobile.subscription.vip'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventLabel',
            'operator': 'REGEXP',
            'expressions': [
              '^ExclusiveContent/premium/[0-9]{9}$'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  }
];

const requestDataForAndroidAppStory = [//androidApp转换的相关行为数据
  {
      'viewId': VIEW_ID_All,
      'dateRanges': [
      {
          'startDate': startDate,
          'endDate': endDate
      }
      ],
      'metrics': [
          {
              'expression': 'ga:totalEvents'
          }
      ],
      'dimensions': [
          {
            'name': 'ga:eventLabel'
          }
      ],
      'dimensionFilterClauses': [
          {
              'operator': 'AND',
              'filters': [
                  {
                      'dimensionName': 'ga:eventCategory',
                      'operator': 'EXACT',
                      'expressions': [
                      'Android Privileges'
                      ],
                      'caseSensitive': true
                  },
                  {
                      'dimensionName': 'ga:eventAction',
                      'operator': 'EXACT',
                      'expressions': [
                      'Display'
                      ],
                      'caseSensitive': true
                  },
                  {
                    'dimensionName': 'ga:eventLabel',
                    'operator': 'REGEXP',
                    'expressions': [
                        '^ExclusiveContent/premium/[0-9]{9}'
                    ],
                    'caseSensitive': true
                  }
              ]
          }
      ]
  },
  {
      'viewId': VIEW_ID_All,
      'dateRanges': [
      {
          'startDate': startDate,
          'endDate': endDate
      }
      ],
      'metrics': [
          {
              'expression': 'ga:totalEvents'
          }
      ],
      'dimensions': [
        {
          'name': 'ga:eventLabel'
        }
      ],
      'dimensionFilterClauses': [
          {
              'operator': 'AND',
              'filters': [
                  {
                      'dimensionName': 'ga:eventCategory',
                      'operator': 'EXACT',
                      'expressions': [
                      'Android Privileges'
                      ],
                      'caseSensitive': true
                  },
                  {
                      'dimensionName': 'ga:eventAction',
                      'operator': 'EXACT',
                      'expressions': [
                          'Tap'
                      ],
                      'caseSensitive': true
                  },
                  {
                    'dimensionName': 'ga:eventLabel',
                    'operator': 'REGEXP',
                    'expressions': [
                        '^ExclusiveContent/premium/[0-9]{9}'
                    ],
                    'caseSensitive': true
                  }
              ]
          }
      ]
  },
  {
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventLabel'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'EXACT',
            'expressions': [
              'Android Privileges'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'Buy success: ftc_standard' //Buy success: ftc_standard
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventLabel',
            'operator': 'REGEXP',
            'expressions': [
                '^ExclusiveContent/premium/[0-9]{9}'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  },
  {
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventLabel'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'EXACT',
            'expressions': [
              'Android Privileges'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'Buy success: ftc_premium'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventLabel',
            'operator': 'REGEXP',
            'expressions': [
                '^ExclusiveContent/premium/[0-9]{9}'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  }
];

const requestDataForWebStory = [//web转换的相关行为数据
  {
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensions': [
        {
          'name': 'ga:eventLabel'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                      'Web Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'Display'
                    ],
                    'caseSensitive': true
                },
                {
                  'dimensionName': 'ga:eventLabel',
                  'operator': 'REGEXP',
                  'expressions': [
                      '^ExclusiveContent/story/[0-9]{9}'
                  ],
                  'caseSensitive': true
                }
            ]
        }
    ]
  },
  {
      'viewId': VIEW_ID_All,
      'dateRanges': [
      {
          'startDate': startDate,
          'endDate': endDate
      }
      ],
      'metrics': [
          {
              'expression': 'ga:totalEvents'
          }
      ],
      'dimensions': [
          {
              'name': 'ga:eventLabel'
          }
      ],
      'dimensionFilterClauses': [
          {
              'operator': 'AND',
              'filters': [
                  {
                      'dimensionName': 'ga:eventCategory',
                      'operator': 'EXACT',
                      'expressions': [
                      'Web Privileges'
                      ],
                      'caseSensitive': true
                  },
                  {
                      'dimensionName': 'ga:eventAction',
                      'operator': 'EXACT',
                      'expressions': [
                          'Tap'
                      ],
                      'caseSensitive': true
                  },
                  {
                    'dimensionName': 'ga:eventLabel',
                    'operator': 'REGEXP',
                    'expressions': [
                        '^ExclusiveContent/story/[0-9]{9}'
                    ],
                    'caseSensitive': true
                  }
              ]
          }
      ]
  },
  {
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventLabel'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'EXACT',
            'expressions': [
              'Web Privileges'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'Buy Success:Standard'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventLabel',
            'operator': 'REGEXP',
            'expressions': [
                '^ExclusiveContent/story/[0-9]{9}'
            ],
            'caseSensitive': false
          }
        ]
      }
    ]
  },
  {
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventLabel'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'EXACT',
            'expressions': [
              'Web Privileges'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'Buy Success:Premium'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventLabel',
            'operator': 'REGEXP',
            'expressions': [
                '^ExclusiveContent/story/[0-9]{9}'
            ],
            'caseSensitive': false
          }
        ]
      }
    ]
  },
];

/// ad monitor related data
const requestDataForOneAd = function(adId){ //特定adId的广告相关数据
  //const adIdExp = `\\(${adId}\\)$`;
  const adIdExp = '\\('+adId+'\\)$';
  return  [
      { // record Request
        'viewId': VIEW_ID_All,
        'dateRanges': [
          {
            'startDate': startDate,
            'endDate': endDate
          }
        ],
        'metrics': [
          {
            'expression': 'ga:totalEvents'
          }
        ],
        'dimensions': [
          {
            'name': 'ga:date'
          }
        ],
        'dimensionFilterClauses': [
          {
            'operator': 'AND',
            'filters': [
              {
                'dimensionName': 'ga:eventCategory',
                'operator': 'REGEXP',
                'expressions': [
                  //'\\(605326\\)$'
                  adIdExp
                ],
                'caseSensitive': true
              },
              {
                'dimensionName': 'ga:eventAction',
                'operator': 'EXACT',
                'expressions': [
                  'Request'
                ],
                'caseSensitive': true
              }
            ]
          }
        ]
      },
      { // record Success (include retry times)
        'viewId': VIEW_ID_All,
        'dateRanges': [
          {
            'startDate': startDate,
            'endDate': endDate
          }
        ],
        'metrics': [
          {
            'expression': 'ga:totalEvents'
          }
        ],
        'dimensions': [
          {
            'name': 'ga:date'
          }
        ],
        'dimensionFilterClauses': [
          {
            'operator': 'AND',
            'filters': [
              {
                'dimensionName': 'ga:eventCategory',
                'operator': 'REGEXP',
                'expressions': [
                  adIdExp
                ],
                'caseSensitive': true
              },
              {
                'dimensionName': 'ga:eventAction',
                'operator': 'BEGINS_WITH',
                'expressions': [
                  'Success'
                ],
                'caseSensitive': true
              }
            ]
          }
        ]
      },
      { // record Fail
        'viewId': VIEW_ID_All,
        'dateRanges': [
          {
            'startDate': startDate,
            'endDate': endDate
          }
        ],
        'metrics': [
          {
            'expression': 'ga:totalEvents'
          }
        ],
        'dimensions': [
          {
            'name': 'ga:date'
          }
        ],
        'dimensionFilterClauses': [
          {
            'operator': 'AND',
            'filters': [
              {
                'dimensionName': 'ga:eventCategory',
                'operator': 'REGEXP',
                'expressions': [
                  adIdExp
                ],
                'caseSensitive': true
              },
              {
                'dimensionName': 'ga:eventAction',
                'operator': 'EXACT',
                'expressions': [
                  'Fail'
                ],
                'caseSensitive': true
              }
            ]
          }
        ]
      },
      { // recored Success on Retry
        'viewId': VIEW_ID_All,
        'dateRanges': [
          {
            'startDate': startDate,
            'endDate': endDate
          }
        ],
        'metrics': [
          {
            'expression': 'ga:totalEvents'
          }
        ],
        'dimensions': [
          {
            'name': 'ga:date'
          }
        ],
        'dimensionFilterClauses': [
          {
            'operator': 'AND',
            'filters': [
              {
                'dimensionName': 'ga:eventCategory',
                'operator': 'REGEXP',
                'expressions': [
                  adIdExp
                ],
                'caseSensitive': true
              },
              {
                'dimensionName': 'ga:eventAction',
                'operator': 'BEGINS_WITH',
                'expressions': [
                  'Success on Retry'
                ],
                'caseSensitive': true
              }
            ]
          }
        ]
      }
    ];
} 

const adIdExp= '\\([0-9]+\\)$';

//const {startDate:startDateForOneWeek, endDate:endDateForOneWeek} = periodForOneWeek;
const requestDataForAds =  [
  { // record Request
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventCategory'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'REGEXP',
            'expressions': [
              //'\\(605326\\)$'
              adIdExp
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'Request'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  },
  { // record Success (include retry times)
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventCategory'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'REGEXP',
            'expressions': [
              adIdExp
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'BEGINS_WITH',
            'expressions': [
              'Success'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  },
  { // record Fail
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventCategory'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'REGEXP',
            'expressions': [
              adIdExp
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'EXACT',
            'expressions': [
              'Fail'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  },
  { // recored Success on Retry
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:totalEvents'
      }
    ],
    'dimensions': [
      {
        'name': 'ga:eventCategory'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:eventCategory',
            'operator': 'REGEXP',
            'expressions': [
              adIdExp
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:eventAction',
            'operator': 'BEGINS_WITH',
            'expressions': [
              'Success on Retry'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  }
];


/// pyramid related data
const requestDataForAllUser = [
  {//Web和Android App和iPhoneApp用户总量
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:users'
      }
    ]
  }
];
const requestDataForiPhoneAppUser = [
  {// iPhone App用户总量
    'viewId': VIEW_ID_iPhoneApp,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:users'
      }
    ]
  },
  {// buy success standard总数
    'viewId': VIEW_ID_iPhoneApp,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
    {
        'expression': 'ga:totalEvents'
    }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'In-App Purchase'//这个包括不限于Privilege
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'buy success'//加上buy success: com.ft.ftchinese.mobile.subscription.vip不一样
                    ],
                    'caseSensitive': true
                },
                {
                'dimensionName': 'ga:eventLabel',
                'operator': 'EXACT',
                'expressions': [
                    'com.ft.ftchinese.mobile.subscription.member'
                ],
                'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success premium总数
    'viewId': VIEW_ID_iPhoneApp,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
    {
        'expression': 'ga:totalEvents'
    }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'In-App Purchase'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'buy success'
                    ],
                    'caseSensitive': true
                }, 
                {
                    'dimensionName': 'ga:eventLabel',
                    'operator': 'EXACT',
                    'expressions': [
                        'com.ft.ftchinese.mobile.subscription.vip'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success standard daily
    'viewId': VIEW_ID_iPhoneApp,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensions': [
        {
            'name': 'ga:date'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'In-App Purchase'//这个包括不限于Privilege
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'buy success'//加上buy success: com.ft.ftchinese.mobile.subscription.vip不一样
                    ],
                    'caseSensitive': true
                },
                {
                'dimensionName': 'ga:eventLabel',
                'operator': 'EXACT',
                'expressions': [
                    'com.ft.ftchinese.mobile.subscription.member'
                ],
                'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success premium daily
    'viewId': VIEW_ID_iPhoneApp,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensions': [
        {
            'name': 'ga:date'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'In-App Purchase'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'buy success'
                    ],
                    'caseSensitive': true
                }, 
                {
                    'dimensionName': 'ga:eventLabel',
                    'operator': 'EXACT',
                    'expressions': [
                        'com.ft.ftchinese.mobile.subscription.vip'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  }
];

const requestDataForAndroidAppUser = [//Android App相关用户数据
  {// Android用户总量
    'viewId': VIEW_ID_All,
    'dateRanges': [
      {
        'startDate': startDate,
        'endDate': endDate
      }
    ],
    'metrics': [
      {
        'expression': 'ga:users'
      }
    ],
    'dimensionFilterClauses': [
      {
        'operator': 'AND',
        'filters': [
          {
            'dimensionName': 'ga:pagePath',
            'operator': 'REGEXP',
            'expressions': [
              '/phone/|phoneapp.html|phone.html|androidapp.html|iphone-2014.html|bb-2014.html|ftcapp'
            ],
            'caseSensitive': true
          },
          {
            'dimensionName': 'ga:operatingSystem',
            'operator': 'EXACT',
            'expressions': [
              'Android'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  },
  {// buy success standard总数
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'Android Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'Buy success: ftc_standard'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success premium总数
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
    {
        'expression': 'ga:totalEvents'
    }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'Android Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                        'Buy success: ftc_premium'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success standard daily
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensions': [
        {
            'name': 'ga:date'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                        'Android Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                        'Buy success: ftc_standard'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success premium daily
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensions': [
        {
            'name': 'ga:date'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'Android Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                        'Buy success: ftc_premium'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  }
];

const requestDataForWebUser = [ //Web相关用户数据
 //总量可以根据总量-AndroidApp总量-iPhoneApp总量
  {// buy success standard总数
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'Web Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'Buy Success:Standard'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success premium总数
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
    {
        'expression': 'ga:totalEvents'
    }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'Web Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                        'Buy Success:Premium'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success standard daily
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensions': [
        {
            'name': 'ga:date'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'Web Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                    'Buy Success:Standard'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  },
  {// buy success premium daily
    'viewId': VIEW_ID_All,
    'dateRanges': [
    {
        'startDate': startDate,
        'endDate': endDate
    }
    ],
    'metrics': [
        {
            'expression': 'ga:totalEvents'
        }
    ],
    'dimensions': [
        {
            'name': 'ga:date'
        }
    ],
    'dimensionFilterClauses': [
        {
            'operator': 'AND',
            'filters': [
                {
                    'dimensionName': 'ga:eventCategory',
                    'operator': 'EXACT',
                    'expressions': [
                    'Web Privileges'
                    ],
                    'caseSensitive': true
                },
                {
                    'dimensionName': 'ga:eventAction',
                    'operator': 'EXACT',
                    'expressions': [
                        'Buy Success:Premium'
                    ],
                    'caseSensitive': true
                }
            ]
        }
    ]
  }
];

export {
  requestDataForiPhoneAppStory, 
  requestDataForAndroidAppStory, 
  requestDataForWebStory, 

  requestDataForOneAd, 
  requestDataForAds,

  requestDataForAllUser,
  requestDataForiPhoneAppUser,
  requestDataForAndroidAppUser,
  requestDataForWebUser
}
