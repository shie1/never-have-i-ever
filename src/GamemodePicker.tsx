import {colors, GameModeCard, getGamemodeColor} from "./shared";
import {Box} from "@mui/system";
import React, {useContext} from "react";
import {GameModeContext} from "./App";

export const GamemodePicker = () => {
    const {setGamemode} = useContext(GameModeContext)

    return (
        <Box sx={{
            width: "fit-content",
            flexDirection: "column",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
            }}>
                <h2 style={{
                    fontSize: '5.6rem',
                    color: colors.primary,
                    letterSpacing: "6px",
                    lineHeight: 1,
                    textAlign: "center",
                }}>Én még sosem...</h2>
            </Box>
            <Box sx={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                gap: "1rem",
                overflowY: "auto",
                maxHeight: "100%",
                position: 'relative',
                scrollSnapType: "y mandatory",
                '& > *': {
                    scrollSnapAlign: "center",
                }
            }}>
                <GameModeCard onClick={() => {
                    setGamemode(true)
                }} title="Minden" emoji={"/exploding_head.png"} color={getGamemodeColor(true)!}/>
                <GameModeCard emoji={"/hot_pepper.png"} onClick={() => {
                    setGamemode("Spicy")
                }} title="Spicy" color={getGamemodeColor("Spicy")!}/>
                <GameModeCard emoji={"/stuck_out_tongue_winking_eye.png"} onClick={() => {
                    setGamemode("Crazy")
                }} title="Crazy" color={getGamemodeColor("Crazy")!}/>
                <GameModeCard emoji={"/joy.png"} onClick={() => {
                    setGamemode("Normal")
                }} title="Normál" color={getGamemodeColor("Normal")!}/>
            </Box>
        </Box>
    )
}