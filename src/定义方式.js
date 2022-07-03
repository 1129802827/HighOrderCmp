import React, { PureComponent } from 'react'

class App extends PureComponent {
  render() {
    return (
      <div>
        App: {this.props.name}
      </div>
    )
  }
}
/*
    高阶组件的定义方式:
    1.首先高阶组件并不是一个组件,而是一个函数
    2.这个函数的参数是一个组件,返回值也是一个组件
    3.高阶组件并不是 React API 的一部分,他是基于React 组合特性而形成的设计模式

*/
function enhanceComponent(WrappedComponent) {
    // 这里我们定义一个类组件 
  class NewComponent extends PureComponent {
    render() {
    //   这里通常我们将传入的组件返回, 并将接收到的参数传递下去
      return <WrappedComponent {...this.props}/>
    }
  }
  // 这里我们可以给定义的组件设置一个显示的名字
  NewComponent.displayName = "Kobe";
  return NewComponent;
}

function enhanceComponent2(WrappedComponent) {
    // 这里我们定义一个函数式组件
  function NewComponent(props) {
    return <WrappedComponent {...props}/>
  }

  NewComponent.displayName = "Kobe";
  return NewComponent;
}

const EnhanceComponent = enhanceComponent(App);
// 这里我们导出的是经过高阶组件包装后的组件
export default EnhanceComponent;

