import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
  isActive: boolean;
  id: string;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  children: string;
}

const ModalSec = styled.div<{ $active?: boolean }>`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) => (props.$active ? `scale(1)` : `scale(0)`)};
`;

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #191970;
`;

export default function Modal({
  isActive,
  setIsActive,
  children,
  id,
}: ModalProps) {
  return (
    <ModalSec $active={isActive} onClick={() => setIsActive(false)}>
      <ModalContent id={id} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalSec>
  );
}
