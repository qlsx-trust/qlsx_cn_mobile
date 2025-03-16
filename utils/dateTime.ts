export const formatFullDateWithLocaleTime = (date?: string | Date) => {
    const reFormatDate = date ? date + '+00:00' : '';

    return (
        new Date(reFormatDate).toDateString() +
        ' ' +
        new Date(reFormatDate).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
    );
};

export const convertUTCTime = (date: Date): any => {
    return date.toISOString().slice(0, 19);
};
