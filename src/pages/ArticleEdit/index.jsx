import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout'
import { Row, Col, Card, Form, Input, Button, Upload, Icon, message, Avatar } from 'antd';
import { connect } from 'dva';

class ArticleEdit extends Component {

  constructor(props) {
    super()

    this.state = {
      current: '0',
      loading: false,
      imageUrl: `/api/user/avatar/get?imgid=${props.currentUser.avatar}` || ''
    }
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(
      {
        force: true,
      },
      (err, values) => {
        if (!err) {
          dispatch({
            type: 'articleEdit/submit',
            payload: values,
          });
        }
      },
    );
  };

  render() {
    const { imageUrl } = this.state;
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const title = '写文章';
    return (
      <GridContent>
        <Row gutter={24} type="flex" justify="center">
          <Col lg={18} md={24}>
            <Card title={title} bordered={false}>
              <Row gutter={24}>
                <Col lg={2} md={0}>
                  <Avatar shape="square" src={imageUrl} size={64} icon="user" />
                </Col>
                <Col lg={21} md={24}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator('title')(
                        <Input
                          size="large"
                          placeholder="文章标题"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('content')(
                        <Input.TextArea
                          rows={20}
                          placeholder="文章内容"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        size="large"
                        loading={submitting}
                        type="primary"
                        htmlType="submit"
                      >
                        提交
                    </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </GridContent>
    )
  }
}

export default connect(({ articleEdit, user, loading }) => ({
  currentUser: user.currentUser,
  articleEdit,
  submitting: loading.effects['articleEdit/submit'],
}))(Form.create()(ArticleEdit))
