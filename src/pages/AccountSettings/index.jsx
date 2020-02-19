import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout'
import { Menu, Row, Col, Card, Form, Input, Button, Upload, Icon, message } from 'antd';
import { connect } from 'dva';

class AccountSettings extends Component {

  state = {
    current: '0',
    loading: false
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
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
            type: 'accountSettings/submit',
            payload: values,
          });
        }
      },
    );
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { imageUrl } = this.state;
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const title = ['基本信息'][this.state.current];
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/user/update/avatar"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
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
            </Card>
          </Col>
        </Row>
      </GridContent>
    )
  }
}

export default connect(({ accountSettings, loading }) => ({
  accountSettings,
  submitting: loading.effects['accountSettings/submit'],
}))(Form.create()(AccountSettings))
