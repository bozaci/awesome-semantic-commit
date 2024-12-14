import posthog from 'posthog-js';

/**
 * It is an event tracking function.
 * Sends the specified event name (captureName) to the monitoring service.
 *
 * @param string captureName - Name of the event to be captured. If not provided, it is sent as 'undefined'.
 * @returns {void} - If it is not in a production environment, it does nothing..
 */
export const track = (captureName: string): void => {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') return;

  posthog.capture(captureName || 'undefined');
};
