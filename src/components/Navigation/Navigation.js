import React from 'react';

import { Drawer, Menu, Icon, Layout } from 'antd';
import { observer, useObservable } from 'mobx-react-lite';

const { Header, Sider, Content } = Layout;

export default observer(props => {
  const state = useObservable({
    visible: false,
  });

  const openDrawer = () => {
    state.visible = true;
  };

  const onClose = () => {
    state.visible = false;
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout>
        <Drawer title='bken.io' placement='left' onClose={onClose} visible={state.visible}>
          <Menu mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='home' />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='upload' />
              <span>Upload</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='video-camera' />
              <span>Videos</span>
            </Menu.Item>
            <Menu.Item key='4'>
              <Icon type='user' />
              <span>Account</span>
            </Menu.Item>
          </Menu>
        </Drawer>
        <Layout>
          <Header theme='dark' style={{ background: '#001529', padding: 0 }}>
            <Icon
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '22px',
                color: 'white',
                height: '64px',
                width: '64px',
              }}
              type='menu'
              onClick={openDrawer}
            />
          </Header>
          <Content
            style={{
              background: '#212c34',
              height: 'auto',
              minHeight: 'auto',
            }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
});