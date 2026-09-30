// A sort option for the SortFilter controls above a PostList.
export interface SortField {
  /** Also the data-* attribute on each list item that holds the sort key. */
  value: string;
  label: string;
  /** Spelled-out direction labels, since an arrow alone is ambiguous once the field changes. */
  asc: string;
  desc: string;
  /** The direction you almost always want when picking this field. */
  defaultDir: 'asc' | 'desc';
  /** Compare as text rather than numbers. */
  text?: boolean;
}
