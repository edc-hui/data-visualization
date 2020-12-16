import React, {CSSProperties} from "react";
import classNames from "classnames";
import {getPathLength} from "../../utils";

export interface FlyLineProps {
  className?: string;
  style?: CSSProperties;
  path: string;
  during?: number;
  pathColor?: string;
  pathWidth?: number;
  partColor?: string;
  partWidth?: number;
}

const FlyLine: React.FC<FlyLineProps> = props => {
  const {
    className,
    style,
    path,
    during,
    pathColor,
    pathWidth,
    partWidth,
    partColor
  } = props;

  const classes = classNames('dataV-flyLine', className);

  return (
    <div className={classes} style={style}>
      <svg className="dataV-flyLine-svg">
        <defs>
          <path
            d={path}
            id="dataV-flyLine-line"
          />
          <radialGradient
            id="dataV-flyLine-gradient"
            cx="0.5"
            cy="0.5"
            r="0.5"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </radialGradient>
          <mask id="dataV-flyLine-mask">
            <circle
              id="dataV-flyLine-mask-circle"
              r="60"
              fill="url(#dataV-flyLine-gradient)"
            >
              <animateMotion
                path={path}
                dur={during}
                rotate="auto"
                repeatCount="indefinite"
              />
            </circle>
          </mask>
        </defs>
        <use fill="none" stroke={pathColor} strokeWidth={pathWidth} href="#dataV-flyLine-line"/>
        <use fill="none" stroke={partColor} strokeWidth={partWidth} href="#dataV-flyLine-line"
             mask="url(#dataV-flyLine-mask)">
          <animate
            attributeName="stroke-dasharray"
            from={`0,${getPathLength(path)}`}
            to={`${getPathLength(path)},0`}
            dur={during}
            repeatCount="indefinite"
          >
          </animate>
        </use>
      </svg>
    </div>
  )
}

FlyLine.defaultProps = {
  during: 3,
  pathColor: 'rgba(255,255,255,.3)',
  pathWidth: 1,
  partWidth: 3,
  partColor: 'red'
}

export default FlyLine;
