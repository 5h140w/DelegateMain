import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="250" height="60" {...other} ref={ref}>
      <polygon points="0,60 0,0 250,0 250,60" className="bg" />
      <polygon points="0,60 0,0 250,0 250,60" className="borderEffect" />
      <foreignObject x="0" y="0" width="250" height="60">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  margin-top: 15px;
  --main-color: ${
    theme.palette.mode === 'light' ? 'rgb(0,0,0)' : 'rgb(144,202,249)'
  };
  --hover-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(0,0,0,0.04)'
      : 'rgba(144,202,249,0.08)'
  };
  --active-color: ${
    theme.palette.mode === 'light'
      ? 'rgba(0,0,0,0.12)'
      : 'rgba(144,202,249,0.24)'
  };

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: black;
    stroke-width: 0.2;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
    fill: #000000;
  }

  & .borderEffect {
    stroke: #FFF;
    stroke-width: 0;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: #000000;
    }

    .content {
      color: white;
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Roboto;
      font-size: 20px;
      font-weight: 400;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    & svg {
      margin: 0 5px;
    }
  }`,
);

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

export default function StyledButton(props) {
  const value = props.value;
  const handler = props.handler;
  return (
    <SvgButton
      onClick={handler}
    >
      {value} 
    </SvgButton>
  )
}
