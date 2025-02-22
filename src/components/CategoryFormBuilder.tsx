import { TextAreaField, TextInputField } from "../Shared";
import { ICategoryFormBuilderProps, ICategoryFormConfig } from "../types";


const CategoryFormBuilder = ({
    formDetails,
    onChange,
}: ICategoryFormBuilderProps) => {
    
    return (
        <div className="w-full self-start mt-8">
            {Object.keys(formDetails).map((field) => {
                const fieldData = formDetails[field as keyof ICategoryFormConfig];
                const { key, label, value, error, errorMessage, required = false} = fieldData
                if (key === 'name') {
                    return (
                        <div className="w-[240px]">
                            <TextInputField
                                label={label}
                                error={error}
                                fieldName={key}
                                onChange={onChange}
                                required={required}
                                value={value}
                                errorMessage={errorMessage}  
                            />
                        </div>
                    )
                }

                return (
                    <div className="w-[480px]">
                        <TextAreaField
                            value={value}
                            label={label}
                            error={error}
                            fieldName={key}
                            onChange={onChange}
                            required={required}
                            errorMessage={errorMessage}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default CategoryFormBuilder;
