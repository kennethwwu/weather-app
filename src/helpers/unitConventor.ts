import { Units } from '../types/units'

export function calcTempByUnit(temp:number, unit:Units){
    if (unit === Units.Celsius) return temp;
    return temp * 9 / 5 + 32;
}