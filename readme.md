Verify-data
---
验证数据是否匹配

### Install
```sh
npm i Verify-data --save
```

### Usage
```js
const Verify = require('verify')
const verify = new Verify({
    id: String,
    aid: {
        type: [String, Number],
        required: true,
        test: /\d+/
    }
})

verify.test({
    aid: '123'
})
```
