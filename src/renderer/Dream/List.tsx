import { Component, createSignal, ErrorBoundary, For, onMount, Show } from 'solid-js';
import { Dream } from '@prisma/client';

const DreamList: Component = () => {
    let dreamsToShow: Dream[] = [];

    const [dreams, setDreams] = createSignal(dreamsToShow);

    onMount(async () => {
        dreamsToShow = await window.dreamsAPI.getDreams();

        setDreams(dreamsToShow);
    });

    return (
        <ErrorBoundary fallback={err => err}>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Narration</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={dreams()}>{(dream) =>
                        <tr>
                            <td>{dream.dreamedAt.toDateString()}</td>
                            <td>{dream.title}</td>
                            <td>{`${dream.narration.substring(0, 25)} ...`}</td>
                        </tr>
                    }
                    </For>
                </tbody>
                <Show when={dreams().length == 0}>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>No dreams available.</td>
                        </tr>
                    </tfoot>
                </Show>
            </table>

        </ErrorBoundary >
    );

};

export default DreamList;