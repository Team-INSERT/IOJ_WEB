import { SVGProps } from "react";

const QuestionCategory = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="32"
      height="36"
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="36" rx="4" fill="#24B984" />
      <path
        d="M19.7963 21.827C19.7963 23.081 17.7633 25 16.6423 25H11.1893V22.986H15.9393C16.3573 22.986 17.0983 22.245 17.0983 21.808V20.307C17.0983 19.851 16.8513 19.642 16.6613 19.604L12.9753 18.464C11.9303 18.217 11.2083 17.609 11.2083 16.089V14.075C11.2083 12.574 12.6333 11.206 14.3813 11.206H19.3973V13.22H15.0653C14.4763 13.22 13.9063 13.486 13.9063 14.265V15.918C13.9063 16.317 14.0773 16.469 14.4383 16.564L18.5993 17.894C19.7393 18.255 19.7963 19.129 19.7963 19.68V21.827Z"
        fill="white"
      />
    </svg>
  );
};

export default QuestionCategory;