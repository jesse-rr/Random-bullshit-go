interface ConditionProps {
    text: string;
    icon: string;
    code: number;
}

export const ForecastImageChanger = (condition: ConditionProps): string => {
    console.warn(condition.code + " " + condition.text);
    return '';
};