import { useState } from "react";
import { loginFormData } from "../Config/LoginForm";
import { LoginForm } from "../components";
import { ILoginFormConfig } from "../types";
import { LoginPayload, useAdminLoginMutation } from "../services/admin/adminService";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authenticationSlice";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [adminLogin, { isLoading: isSigningIn }] = useAdminLoginMutation();

    const [formData, setFormData] = useState<ILoginFormConfig>(loginFormData);
    
    const handleSubmit = async () => {
        const { username, password } = formData;
        try {
            const payload = {
                username: username.value as string,
                password: password.value as string,
            } as LoginPayload;
            const data = await adminLogin(payload).unwrap();
            if (data.loginStatus && data.token) {
                dispatch(setToken(data.token));
                navigate('/employees');
            }
        } catch (e) {
            // Display Toast 
            console.log('#### ERROR : %o', e);
        }
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
                <LoginForm
                    formConfig={formData}
                    onSubmit={handleSubmit}
                    onChange={onChange}
                    isLoading={isSigningIn}
                />
            </div>
        </div>
    );
};

export default LoginContainer;