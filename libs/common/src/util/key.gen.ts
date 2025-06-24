export const keyGen = (key: string, userId: string) => {
    return `${key}:${userId}`;
};
export const OtpGen = (num: number) => {
    const otp = () => Math.floor(Math.random() * 10);
    return Array.from({ length: num }, otp).join('');
};

export enum OTP {
    OTP = 'otp',
}
