import {Box} from "@mui/system";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {GameModeContext, QuestionsContext} from "./App";
import {Card, colors, CustomButton, getGamemodeColor, Question, useQuestionHistory} from "./shared";
import {AnimatePresence, motion} from "framer-motion";

export const Game = () => {
    const {gamemode, setGamemode} = useContext(GameModeContext)
    const questions = useContext(QuestionsContext)

    //game logic
    const {history, addQuestionToHistory} = useQuestionHistory()
    const [currentRound, setCurrentRound] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>()

    const [canForward, setCanForward] = useState(true)

    const nextQuestion = useCallback(() => {
        if (!questions) return
        // if 2 seconds had not passed, return
        if (!canForward) return

        // filter questions that fit the gamemode
        let selectedQuestions = questions?.questions.filter((question) => {
            if (gamemode == true) {
                return question
            }
            return question.gamemodes.find((gm) => gm === gamemode)
        })

        if (selectedQuestions.length === 0) {
            throw new Error("No questions found for the selected gamemode")
        }

        // sort them, first are those that are not in history, then sort by history use date (oldest first)
        selectedQuestions = selectedQuestions?.sort((a, b) => {
            // first are those that are not in history, then sort by history use date (oldest first)
            let aInHistory = history.find((h) => h.id === a.id)
            let bInHistory = history.find((h) => h.id === b.id)
            if (!aInHistory && bInHistory) return -1
            if (aInHistory && !bInHistory) return 1
            if (!aInHistory && !bInHistory) {
                // random order
                return Math.random() - 0.5
            }
            return aInHistory!.used - bInHistory!.used
        })

        // set the current question and add it to history
        setCurrentQuestion(selectedQuestions[0])
        setCurrentRound((old) => old + 1)
        addQuestionToHistory(selectedQuestions[0].id)
        setCanForward(false)
        setTimeout(() => {
            setCanForward(true)
        }, 500)
    }, [history, currentQuestion, questions, gamemode, canForward])

    useEffect(() => {
        const to = setTimeout(() => {
            nextQuestion()
        }, 100)
        return () => clearTimeout(to)
    }, []);

    // preserved states for animations
    const [gamemodeColor, setGamemodeColor] = useState(colors.secondary)
    useEffect(() => {
        const gmColor = getGamemodeColor(gamemode)
        if (gmColor) setGamemodeColor(gmColor)
    }, [gamemode]);
    const [gamemodeLabelValue, setGamemodeLabelValue] = useState<string>("")
    useEffect(() => {
        switch (gamemode) {
            case "Spicy":
                setGamemodeLabelValue("Spicy")
                break
            case "Crazy":
                setGamemodeLabelValue("Crazy")
                break
            case "Normal":
                setGamemodeLabelValue("Normal")
                break
            case true:
                setGamemodeLabelValue("Minden")
                break
        }
    }, [gamemode]);

    return (
        <Box sx={{
            width: "fit-content",
            flexDirection: "column",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            minHeight: "calc(100vh - 4rem)",
            gap: '1rem',
            '& > *': {
                flex: 1,
            },
            '& > *:first-of-type': {
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
            },
            '& > *:nth-of-type(2)': {
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            },
            '& > *:last-of-type': {
                display: 'flex',
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
            }
        }}>
            <Box>
                <p style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                }}><span style={{
                    color: gamemodeColor,
                }}>{gamemodeLabelValue}</span> • {currentRound}. kör</p>
                <span style={{
                    fontSize: '1.2rem',
                    fontStyle: "italic",
                }}>Valaki még józan?</span>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <motion.div layout key="gameMainLayout">
                    <motion.h1 key={"gm-title"} style={{
                        fontSize: '5.6rem',
                        fontFamily: "Bebas Tam",
                        textTransform: "uppercase",
                        width: "min-content",
                        lineHeight: 1,
                        margin: "auto",
                        textAlign: "center",
                        letterSpacing: '0.5rem',
                        color: gamemodeColor,
                        fontWeight: 600,
                    }}>Én még sosem...
                    </motion.h1>
                    <motion.div key="gm-cardcontainer" style={{
                        position: "relative",
                        width: "90%",
                        margin: "1rem auto",
                        minHeight: 63,
                    }}>
                        <AnimatePresence>
                            {currentQuestion &&
                                <motion.div
                                    initial={{
                                        transform: "translateX(-100%) rotate(-10deg) scale(0.8)",
                                        opacity: 0,
                                        zIndex: -1,
                                        position: "absolute",
                                        margin: "auto",
                                    }}
                                    animate={{
                                        transform: "translateX(0%) rotate(0deg) scale(1)",
                                        opacity: 1,
                                        zIndex: 0,
                                        position: "relative",
                                    }}
                                    exit={{
                                        transform: "translateX(100%) rotate(10deg) scale(0.8)",
                                        opacity: 0,
                                        zIndex: -1,
                                        position: "absolute",
                                    }}
                                    key={currentQuestion?.id}>
                                    <Card color={gamemodeColor} style={{}}>
                                        <p style={{
                                            fontSize: "1.6rem",
                                            textWrap: "wrap",
                                            fontWeight: 500,
                                            whiteSpace: "pre-wrap",
                                            wordWrap: "break-word",
                                            textAlign: "center"
                                        }}>...{currentQuestion?.question.hu}</p>
                                    </Card>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </motion.div>
                    <motion.p key={"gm-p"} style={{
                        fontStyle: "italic",
                        fontWeight: 400,
                        textAlign: "center",
                        width: "70%",
                        fontSize: "1.2rem",
                        margin: "auto",
                    }}>
                        Ha te már megtetted, itt az idő inni egyet!
                    </motion.p>
                </motion.div>
            </Box>
            <Box sx={{
                gap: "1rem",
            }}>
                <CustomButton color={colors.secondary} onClick={() => {
                    setGamemode(undefined)
                }}>
                    Új játék
                </CustomButton>
                <CustomButton disabled={!canForward} color={gamemodeColor} onClick={() => {
                    nextQuestion()
                }}>
                    Következő
                </CustomButton>
            </Box>
        </Box>
    )
}