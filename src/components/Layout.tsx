import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const MyLayout = (props: any) => {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 10%",
        padding: 24,
        minHeight: 435,
      }}
    >
      {props.children}
    </Content>
  );
}

export default MyLayout;
