export const transformOrgTreeData = tree => {
  tree.map(node => {
    node.key = node.orgId || node.key;
    node.title = node.orgName || node.title;
    node.isLeaf = !node.children || node.children.length === 0 || node.isLeaf;
    if (node.children) {
      transformOrgTreeData(node.children);
    }else{
      delete node.children
    }
    return node;
  });
  return tree;
};

export const updateTreeData = (list, key, children) => {
  return list.map((node: { key: any; children: any; [extra: string]: any }) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
};
