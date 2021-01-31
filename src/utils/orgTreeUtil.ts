export const transformOrgTreeData = tree => {
  const parentIds: any[] = [];
  tree.map(node => {
    if (node.children) {
      parentIds.push(node.id);
      parentIds.push(...transformOrgTreeData(node.children));
    }
    node.key = node.id || node.key;
    node.title = node.organizationName || node.title;
    node.isSubunit !== undefined && (node.isLeaf = !node.isSubunit);
    return node;
  });

  return parentIds;
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
