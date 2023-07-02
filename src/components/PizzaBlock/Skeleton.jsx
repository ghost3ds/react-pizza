import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="313" rx="10" ry="10" width="280" height="90" />
    <rect x="0" y="430" rx="10" ry="10" width="90" height="25" />
    <rect x="129" y="420" rx="10" ry="10" width="150" height="50" />
  </ContentLoader>
);

export default Skeleton;
