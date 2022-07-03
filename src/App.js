import React, { Component } from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.h2`
  text-decoration: underline;
  color: ${props => props.theme.themeColor};
  font-size: ${props => props.theme.fontSize};
  `

class Home extends Component {
  render() {
    return (
      <TitleWrapper>我是home的标题</TitleWrapper>
      <div>详情请导入具体的组件进行查看</div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
        <Home />
    )
  }
}
