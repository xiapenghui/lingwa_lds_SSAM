import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';
// import url from '../../../assets/bgi.jpg';
// import url from '../../../assets/login.jpg';
// const url = 'http://47.99.130.140/imgs/wallhaven-g83v2e.jpg'
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;


const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status,type: loginType, message } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = async (values) => {
    const { dispatch } = props;
    await dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
    await dispatch({
      type: 'route/getMenuListByUserId',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <div className="sysName">Lean Digitization System </div>
      <div className="sysName sysNameCn">SSAM 生产数字平台</div>
      <div id='backgroundBox' style={styles2.backgroundBox} />

      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>

        {status === 'error' && loginType === 'account' && !submitting && (
          // <LoginMessage content="账户或密码错误（admin）" />
          <LoginMessage content={message} />
        )}

        <UserName
          name="userName"
          placeholder="用户名: admin or user"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="密码: sf"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />


        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>

          {/* <Link className={styles.register} to="/user/register">
            注册账户
          </Link> */}
        </div>
      </LoginForm>
    </div>
  );
};


const styles2 = {
  backgroundBox: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    // backgroundImage: `url(${url})`,
    // backgroundSize: 'cover',
    // transition:'all .5s'
  },
  focus: {
    // transform: 'scale(0.7)',
    width: '20px',
    opacity: 1
  },
  loadingBox: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  },
  loadingTitle: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: -45,
    marginTop: -18,
    color: '#000',
    fontWeight: 500,
    fontSize: 24
  },
}

export default connect(({ login, loading ,user}) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
  user
}))(Login);
