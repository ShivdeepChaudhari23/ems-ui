import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface IDatePickerFieldProps {
  label: string;
  fieldName: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange: (key: string, value: string) => void;
  value: string;
}

const DatePickerField = ({ value, label, fieldName, onChange }: IDatePickerFieldProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label={label}
            onChange={(e) => onChange(fieldName, e?.toISOString() as string)}
            value={dayjs(value || (new Date().toISOString()))}  
          />
        </DemoContainer>
      </LocalizationProvider>
    )
};

export default DatePickerField;