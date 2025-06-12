const Select = ({ name, label, options, value, onChange }) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm" htmlFor={name}>
        {label}
      </label>
      <select
        className="bg-background outline-0 p-2 border border-[#D1D5DB] rounded-lg"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        {options?.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
