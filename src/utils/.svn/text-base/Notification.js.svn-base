

let names = Object.create(null);

/**
 *
 * @type {{name:[{o:object,c:string}]}}
 */
class NotificationMethod {
  /**
   *
   * @param {object}observer
   * @param {string}callback --- function(name, userInfo)
   * @param {string}name
   */
	// 注册通知
  static addObserver(observer, callback, name) {
    if (names[name] === undefined) {
      names[name] = [];
      names[name + '_cnt'] = 0;
    }

    var pos = names[name].length;
    for (var i = 0; i < names[name].length; ++i) {
      if (i in names[name] && names[name][i] === undefined) {
        pos = i;
        continue;
      }
      if (i in names[name] && names[name][i] != undefined) {
        if (names[name][i]['o'] === observer) {
          names[name][i]['c'] = callback;
          names = names;
          return;
        }
      }
    }
    names[name][pos] = {'o': observer, 'c': callback};
    names[name + '_cnt'] += 1;
    names = names;
  }

	// 移除view的指定通知
  static removeObserver(observer, name) {
    if (names[name] === undefined) {
      return;
    }

    for (var i = 0; i < names[name].length; ++i) {
      if (i in names[name] && names[name][i] != undefined) {
        if (names[name][i]['o'] === observer) {
          names[name][i] = undefined;
          names[name + '_cnt'] -= 1;
          names = names;

          if (names[name + '_cnt'] == 0) {
            delete names[name + '_cnt'];
            delete names[name];
            names = names;
          }
          return;
        }
      }
    }
  }

	// 移除当前view的所有通知
  static removeObserverAllNotification(observer) {
    for (var name in names) {
      if (typeof names[name] != 'object') {
        continue;
      }
      this.removeObserver(observer, name);
    }
  }

	// 发送通知
	// 参数类型：
	// name：通知名称
	// userInfo：传递的信息
  static postNotification(name, userInfo) {
    if (names[name] === undefined) {
      return;
    }

    for (var i = 0; i < names[name].length; ++i) {
      if (i in names[name] && names[name][i] != undefined) {
        if (typeof names[name][i]['o'] === 'object'
          && typeof names[name][i]['o'][names[name][i]['c']] === 'function') {
          names[name][i]['o'][names[name][i]['c']](name, userInfo);
        } else {
          if(typeof names[name][i]['c'] === 'function' && typeof(eval(names[name][i]['c']))=="function") {
            names[name][i]['c'](name, userInfo);
          }
        }
      }
    }
  }

	// 同步发送通知，暂时用不上
  static postNotificationAsync (name, userInfo) {
    setTimeout(function () {
      if (names[name] === undefined) {
        return;
      }

      for (var i = 0; i < names[name].length; ++i) {
        if (i in names[name] && names[name][i] != undefined) {
          if (typeof names[name][i]['o'] === 'object'
            && typeof names[name][i]['o'][names[name][i]['c']] === 'function') {
            names[name][i]['o'][names[name][i]['c']](name, userInfo);
          } else {
            names[name][i]['c'](name, userInfo);
          }
        }
      }
    }, 0);
  }
}

export class Notification {
  addObserver(observer, callback, name) {
    NotificationMethod.addObserver(observer, callback, name);
  }

  removeObserver(observer, name) {
    NotificationMethod.removeObserver(oobserver, name);
  }

  removeObserverAllNotification(observer) {
    NotificationMethod.removeObserverAllNotification(observer);
  }

  postNotification(name, userInfo) {
    NotificationMethod.postNotification(name, userInfo);
  }

  postNotificationAsync(name, userInfo) {
    NotificationMethod.postNotificationAsync(name, userInfo);
  }
}


