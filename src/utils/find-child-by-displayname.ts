import React from 'react';

/**
 * Finds and returns a child component with the specified displayName from the given children.
 *
 * This function iterates over the children and checks each child's `type.displayName`
 * to find the first matching child. It returns the matching child if found, or `undefined`
 * if no matching child is found.
 *
 * @param displayName The displayName of the child component to search for.
 * @param children The `React.ReactNode` (or array of child components) to search within.
 * @returns The matching `React.ReactElement` if a child with the specified displayName is found,
 *          or `undefined` if no matching child is found.
 */
export const findChildByDisplayName = (displayName: string, children: React.ReactNode) => {
  return (
    (React.Children.toArray(children).find(
      (child: any) => child.type.displayName === displayName,
    ) as React.ReactElement) || undefined
  );
};
