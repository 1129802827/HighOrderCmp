import React, { PureComponent } from 'react';
/*
    该应用场景使用电商里的是否登录来作为例子,如果用户想要访问个人中心、购物车、地址管理等页面,需要判断用户是否登录,如果登录
    则可以正常访问,如果没登录就跳转到登录页,进行登录验证

*/

class LoginPage extends PureComponent {
  render() {
    return <h2>LoginPage</h2>
  }
}

function withAuth(WrappedComponent) {
  const NewCpn = props => {
    const {isLogin} = props;
    if (isLogin) {
      return <WrappedComponent {...props}/>
    } else {
      return <LoginPage/>
    }
  }

  NewCpn.displayName = "AuthCpn"

  return NewCpn;
}

// 购物车组件
class CartPage extends PureComponent {
  render() {
    return <h2>CartPage</h2>
  }
}
// 个人中心组件
class UserPage extends PureComponent {
    render() {
      return <h2>UserPage</h2>
    }
}
// 地址管理组件
class AddressPage extends PureComponent {
    render() {
      return <h2>AddressPage</h2>
    }
}

const AuthCartPage = withAuth(CartPage);
const AuthUserPage = withAuth(UserPage);
const AuthAddressPage = withAuth(AddressPage);


export default class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthCartPage isLogin={true}/>
        <AuthUserPage isLogin={false}/>
        <AuthAddressPage isLogin={true}/>
      </div>
    )
  }
}
