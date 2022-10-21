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
import { FaSolidChevronLeft, FaSolidChevronRight } from 'solid-icons/fa';
import { Dream } from '@prisma/client';

const DreamList: Component<{ filter: Accessor<string>; }> = (props) => {
    const pageSize = 5;
    let pageCount = 1;

    let previousFilter = "";

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
        pageCount = await window.dreamsAPI.getDreamPageCount(props.filter(), pageSize);

        setTotalPages(pageCount);
        setCurrentPage(1);
    }

    onMount(async () => {
        console.info("[Somnia] Main window onMount execution");

        await resetToFirstPage();
    });

    return (
        <ErrorBoundary fallback={err => err}>
            <nav class='text-center'>
                <ul class="pagination">
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

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Narration</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={dreamsToShow()}>{(dream) =>
                        <tr>
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
                            <td colSpan={3} class="text-center">No dreams available.</td>
                        </tr>
                    </tfoot>
                </Show>
            </table>

        </ErrorBoundary >
    );

};

export default DreamList;
