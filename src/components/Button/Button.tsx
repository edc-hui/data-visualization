import React, {CSSProperties, useEffect, useRef} from "react";
import classNames from "classnames";

type ButtonTypes = 'dataV-animation1' | 'dataV-animation2';

export interface ButtonProps {
  className?: string;
  type?: ButtonTypes;
  style?: CSSProperties;
}

type Button = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Button> = props => {
  const {
    className,
    style,
    children,
    type,
    ...restProps
  } = props;
  const btnRef1 = useRef<any>(null);
  useEffect(() => {
    if (btnRef1.current) {
      const btn1TotalPath: number = btnRef1.current.getTotalLength();
      btnRef1.current.setAttribute('stroke-dasharray', btn1TotalPath);
      btnRef1.current.setAttribute('stroke-dashoffset', btn1TotalPath);
    }
  }, [])

  const classes = classNames("dataV-btn", className, {
    [type as ButtonTypes]: type
  });
  return (
    <div {...restProps} className={classes} style={style}>
      {
        type === 'dataV-animation1' ?
          <>
            <svg>
              <rect x="0" y="0">

              </rect>
              <rect ref={btnRef1} x="0" y="0">

              </rect>
            </svg>
            <span className="dataV-btn-text">{children}</span>
          </>
          :
          null
      }
      {
        type === 'dataV-animation2' ?
          <div>
            {children}
          </div>
          :
          null
      }
    </div>
  )
}

Button.defaultProps = {
  type: 'dataV-animation1'
}

export default Button;
