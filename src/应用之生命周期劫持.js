import React, { PureComponent } from 'react';
/*
    该应用场景使用获取组件的渲染时间来举例,
    假设我们要获取一个组件的渲染时间,我们可以怎么做呢?
    我们可以在组件中实现UNSAFE_componentWillMount,并记录开始渲染时间,然后再实现componentDidMount
    并记录渲染结束时间,结束时间减去开始时间就可以得出组件渲染的时间。
    但是,如果我们要获取每个组件的渲染时间呢?如果按照上面的实现我们需要在每个组件中去实现我们可以在组件中实现
    UNSAFE_componentWillMount和componentDidMount然后计算传渲染时间,这样显然存在大量重复代码。
    这里我们就可以使用高阶组件来优化,具体如下:
    1.定义一个高阶组件,在高阶组件中实现UNSAFE_componentWillMount和componentDidMount并计算出渲染时间
    2.将需要计算渲染时间的组件使用该高阶组件包裹
    3.在原来使用组件的地方替换成对应的高阶组件

*/

//定义一个高阶组件
function withRenderTime(WrappedComponent) {
  return class extends PureComponent {
    // 即将渲染获取一个时间 beginTime
    UNSAFE_componentWillMount() {
      this.beginTime = Date.now();
    }
    // 渲染完成再获取一个时间 endTime
    componentDidMount() {
      this.endTime = Date.now();
      const interval = this.endTime - this.beginTime;
      console.log(`${WrappedComponent.name}渲染时间: ${interval}`)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

class Home extends PureComponent {
  constructor(props){
    super(props);
  }
  render() {
    return <h2>Home:渲染时间${ this.props.interval}</h2>
  }
}


class About extends PureComponent {
  render() {
    return <h2>About</h2>
  }
}

// 创建对应的高阶组件
const TimeHome = withRenderTime(Home);
const TimeAbout = withRenderTime(About);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        {/* 使用对应的高阶组件 */}
        <TimeHome />
        <TimeAbout />
      </div>
    )
  }
}

