/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, ErrorBoundary, Setter } from "solid-js";
import { TbListSearch } from 'solid-icons/tb';

const NavigationBar: Component<{ setFilter: Setter<string>; }> = (props) => {
    let filter: HTMLInputElement | undefined;
    let searchButton: HTMLButtonElement | undefined;

    function handleFilterKeyDown(e: KeyboardEvent) {
        if (e.code !== "Enter") return;

        searchButton!.click();
    }

    function handleSearchClick() {
        props.setFilter(filter!.value);
    }

    return (
        <ErrorBoundary fallback={err => err}>
            <nav class="navbar">
                <span class="navbar-brand">Somnia Dream Diary</span>

                <span class="form-inline ml-auto">
                    <div class="input-group">
                        <input type="text"
                            class="form-control"
                            placeholder="Search dreams"
                            ref={filter}
                            onKeyDown={handleFilterKeyDown} />
                        <div class="input-group-append">
                            <button class="btn" onClick={handleSearchClick} ref={searchButton}>
                                <TbListSearch class="align-middle" size={24} />
                                <span class="sr-only">Search dreams</span>
                            </button>
                        </div>
                    </div>
                </span>
            </nav>
        </ErrorBoundary>
    );
};

export default NavigationBar;