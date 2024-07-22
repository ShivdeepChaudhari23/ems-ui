import { jwtDecode } from "jwt-decode";

const validateToken = (token: string) => {
    try {
        const tokenData = jwtDecode(token);
        if (tokenData?.exp) {
            const currentTime = Date.now();
            const expiry = tokenData.exp * 1000;
            if (expiry > currentTime) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

export { validateToken };