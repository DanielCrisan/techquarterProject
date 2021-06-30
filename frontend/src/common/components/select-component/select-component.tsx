import { ChangeEventHandler } from 'react';
import './select.scss';

interface Element {
  id: number;
  title: string;
}

interface SelectProps {
  labelName?: string;
  labelClassName?: string;
  selectClassName?: string;
  elements: Element[];
  placeholder?: string;
  value?: string,
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

function SelectComponent({
  labelName = '',
  labelClassName = '',
  selectClassName = '',
  elements,
  placeholder = '',
  value= '',
  onChange
}: SelectProps): JSX.Element {
  const options = elements.map(data => (
    <option key={data.id} value={data.title}>
      {data.title}
    </option>
  ));

  return (
    <>
      <div className="form-item">
        <label className={labelClassName}>{labelName}</label>
        <select className={selectClassName} onChange={onChange!}>
          <option hidden>{value}</option>
          {options}
        </select>
      </div>
    </>
  );
}

export default SelectComponent;
