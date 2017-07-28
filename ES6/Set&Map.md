# [HOME](https://tangdexin.github.io)  ||  [REACT](https://tangdexin.github.io/react/index)  ||  [ES6](https://tangdexin.github.io/ES6/index) 
## [Set&Map](https://tangdexin.github.io/ES6/Set&Map)

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
console.log(map["5"]);// "foo"
map[tdx];//报错
```
**引申**
知识来源于红皮书第五版 5.1 Object类型
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
**引申结束**
* 若使用对象作为键，就会出现另一个问题，例如:

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
## ES6的Set
ES6中Set类型特点|ES5中
----|----
**无重复值**的**有序列表**|  /
不会使用强制类型转换来判断值是否重复|  /
向 Set 添加多个对象，它们不会被合并为同一项|  /
**例外是** +0 与 -0 在 Set 中被判断为是相等的|  /
### Set的属性和方法
属性和方法名|用途
----|----
size|查看看其中包含有多少项
add()|向Set中添加项目**（添加重复值自动忽略）**
delete()|移除单个值
clear()|将所有值从 Set 中移除
forEach()|下方详细讲
has()|检测某值是否在Set中
#### size  add() 
`Set `不会使用强制类型转换来判断值是否重复。这意味着 `Set` 可以同时包含数值` 5 `与 字符串` "5" `，将它们都作为相对独立的项.
请看下方代码:
```js
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size);//2

//key1 与 key2 并不会被转换为字符串，所以它们在这个 Set 内部被认为是两个不同的项（记住：如果它们被转换为字符串，
//那么都会等于 "[object Object]" 
let set2 = new Set(),
    key1 = {},
    key2 = {};
set2.add(key1);
set2.add(key2);
console.log(set2.size);    // 2
```
如果 add() 方法用相同值进行了多次调用，那么在第一次之后的调用实际上会被忽略：
```js
let set = new Set();
set.add(5);
set.add("5");
set.add(5);     // 重复了，该调用被忽略

console.log(set.size);    // 2
```
#### has()
你可以使用 has() 方法来测试某个值是否存在于 Set 中，就像这样：
```js
let set = new Set();
set.add(5);
set.add("5");

console.log(set.has(5));// true
console.log(set.has(6));//false  此处的 Set 不包含 6 这个值，因此 set.has(6) 会返回 false 
```

#### delete() clear()
`delete() `方法来移除单个值，` clear()` 方法来将所有值从` Set `中移除
```js
let set = new Set();
set.add(5);
set.add("5");

console.log(set.has(5));    // true

set.delete(5);

console.log(set.has(5));    // false
console.log(set.size);      // 1

set.clear();

console.log(set.has("5"));  // false
console.log(set.size);   
```
### 用法和要点
使用数组来初始化一个 Set ， Set 构造器会确保不重复地使用这些值。虽然数值 5 在数组中出现了四次，但 Set 中却只有一个 5 。若要把已存在的代码或 JSON 结构转换为 Set 来使用，这种特性会让转换更轻松。
`new Set()`一个数组，会生成一个没有重复值的对象;
```js
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size);    // 5
console.log(set);//{1,2,3,4,5}
```
对这个对象使用扩展运算符也能简单地将 Set 转换回数组。
```js
//注意这段代码和上段代码的区别。使用了[...]
let set2 = new Set([1, 2, 3, 3, 3, 4, 5]),
    array = [...set2];
console.log(set2);//{1,2,3,4,5}
console.log(array);//[1,2,3,4,5]
```
#### 综合用法
 `Set` 清除了重复值之后，又使用了扩展运算符将自身的项放到一个新数组中。而这个 `Set `仍然包含在创建时所接收的项（ 1 、 2 、 3 、 4 与 5 ），这些项只是被**复制**到了新数组中，而并未从` Set `中消失。
当已经存在一个数组，而你想用它创建一个无重复值的新数组时，该方法十分有用。例如：
```js
function eliminateDuplicates(items) {
    return [...new Set(items)];
}
let numbers = [1, 2, 3, 3, 3, 4, 5],
    noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates);      // [1,2,3,4,5]
```
