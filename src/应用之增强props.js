import React, { PureComponent } from 'react';
/*
    这里的应用场景是:假如我们有很多组件都要新添加一个或多个属性,那这种情况下就可以使用高阶组件来实现:
    1.首先我们先定义一个高阶组件,并将我们新添加的组件在这里传递下去
    2.将我们使用的组件使用高阶组件包裹
    3.在原来使用的组件的地方使用高阶组件替换
    具体如下:
*/
// 定义一个高阶组件
function enhanceRegionProps(WrappedComponent) {
  return props => {
    // 这个将我们的 region 参数传下去
    return <WrappedComponent {...props} region="中国"/>
  }
}
// 之前使用的普通组件
class Home extends PureComponent {
  render() {
    return <h2>Home: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
  }
}

// 之前使用的普通组件
class About extends PureComponent {
  render() {
    return <h2>About: {`昵称: ${this.props.nickname} 等级: ${this.props.level} 区域: ${this.props.region}`}</h2>
  }
}

// 使用高阶组件包裹原来的组件
const EnhanceHome = enhanceRegionProps(Home);
const EnhanceAbout = enhanceRegionProps(About);

class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <Home nickname="coderwhy" level={90}/>
        <About nickname="kobe" level={99}/>
        {/* 使用高阶组件替换原来的组件 */}
        <EnhanceHome nickname="coderwhy" level={90}/>
        <EnhanceAbout nickname="kobe" level={99}/>
      </div>
    )
  }
}

export default App;

