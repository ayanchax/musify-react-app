export const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const randomKeyWord = (keyword) => {
    if (keyword[Math.floor(Math.random() * keyword.length)] === undefined) {
        return keyword[0];
    }
    return keyword[Math.floor(Math.random() * keyword.length)];
};
export const noImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLG67OCTdsrpf_nDsSC03j5j2x7pSK7XOogQ&usqp=CAU";