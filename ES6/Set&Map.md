# Set 和 Map
## 背景
JS以前只存在一种集合类型———数组类型。数组在 JS 中的使用正如其他语言的数组一样，但缺少更多类型的集合导致数组也经常被当作队列与栈来使用。数组只使用了数值型的索引，而如果非数值型的索引是必要的，开发者便会使用非数组的对象。这种技巧引出了非数组对象的定制实现，即 Set 与 Map 。
## Set和Map的区别
Set | Map
----|----
不包含重复值，列表|键值对，每项两个数据
多用来检测某个值是否存在|通过指定所需读取的键即可检索对应的值
## ES5实现Set和Map的方法和问题
由于对象的属性类型必须为字符串，所以下面`map['5']`是与`map[5]`相等的。**数值属性名会自动转换为字符串**，但是`map[tdx]`就会报错，只能是`map['tdx']`
```javascript
let map = Object.create(null);
map[5] = "foo";
console.log(map["5"]);      // "foo"
map[tdx];//报错
```
> **引申** 知识来源于红皮书第五版 5.1 Object类型
* 在使用对象字面量语法时，属性名也可以使用字符串，如下方代码；
* 在 使用方括号语法时，应该将要访问的属性以字符串的形式放在括号中
* 下方的例子中，数值属性名会自动转换为字符串

```js
let person = {
	name:"tdx"
}
let people = {
	"sex":"man",
	5:"five"
}
console.log(person.name);//tdx
console.log(people.sex);//man
console.log(people['5']);//five
console.log(people[5]);//five
console.log(people.5);//Uncaught SyntaxError: missing ) after argument list
console.log(people[sex]);//Uncaught ReferenceError: sex is not defined
console.log(people['sex']);//man

let map = Object.create(null);
map['tdx'] = "foo";
map.tdx="oof";
console.log(map['tdx']);//off
```
> **引申结束**
若使用对象作为键，就会出现另一个问题，例如：
```js
let map = Object.create(null),
    key1 = {},
    key2 = {};
map[key1] = "foo";
console.log(map[key2]); // "foo"
key1.toString();//"[object Object]"
key2.toString();//"[object Object]"
```
从上面的代码可以看到，由于对象的属性只能是字符串， key1 与 key2 对象就均被转换为字符串；又因为对象默认的字符串类型表达形式是 "[object Object]" ， key1 与 key2 就被转换为了同一个字符串。
将对象转换为默认的字符串表现形式，使得对象很难被当作 Map 的键来使用（此问题同样存在于将对象作为 Set 来使用的尝试上）

当键的值为假值时， Map 也遇到了自身的特殊问题。在需要布尔值的位置（例如在 if 语句内），任何假值都会被自动转换为 false 。下面的例子中 map.count 的用法存在歧义。此处的 if 语句是想检查 map.count 属性的存在性，还是想检查非零值？该 if 语句内的代码会被执行是因为 1 是真值。然而若 map.count 的值为 0 ，或者该属性不存在，则 if 语句内的代码都将不会被执行。在大型应用中，这类问题都是难以确认、难以调试的，这也是 ES6 新增 Set 与 Map 类型的首要原因。
```js
let map = Object.create(null);
map.count = 1;
// 是想检查 "count" 属性的存在性，还是想检查非零值？
if (map.count) {
    // ...
}
```
