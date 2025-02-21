/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Margins } from "@utils/margins";
import { ModalContent, ModalFooter, ModalHeader, ModalProps, ModalRoot } from "@utils/modal";
import { Button, Forms, useState } from "@webpack/common";

import { questions } from "./questions";
import { cl } from "./utils";

export function TestModal({ rootProps }: { rootProps: ModalProps; }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));

    const handleNext = () => {
        if (currentPage < questions.length - 1) {
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
        const answersWithIds = questions.reduce((acc, question, index) => {
            acc[question.id] = answers[index];
            return acc;
        }, {} as Record<string, string>);
        console.log("Submitted answers:", answersWithIds);
        rootProps.onClose();
    };

    return (
        <ModalRoot {...rootProps}>
            <ModalHeader className={cl("modal-header")}>
                <Forms.FormTitle tag="h2">
                    IQ Test
                </Forms.FormTitle>
            </ModalHeader>
            <Margins.top16 />
            <ModalContent className={cl("modal-content")}>
                <Forms.FormTitle tag="h3">
                    {questions[currentPage].title}
                </Forms.FormTitle>

                {questions[currentPage].component({
                    value: answers[currentPage],
                    onChange: handleAnswer
                })}

            </ModalContent>
            <ModalFooter>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px"
                }}>
                    <Button
                        disabled={currentPage === 0}
                        onClick={handlePrevious}
                    >
                        Previous
                    </Button>
                    {currentPage === questions.length - 1 ? (
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </div>
            </ModalFooter>
        </ModalRoot>
    );
}
