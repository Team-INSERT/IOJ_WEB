import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { NexonFont, theme } from "../style";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownContent = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  width: 100%;
  background-color: ${theme.insertBlue};
  border-radius: 5px;
  margin-top: 5px;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: white;
  ${NexonFont.NexonSmallText}
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    border-radius: 5px;
  }
`;

const ArrowIcon = styled.div<{ open: boolean }>`
  float: right;
  margin-left: 10px;
  transform: ${({ open }) => (open ? "rotate(0deg)" : "rotate(180deg)")};
  transition: transform 0.3s ease;
`;

interface DropdownProps {
  onSelectLanguage: (language: string, file: string) => void;
}

const extensions: { [key: string]: string } = {
  python: "py",
  java: "java",
  c: "c",
  cpp: "cpp", // cpp로 변경
};

const Dropdown: React.FC<DropdownProps> = ({ onSelectLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Python");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    let language = item.toLowerCase();

    if (language === "c++") {
      language = "cpp";
    }

    const extension = extensions[language];
    const file = `Main.${extension}`;
    
    setSelectedItem(item);
    setIsOpen(false);
    onSelectLanguage(language, file);
  };

  return (
    <DropdownContainer>
      <Button mode="small" color="blue" font="nexon" onClick={toggleDropdown}>
        {selectedItem}
        <ArrowIcon open={isOpen}>▲</ArrowIcon>
      </Button>
      <DropdownContent open={isOpen}>
        <DropdownItem onClick={() => handleItemClick("JAVA")}>
          JAVA
        </DropdownItem>
        <DropdownItem onClick={() => handleItemClick("Python")}>
          Python
        </DropdownItem>
        <DropdownItem onClick={() => handleItemClick("C++")}>C++</DropdownItem>
        <DropdownItem onClick={() => handleItemClick("C")}>C</DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
