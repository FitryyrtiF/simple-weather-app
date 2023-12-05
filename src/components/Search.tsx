import { OptionType } from "../types/types";

type Props = {
  input: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: OptionType[];
  handleClickOption: (option: OptionType) => void;
  handleClick: () => void;
};

function Search({
  input,
  handleChange,
  options,
  handleClickOption,
  handleClick,
}: Props) {
  return (
    <>
      <h1 className="text-3xl">
        Weather <span className="font-semibold">Forecast</span>
      </h1>
      <p className="text-sm mt-2">
        Enter a <span className="font-semibold">city</span> to get the weather
        forecast
      </p>
      <div className="relative mt-8">
        <input
          type="text"
          value={input}
          placeholder="Enter a city ..."
          className="px-2 py-1 text-center border border-slate-400 rounded-l-md"
          onChange={handleChange}
        />
        <ul className="absolute w-48 border border-slate-100 rounded-md bg-slate-50">
          {options.map((option: OptionType, index: number) => (
            <li
              key={option.name + index}
              className="px-2 py-1 border border-slate-200 hover:bg-slate-200"
              onClick={() => {
                handleClickOption(option);
              }}
            >
              <button>{option.name}</button>
            </li>
          ))}
        </ul>
        <button
          className="px-2 py-1 mt-2 border border-slate-400 rounded-r-md bg-slate-200 hover:bg-slate-300 transition-colors"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default Search;
