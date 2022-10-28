/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    Accessor,
    batch,
    Component,
    createEffect,
    createResource,
    createSignal,
    ErrorBoundary,
    For,
    onMount,
    Show
} from 'solid-js';
import { AiOutlineDelete } from 'solid-icons/ai';
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa';
import { Dream } from '@prisma/client';

import * as halfmoon from 'halfmoon';

import './DreamList.tsx.css';

const DreamList: Component<{ filter: Accessor<string>; }> = (props) => {
    const pageSize = 5;

    let previousFilter = "";

    let deleteModalTitle: HTMLHeadingElement | undefined;
    let dreamToDeleteId = 0;

    const [totalPages, setTotalPages] = createSignal(1);
    const [currentPage, setCurrentPage] = createSignal(1);

    const [dreamsToShow, { refetch }] = createResource(getCurrentDreamPage);

    async function getCurrentDreamPage(): Promise<Dream[]> {
        return await window.dreamsAPI.getDreamPage(props.filter(), pageSize, currentPage());
    }

    createEffect(() => {
        batch(() => {
            if (previousFilter !== props.filter()) {
                resetToFirstPage();

                previousFilter = props.filter();
            }

            //passing a info object to trigger reactivity
            refetch({ filter: props.filter(), page: currentPage() });
        });
    });

    async function resetToFirstPage() {
        const pageCount = await window.dreamsAPI.getDreamPageCount(props.filter(), pageSize);

        setTotalPages(pageCount);
        setCurrentPage(1);
    }

    onMount(async () => {
        console.info("[Somnia] Main window onMount execution");

        await resetToFirstPage();
    });

    function showDeleteDreamModal(dreamTitle: string, dreamId: number) {
        deleteModalTitle!.innerText = dreamTitle;
        dreamToDeleteId = dreamId;

        halfmoon.toggleModal("delete-dream");
    }

    async function deleteDream() {
        const success = await window.dreamsAPI.deleteDream(dreamToDeleteId);

        dreamToDeleteId = 0;

        if (!success) {
            halfmoon.toggleModal("delete-dream");

            halfmoon.initStickyAlert({
                content: "Unable to delete dream at this moment.",
                title: "Delete dream",
                alertType: "alert-danger",
                timeShown: 2000
            });

            return;
        }

        await updatePageDisplay();

        halfmoon.toggleModal("delete-dream");
    }

    async function updatePageDisplay() {
        const newPageCount = await window.dreamsAPI.getDreamPageCount(props.filter(), pageSize);

        batch(() => {
            if (totalPages() > newPageCount) {
                setTotalPages(newPageCount);
            }

            if (currentPage() > totalPages()) {
                setCurrentPage(totalPages());
            }

            refetch();
        });
    }

    return (
        <ErrorBoundary fallback={err => err}>
            <div>
                <div class="modal" id="delete-dream" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <button class="close" data-dismiss="modal" type="button" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 class="modal-title" ref={deleteModalTitle}></h5>
                            <p>
                                Are you sure you want to delete this dream?
                            </p>
                            <div class="text-right mt-20">
                                <button class="btn mr-5" data-dismiss="modal" onClick={() => halfmoon.toggleModal("delete-dream")}>Close</button>
                                <button class="btn btn-danger" onClick={deleteDream}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <table class="table table-stripped table-hover">
                    <thead>
                        <tr>
                            <td></td>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Narration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={dreamsToShow()}>{(dream) =>
                            <tr>
                                <td class="text-center" >
                                    <a onClick={() => showDeleteDreamModal(dream.title, dream.id)}>
                                        <AiOutlineDelete color="red" size={20} />
                                    </a>
                                </td>
                                <td>{dream.dreamedAt.toDateString()}</td>
                                <td>{dream.title}</td>
                                <td>{`${dream.narration.substring(0, 25)} ...`}</td>
                            </tr>
                        }
                        </For>
                    </tbody>
                    <Show when={dreamsToShow()?.length == 0}>
                        <tfoot>
                            <tr>
                                <td colSpan={4} class="text-center">No dreams available.</td>
                            </tr>
                        </tfoot>
                    </Show>
                </table>
            </div>

            <footer>
                <nav class='text-center d-block'>
                    <ul class="pagination pagination-sm">
                        <li classList={{ "page-item": true, disabled: currentPage() == 1 }}>
                            <a href="#" class="page-link" onClick={() => setCurrentPage(currentPage() - 1)}>
                                <FaSolidChevronLeft class="align-middle" />
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>

                        <li classList={{ "page-item": true, active: currentPage() == 1 }}>
                            <a href="#" class="page-link" onClick={() => setCurrentPage(1)}>1</a>
                        </li>

                        <Show when={currentPage() > 3}>
                            <li class="page-item ellipsis"></li>
                        </Show>

                        <Show when={currentPage() > 2}>
                            <li class="page-item">
                                <a href="#" class="page-link" onClick={() => setCurrentPage(currentPage() - 1)}>{currentPage() - 1}</a>
                            </li>
                        </Show>

                        <Show when={currentPage() != 1 && currentPage() != totalPages()}>
                            <li class="page-item active" aria-current="page">
                                <a href="#" class="page-link" tabindex="-1">{currentPage()}</a>
                            </li>
                        </Show>

                        <Show when={currentPage() < totalPages() - 1}>
                            <li class="page-item">
                                <a href="#" class="page-link" onClick={() => setCurrentPage(currentPage() + 1)}>{currentPage() + 1}</a>
                            </li>
                        </Show>

                        <Show when={currentPage() < totalPages() - 2}>
                            <li class="page-item ellipsis"></li>
                        </Show>

                        <Show when={totalPages() > 1}>
                            <li classList={{ "page-item": true, active: currentPage() == totalPages() }}>
                                <a href="#" class="page-link" onClick={() => setCurrentPage(totalPages())}>{totalPages()}</a>
                            </li>
                        </Show>

                        <li classList={{ "page-item": true, disabled: currentPage() == totalPages() }}>
                            <a href="#" class="page-link" onClick={() => setCurrentPage(currentPage() + 1)}>
                                <FaSolidChevronRight class="align-middle" />
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </footer>
        </ErrorBoundary >
    );
};

export default DreamList;
