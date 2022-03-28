(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

let getAssembles = (() => {
  var _ref = _asyncToGenerator(function* () {
    try {
      const TBLNAME_INDEX = "table_name-index";
      const findParam = {
        TableName: TBLNAME,
        IndexName: TBLNAME_INDEX,
        KeyConditionExpression: "table_name = :table_name",
        FilterExpression: "send_notification = :send_notification",
        ExpressionAttributeValues: {
          ":table_name": "ASSEMBLEY",
          ":send_notification": false
        }
      };
      let items = [];
      const onGetItems = (() => {
        var _ref2 = _asyncToGenerator(function* () {
          const resultFind = yield _dbClient2.default.getItems(findParam);
          if (resultFind.Items) {
            items.push(...resultFind.Items);
            console.log('resultFind', resultFind.Items.length);
          }
          if (resultFind.LastEvaluatedKey) {
            findParam.ExclusiveStartKey = resultFind.LastEvaluatedKey;
            yield onGetItems();
          }
        });

        return function onGetItems() {
          return _ref2.apply(this, arguments);
        };
      })();
      yield onGetItems();
      return items;
    } catch (error) {
      console.log('get assembles error', JSON.stringify(error));
      return [];
    }
  });

  return function getAssembles() {
    return _ref.apply(this, arguments);
  };
})();

let getEvents = (() => {
  var _ref3 = _asyncToGenerator(function* () {
    try {
      const TBLNAME_INDEX = "table_name-index";
      const findParam = {
        TableName: TBLNAME,
        IndexName: TBLNAME_INDEX,
        KeyConditionExpression: "table_name = :table_name",
        FilterExpression: "send_notification = :send_notification",
        ExpressionAttributeValues: {
          ":table_name": "EVENT",
          ":send_notification": false
        }
      };
      let items = [];
      const onGetItems = (() => {
        var _ref4 = _asyncToGenerator(function* () {
          const resultFind = yield _dbClient2.default.getItems(findParam);
          if (resultFind.Items) {
            items.push(...resultFind.Items);
            console.log('resultFind', resultFind.Items.length);
          }
          if (resultFind.LastEvaluatedKey) {
            findParam.ExclusiveStartKey = resultFind.LastEvaluatedKey;
            yield onGetItems();
          }
        });

        return function onGetItems() {
          return _ref4.apply(this, arguments);
        };
      })();
      yield onGetItems();
      return items;
    } catch (error) {
      console.log('get assembles error', JSON.stringify(error));
      return [];
    }
  });

  return function getEvents() {
    return _ref3.apply(this, arguments);
  };
})();

let getUsers = (() => {
  var _ref5 = _asyncToGenerator(function* (userIds) {
    const keyParams = { Keys: [] };
    for (const idx in userIds) {
      const userId = userIds[idx];
      const keyParam = {};
      keyParam["pri_key"] = `USER#${userId}`;
      keyParam["sort_key"] = `#METADATA#USER#${userId}`;
      keyParams.Keys.push(keyParam);
    }
    const batchParams = _dbClient2.default.batchGETParams(TBLNAME, keyParams);
    const res = yield _dbClient2.default.batchGetItem(batchParams);
    if (res['Responses']) {
      return res['Responses'][TBLNAME];
    } else {
      return [];
    }
  });

  return function getUsers(_x) {
    return _ref5.apply(this, arguments);
  };
})();

let updateAssembleSendNoti = (() => {
  var _ref6 = _asyncToGenerator(function* (assemble_id, value) {
    try {
      const keyModel = {
        "pri_key": `ASSEMBLEY#${assemble_id}`,
        "sort_key": `#METADATA#ASSEMBLEY#${assemble_id}`
      };
      const expression = `set send_notification = :send_noti`;
      const updateParam = {
        TableName: TBLNAME,
        Key: keyModel,
        UpdateExpression: expression,
        ExpressionAttributeValues: {
          ":send_noti": value
        },
        ReturnValues: "ALL_NEW"
      };
      const updateRes = yield _dbClient2.default.updateItem(updateParam);
      return true;
    } catch (error) {
      console.log("UPDATE ERROR ==>", error);
      return false;
    }
  });

  return function updateAssembleSendNoti(_x2, _x3) {
    return _ref6.apply(this, arguments);
  };
})();

let updateEventSendNoti = (() => {
  var _ref7 = _asyncToGenerator(function* (event_id, value) {
    try {
      const keyModel = {
        "pri_key": `EVENT#${event_id}`,
        "sort_key": `#METADATA#EVENT#${event_id}`
      };
      const expression = `set send_notification = :send_noti`;
      const updateParam = {
        TableName: TBLNAME,
        Key: keyModel,
        UpdateExpression: expression,
        ExpressionAttributeValues: {
          ":send_noti": value
        },
        ReturnValues: "ALL_NEW"
      };
      const updateRes = yield _dbClient2.default.updateItem(updateParam);
      return true;
    } catch (error) {
      console.log("UPDATE ERROR ==>", error);
      return false;
    }
  });

  return function updateEventSendNoti(_x4, _x5) {
    return _ref7.apply(this, arguments);
  };
})();

let updateAssembleNotifyUsers = (() => {
  var _ref8 = _asyncToGenerator(function* (assemble_id, value) {
    try {
      const keyModel = {
        "pri_key": `ASSEMBLEY#${assemble_id}`,
        "sort_key": `#METADATA#ASSEMBLEY#${assemble_id}`
      };
      const expression = `set notify_users = :noti_users`;
      const updateParam = {
        TableName: TBLNAME,
        Key: keyModel,
        UpdateExpression: expression,
        ExpressionAttributeValues: {
          ":noti_users": value
        },
        ReturnValues: "ALL_NEW"
      };
      const updateRes = yield _dbClient2.default.updateItem(updateParam);
      return true;
    } catch (error) {
      console.log("UPDATE ERROR ==>", JSON.stringify(error));
      return false;
    }
  });

  return function updateAssembleNotifyUsers(_x6, _x7) {
    return _ref8.apply(this, arguments);
  };
})();

let updateEventNotifyUsers = (() => {
  var _ref9 = _asyncToGenerator(function* (event_id, value) {
    try {
      const keyModel = {
        "pri_key": `EVENT#${event_id}`,
        "sort_key": `#METADATA#EVENT#${event_id}`
      };
      const expression = `set notify_users = :noti_users`;
      const updateParam = {
        TableName: TBLNAME,
        Key: keyModel,
        UpdateExpression: expression,
        ExpressionAttributeValues: {
          ":noti_users": value
        },
        ReturnValues: "ALL_NEW"
      };
      const updateRes = yield _dbClient2.default.updateItem(updateParam);
      return true;
    } catch (error) {
      console.log("UPDATE ERROR ==>", JSON.stringify(error));
      return false;
    }
  });

  return function updateEventNotifyUsers(_x8, _x9) {
    return _ref9.apply(this, arguments);
  };
})();

let broadVoipPushNotification = (() => {
  var _ref10 = _asyncToGenerator(function* (users, data, isAssemble) {
    const filtered_users = users.filter(function (r) {
      return r.call_token && r.call_token !== "";
    });
    for (const index in filtered_users) {
      yield _notification2.default.sendVoipNotification(data, filtered_users[index], isAssemble);
    }
  });

  return function broadVoipPushNotification(_x10, _x11, _x12) {
    return _ref10.apply(this, arguments);
  };
})();

let scrap = (() => {
  var _ref11 = _asyncToGenerator(function* (event, context, callback) {
    try {
      console.time('How long it will take');
      const assembles = yield getAssembles();
      const events = yield getEvents();
      for (const index in assembles) {
        const assemble = assembles[index];
        if (!assemble.send_notification) {
          const startTimeStamp = new Date(assemble.start_time).getTime() / 1000;
          const curTimeStamp = new Date().getTime() / 1000;
          console.log('time stamp', startTimeStamp, curTimeStamp);
          if (startTimeStamp <= curTimeStamp) {
            yield updateAssembleSendNoti(assemble.assemble_id, true);
            if (assemble.notify_users && Array.isArray(assemble.notify_users)) {
              const users = yield getUsers(assemble.notify_users);
              if (users.length > 0) {
                console.log('users', users.length);
                yield broadVoipPushNotification(users, assemble, true);
                yield updateAssembleNotifyUsers(assemble.assemble_id, []);
              }
            }
          }
        }
      }
      for (const index in events) {
        const event = events[index];
        if (!event.send_notification) {
          const startTimeStamp = new Date(event.event_time).getTime() / 1000;
          const curTimeStamp = new Date().getTime() / 1000;
          console.log('time stamp', startTimeStamp, curTimeStamp);
          if (startTimeStamp <= curTimeStamp) {
            yield updateEventSendNoti(event.event_id, true);
            if (event.notify_users && Array.isArray(event.notify_users)) {
              const users = yield getUsers(event.notify_users);
              if (users.length > 0) {
                console.log('users', users.length);
                yield broadVoipPushNotification(users, assemble, false);
                yield updateEventNotifyUsers(event.event_id, []);
              }
            }
          }
        }
      }
      console.timeEnd('How long it will take');
      callback(null, { message: `Successfully wrote to database` });
    } catch (e) {
      callback(e.toString());
    }
  });

  return function scrap(_x13, _x14, _x15) {
    return _ref11.apply(this, arguments);
  };
})();

__webpack_require__(0);

var _ramda = __webpack_require__(1);

var _ramda2 = _interopRequireDefault(_ramda);

var _dbClient = __webpack_require__(3);

var _dbClient2 = _interopRequireDefault(_dbClient);

var _notification = __webpack_require__(5);

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const TBLNAME = "FutureOF";

exports.default = {
  scrap
};

module.exports = {
  scrap
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let dbClient = (() => {
  var _ref = _asyncToGenerator(function* (action, params) {
    var gParams = action.startsWith('batch') ? prefixTableName4Batch(params) : prefixTableName4Normal(params);
    return db[action](gParams).promise();
  });

  return function dbClient(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getItems = (() => {
  var _ref2 = _asyncToGenerator(function* (params) {
    try {
      return dbClient('query', params);
    } catch (error) {
      console.error('Get Items dbClient');
      console.error(error.toString());
    }
  });

  return function getItems(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

let updateItem = (() => {
  var _ref3 = _asyncToGenerator(function* (updateParam) {
    try {
      return dbClient('update', updateParam);
    } catch (error) {
      console.error('Update Item error dbClient');
      console.error(error.toString());
    }
  });

  return function updateItem(_x4) {
    return _ref3.apply(this, arguments);
  };
})();

let batchGetItem = (() => {
  var _ref4 = _asyncToGenerator(function* (params) {
    try {
      return dbClient('batchGet', params);
    } catch (error) {
      console.error('Get Items dbClient');
      console.error(error.toString());
    }
  });

  return function batchGetItem(_x5) {
    return _ref4.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var R = __webpack_require__(1);
var AWS = __webpack_require__(4);
var db = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1"
});
var mapKeys = R.curry((fn, obj) => R.reduce((acc, key) => {
  acc[fn(key)] = obj[key];
  return acc;
}, {}, R.keys(obj)));

var prefixTableName4Normal = params => _extends({}, params, { TableName: `${params.TableName}` });
var prefixTableName4Batch = params => _extends({}, params, {
  RequestItems: mapKeys(tableName => `${tableName}`, params.RequestItems)
});
const SaveChartTblName = 'savechart_record';
;


function batchGETParams(TableName, resources) {
  const params = { RequestItems: {} };
  params.RequestItems[TableName] = resources;
  return params;
};

module.exports = {
  dbClient,
  getItems,
  updateItem,
  batchGetItem,
  batchGETParams
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

let sendVoipNotification = (() => {
    var _ref = _asyncToGenerator(function* (data, user, isAssemble) {
        let notification = new apn.Notification();
        notification.alert = isAssemble ? data.assemble_name : data.event_name;
        let callName = isAssemble ? `${getDisplayName(data.enter_club_name, "#")} Assembly "${data.assemble_name}"` : `${getDisplayName(data.enter_club_name, "#")} Event "${data.event_name}"`;
        notification.rawPayload = {
            uuid: isAssemble ? data.assemble_id : data.event_id,
            handle: user.user_id,
            callerName: callName,
            aps: {
                "content-available": 1,
                "apns-push-type": "background"
            }
        };
        notification.contentAvailable = 1;
        notification.priority = 10;
        notification.topic = `${bundle_id}.voip`;
        try {
            const sendRes = yield apnService.send(notification, [user.call_token]);
            console.log("send voip notification", JSON.stringify(sendRes));
            return true;
        } catch (error) {
            console.log("send voip notification error", JSON.stringify(error));
            return false;
        }
    });

    return function sendVoipNotification(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var apn = __webpack_require__(6);
const bundle_id = "com.futureof.ios";
const apnOption = {
    token: {
        key: process.env.P8KEY,
        keyId: process.env.P8KEYID,
        teamId: process.env.TEAMID
    },
    production: true
};

const apnService = new apn.Provider(apnOption);

const getDisplayName = (text, frontSign = "@") => {
    if (text && text != "") {
        return `${frontSign}${text.replace(/\s/g, '').trim()}`;
    }
    return "";
};

module.exports = {
    sendVoipNotification
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("apn");

/***/ })
/******/ ])));
//# sourceMappingURL=handler.js.map