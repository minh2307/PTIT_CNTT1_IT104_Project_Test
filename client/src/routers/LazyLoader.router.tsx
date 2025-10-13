import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
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
    <div className="flex items-center justify-center h-screen w-full">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );

  return (
    <Suspense fallback={defaultFallback}>
      <Element />
    </Suspense>
  );
};
