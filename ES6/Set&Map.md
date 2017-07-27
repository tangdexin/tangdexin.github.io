# Set 和 Map
## 背景
JS以前只存在一种集合类型———数组类型。数组在 JS 中的使用正如其他语言的数组一样，但缺少更多类型的集合导致数组也经常被当作队列与栈来使用。数组只使用了数值型的索引，而如果非数值型的索引是必要的，开发者便会使用非数组的对象。这种技巧引出了非数组对象的定制实现，即 Set 与 Map 。
## Set和Map的区别
Set | Map
----|----
不包含重复值，列表|键值对，一一对应的两个值