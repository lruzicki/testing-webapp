import { RiSearchLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import {  GroupBase, StylesConfig } from 'react-select';

const AsyncReactSelect = dynamic(() => import('react-select/async'), {
  ssr: false,
});

const defaultStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> | undefined = {
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(193, 193, 193, 1)',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '8px 22px 8px 45px',
    maxWidth: '100%',
    overflow: 'hidden',
  }),
  container: (provided) => ({
    ...provided,
    boxShadow: 'none',
    outline: 'none',
    borderRadius: '4px',
    border: '1px solid rgba(223, 223, 234, 1)',
    width: '300px',
    height: '42px',
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    border: 0,
    fontSize: '14px',
    color: 'rgba(193, 193, 193, 1)',
    overflow: 'hidden',
  }),
  option: (provided, isFocused) => ({
    ...provided,
    color: '#282733',
    fontSize: '14px',
    backgroundColor: isFocused ? 'transparent' : 'transparent',
    height: '42px',
    paddingLeft: '16px',
  }),
  input: (provided) => ({
    ...provided,
    overflow: 'hidden',
  }),
};

type Props = {
  value?: string;
  placeholder?: string;
  name: string;
};

const SearchInput = ({
  value,
  placeholder = 'Search',
  name,
  ...otherProps
}: Props) => (
  <div className='search-input-container'>
    <AsyncReactSelect
      {...otherProps}
      cacheOptions
      inputId={`async-select-id-${name}`}
      value={value}
      placeholder={placeholder}
      classNamePrefix='react-select'
      className=''
      styles={defaultStyles}
    />
    <div className='search-input-loupe'>
      <RiSearchLine />
    </div>
  </div>
);

export default SearchInput;
