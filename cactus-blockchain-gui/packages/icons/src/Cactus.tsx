import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import CactusIcon from './images/cactus.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={CactusIcon} viewBox="0 0 150 58" {...props} />;
}
