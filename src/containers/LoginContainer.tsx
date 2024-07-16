import { useState } from "react";
import { loginFormData } from "../Config/LoginForm";
import { LoginForm } from "../components";
import { ILoginFormConfig } from "../types";

const LoginContainer = () => {
    const [formData, setFormData] = useState<ILoginFormConfig>(loginFormData);
    
    const handleSubmit = () => {
        // Create Payload
    }

    const onChange = (key: string, value: string) => {

        setFormData((prev) => ({
            ...prev,
            [key]: {
                ...prev[key as keyof ILoginFormConfig],
                value,
            }
        }));
    };

    return (
        <div className="flex">
            <img src="/images/EMS-Login-Cover.jpg" alt="login-cover-image" className="h-[100vh] w-[70vw]"/>
            <div>
                <img src={'/Byteridge-EMS-Logo.svg'} className="w-full h-[10rem] mb-[4rem]" />
                <LoginForm formConfig={formData} onSubmit={handleSubmit} onChange={onChange}/>
            </div>
        </div>
    );
};

export default LoginContainer;