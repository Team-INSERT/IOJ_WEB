import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
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

const BaseButton = styled.button`
  background-color: ${theme.insertBlue};
  color: ${theme.white};
  border: none;
  &:hover {
    background-color: ${theme.blueNormalHover};
  }
  padding: 7px 10px;
  ${NexonFont.NexonSmallText}
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  min-width: 75px;
`;

interface DropdownProps {
  onSelectLanguage: (language: string, file: string) => void;
  problemId: string;
  contestId: string;
}

const extensions: { [key: string]: string } = {
  python: "py",
  java: "java",
  c: "c",
  cpp: "cpp",
};

const Dropdown: React.FC<DropdownProps> = ({
  onSelectLanguage,
  problemId,
  contestId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("PYTHON");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      `language_${contestId}_${problemId}`,
    );
    if (savedLanguage) {
      const uppercaseLanguage = savedLanguage.toUpperCase();
      setSelectedItem(uppercaseLanguage);
      const language = uppercaseLanguage.toLowerCase();
      const extension = extensions[language === "cpp" ? "cpp" : language];
      const file = `Main.${extension}`;
      onSelectLanguage(language, file);
    }
  }, [problemId, onSelectLanguage, contestId]);

  const handleItemClick = useCallback(
    (item: string) => {
      const uppercaseItem = item.toUpperCase();
      const language = uppercaseItem.toLowerCase();

      const extension = extensions[language];
      const file = `Main.${extension}`;

      setSelectedItem(uppercaseItem);
      setIsOpen(false);

      localStorage.setItem(`language_${contestId}_${problemId}`, language);
      onSelectLanguage(language, file);
    },
    [contestId, problemId, onSelectLanguage],
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <BaseButton onClick={toggleDropdown}>
        {selectedItem}
        <ArrowIcon open={isOpen}>▲</ArrowIcon>
      </BaseButton>
      <DropdownContent open={isOpen}>
        <DropdownItem onClick={() => handleItemClick("JAVA")}>
          JAVA
        </DropdownItem>
        <DropdownItem onClick={() => handleItemClick("PYTHON")}>
          PYTHON
        </DropdownItem>
        <DropdownItem onClick={() => handleItemClick("CPP")}>C++</DropdownItem>
        <DropdownItem onClick={() => handleItemClick("C")}>C</DropdownItem>
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
