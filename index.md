# React 学习笔记
## React的意义
React 把过去不断重复构建 UI 的过程抽象成了组件，且在给定参数的情况下约
定渲染对应的 UI 界面。React 能充分利用很多函数式方法去减少冗余代码。此外，由于它本身就
是简单函数，所以易于测试。可以说，函数式编程才是 React 的精髓

## 基础
### JSX(含易错点)
#### JSX简介
下面是最简单的JSX变量
```markdown
const element = <h1>Hello, world!</h1>;
```
可以在JSX内直接使用JavaScript 表达式，但是：**在 JSX 当中的表达式要包含在大括号里**
```makdown
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```
#### JSX属性
引号定义字符串属性，大括号定义以JS表达式为值的属性。
但是：**大括号外面再嵌套引号，会将引号内的都处理为字符串**
```markdown
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
```
#### JSX嵌套
标签是闭合的，必须像HTML那样有结尾，如  />      **JSX使用驼峰法定义属性名称，更像JS**
#### JSX代表objects 对象


