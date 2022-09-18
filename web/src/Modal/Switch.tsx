import { useState, useEffect } from "react";

const typeMap: Record<string, { title: string; svg: JSX.Element }> = {
  world: {
    title: "World",
    svg: (
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.36285 1.64491C3.5844 2.10799 2.234 3.63162 2.02746 5.5H4.02505C4.13715 4.11841 4.59955 2.79221 5.36285 1.64491ZM7.63715 1.64491C8.40045 2.79221 8.86285 4.11841 8.97495 5.5H10.9725C10.766 3.63162 9.4156 2.10799 7.63715 1.64491ZM7.9712 5.5C7.84561 4.14341 7.33484 2.85097 6.5 1.7754C5.66516 2.85097 5.15439 4.14341 5.0288 5.5H7.9712ZM5.0288 6.5H7.9712C7.84561 7.85659 7.33484 9.14903 6.5 10.2246C5.66516 9.14903 5.15439 7.85659 5.0288 6.5ZM4.02505 6.5H2.02746C2.234 8.36838 3.58441 9.89202 5.36286 10.3551C4.59956 9.20779 4.13715 7.88159 4.02505 6.5ZM7.63714 10.3551C8.40044 9.20779 8.86285 7.88159 8.97495 6.5H10.9725C10.766 8.36838 9.4156 9.89202 7.63714 10.3551ZM6.5 11.5C9.53757 11.5 12 9.03757 12 6C12 2.96243 9.53757 0.5 6.5 0.5C3.46243 0.5 1 2.96243 1 6C1 9.03757 3.46243 11.5 6.5 11.5Z"
          fill="#392928"
        />
      </svg>
    ),
  },
  my: {
    title: "Myself",
    svg: (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.58579 2.08579C4.96086 1.71071 5.46957 1.5 6 1.5C6.53043 1.5 7.03914 1.71071 7.41421 2.08579C7.78929 2.46086 8 2.96957 8 3.5V5H4V3.5C4 2.96957 4.21071 2.46086 4.58579 2.08579ZM3 5V3.5C3 2.70435 3.31607 1.94129 3.87868 1.37868C4.44129 0.81607 5.20435 0.5 6 0.5C6.79565 0.5 7.55871 0.81607 8.12132 1.37868C8.68393 1.94129 9 2.70435 9 3.5V5H9.5C10.3284 5 11 5.67157 11 6.5V10C11 10.8284 10.3284 11.5 9.5 11.5H2.5C1.67157 11.5 1 10.8284 1 10V6.5C1 5.67157 1.67157 5 2.5 5H3ZM8.5 6H3.5H2.5C2.22386 6 2 6.22386 2 6.5V10C2 10.2761 2.22386 10.5 2.5 10.5H9.5C9.77614 10.5 10 10.2761 10 10V6.5C10 6.22386 9.77614 6 9.5 6H8.5Z"
          fill="#392928"
          fillOpacity="0.75"
        />
      </svg>
    ),
  },
};

interface IProps {
  value?: string;
  onChange?: (newValue: string) => void;
}

const Switch: React.FC<IProps> = ({
  value = "world",
  onChange: onChangeOrigin,
}) => {
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const onChange = (newValue: string) => {
    setCurrent(newValue);
    if (typeof onChangeOrigin === "function") {
      onChangeOrigin(newValue);
    }
  };

  return (
    <div className="flex flex-wrap justify-center p-1 rounded-lg bg-paper-50">
      {Object.keys(typeMap).map((item) => (
        <label
          className={`flex justify-center w-[72px] rounded-md cursor-pointer transition-all duration-150 ${
            item === current
              ? "text-paper-1000 bg-white shadow-sm"
              : "text-paper-750 hover:bg-paper-50"
          }`}
          onClick={() => onChange(item)}
          key={item}
        >
          <div className="flex flex-row items-center justify-center px-2 py-1 ">
            <div className="flex justify-center items-center w-[16px] h-[16px]">
              {typeMap[item]?.svg}
            </div>
            <div className="text-md pl-1">{typeMap[item]?.title}</div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default Switch;
