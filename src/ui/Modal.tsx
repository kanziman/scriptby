import {
  cloneElement,
  createContext,
  MouseEvent,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

// ---------- Styled Components ----------
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 9999;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// ---------- Modal Context ----------
interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

// ---------- Modal Container ----------
interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// ---------- Modal.Open ----------
interface OpenProps {
  children: ReactElement;
  opens: string;
}

function Open({ children, opens }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) return null;

  const { open } = context;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    open(opens);
  };

  return cloneElement(children, { onClick: handleClick });
}

// ---------- Modal.Window ----------
interface WindowProps {
  children: ReactElement;
  name: string;
}

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) return null;

  const { openName, close } = context;
  const ref = useOutsideClick(close) as React.RefObject<HTMLDivElement>;
  if (name !== openName) return null;

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    close();
  };

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={handleClose}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// ---------- Attach subcomponents ----------
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
