/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Accessor, Component, createEffect, ErrorBoundary, onMount, Setter } from "solid-js";

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
        let saveButton: HTMLButtonElement | undefined;

        createEffect(async () => {
            if (props.dreamId() === 0) return;

            console.info(`[Somnia] Loading dream with id ${props.dreamId()}`);

            const dream = await window.dreamsAPI.getDream(props.dreamId());

            dreamedAtInput!.value = formatDate(dream.dreamedAt);
            titleInput!.value = dream.title;
            narrationInput!.value = dream.narration;
            interpretationInput!.value = dream.interpretation ?? "";
        });

        onMount(handleOnMount);

        function handleOnMount() {
            updateSaveButton();

            setValidationEventListeners(dreamedAtInput!);

            setValidationEventListeners(titleInput!);

            setValidationEventListeners(narrationInput!);
        }

        function setValidationEventListeners(ctl: HTMLInputElement | HTMLTextAreaElement) {
            ctl.addEventListener("input", () => {
                ctl.setCustomValidity("");
                ctl.checkValidity();

                updateSaveButton();
            });

            ctl.addEventListener("invalid", () => {
                if (ctl.value === "") {
                    ctl.setCustomValidity("Narration is required");
                }

                updateSaveButton();
            });
        }

        function updateSaveButton() {
            saveButton!.disabled = !dreamedAtInput?.validity.valid ||
                !titleInput?.validity.valid ||
                !narrationInput?.validity.valid;
        }

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
                    <form class="w-600 mw-full">
                        <div class="form-row row-eq-spacing">
                            <div class="col-4">
                                <div class="form-group ">
                                    <label for="dreamedAt" class="required">Dreamed at</label>
                                    <input type="datetime-local" autofocus class="form-control" ref={dreamedAtInput} required />
                                </div>
                            </div>

                            <div class="col-8">
                                <div class="form-group">
                                    <label for="title" class="required" >Title</label>
                                    <input type="text" class="form-control" ref={titleInput} required />
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="narration" class="required">Narration</label>
                            <textarea class="form-control form-control-lg" ref={narrationInput} required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="interpretation">Interpretation</label>
                            <textarea class="form-control form-control-lg" ref={interpretationInput} ></textarea>
                        </div>

                        <div class="text-right">
                            <button class="btn mr-5" onClick={cancelSave}>Cancel</button>
                            <button class="btn btn-primary" onClick={saveDream} ref={saveButton}>Save</button>
                        </div>
                    </form>
                </div>
            </ErrorBoundary>
        );
    };

export default DreamEdit;
