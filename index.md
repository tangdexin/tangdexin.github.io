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
### 组件渲染
当React遇到的元素是用户自定义的组件，它会将JSX属性作为**单个对象**传递给该组件,**这个对象称之为“props”**。例如,这段代码会在页面上渲染出"Hello,Sara":
```markdown
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
**组件必须以大写字母开头**
### 组件组合
组件可以组合，但是：**组件的返回值只能有一个根元素。这也是我们要用一个div包裹组件元素的原因**
```markdown
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```
### 组件提取（重点）
```markdown
//原复杂组件，不可重用
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
             src={props.author.avatarUrl}
             alt={props.author.name} />
      </div>
    </div>
  );
}
//拿出来独立的部分，自定义组件（因为是组件，所以author和user究竟叫什么，意义不大，只要组件易懂即可）
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
//当需要使用Avatar这个组件的时候，传入属性值，能够从父组件得到数据即可，这里假设，父组件的属性，就是命名为author，现在使用Avatar：
<Avatar user={props.author} />
//可以看到，这里，Avatar就的user就是它父组件的author，获得了属性值。这就是最基本的组件提取

```
### props的只读性
像纯函数那样使用props：当它没有改变它自己的输入值，当传入的值相同时，总是会返回相同的结果。state可以在不违反上面规则的前提下，动态改变输出

## state和生命周期
定义为类的组件，才有额外的特性。
### 将函数转换为类
方法步骤：
1. 创建一个名称扩展为React.Component的ES6 类
2. 创建一个叫做render()的空方法
3. 将函数体移动到render()方法中
4. 在render()方法中，使用this.props替换props
5. 删除剩余的空函数声明
```markdown
//原 函数定义的组件
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
//现 类组件 (还有一种老方法，React.createClass，区别点击[链接](http://blog.csdn.net/u014695532/article/details/52830545)
class Clock extend React.Component{
    render(){
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
  );
    }
}
```
