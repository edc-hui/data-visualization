export const uuid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return ("dataV" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export const getPathLength = (path: string): number => {
  const pathDom = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathDom.setAttribute('d', path);
  return pathDom.getTotalLength();
};
