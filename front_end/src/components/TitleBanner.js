import React from 'react';
import {Row, Col} from 'antd';

import title_img from '../images/translator.png';

const styles = {
  title_img: {
    display: 'block',
    margin: 'auto',
    maxWidth: '400px',
    width: '90vw',
    marginBotton: '5vh'
  },

  title_text: {
    textAlign: 'center',
    fontWeight: 'lighter'
  }
}

export default function TitleBanner() {
  return (
  <Row>
    <Col span={24}>
      <img src={title_img} style={styles.title_img}  />
      <h1 style={styles.title_text}>Translate any sentence that you like!</h1>
    </Col>
  </Row>
  )
}