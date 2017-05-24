'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Verify
 * @description 数据验证
 */

var Verify = function () {
    function Verify(veries) {
        _classCallCheck(this, Verify);

        this.veries = veries;
    }

    _createClass(Verify, [{
        key: 'test',
        value: function test(args) {
            var _this = this;

            var ret = [];
            var res = Object.keys(this.veries)
            // 验证每个字段
            .map(function (key) {
                return _this.verify(key, args[key], _this.veries[key]);
            });
            // 整理验证结果
            res.forEach(function (rs) {
                return rs.result ? ret : ret.push(rs);
            });

            return ret.length ? {
                result: false,
                keys: ret,
                msg: ret.map(function (key) {
                    return key.msg;
                })
            } : {
                result: true
            };
        }

        // 字段验证

    }, {
        key: 'verify',
        value: function verify(key, arg, map) {
            var _this2 = this;

            var vs = [];
            // 验证数据类型
            if (typeof map === 'function') {
                vs.push({
                    key: key,
                    msg: 'Type: ' + key + ' type is error.',
                    result: this.isNotValue(arg) ? true : this.type(arg, map)
                });
            }
            if (Array.isArray(map)) {
                vs.push({
                    key: key,
                    msg: 'Type: ' + key + ' type is error.',
                    result: map.some(function (type) {
                        return _this2.type(arg, type);
                    }) || !arg
                });
            } else if ((typeof map === 'undefined' ? 'undefined' : _typeof(map)) === 'object') {
                // 验证required字段
                vs.push({
                    key: key,
                    msg: 'Required: ' + key + ' must be required.',
                    result: this.required(arg, map.required)
                });
                // 验证数据类型
                this.isNotValue(arg) || vs.push({
                    key: key,
                    msg: 'Type: ' + key + ' type is error.',
                    result: Array.isArray(map.type) ? map.type.some(function (type) {
                        return _this2.type(arg, type);
                    }) : this.type(arg, map.type)
                });
                // 验证正则表达式
                !map.test || vs.push({
                    key: key,
                    msg: 'Test: ' + key + ' can\'t pass regular expression',
                    result: map.test.test(arg)
                });
            }
            return vs.find(function (rs) {
                return rs.result === false;
            }) || {
                key: key,
                result: true
            };
        }

        // 验证数据类型

    }, {
        key: 'type',
        value: function type(data, _type) {
            return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === _typeof(_type());
        }

        // 验证字段是否必须存在

    }, {
        key: 'required',
        value: function required(data, _required) {
            return _required ? !!(_required && data) : true;
        }
    }, {
        key: 'isNotValue',
        value: function isNotValue(data) {
            return data === null || data === undefined;
        }
    }]);

    return Verify;
}();

module.exports = Verify;