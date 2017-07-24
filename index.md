# React 学习笔记
## React的意义
React 把过去不断重复构建 UI 的过程抽象成了组件，且在给定参数的情况下约
定渲染对应的 UI 界面。React 能充分利用很多函数式方法去减少冗余代码。此外，由于它本身就
是简单函数，所以易于测试。可以说，函数式编程才是 React 的精髓

## JSX(含易错点)
### JSX简介
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
### JSX属性
引号定义字符串属性，大括号定义以JS表达式为值的属性。
但是：**大括号外面再嵌套引号，会将引号内的都处理为字符串**
```markdown
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
```
### JSX嵌套
标签是闭合的，必须像HTML那样有结尾，如  />      **JSX使用驼峰法定义属性名称，更像JS**
### JSX代表objects 对象

## 组件
组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。
**props就像是即将传入组件的参数**
下方是定义一个组件的方法，它接收一个单一的**props”对象**并返回一个React元素。我们之所以称这种类型的组件为函数定义组件，是因为从字面上来看，它就是一个JavaScript函数。
```markdown
//使用JS函数
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//使用ES6 class
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
