import React, {createContext, useEffect, useState} from 'react';
import {Container} from "@mui/system";
import {GamemodePicker} from "./GamemodePicker";
import {Gamemode, QuestionsJson, useIsStandalone} from "./shared";
import {Game} from "./Game";
import {motion, AnimatePresence} from "framer-motion";
import {DownloadPage} from "./DownloadPage";

export const GameModeContext = createContext<{
    gamemode: Gamemode | undefined | true,
    setGamemode: (gamemode: Gamemode | undefined | true) => void,
}>({
    gamemode: undefined,
    setGamemode: () => {
    },
})
export const QuestionsContext = createContext<QuestionsJson | undefined>(undefined)

function App() {
    const [gamemode, setGamemode] = useState<Gamemode | undefined | true>()
    const [questions, setQuestions] = useState<QuestionsJson | undefined>()
    const standalone = useIsStandalone()

    useEffect(() => {
        const ac = new AbortController()
        fetch("questions.json", {signal: ac.signal})
            .then(response => response.json())
            .then(setQuestions)
            .catch(() => {
            })
        return () => {
            ac.abort()
        }
    }, []);

    useEffect(() => {
        if (!questions) return
        const allCount = questions?.questions.length
        const spicyCount = questions?.questions.filter(q => q.gamemodes.includes("Spicy")).length
        const crazyCount = questions?.questions.filter(q => q.gamemodes.includes("Crazy")).length
        const normalCount = questions?.questions.filter(q => q.gamemodes.includes("Normal")).length
        console.table({allCount, spicyCount, crazyCount, normalCount})
    }, [questions])

    useEffect(() => {
        console.log(standalone)
    }, [standalone]);

    return (
        <Container style={{
            height: '100%',
            maxHeight: '100%',
            maxWidth: 390,
            color: "white",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 3rem",
            position: "relative",
        }}>
            <GameModeContext.Provider value={{gamemode, setGamemode}}>
                <QuestionsContext.Provider value={questions}>
                    <AnimatePresence>
                        {!standalone ?
                            <motion.div style={{
                                maxWidth: "min-content",
                                maxHeight: "100%",
                                display: 'flex',
                            }} initial={{
                                transform: "translateX(-100%) rotate(-10deg)",
                                opacity: 0,
                                position: "absolute",
                            }} animate={{
                                transform: "translateX(0%) rotate(0deg)",
                                opacity: 1,
                                position: "relative",
                            }} exit={{
                                transform: "translateX(-100%) rotate(-10deg)",
                                opacity: 0,
                                position: "absolute",
                            }} key="downloadPage">
                                <DownloadPage/>
                            </motion.div>
                            : !gamemode ?
                                <motion.div
                                    style={{
                                        maxWidth: "min-content",
                                        maxHeight: "100%",
                                        display: 'flex',
                                    }}
                                    initial={{
                                        transform: "translateX(-100%) rotate(-10deg)",
                                        opacity: 0,
                                        position: "absolute",
                                    }}
                                    animate={{
                                        transform: "translateX(0%) rotate(0deg)",
                                        opacity: 1,
                                        position: "relative",
                                    }}
                                    exit={{
                                        transform: "translateX(-100%) rotate(-10deg)",
                                        opacity: 0,
                                        position: "absolute",
                                    }}
                                    key="gameModePicker">
                                    <GamemodePicker/>
                                </motion.div> :
                                <motion.div
                                    style={{
                                        maxHeight: "100%",
                                        display: 'flex',
                                        maxWidth: "min-content"
                                    }}
                                    initial={{
                                        transform: "translateX(100%) rotate(10deg)",
                                        opacity: 0,
                                        position: "absolute",
                                    }}
                                    animate={{
                                        transform: "translateX(0%) rotate(0deg)",
                                        opacity: 1,
                                        position: "relative",
                                    }}
                                    exit={{
                                        transform: "translateX(100%) rotate(10deg)",
                                        opacity: 0,
                                        position: "absolute",
                                    }}
                                    key="gameInstance">
                                    <Game/>
                                </motion.div>}
                    </AnimatePresence>
                </QuestionsContext.Provider>
            </GameModeContext.Provider>
        </Container>
    );
}

export default App;