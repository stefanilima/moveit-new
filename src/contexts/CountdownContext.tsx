import { createContext, Children, ReactNode, useContext, useState, useEffect } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    // Para tirar um segundo por vez do countdown
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            isActive,
            hasFinished,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}