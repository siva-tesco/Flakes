import { useEffect, useRef } from 'react';

interface UseDataRefreshOptions {
  onRefresh: () => Promise<void> | void;
  dependencies?: any[];
  refreshOnFocus?: boolean;
  refreshOnVisibilityChange?: boolean;
}

export function useDataRefresh({
  onRefresh,
  dependencies = [],
  refreshOnFocus = true,
  refreshOnVisibilityChange = true,
}: UseDataRefreshOptions) {
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  // Refresh data when component mounts or dependencies change
  useEffect(() => {
    onRefresh();
  }, dependencies);

  // Refresh data when window gains focus
  useEffect(() => {
    if (!refreshOnFocus) return;

    const handleFocus = () => {
      // Debounce refresh calls
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      
      refreshTimeoutRef.current = setTimeout(() => {
        onRefresh();
      }, 100);
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [onRefresh, refreshOnFocus]);

  // Refresh data when page becomes visible
  useEffect(() => {
    if (!refreshOnVisibilityChange) return;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Debounce refresh calls
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
        
        refreshTimeoutRef.current = setTimeout(() => {
          onRefresh();
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [onRefresh, refreshOnVisibilityChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);
}