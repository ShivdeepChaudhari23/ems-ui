import {
    DatePickerField,
    DropdownField,
    SliderField,
    TextAreaField,
    TextInputField
} from "../Shared";
import { IEmployeeFormType } from "../types";
import ImageUploader from "./ImageUploader";

interface IEmployeeFormBuilderProps {
    formFields: IEmployeeFormType;
    onChange: (key: string, value: string | number, id?: string) => void;
}

const EmployeeFormBuilder = ({ formFields, onChange }: IEmployeeFormBuilderProps) => {
    const { firstName, lastName, emailAddress, salary, address, pincode, joiningDate, category, phoneNumber } = formFields;
    return (
        <div className="mt-36 px-6">
            <div className="flex justify-center">
                <ImageUploader imageUrl="" />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <TextInputField
                    label={firstName.label}
                    value={firstName.value as string}
                    error={!!firstName.error}
                    errorMessage={firstName.errorMessage}
                    required={!!firstName.required}
                    fieldName={firstName.key}
                    onChange={onChange}
                    type={firstName.type}
                />
                <TextInputField
                    label={lastName.label}
                    value={lastName.value as string}
                    error={!!lastName.error}
                    errorMessage={lastName.errorMessage}
                    required={!!lastName.required}
                    fieldName={lastName.key}
                    onChange={onChange}
                    type={lastName.type}
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <TextInputField
                    label={emailAddress.label}
                    value={emailAddress.value as string}
                    error={!!emailAddress.error}
                    errorMessage={emailAddress.errorMessage}
                    required={!!emailAddress.required}
                    fieldName={emailAddress.key}
                    onChange={onChange}
                    type={emailAddress.type}
                />
                <TextInputField
                    label={phoneNumber.label}
                    value={phoneNumber.value as string}
                    error={!!phoneNumber.error}
                    errorMessage={phoneNumber.errorMessage}
                    required={!!phoneNumber.required}
                    fieldName={phoneNumber.key}
                    onChange={onChange}
                    type={phoneNumber.type}
                />
            </div>
            
            <TextAreaField
                label={address.label}
                value={address.value as string}
                fieldName={address.key}
                onChange={onChange}
            />
            <div className="w-[50%]">
                <TextInputField
                    label={pincode.label}
                    value={pincode.value as string}
                    required={!!pincode.required}
                    error={!!pincode.error}
                    errorMessage={pincode.errorMessage}
                    fieldName={pincode.key}
                    onChange={onChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <DatePickerField
                    fieldName={joiningDate.key}
                    label={joiningDate.label}
                    value={joiningDate.value as string}
                    onChange={onChange}
                    required={joiningDate.required}
                    error={joiningDate.error}
                    errorMessage={joiningDate.errorMessage}
                    isDisabled={joiningDate.disabled}
                />
                <DropdownField
                    fieldName={category.key}
                    options={category?.options || []}
                    value={category.dropdownId || ''}
                    label={category.label}
                    handleChange={onChange}
                    required={!!category.required}
                    error={!!category.error}
                    errorMessage={category.errorMessage}
                />
            </div>
            <SliderField
                fieldName={salary.key}
                label={salary.label}
                value={salary.value as number}
                onChange={onChange}
            />
        </div>
    )
};

export default EmployeeFormBuilder;
