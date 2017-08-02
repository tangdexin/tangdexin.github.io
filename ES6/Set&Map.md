# [HOME](https://tangdexin.github.io)  ||  [REACT](https://tangdexin.github.io/react/index)  ||  [ES6](https://tangdexin.github.io/ES6/index) 
## [Set&Map](https://tangdexin.github.io/ES6/Set&Map)

# Set 和 Map
## 背景
JS以前只存在一种集合类型———数组类型。数组在 JS 中的使用正如其他语言的数组一样，但缺少更多类型的集合导致数组也经常被当作队列与栈来使用。数组只使用了数值型的索引，而如果非数值型的索引是必要的，开发者便会使用非数组的对象。这种技巧引出了非数组对象的定制实现，即 Set 与 Map 。
## Set和Map的区别

Set|Map
------|------
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
------|------
**无重复值**的**有序列表**|/
不会使用强制类型转换来判断值是否重复|/
向 Set 添加多个对象，它们不会被合并为同一项|/
**例外是** +0 与 -0 在 Set 中被判断为是相等的|/

### Set的属性和方法

属性和方法名|用途
------|------
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
### forEach()方法
`Set`没有键,所以将 `Set `中的每一项同时认定为键与值。
```js
let set = new Set([1, 2]);
//下方代码中，value和key是相等的，同时 ownerSet 也始终等于 set
set.forEach(function(value, key, ownerSet) {
    console.log(key + " " + value);
    console.log(ownerSet === set);
});
//上面代码的输出如下
1 1
true
2 2
true
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
**Set 构造器实际上可以接收任意可迭代对象作为参数。能使用数组是因为它们默认就是可迭代的， Set 与 Map 也是一样。 Set 构造器会使用迭代器来提取参数中的值。**
### Weak Set
由于`Set`类型储存对象采取的是引用类型，所以只要`Set`实例的引用依然存在，所储存的对象就无法被垃圾回收机制回收，从而无法释放内存。
```js
let set = new Set(),
    key = {};
set.add(key);
console.log(set.size);      // 1
// 取消原始引用
key = null;
console.log(set.size);      // 1
// 重新获得原始引用
key = [...set][0];
```
如果上述代码中，当设置`key=null`后，让后续不能再访问到key的属性，可以采用WeakSet构造器来创建。该类型只允许存储对象弱引用，而不能存储基本类型的值。对象的弱引用在它自己成为该对象的唯一引用时，**不会阻止垃圾回收**。
```js
let set = new WeakSet(),
    key = {};
// 将对象加入 set
set.add(key);
console.log(set.has(key));      // true
set.delete(key);
console.log(set.has(key));      // false
```
## Map
`Map`是键值对的有序列表,而键和值都可以是任意类型。键的比较使用的是 Object.is() ，因此你能将 5 与 "5" 同时作为键，因为它们类型不同。这与使用对象属性作为键的方式（指的是用对象来模拟 Map ）截然不同，因为对象的属性会被强制转换为字符串。
```js
let map = new Map();
map.set("title", "Understanding ES6");
map.set("year", 2016);

console.log(map.get("title"));      // "Understanding ES6"
console.log(map.get("year"));       /

let map = new Map(),
    key1 = {},
    key2 = {};

map.set(key1, 5);
map.set(key2, 42);

console.log(map.get(key1));         // 5
console.log(map.get(key2));   
```
`Set`和`Map`具有部分相同的方法：
```markdown
has(key) ：判断指定的键是否存在于 Map 中；
delete(key) ：移除 Map 中的键以及对应的值；
clear() ：移除 Map 中所有的键与值;
size : 指定包含多少键值对
```
### Map的初始化
```js
let map = new Map([["name", "Nicholas"], ["age", 25]]);
console.log(map.has("name"));   // true
console.log(map.get("name"));   // "Nicholas"
console.log(map.has("age"));    // true
console.log(map.get("age"));    // 25
console.log(map.size);          // 2

//下面为Set的初始化，请与上方做对比，查看二者的不同之处：
let set = new Set(["name","age"]);
console.log(map);
console.log(set);
```

如果读取一个未知的键，则返回undefined。
```js
new Map().get('asfddfsasadf') // undefined
```
如果对同一个键多次赋值，后面的值将覆盖前面的值；Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。
如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，包括0和-0，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。请看下面代码：

```js
{
const map1 = new Map();
map1
.set(1, 'aaa')
.set(1, 'bbb');
let m1 = map1.get(1) 
console.log(m1);// "bbb
console.log(map1);

const map2 = new Map();
map2
.set(['a'], 555);
let m2 = map2.get(['a']) 
console.log(m2);// undefined
console.log(map2);//{["a"] => 555}

const map3 = new Map();

const k1 = ['a'];
const k2 = ['a'];

map3
.set(k1, 111)
.set(k2, 222);

map3.get(k1) // 111
map3.get(k2) //
}
```
### forEach
这个与Set最大的区别，就是参数。即：第一个参数是值、第二个参数则是键（数组中的键是数值索引），第三个参数是Map本身。
```js
let map = new Map([ ["name", "Nicholas"], ["age", 25]]);
map.forEach(function(value, key, ownerMap) {
    console.log(key + " " + value);
    console.log(ownerMap === map);
});
//输出
name Nicholas
true
age 25
true
```
### Weak Map
 `WeakMap `类型是键值对的无序列表，其中键必须是**非空的对象**（null除外），值则允许是任意类型。
#### 背景
WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。
```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```
上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。
WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
**注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。**
```js
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```
上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。
#### WeakMap语法
`WeakMap` 与 `Map `在 API 上的区别主要是两个，一是没有遍历操作（即没有`key()`、`values()`和`entries()`方法），也没有`size`属性。WeakMap只有四个方法可用：`get()、set()、has()、delete()`。
### 总结
Set，有序、无重复值的列表。会自动移除重复值。Set 并不是数组的子类型，所以你无法随机访问其中的值。但你可以使用 has() 方法来判断某个值是否存在于 Set 中，或通过 size 属性来查看其中有多少个值。 Set 类型还拥有 forEach() 方法，用于处理每个值。
Weak Set 是只能包含对象的特殊 Set 。其中的对象使用弱引用来存储，意味着当 Weak Set 中的项是某个对象的仅存引用时，它不会屏蔽垃圾回收。由于内存管理的复杂性， Weak Set 的内容不能被检查，因此最好将 Weak Set 仅用于追踪需要被归组在一起的对象。
Map 是有序的键值对，其中的键允许是任何类型。与 Set 相似，通过调用 Object.is() 方法来判断重复的键，这意味着能将数值 5 与字符串 "5" 作为两个相对独立的键。使用 set() 方法能将任何类型的值关联到某个键上，并且该值此后能用 get() 方法提取出来。 Map 也拥有一个 size 属性与一个 forEach() 方法，让项目访问更容易。
Weak Map 是只能包含对象类型的键的特殊 Map 。与 Weak Set 相似，键的对象引用是弱引用，因此当它是某个对象的仅存引用时，也不会屏蔽垃圾回收。当键被回收之后，所关联的值也同时从 Weak Map 中被移除。对于和对象相关联的附加信息来说，若要在访问它们的代码之外对其进行生命周期管理（也就是说，当在对象外部移除对象的引用时，要求其私有数据也能一并被销毁），则 Weak Map 在内存管理方面的特性让它们成为了唯一合适的选择
