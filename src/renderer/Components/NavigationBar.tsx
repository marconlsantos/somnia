/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { batch, Component, ErrorBoundary, Setter } from "solid-js";
import { TbListSearch } from 'solid-icons/tb';
import { CgAddR } from 'solid-icons/cg';

const NavigationBar: Component<
    {
        setFilter: Setter<string>,
        setIsEditing: Setter<boolean>,
        setDreamId: Setter<number>;
    }> = (props) => {
        let filter: HTMLInputElement | undefined;
        let searchButton: HTMLButtonElement | undefined;

        function handleFilterKeyDown(e: KeyboardEvent) {
            if (e.code !== "Enter") return;

            searchButton!.click();
        }

        function handleSearchClick() {
            props.setFilter(filter!.value);
        }

        function handleAddDreamClick() {
            batch(() => {
                props.setIsEditing(true);
                props.setDreamId(0);
            });
        }

        return (
            <ErrorBoundary fallback={err => err}>
                <nav class="navbar">
                    <span class="navbar-brand">Somnia Dream Diary</span>

                    <div class="navbar-content ml-auto">
                        <span class="form-inline">
                            <div class="input-group">
                                <input type="search"
                                    class="form-control"
                                    placeholder="Search dreams"
                                    ref={filter}
                                    onKeyDown={handleFilterKeyDown} />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" onClick={handleSearchClick} ref={searchButton}>
                                        <TbListSearch size={26} />
                                        <span class="sr-only">Filter dreams</span>
                                    </button>
                                </div>
                            </div>
                        </span>
                        &nbsp;
                        <span class="form-inline">
                            <button class="btn btn-primary" onClick={handleAddDreamClick} >
                                <CgAddR size={26} />
                                <span class="sr-only">Add dream</span>
                            </button>
                        </span>
                    </div>
                </nav>
            </ErrorBoundary>
        );
    };

export default NavigationBar;