import { useMemo } from "react";
import guides from "../guides.js";

/**
 * Searches all topics across every guide and section.
 * Returns null when query is empty, or an array of { topic, section, guide } matches.
 */
export function useSearch(query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const results = [];
    for (const guide of guides) {
      for (const section of guide.sections) {
        for (const topic of section.topics) {
          if (
            topic.title.toLowerCase().includes(q) ||
            (topic.answer && topic.answer.toLowerCase().includes(q)) ||
            (topic.tip    && topic.tip.toLowerCase().includes(q))
          ) {
            results.push({ topic, section, guide });
          }
        }
      }
    }
    return results;
  }, [query]);
}
