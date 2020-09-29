import React, {CSSProperties, useEffect, useRef, useState} from "react";
import classNames from "classnames";

export interface BorderProps {
  className?: string;
  style?: CSSProperties;
  borderColor?: string;
  borderWidth?: number;
  partColor?: string;
  partWidth?: number;
}

interface pointProps {
  path: string;
  maskR: number;
}

const Border: React.FC<BorderProps> = props => {
  const {
    className,
    style,
    children,
    borderColor,
    borderWidth,
    partColor,
    partWidth
  } = props;
  const borderRef = useRef<any>(null);
  const [borderProps, setBorderProps] = useState<pointProps>({
    path: 'M0.5,0.5 L300,0.5 L300,200 L0.5,200 L0.5,0.5',
    maskR: 60
  });

  useEffect(() => {
    if (borderRef.current) {
      const width = borderRef.current.offsetWidth;
      const height = borderRef.current.offsetHeight;
      setBorderProps({
        ...borderProps,
        path: `M0.5,0.5 L${width - 0.5},0.5 L${width - 0.5},${height - 0.5} L0.5,${height - 0.5} L0.5,0.5`,
        maskR: 60 * width / 200
      });
    }
  }, [])


  const classes = classNames('dataV-border', className);
  return (
    <div ref={borderRef} className={classes} style={style}>
      <svg className="dataV-border-svg">
        <defs>
          <path
            d={borderProps.path}
            fill="none"
            id="dataV-border-svg-path"
          />
          {/*定义渐变色*/}
          <radialGradient id="dataV-border-svg-radialGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </radialGradient>
          {/*定义蒙版*/}
          <mask id="dataV-border-svg-mask">
            <circle
              cx="0"
              cy="0"
              r={borderProps.maskR}
              fill="url(#dataV-border-svg-radialGradient)"
            >
              <animateMotion
                path={borderProps.path}
                dur="3s"
                rotate="auto"
                repeatCount="indefinite"
              />
            </circle>
          </mask>
        </defs>
        <use stroke={borderColor} strokeWidth={borderWidth} href="#dataV-border-svg-path"/>
        <use stroke={partColor} strokeWidth={partWidth} href="#dataV-border-svg-path"
             mask="url(#dataV-border-svg-mask)">
          {/*<animate*/}
          {/*  attributeName="stroke-dasharray"*/}
          {/*  from="0,1796"*/}
          {/*  to="1796,0"*/}
          {/*  dur="3s"*/}
          {/*  repeatCount="indefinite"*/}
          {/*>*/}

          {/*</animate>*/}
        </use>
      </svg>
      <div className="dataV-border-content">
        {children}
      </div>
    </div>
  )
}

Border.defaultProps = {
  borderColor: 'rgba(25, 225, 225, .3)',
  borderWidth: 1,
  partColor: 'rgba(25, 225, 225, 1)',
  partWidth: 5
}

export default Border;
