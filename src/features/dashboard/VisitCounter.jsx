import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTodayVisitCount } from "../../utils/visit";

const VisitCounterBox = styled.div`
  position: absolute;
  top: 9rem;
  right: 1rem;
  color: var(--color-grey-300);
  font-size: 1rem;
  z-index: 999;
`;

export default function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    getTodayVisitCount().then(({ count }) => setCount(count));
  }, []);

  return <VisitCounterBox>Today: {count ?? "loading..."}</VisitCounterBox>;
}
