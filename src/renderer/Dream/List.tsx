import { Component, createSignal, ErrorBoundary, For, onMount, Show } from 'solid-js';
import Dream from '../../domain/Dream';

const DreamList: Component = () => {
    const emptyDreams: Dream[] = [];

    const [dreams, setDreams] = createSignal(emptyDreams);

    let info: any;

    onMount(() => {
        setDreams(window.dreamsAPI.getDreams());
    });

    return (
        <ErrorBoundary fallback={err => err}>
            <p ref={info} id="info"></p>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Narration</th>
                        <th>Emotions</th>
                    </tr>
                </thead>
                <tbody>
                    <For each={dreams()}>{(dream) =>
                        <tr>
                            <td>{dream.dreamDate.toDateString()}</td>
                            <td>{dream.title}</td>
                            <td>{`${dream.narration.substring(0, 25)} ...`}</td>
                            <td>{dream.emotions.join(',')}</td>
                        </tr>
                    }
                    </For>
                </tbody>
                <Show when={dreams().length == 0}>
                    <tfoot>
                        <tr>
                            <td colSpan={4}>No dreams available.</td>
                        </tr>
                    </tfoot>
                </Show>
            </table>

        </ErrorBoundary >
    );

};

export default DreamList;