import {useEffect, useState} from "react";

export const colors = {
    background: "#0C020E",
    primary: "#FF59D7",
    secondary: "#4214B7",
    neutralBrown: "#B76214",
    spicyRed: "#B73B14",
    crazyBlue: "#144BB7",
    anythingGreen: "#14B755"
}

export type Gamemode = "Spicy" | "Crazy" | "Normal"

export const GameModeCard = ({onClick, title, emoji, description, color}: {
    onClick: () => void,
    title?: string,
    emoji: string,
    description?: string,
    color: string,
}) => (
    <div onClick={onClick} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '1rem',
        width: "100%",
        padding: '1rem 1.2rem',
        borderRadius: '2rem',
        backgroundColor: color,
        color: 'white',
        cursor: 'pointer',
        boxShadow: '0 0 1rem black',
    }}>
        <div style={{
            display: 'flex',
            flexDirection: "row",
            gap: '1rem',
        }}>
            <img src={emoji} alt={title} style={{
                width: '4rem',
                height: '4rem',
            }}/>
            <h2 style={{
                fontFamily: "Bebas Tam",
                fontSize: "4rem",
                marginRight: "5px",
            }}>{title}</h2>
        </div>
        {description ? <p style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            textWrap: 'wrap',
        }}>{description}</p> : <></>}
    </div>
)

export const Card = ({color, children, style}: {
    color: string,
    children: React.ReactNode,
    style?: React.CSSProperties,
}) => (
    <div style={{
        backgroundColor: color,
        padding: '1rem',
        borderRadius: '2rem',
        boxShadow: '0 0 1rem black',
        ...style,
    }}>
        {children}
    </div>
)

export const CustomButton = ({onClick, children, color, style, disabled}: {
    onClick?: () => void,
    children: React.ReactNode,
    color: string,
    style?: React.CSSProperties,
    disabled?: boolean
}) => (
    <button className={"customButton"} disabled={disabled} onClick={onClick} style={{
        backgroundColor: color,
        color: 'white',
        borderRadius: '2rem',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 0 1rem black',
        fontSize: '1.1rem',
        padding: ".6rem 2rem",
        minWidth: 150,
        fontWeight: 600,
        ...style,
    }}>
        {children}
    </button>
)

export type Question = {
    id: string, // generic id, (e.g. shoplifted, cheated-on-a-test, etc.)
    question: {
        [key: string]: string, // the keys are the languages
    },
    gamemodes: Gamemode[], // the gamemodes this question is available in
}

export type QuestionsJson = {
    questions: Question[]
}

export type QuestionsHistrory = {
    id: string,
    used: number // Date.getTime() value
}[]

export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        let currentValue;

        try {
            currentValue = JSON.parse(
                localStorage.getItem(key) || String(defaultValue)
            );
        } catch (error) {
            currentValue = defaultValue;
        }

        return currentValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export const useQuestionHistory = () => {
    const [history, setHistory] = useLocalStorage("questionHistory", [] as QuestionsHistrory)

    const addQuestionToHistory = (id: string) => {
        // if the question is already in history, update the used date
        if (history.find((h: {
            id: string,
            used: number,
        }) => h.id === id)) {
            setHistory(history.map((h: {
                id: string,
                used: number,
            }) => {
                if (h.id === id) {
                    return {...h, used: Date.now()}
                }
                return h
            }))
            return
        } else {
            setHistory([...history, {id, used: Date.now()}])
        }
    }

    const clearHistory = () => {
        setHistory([])
    }

    return {
        history: history as QuestionsHistrory,
        addQuestionToHistory, clearHistory
    }
}

export const getGamemodeColor = (gm: Gamemode | true | undefined) => {
    switch (gm) {
        case "Spicy":
            return colors.spicyRed
        case "Crazy":
            return colors.crazyBlue
        case "Normal":
            return colors.neutralBrown
        case true:
            return colors.anythingGreen
        default:
            return undefined
    }
}

export function useIsStandalone() {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const matchQueryList = window.matchMedia("(display-mode: standalone)");

        function handleChange(e: any) {
            setMatches(e.matches);
        }

        matchQueryList.addEventListener("change", handleChange);

        return () => {
            matchQueryList.removeEventListener("change", handleChange);
        };
    }, []);

    return matches;
}

export const isiOS = () => {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export const useInstallPrompt = ()=>{
    const [prompt, setPrompt] = useState<any>(null)

    useEffect(()=>{
        const handler = (e: any) => {
            e.preventDefault()
            setPrompt(e)
        }
        window.addEventListener("beforeinstallprompt", handler)
        return () => window.removeEventListener("beforeinstallprompt", handler)
    }, [])

    const install = () => {
        if(prompt){
            prompt.prompt()
        }
    }

    return {prompt, install}
}