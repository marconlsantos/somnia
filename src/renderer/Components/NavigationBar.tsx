import { Component, ErrorBoundary } from "solid-js";
import { TbListSearch } from 'solid-icons/tb';

const NavigationBar: Component = () => {

    return (
        <ErrorBoundary fallback={err => err}>
            <nav class="navbar">
                <span class="navbar-brand">Somnia Dream Diary</span>

                {/* <span class="form-inline ml-auto">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search dreams" />
                        <div class="input-group-append">
                            <button class="btn">
                                <TbListSearch class="align-middle" size={24} />
                                <span class="sr-only">Search dreams</span>
                            </button>
                        </div>
                    </div>
                </span> */}
            </nav>
        </ErrorBoundary>
    );
};

export default NavigationBar;