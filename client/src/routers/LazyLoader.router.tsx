import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

import React, {
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from "react";

interface LazyLoaderProps {
  element: LazyExoticComponent<ComponentType>;
}

export const LazyLoader: React.FC<LazyLoaderProps> = ({ element: Element }) => {
  const defaultFallback = (
    <Flex align="center" gap="middle">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Flex>
  );

  return (
    <Suspense fallback={defaultFallback}>
      <Element />
    </Suspense>
  );
};
