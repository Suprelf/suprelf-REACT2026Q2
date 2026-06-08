import { useMemo, useState, useEffect } from 'react';
import './Autocomplete.css';

type Props = {
  value?: string;
  onChange: (value: string) => void;
  options: string[];
  name?: string;
};

export const Autocomplete = ({
  value = '',
  onChange,
  options,
  name = 'country',
}: Props) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = useMemo(() => {
    if (!query) {
      return options;
    }

    return options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, options]);

  const handleSelect = (value: string) => {
    setQuery(value);
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="ac-wrapper">
      <div className="ac-inputWrapper">
        <input
          type="text"
          name={name}
          value={query}
          className="form-input ac-input"
          placeholder="Select country"
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => setOpen(false), 150);
          }}
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="ac-dropdown">
          {filtered.map((option) => (
            <div
              key={option}
              className="ac-item"
              onMouseDown={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
