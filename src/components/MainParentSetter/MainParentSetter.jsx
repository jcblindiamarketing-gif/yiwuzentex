// components/MainParentSetter.tsx
import { useEffect } from "react";
import { set, unset } from "sanity";

const MainParentSetter = ({ value, parent, onChange }) => {
  useEffect(() => {
    const findRoot = (node) => {
      if (!node?.parent) return node?._ref || node?._id;
      return findRoot(node.parent);
    };

    const rootId = parent?.value?.parent
      ? findRoot(parent?.value)
      : parent?.value?._id;

    if (rootId && rootId !== value?._ref) {
      onChange(rootId ? set({ _type: "reference", _ref: rootId }) : unset());
    }
  }, [parent?.value]);

  return null; // hidden input, handled programmatically
};

export default MainParentSetter;
