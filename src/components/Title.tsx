import React from 'react';

interface Props {
  title: string;
}

export const Title: React.FC<Props> = ({ title }) => (
  <h1 className="text-3xl my-10 text-center">{title}</h1>
);