import { useState } from "react";
import styled from "styled-components";
import { Pretendard, theme } from "../style";

const DropdownContainer = styled.div`
  position: relative;
  width: 20rem;
`;

const DropdownButton = styled.button`
  ${Pretendard.SmallText}
  padding: 15px 10px;
  width: 40rem;
  font-size: 16px;
  border: 1px solid ${theme.grey200};
  border-radius: 4px;
  background-color: ${theme.white};
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:focus {
    border-color: ${theme.grey400};
    outline: none;
  }
`;

const DropdownContent = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  width: 40rem;
  background-color: ${theme.white};
  border: 1px solid ${theme.grey200};
  border-radius: 4px;
  margin-top: 5px;
  z-index: 1;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 15px 10px;
  ${Pretendard.SmallText}
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid ${theme.grey200};

  &:hover {
    background-color: ${theme.grey100};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ArrowIcon = styled.div<{ open: boolean }>`
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const CustomDropdown = ({ options, selectedOption, onSelect }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {selectedOption}
        <ArrowIcon open={isOpen}>▲</ArrowIcon>
      </DropdownButton>
      <DropdownContent open={isOpen}>
        {options.map((option: string) => (
          <DropdownItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default CustomDropdown;
