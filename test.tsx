/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Button, Forms, useState } from "@webpack/common";

import { questions } from "./questions";
import { cl, shuffleArray } from "./utils";
const shuffledQuestions = shuffleArray(questions);

export function TestModal({ rootProps }: { rootProps: ModalProps; }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<string[]>(new Array(shuffledQuestions.length).fill(""));

    const handleNext = () => {
        if (currentPage < shuffledQuestions.length - 1 && answers[currentPage] !== "") {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers];
        newAnswers[currentPage] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {

        const answersWithIds = shuffledQuestions.reduce((acc, question, index) => {
            acc[question.id] = answers[index];
            return acc;
        }, {} as Record<string, string>);
        console.log("Submitted answers:", answersWithIds);
        rootProps.onClose();
    };

    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header", "pb-0")}>
                <Forms.FormTitle tag="h2" className="mb-0">
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
                        <Button
                            onClick={handleSubmit}
                            disabled={answers.some(answer => answer === "")}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={answers[currentPage] === ""}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </ModalFooter>
        </ModalRoot>
    );
}
