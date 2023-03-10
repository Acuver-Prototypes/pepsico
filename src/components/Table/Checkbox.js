import { forwardRef, useEffect, useRef } from "react";

const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" className="bg-primary" ref={resolvedRef} {...rest} />
    </>
  );
});

export default Checkbox;