/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Button, Forms, UserStore, useState } from "@webpack/common";

import { submitTest } from "../api";
import { useIQStore } from "../stores/iqStore";
import { cl, ShinyButton, shuffleArray } from "../util/utils";
import { questions } from "./questions";

const shuffledQuestions: any = shuffleArray(questions);

export function TestModal({ rootProps }: { rootProps: ModalProps; }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<string[]>(new Array(shuffledQuestions.length).fill(""));

    const handleNext = () => {
        if (currentPage < shuffledQuestions.length - 1 &&
            (!shuffledQuestions[currentPage].requireInput || answers[currentPage] !== "")) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAnswer = (value: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentPage] = value;
            return newAnswers;
        });
    };


    const handleSubmit = async () => {
        const allRequiredAnswered = shuffledQuestions.every((question, index) =>
            !question.requireInput || answers[index] !== ""
        );

        if (!allRequiredAnswered) return;

        const answersWithIds = shuffledQuestions.reduce((acc, question, index) => {
            acc[question.id] = answers[index];
            return acc;
        }, {} as Record<string, string>);
        console.log("Submitted answers:", answersWithIds);
        const iq = await submitTest(UserStore.getCurrentUser().id, answersWithIds);
        useIQStore.getState().setIQ(UserStore.getCurrentUser().id, iq);
        console.log("IQ:", iq);
        rootProps.onClose();
    };

    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header")}>
                <Forms.FormTitle tag="h2" className="test-modal-title">
                    IQ Test
                </Forms.FormTitle>
            </ModalHeader>
            <div style={{ height: "32px" }} />
            <ModalContent
                className={cl("modal-content")}
                style={{
                    padding: "32px 16px 48px 16px",
                    marginBottom: "16px"
                }}
            >
                <Forms.FormTitle tag="h3">
                    {shuffledQuestions[currentPage].title}
                </Forms.FormTitle>

                {shuffledQuestions[currentPage].component({
                    value: answers[currentPage],
                    onChange: handleAnswer
                })}
            </ModalContent>

            <div style={{ height: "32px" }} />

            <ModalFooter>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Button
                        disabled={currentPage === 0}
                        onClick={handlePrevious}
                    >
                        Previous
                    </Button>
                    {currentPage === shuffledQuestions.length - 1 ? (
                        <ShinyButton
                            onClick={handleSubmit}
                            disabled={shuffledQuestions.some((question, index) =>
                                question.requireInput && answers[index] === ""
                            )}
                        >
                            Submit
                        </ShinyButton>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={shuffledQuestions[currentPage].requireInput && answers[currentPage] === ""}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </ModalFooter>
        </ModalRoot>
    );
}
