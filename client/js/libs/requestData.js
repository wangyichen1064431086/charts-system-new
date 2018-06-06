import {VIEW_ID_All, VIEW_ID_iPhoneApp, startDate, endDate} from './consts.js';


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
                          '^premium/[0-9]{9}$'
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
                          '^premium/[0-9]{9}$'
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
              '^premium/[0-9]{9}$'
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
              '^premium/[0-9]{9}$'
            ],
            'caseSensitive': true
          }
        ]
      }
    ]
  }
];

export {requestDataForiPhoneAppStory}
