import { Component, ErrorBoundary } from "solid-js";

const NavigationBar: Component = () => {

    return (
        <ErrorBoundary fallback={err => err}>
            <nav class="navbar">
                <span class="navbar-brand">Somnia Dream Diary</span>

                <form class="form-inline ml-auto">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search dreams" />
                        <div class="input-group-append">
                            <button class="btn" type="submit">
                                <i class="fa fa-search" aria-hidden="true"></i>
                                <span class="sr-only">Search dreams</span>
                            </button>
                        </div>
                    </div>
                </form>
            </nav>

        </ErrorBoundary>
    );
};

export default NavigationBar;