# Javascript useful things

## Clone and merge objects
[MDN Object assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
```js
// clone
const copy = Object.assign({}, obj);
// merge
const merged = Object.assign(o1, o2, o3);
```

## Find in array
[MDN Find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
```js
const item = items.find(p => p.id === 1);
```