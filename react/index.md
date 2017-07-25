# [HOME](https://tangdexin.github.io)  ||  [REACT](https://tangdexin.github.io/react/index)  ||  [ES6](tangdexin.github.io/react/ES6/index)

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
//现 类组件 
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
还有一种老方法，React.createClass，区别点击[链接](http://blog.csdn.net/u014695532/article/details/52830545)
## 事件处理
### 语法不同
1. React事件绑定属性的命名采用驼峰式写法，而不是小写。
2. 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
```react
//HTML写法
<button onclick="activateLasers()">
  Activate Lasers
</button>
//JSX写法
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
### 阻止默认行为
不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault
```react
//HTML
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
//reafunction ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
#### 2种事件处理的写法（疑问：为什么必须将handleClick: function(event)等换成handleClick(event)才能顺利运行？）
```react
//第一种，ES6写法
 class LikeButton extends React.Component {
	       constructor(props) {
         super(props);
         this.state = {liked: true};
		      this.handleClick = this.handleClick.bind(this);
      }
         getInitialState() {
          return {liked: false};
        }
        handleClick(event) {
          this.setState({liked: !this.state.liked});
        }
        render() {
          var text = this.state.liked ? '喜欢' : '不喜欢';
          return (
            <p onClick={this.handleClick}>
              你<b>{text}</b>我。点我切换状态。
            </p>
          );
        }
      }

      ReactDOM.render(
        <LikeButton />,
        document.getElementById('root')
      );
      
 //第二种
  var LikeButton = React.createClass({
        getInitialState: function() {
          return {liked: false};
        },
        handleClick: function(event) {
          this.setState({liked: !this.state.liked});
        },
        render: function() {
          var text = this.state.liked ? '喜欢' : '不喜欢';
          return (
            <p onClick={this.handleClick}>
              你<b>{text}</b>我。点我切换状态。
            </p>
          );
        }
      });

      ReactDOM.render(
        <LikeButton />,
        document.getElementById('root')
      );
```
## 条件渲染
与JS种使用没什么区别，使用较简单
### 与运算符 && 的特性
```react
{unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
```
**在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。**
## 列表 keys
### map()函数
```react
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);//[2, 4, 6, 8, 10]
```
使用map()渲染列表
```react
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((numbers) =>
  <li>{numbers}</li>
);//listItems 渲染的是很多个<li></li>标签，里面的内容是numbers经过map()出来的，所以下方会渲染出5个li，外面需加上ul嵌套，否则报错?(**需确认**)

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
### 用keys提取组件
官方文档的解释有点不够清晰
实际上，在哪输出列表，就是在哪定义key。即使使用某组件接收列表值，也是在接收的时候定义key，而不是在这个组件中定义key。其实这个稍微想一想就可以理解了。
组件就是放在那给大家使用的，谁都能用，你给他定义了key，那怎么玩？
```react
function ListItem(props) {
  // 对啦！这里不需要明确出key:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 又对啦！key应该在数组中被明确出来
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
## 表单
### 受控组件

像```<input><textarea>, 和 <select>```这类表单元素会维持自身状态，并根据用户输入进行更新。但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState(). 方法进行更新

这边直接可以在文档中查看，[链接](https://discountry.github.io/react/docs/forms.html#受控组件)

在react中,```<input>,<textarea><select>```是非常相似的，也是用```this.state = {value: '你好.'};```设置默认值。用```handleChange(event) {this.setState({value: event.target.value});}```获取输入值，用``` <textarea value={this.state.value} onChange={this.handleChange} />```动态渲染输入值。

但是**在React中，会在根select标签上而不是在当前的selected属性上使用value属性。**[代码链接](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)
```react
//通过以下代码可以看到，{value: 'lime'}中的默认值是小写的，即，是标签上的属性，否则默认选择第一个属性
this.state = {value: 'lime'};
//省略代码
<option value="grapefruit">Grapefruit</option>
<option value="lime">Lime</option>
```
### 多个输入框的解决办法
当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。
```react
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    //this.state这边设置默认值
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //定义目标的name值
    const name = target.name;

    //this.setState这边根据标签的name，来确定设置的值
     this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
	  //这里的name
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
	  //这里的name
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

```
