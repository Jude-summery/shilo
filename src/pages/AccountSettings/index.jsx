import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout'
import { Menu, Row, Col, Card, Form, Input } from 'antd';
import { connect } from 'dva';

class AccountSettings extends Component {

  state = {
    current: '0'
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    // form.validateFields(
    //   {
    //     force: true,
    //   },
    //   (err, values) => {
    //     if (!err) {
    //       dispatch({
    //         type: 'userRegister/submit',
    //         payload: values,
    //       });
    //     }
    //   },
    // );
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const title = ['基本信息'][this.state.current]
    return(
      <GridContent>
        <Row gutter={24}>
          <Col lg={7}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}>
              <Menu.Item key='0'>
                基本信息
              </Menu.Item>
            </Menu>
          </Col>
          <Col lg={17} md={24}>
            <Card title={title} bordered={false}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item label='邮箱'>
                  {getFieldDecorator('email')(
                    <Input 
                      size="large"
                    />
                  )}
                </Form.Item>
                <Form.Item label='昵称'>
                  {getFieldDecorator('nickname')(
                    <Input 
                      size="large"
                    />
                  )}
                </Form.Item>
                <Form.Item label='个性签名'>
                  {getFieldDecorator('signature')(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label='职业'>
                  {getFieldDecorator('title')(
                    <Input />
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </GridContent>
    )
  }
}

export default connect(({ accountSettings }) => ({
  accountSettings
}))(Form.create()(AccountSettings))
