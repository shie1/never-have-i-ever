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
            <h2 style={{
                fontSize: '4.2rem',
                color: colors.primary,
                letterSpacing: '1rem',
                textAlign: "center",
            }}>Játékmód</h2>
            <Box sx={{
                flexDirection: "column",
                width: "100%",
                display: "flex",
                gap: "1rem",
            }}>
                <GameModeCard onClick={()=>{
                    setGamemode(true)
                }} title={"Minden"} emoji={"/exploding_head.png"} description={
                    "minden kérdés: a jó, a rossz, a csúnya. minden."
                } color={getGamemodeColor(true)!} />
                <GameModeCard emoji={"/hot_pepper.png"} onClick={() => {
                    setGamemode("Spicy")
                }} title={"Spicy"} description={
                    "grrrr. nagyon szexuális kérdések..."
                } color={getGamemodeColor("Spicy")!}/>
                <GameModeCard emoji={"/stuck_out_tongue_winking_eye.png"} onClick={() => {
                    setGamemode("Crazy")
                }} title={"Crazy"} description={
                    "crazy? I was crazy once... they locked me in a room."
                } color={getGamemodeColor("Crazy")!}/>
                <GameModeCard emoji={"/joy.png"} onClick={() => {
                    setGamemode("Normal")
                }} title={"Normál"} description={
                    "nincs itt semmi látnivaló!"
                } color={getGamemodeColor("Normal")!}/>
            </Box>
        </Box>
    )
}