import React, {CSSProperties, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {uuid} from "../../utils";
import _ from "lodash";

export interface TreeGraphData {
  name: string;
  x?: number;
  y?: number;
  r: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  children?: TreeGraphData[] | null;
  distance?: number;
}

export interface TreeGraphProps {
  className?: string;
  style?: CSSProperties;
  data: TreeGraphData;
}

const TreeGraph: React.FC<TreeGraphProps> = props => {
  const {
    className,
    style,
    data
  } = props;
  const [treeData, setTreeData] = useState<TreeGraphData | null>(null);
  const svgParentNode = useRef<HTMLDivElement | null>(null);
  let bounceTimer = useRef<any>(null);
  const bounceEnter = useRef<boolean>(false);
  const bounceLeave = useRef<boolean>(false);
  const classes = classNames('dataV-treeGraph', className);

  useEffect(() => {
    if (svgParentNode.current && data) {
      const deepData = _.cloneDeep(data);
      deepData.x = svgParentNode.current.offsetWidth / 2;
      deepData.y = svgParentNode.current.offsetHeight / 2;
      setTreeData(deepData);
    }
  }, [data])

  /**
   * 获取连线的起始坐标
   * @param lastNodeR 父节点的半径
   * @param curNodeR 自己的半径
   * @param distance 自己与父节点之间的距离
   * @param total 自己与兄弟节点之和
   */
  const getLineStartCoordinate = (lastNodeR: number, curNodeR: number, distance: number | undefined, total: number, index: number, parentCoordinateX: number | undefined, parentCoordinateY: number | undefined) => {
    const nodeDistance = distance || 30;
    const angle = 360 / total;
    const circleRadius = lastNodeR + curNodeR + nodeDistance;
    let x = Math.cos(index * angle * Math.PI / 180) * circleRadius + (parentCoordinateX ? parentCoordinateX : 0);
    let y = Math.sin(index * angle * Math.PI / 180) * circleRadius + (parentCoordinateY ? parentCoordinateY : 0);
    return {
      x,
      y
    }
  }

  /**
   * 渲染叶子节点
   * param ----  节点数据
   * coordinate --- 连线终点坐标
   * radius --- 父节点的半径
   */
  const renderLeafNode = (param: TreeGraphData[], coordinate: { x: number | undefined, y: number | undefined }, radius: number) => {
    return param.map((item: TreeGraphData, index: number) => {
      const lineStartCoordinate = getLineStartCoordinate(radius, item.r, item.distance, param.length, index, coordinate.x, coordinate.y);
      if (item.children) {
        renderLeafNode(item.children, {
          x: item.x,
          y: item.y
        }, item.r)
      }
      return (
        <g
          onMouseEnter={() => {
            nodeMouseEnter(item)
          }}
          onMouseLeave={() => {
            nodeMouseLeave(item)
          }}
          key={uuid()}
          style={{cursor: 'pointer'}}
        >
          <line
            x1={lineStartCoordinate.x}
            y1={lineStartCoordinate.y}
            x2={coordinate.x}
            y2={coordinate.y}
            stroke="#ccc"
            strokeWidth={1}
          />
          <line
            x1={lineStartCoordinate.x}
            y1={lineStartCoordinate.y}
            x2={coordinate.x}
            y2={coordinate.y}
            stroke="transparent"
            strokeWidth={6}
          />
          <circle
            cx={lineStartCoordinate.x}
            cy={lineStartCoordinate.y}
            fill={item.fill}
            stroke={item.stroke}
            strokeWidth={item.strokeWidth}
            r={item.r}
          />
          <text
            x={lineStartCoordinate.x}
            y={lineStartCoordinate.y}
            fontSize={16}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {item.name}
          </text>
        </g>
      )
    })
  }

  const nodeMouseEnter = (node: TreeGraphData) => {
    bounceMove(node, node.r, node.r + 10, 'mouseEnter')
  }

  const nodeMouseLeave = (node: TreeGraphData) => {
    bounceMove(node, node.r, node.r - 10, 'mouseLeave')
  }

  /**
   * 弹性运动函数
   */
  const bounceMove = (node: TreeGraphData, sourceR: number, targetR: number, sign: string) => {
    let currentR = sourceR;
    let speed = 0;
    clearInterval(bounceTimer.current);
    bounceTimer.current = setInterval(() => {
      speed += (targetR - currentR) / 6;
      speed *= 0.87;
      if (Math.abs(targetR - currentR) <= 1 && Math.abs(speed) <= 1) {
        clearInterval(bounceTimer.current);
        node.r = targetR;
        const treeDataNew: TreeGraphData = {...treeData} as TreeGraphData;
        setTreeData(treeDataNew);
        if (sign === 'mouseEnter') {
          bounceEnter.current = true;
        } else {
          bounceLeave.current = true;
        }
      } else {
        currentR += speed;
        node.r = currentR;
        const treeDataNew: TreeGraphData = {...treeData} as TreeGraphData;
        setTreeData(treeDataNew);

        bounceEnter.current = false;
        bounceLeave.current = false;
        // if (sign === 'mouseEnter') {
        //   bounceEnter.current = false;
        // } else {
        //   bounceLeave.current = false;
        // }
      }
    }, 30)
  }

  return (
    <div className={classes} ref={svgParentNode} style={style}>
      <svg width="100%" height="100%">
        {
          treeData && treeData.children && Array.isArray(treeData.children) ?
            renderLeafNode(treeData.children, {
              x: treeData.x,
              y: treeData.y,
            }, treeData.r)
            :
            null
        }
        {/*渲染根节点*/}
        {
          treeData ?
            <g style={{cursor: 'pointer'}}>
              <circle
                cx={treeData.x}
                cy={treeData.y}
                r={treeData.r}
                fill={treeData.fill}
                stroke={treeData.stroke}
                strokeWidth={treeData.strokeWidth}
              />
              <text
                x={treeData.x}
                y={treeData.y}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={16}
              >{treeData.name}</text>
            </g>
            :
            null
        }
      </svg>
    </div>
  )
}

TreeGraph.defaultProps = {};

export default TreeGraph;
