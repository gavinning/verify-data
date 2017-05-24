/**
 * Verify
 * @description 数据验证
 */

class Verify {
    constructor(veries) {
        this.veries = veries
    }

    test(args) {
        let ret = []
        let res = Object
            .keys(this.veries)
            // 验证每个字段
            .map(key => this.verify(key, args[key], this.veries[key]))
        // 整理验证结果
        res.forEach(rs => rs.result ? ret : ret.push(rs))

        return ret.length ? {
            result: false,
            keys: ret,
            msg: ret.map(key => key.msg)
        }:{
            result: true
        }
    }

    // 字段验证
    verify(key, arg, map) {
        let vs = []
        // 验证数据类型
        if(typeof map === 'function'){
            vs.push({
                key: key,
                msg: `Type: ${key} type is error.`,
                result: this.isNotValue(arg) ? true : this.type(arg, map)
            })
        }
        if(Array.isArray(map)){
            vs.push({
                key: key,
                msg: `Type: ${key} type is error.`,
                result: map.some(type => this.type(arg, type)) || !arg
            })
        }
        else if(typeof map === 'object'){
            // 验证required字段
            vs.push({
                key: key,
                msg: `Required: ${key} must be required.`,
                result: this.required(arg, map.required)
            })
            // 验证数据类型
            this.isNotValue(arg) || vs.push({
                key: key,
                msg: `Type: ${key} type is error.`,
                result: Array.isArray(map.type) ?
                    map.type.some(type => this.type(arg, type)):
                    this.type(arg, map.type)
            })
            // 验证正则表达式
            !map.test || vs.push({
                key: key,
                msg: `Test: ${key} can't pass regular expression`,
                result: map.test.test(arg)
            })
        }
        return vs.find(rs => rs.result === false) || {
            key: key,
            result: true
        }
    }

    // 验证数据类型
    type(data, type) {
        return typeof data === typeof type()
    }

    // 验证字段是否必须存在
    required(data, required) {
        return required ? !!(required && data) : true
    }

    isNotValue(data) {
        return data === null || data === undefined
    }
}

module.exports = Verify
