import React, { PureComponent, createContext } from 'react';
/*
    该场景是在我们使用Context共享数据时的应用。之前我们想使用 Context给子组件共享数据时步骤如下:
    1.使用createContext创建一个 context,这里可以设置默认值
    2.使用UserContext.Provider组件包裹需要共享数据的子组件,并设置共享的数据赋值给 value 属性;
    3.在需要使用共享数据的子组件中,使用<UserContext.Consumer>取出共享的数据

    下面是针对具体场景分析:
    假设我们需要给 APP 的子组件 Home1 和 About1 共享数据,那么我们就需要在 Home1 和 About1 中分别使用
    UserContext.Consumer取出共享的数据, 如果有一天我们又要给一个新的叫Detail的组件共享数据,那么我们
    又需要在Detail组件中写上UserContext.Consumer这坨代码取出共享的数据,如果有很多个组件要使用,那么这部
    分同样的代码我们要写上很多份,这很明显不合理;这时候我们就可以是用高阶组件进行优化,具体步骤如下:
    1.正常定义我们的组件;
    2.定义一个高阶组件,将我们返回的组件使UserContext.Consumer包裹,取出共享数据并传递
    3.将我们定义的正常组件作为参数传递给高阶组件
    4.在之前使用正常组件的地方使用对应的高阶组件替换

*/

// 创建Context
const UserContext = createContext({
  nickname: "默认",
  level: -1,
  区域: "中国"
});

// 下面是没有使用高阶组件之前
class Home1 extends PureComponent {
  render() {
    return (
      <UserContext.Consumer>
        {
            // 这里 user 就是共享的数据 value
          user => {
            return <h2>Home1: {`昵称: ${user.nickname} 等级: ${user.level} 区域: ${user.region}`}</h2>
          } 
        }
      </UserContext.Consumer>
    )
  }
}

class About1 extends PureComponent {
  render() {
    return (
      <UserContext.Consumer>
        {
          user => {
            return <h2>About1: {`昵称: ${user.nickname} 等级: ${user.level} 区域: ${user.region}`}</h2>
          } 
        }
      </UserContext.Consumer>
    )
  }
}
// 下面是使用高阶组件的
// 首先定义一个高阶组件
function withUser(WrappedComponent) {
    return props => {
        return (
        <UserContext.Consumer>
            {
            user => {
                return <WrappedComponent {...props} {...user}/>
            } 
            }
        </UserContext.Consumer>
        )
    }
}
// 定义 Home2 组件
class Home2 extends PureComponent {
    render() {
      return <h2>Home2: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
    }
}
// 定义 About2 组件
class About2 extends PureComponent {
    render() {
      return <h2>About2: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
    }
}
 
// 使用高阶组件包裹 Home2 和 About2
const UserHome2 = withUser(Home2);
const UserAbout2 = withUser(About2);

class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <UserContext.Provider value={{nickname: "why", level: 95, region: "中国"}}>
            {/* 下面是没有使用高阶组件的 */}
          <Home1/>
          <About1/>
          {/* 下面是使用高阶组件 */}
          <UserHome2/>
          <UserAbout2/>
        </UserContext.Provider>
      </div>
    )
  }
}

export default App;

