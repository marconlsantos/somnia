/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Accessor, Component, createEffect, ErrorBoundary, Setter } from "solid-js";

import * as halfmoon from "halfmoon";

const DreamEdit: Component<
    {
        dreamId: Accessor<number>,
        setIsEditing: Setter<boolean>;
    }> = (props) => {

        let dreamedAtInput: HTMLInputElement | undefined;
        let titleInput: HTMLInputElement | undefined;
        let narrationInput: HTMLTextAreaElement | undefined;
        let interpretationInput: HTMLTextAreaElement | undefined;

        createEffect(async () => {
            if (props.dreamId() === 0) return;

            console.info(`[Somnia] Loading dream with id ${props.dreamId()}`);

            const dream = await window.dreamsAPI.getDream(props.dreamId());

            dreamedAtInput!.value = formatDate(dream.dreamedAt);
            titleInput!.value = dream.title;
            narrationInput!.value = dream.narration;
            interpretationInput!.value = dream.interpretation ?? "";
        });

        function formatDate(date: Date) {

            function padTo2Digits(num: number) {
                return num.toString().padStart(2, '0');
            }

            return (
                [
                    date.getFullYear(),
                    padTo2Digits(date.getMonth() + 1),
                    padTo2Digits(date.getDate()),
                ].join('-') +
                ' ' +
                [
                    padTo2Digits(date.getHours()),
                    padTo2Digits(date.getMinutes()),
                    padTo2Digits(date.getSeconds()),
                ].join(':')
            );
        }

        function cancelSave() {
            props.setIsEditing(false);
        }

        async function saveDream() {
            //TODO: input validation

            const successful = await window.dreamsAPI.saveDream(
                {
                    id: props.dreamId(),
                    dreamedAt: new Date(Date.parse(dreamedAtInput!.value)),
                    title: titleInput!.value,
                    narration: narrationInput!.value,
                    interpretation: interpretationInput?.value ?? ""
                });

            if (successful) {
                props.setIsEditing(false);
                return;
            }

            halfmoon.initStickyAlert({
                content: "Unable to save dream at this moment.",
                title: "Save dream",
                alertType: "alert-danger",
                timeShown: 2000
            });
        }

        return (
            <ErrorBoundary fallback={err => err}>
                <div class="d-flex justify-content-center">
                    <div class="w-600 mw-full">
                        <div class="form-row row-eq-spacing">
                            <div class="col-4">
                                <div class="form-group ">
                                    <label for="dreamedAt" class="required">Dreamed at</label>
                                    <input type="datetime-local" class="form-control" ref={dreamedAtInput} required={true} />
                                </div>
                            </div>

                            <div class="col-8">
                                <div class="form-group">
                                    <label for="title" class="required">Title</label>
                                    <input type="text" class="form-control" ref={titleInput} required={true} />
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="narration" class="required">Narration</label>
                            <textarea class="form-control form-control-lg" ref={narrationInput} required={true}></textarea>
                        </div>

                        <div class="form-group">
                            <label for="interpretation">Interpretation</label>
                            <textarea class="form-control form-control-lg" ref={interpretationInput} ></textarea>
                        </div>

                        <div class="text-right">
                            <button class="btn mr-5" onClick={cancelSave}>Cancel</button>
                            <button class="btn btn-primary" onClick={saveDream}>Save</button>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        );
    };

export default DreamEdit;