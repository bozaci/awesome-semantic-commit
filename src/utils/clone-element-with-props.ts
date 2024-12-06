import React from 'react';

/**
 * Clones a given React element and applies the specified props to it.
 * If the cloned element is not a valid React element, it returns `null`.
 *
 * @param element The React element to be cloned.
 * @param props The props to be applied to the cloned element.
 * @returns The cloned React element with the new props, or `null` if the element is not valid.
 */
export const cloneElementWithProps = (
  element: React.ReactElement,
  props: Record<string, any>,
): React.ReactElement | null => {
  const clonedEl = React.cloneElement(element, props);

  if (!React.isValidElement(clonedEl)) return null;

  return clonedEl;
};
