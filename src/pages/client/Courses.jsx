import { Card, Col, Row } from 'antd';
import React from 'react';
const Courses = () => (
  <Row gutter={24}>
    <Col span={6}>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
  </Row>
);
export default Courses;