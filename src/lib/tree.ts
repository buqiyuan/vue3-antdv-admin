export function flattenDepts(
  nodes: API.DeptEntity[] | undefined,
  depth = 0,
): { id: number; label: string }[] {
  const rows: { id: number; label: string }[] = [];
  for (const node of nodes ?? []) {
    rows.push({ id: node.id, label: `${depth > 0 ? `${"· ".repeat(depth)}` : ""}${node.name}` });
    if (node.children?.length) rows.push(...flattenDepts(node.children, depth + 1));
  }
  return rows;
}

export function filterMenuTree(
  nodes: API.MenuItemInfo[] | undefined,
  keyword: string,
): API.MenuItemInfo[] {
  const query = keyword.trim().toLowerCase();
  if (!query) return nodes ?? [];

  const visit = (items: API.MenuItemInfo[]): API.MenuItemInfo[] => {
    const next: API.MenuItemInfo[] = [];
    for (const item of items) {
      const children = visit(item.children ?? []);
      const haystack = `${item.name} ${item.path ?? ""} ${item.permission ?? ""}`.toLowerCase();
      if (haystack.includes(query) || children.length > 0) next.push({ ...item, children });
    }
    return next;
  };

  return visit(nodes ?? []);
}

export function collectMenuIds(node: API.MenuItemInfo): number[] {
  return [node.id, ...(node.children ?? []).flatMap((child) => collectMenuIds(child))];
}

export function ancestorMenuIds(
  nodes: API.MenuItemInfo[],
  id: number,
  trail: number[] = [],
): number[] | null {
  for (const node of nodes) {
    if (node.id === id) return trail;
    const nested = ancestorMenuIds(node.children ?? [], id, [...trail, node.id]);
    if (nested) return nested;
  }
  return null;
}
