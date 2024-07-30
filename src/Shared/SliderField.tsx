import { InputLabel, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";

interface ISliderFieldProps {
    label: string;
    fieldName: string;
    value: number;
    onChange: (key: string, value: string | number) => void;
}

const SliderField = ({label, fieldName, value, onChange}: ISliderFieldProps) => {
    return (
        <div className="grid grid-cols-2 gap-2 pt-4">
            <div className="px-2">
                <InputLabel htmlFor='slider' className="!text-[12px]">{label}</InputLabel>
                <Slider
                    size={"medium"}
                    min={0}
                    max={150000}
                    value={value}
                    disabled={false}
                    id='slider'
                    onChange={(e) => onChange(fieldName, e.target?.value)}
                />
            </div>
            <TextField
                value={value}
                type={"number"}
                onChange={(e) => onChange(fieldName, e.target.value)}
            />
        </div>
    )
}

export default SliderField;
