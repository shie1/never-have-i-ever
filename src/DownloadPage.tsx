import {Box} from "@mui/system";
import {Card, colors, CustomButton, isiOS, useInstallPrompt} from "./shared";
import React, {useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export const DownloadPage = () => {
    const year = useMemo(() => (new Date()).getFullYear(), [])
    const {install} = useInstallPrompt()
    const [openiOsPrompt, setOpeniOsPrompt] = useState(false)

    return (<>
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
            <span style={{
                fontSize: '1.2rem',
                fontStyle: "italic",
            }}>{year} • Shie1bi</span>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 0,
            }}>
                <h1 key={"gm-title"} style={{
                    fontSize: '5.6rem',
                    fontFamily: "Bebas Tam",
                    textTransform: "uppercase",
                    width: "min-content",
                    lineHeight: 1,
                    margin: 0,
                    padding: 0,
                    textAlign: "center",
                    letterSpacing: '0.5rem',
                    color: colors.primary,
                    fontWeight: 600,
                }}>Én még sosem...
                </h1>
                <p style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    textAlign: "center",
                    fontSize: "1.2rem",
                    margin: 0,
                    padding: 0,
                }}>
                    Az egyetlen ingyenes változat
                </p>
                <Box sx={{
                    display: 'flex',
                    flexDirection: "row",
                    gap: '.5rem',
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: '1rem',
                    '& img': {
                        width: '8rem',
                        borderRadius: '1rem',
                        border: `2px solid ${colors.secondary}`
                    },
                    '& img:nth-of-type(2)': {
                        marginBottom: '4rem',
                    }
                }}>
                    <img alt="screenshot" src="/screenshots/mobile_1.png"/>
                    <img alt="screenshot" src="/screenshots/mobile_2.png"/>
                    <img alt="screenshot" src="/screenshots/mobile_3.png"/>
                </Box>
            </Box>
            <Box sx={{
                gap: "1rem",
            }}>
                <CustomButton color={colors.secondary} onClick={() => {
                    if (isiOS()) {
                        setOpeniOsPrompt(true)
                    } else {
                        install()
                    }
                }}>
                    Letöltés
                </CustomButton>
            </Box>
        </Box>
        <AnimatePresence>
            {openiOsPrompt &&
                <motion.div
                    onClick={() => {
                        setOpeniOsPrompt(false)
                    }}
                    style={{
                        position: 'fixed',
                        top: "-2rem",
                        left: "-1rem",
                        width: "100vw",
                        height: "100vh",
                        backdropFilter: "brightness(.5) blur(.4rem)",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center"
                    }}
                    initial={{
                        transform: "translateY(100%)",
                        opacity: 0,
                    }}
                    animate={{
                        transform: "translateY(0%)",
                        opacity: 1,
                    }}
                    exit={{
                        transform: "translateY(100%)",
                        opacity: 0,
                    }}
                    key="iosModal">
                    <Box onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }} sx={{
                        position: 'fixed',
                        display: 'flex',
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "110%",
                        height: "40%",
                        margin: 0,
                        marginTop: "auto",
                        padding: "2rem",
                        backgroundColor: colors.background,
                        zIndex: 301,
                        '& li': {
                            verticalAlign: 'middle',
                        },
                        '& img': {
                            height: "1.5rem",
                            transform: "translateY(4px)",
                            color: "white",
                            fill: "white",
                        }
                    }}>
                        <h3 style={{
                            fontFamily: "Montserrat",
                            fontSize: "4rem",
                            textAlign: "center",
                        }}>Telepítés iOs-en</h3>
                        <ol style={{
                            fontSize: "1.2rem",
                        }}>
                            <li>Koppints a <img alt={""} src={"/ios-share.svg"}/>"Megosztás" gombra</li>
                            <li>Válaszd ki a <img alt={""} src={"/ios-add.svg"}/>"Főképernyőhöz adás" lehetőséget</li>
                        </ol>
                        <CustomButton onClick={() => {
                            setOpeniOsPrompt(false)
                        }} color={colors.secondary}>Ok</CustomButton>
                    </Box>
                </motion.div>
            }
        </AnimatePresence>
    </>)
}