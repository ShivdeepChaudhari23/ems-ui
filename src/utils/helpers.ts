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

const getDaySuffix = (dayString: string) => {
    if (['1', '21', '31'].includes(dayString)) {
        return 'st';
    }

    if (['2', '22'].includes(dayString)) {
        return 'nd';
    }

    if (['3', '23'].includes(dayString)) {
        return 'rd';
    }

    return 'th';
}

const transformDate = (date: string) => {
    const dateified = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const newDate = formatter.format(dateified);
    const day = dateified.getDate();
    const suffix = getDaySuffix(day.toString());
    return newDate.replace(day.toString(), `${day}${suffix}`);
}

const getInitials = (fName: string, lName: string) => `${fName[0]}${lName[0]}`;

const transformOptions = (item: { id: number, name: string }) => {
    const { id, name } = item;
    return { id: `${id}`, value: name };
}
export { validateToken, transformDate, getInitials, transformOptions };
