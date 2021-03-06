import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout'
import { Row, Col, Card, Form, Input, Button, Upload, Icon, message, Avatar } from 'antd';
import { connect } from 'dva';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.less';

class ArticleEdit extends Component {

  constructor(props) {
    super()

    this.state = {
      current: '0',
      loading: false,
      imageUrl: `/api/user/avatar/get?imgid=${props.currentUser.avatar}` || ''
    }
  }

  componentDidMount() {
    const postId = this.props.router.location.query.postId
    if(postId){
      this.props.dispatch({
        type: 'articleEdit/getPost',
        payload: {postId: postId},
        callback: (data) => {
          if(data){
            const { title, content } = data.post
            this.editorInstance.setValue(BraftEditor.createEditorState(content))
            this.props.form.setFieldsValue({
              title: title,
              content: BraftEditor.createEditorState(content)
            })
          }
        }
      })
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
    const postId = this.props.router.location.query.postId
    form.validateFields(
      {
        force: true,
      },
      (err, values) => {
        if (!err) {
          if(postId){
            dispatch({
              type: 'articleEdit/update',
              payload: {
                ...values,
                postId: postId
              },
            });
          } else {
            dispatch({
              type: 'articleEdit/submit',
              payload: values,
            });
          }
        }
      },
    );
  };

  render() {
    const { imageUrl } = this.state;
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const title = '写文章';
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']
    return (
      <GridContent>
        <Row type="flex" justify="center">
          <Col lg={18} md={24} className='edit'>
            <Card title={title} bordered={false}>
              <Row type="flex" justify="center">
                <Col lg={20} md={24}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请填写文章标题' }]
                      })(
                        <Input
                          size="large"
                          placeholder="文章标题"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('content', {
                        rules: [{
                          required: true,
                          validator: (_, value, callback) => {
                            if (value.isEmpty()) {
                              callback('请输入正文内容')
                            } else {
                              callback()
                            }
                          }
                        }],
                      })(
                        <BraftEditor 
                        controls={controls}
                        className={styles['braft-editor']}
                        ref={instance => this.editorInstance = instance}
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

export default connect(({ articleEdit, user, loading, router }) => ({
  router,
  currentUser: user.currentUser,
  articleEdit,
  submitting: loading.effects['articleEdit/submit'],
}))(Form.create()(ArticleEdit))
